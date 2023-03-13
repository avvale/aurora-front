/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const ts = require('typescript');
const path = require('node:path');
const tsMorph = require('ts-morph');

exports.createProject = tsconfigPath =>
{
    return new tsMorph.Project({
        tsConfigFilePath    : path.join(process.cwd(), ...tsconfigPath),
        // these are the defaults
        manipulationSettings: {
            // TwoSpaces, FourSpaces, EightSpaces, or Tab
            indentationText                : tsMorph.IndentationText.FourSpaces,
            // LineFeed or CarriageReturnLineFeed
            newLineKind                    : ts.NewLineKind.LineFeed,
            // Single or Double
            quoteKind                      : tsMorph.QuoteKind.Single,
            // Whether to change shorthand property assignments to property assignments
            // and add aliases to import & export specifiers (see more information in
            // the renaming section of the documentation).
            usePrefixAndSuffixTextForRename: false,
            // Whether to use trailing commas in multi-line scenarios where trailing
            // commas would be used.
            useTrailingCommas              : false,
        },
    });
};

exports.createSourceFile = (project, filePath) =>
{
    return project.addSourceFileAtPath(path.join(process.cwd(), ...filePath));
};

exports.removeImport = (sourceFile, importPath) =>
{
    const someModuleImport = sourceFile.getImportDeclaration(importPath);
    someModuleImport.remove();
};

exports.removeDecoratorProperty = (sourceFile, moduleName, propertyName, valueName) =>
{
    const moduleClass = sourceFile.getClass(moduleName);
    const moduleDecorator = moduleClass.getDecorator('Module');
    const moduleDecoratorArguments = moduleDecorator.getArguments()[0];
    const importsArgument = moduleDecoratorArguments.getProperty(propertyName);
    const importsArray = importsArgument.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression);

    for (const [index, value] of importsArray.getElements().entries())
    {
        if (value.getText() === valueName)
        {
            importsArray.removeElement(index);
            break;
        }
    }
};

exports.changeDecoratorPropertyAdapter = (sourceFile, moduleName, propertyName, provide, adapter) =>
{
    const moduleClass = sourceFile.getClass(moduleName);
    const moduleDecorator = moduleClass.getDecorator('NgModule');
    const moduleDecoratorArguments = moduleDecorator.getArguments()[0];
    const decoratorProperty = moduleDecoratorArguments.getProperty(propertyName);
    const decoratorArrayProperty = decoratorProperty.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression);

    for (const [index, value] of decoratorArrayProperty.getElements().entries())
    {
        // const object = value.getInitializer();
        if (value instanceof tsMorph.ObjectLiteralExpression)
        {
            const properties = value.getProperties();
            let isProvideWanted = false;
            for (const property of properties)
            {
                if (property.getName() === 'provide' && property.getInitializer().getText() === provide)
                {
                    isProvideWanted = true;
                }
                if (isProvideWanted && property.getName() === 'useClass')
                {
                    property.setInitializer(adapter);
                    break;
                }
            }
        }
    }
};

exports.removeItemsFromObjectArrayAccordPropertyValue = (arrayToManage, propertyName, valuesToDelete) =>
{
    for (const [index, value] of arrayToManage.getElements().entries())
    {
        const valueName = value.getPropertyOrThrow(propertyName)
            .getInitializerIfKindOrThrow(ts.SyntaxKind.StringLiteral)
            .getText();

        if (valuesToDelete.includes(valueName.replaceAll('\'', '')))
        {
            arrayToManage.removeElement(index);
            this.removeItemsFromObjectArrayAccordPropertyValue(arrayToManage, propertyName, valuesToDelete);
            break;
        }
    }
};

exports.removeArrayItemsAccordValue = (arrayToManage, valuesToDelete) =>
{
    for (const [index, value] of arrayToManage.getElements().entries())
    {
        const valueName = value.getText();

        if (valuesToDelete.includes(valueName.replaceAll('\'', '')))
        {
            arrayToManage.removeElement(index);
            this.removeArrayItemsAccordValue(arrayToManage, valuesToDelete);
            break;
        }
    }
};

exports.addDecoratorPropertyAdapter = (sourceFile, moduleName, propertyName, item) =>
{
    const moduleClass = sourceFile.getClass(moduleName);
    const moduleDecorator = moduleClass.getDecorator('NgModule');
    const moduleDecoratorArguments = moduleDecorator.getArguments()[0];
    const decoratorProperty = moduleDecoratorArguments.getProperty(propertyName);
    const decoratorArrayProperty = decoratorProperty.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression);
    this.addArrayItem(decoratorArrayProperty, item);
};

exports.addArrayItem = (arrayToManage, item, finder) =>
{
    if (!this.isDuplicateArrayValue(arrayToManage, item, finder))
    {
        arrayToManage?.addElement(item, { useNewLines: true });
    }
};

exports.isDuplicateArrayValue = (arrayToManage, item, finder) =>
{
    // format string to avoid break spaces and extra white spaces
    const arrayItems = arrayToManage?.getElements().map(i => i.getText()).map(j => j.replace(/(\r\n|\n|\r|\s)/gm, ''));

    if (finder) return finder(item, arrayToManage);

    if (Array.isArray(arrayItems)) return arrayItems.includes(item.replace(/(\r\n|\n|\r|\s)/gm, ''));

    return false;
};

exports.removeObjectProperty = (sourceFile, variableInitializer, propertyName) =>
{
    const environmentVariable = sourceFile.getVariableDeclarationOrThrow(variableInitializer);
    const navigationObject = environmentVariable.getInitializerIfKindOrThrow(ts.SyntaxKind.ObjectLiteralExpression);
    const property = navigationObject.getProperty(propertyName);
    if (property) property.remove();
};