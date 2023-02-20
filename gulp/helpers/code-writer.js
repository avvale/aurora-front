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
    const moduleDecorator = moduleClass.getDecorator('Module');
    const moduleDecoratorArguments = moduleDecorator.getArguments()[0];
    const importsArgument = moduleDecoratorArguments.getProperty(propertyName);
    const importsArray = importsArgument.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression);

    for (const [index, value] of importsArray.getElements().entries())
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
