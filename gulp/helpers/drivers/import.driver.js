'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ImportDriver = void 0;
class ImportDriver {
    /**
     * Create import in file
     *
     * @param sourceFile
     * @param path
     * @param items
     * @return void
     */
    static createImportItems(sourceFile, path, items) {
        const itemsToImport = ImportDriver.getUniqueImportItems(
            sourceFile,
            items,
        );
        const importPaths = ImportDriver.getImportPaths(sourceFile);
        // there is nothing to import
        if (itemsToImport.length === 0) return;
        // if exist path add item to import
        if (importPaths.includes(path)) {
            // check this import not exist yet
            const importElement = sourceFile.getImportDeclaration(path);
            const itemsToImportChecked = [];
            for (const itemToImport of itemsToImport) {
                let existItem = false;
                for (const importedElement of (
                    importElement === null || importElement === void 0
                        ? void 0
                        : importElement.getNamedImports()
                )
                    ? importElement === null || importElement === void 0
                        ? void 0
                        : importElement.getNamedImports()
                    : []) {
                    if (importedElement.getName() === itemToImport)
                        existItem = true;
                }
                if (!existItem) itemsToImportChecked.push(itemToImport);
            }
            // add import after check that is not repeated
            if (itemsToImportChecked.length > 0)
                importElement === null || importElement === void 0
                    ? void 0
                    : importElement.addNamedImports(itemsToImportChecked);
        }
        // create new import
        else {
            sourceFile.addImportDeclaration({
                namedImports: itemsToImport,
                moduleSpecifier: path,
            });
        }
    }
    /**
     * From the items array, only non-repeating items are returned.
     *
     * @param sourceFile
     * @param moduleNames
     * @return string[]
     */
    static getUniqueImportItems(sourceFile, items) {
        // get import to avoid duplicities
        const imports = sourceFile.getImportDeclarations();
        // get names imported
        const itemsImported = new Set(
            imports.flatMap((i) => i.getNamedImports().map((j) => j.getName())),
        );
        // filter only items where is not imported
        return items.filter((item) => !itemsImported.has(item));
    }
    /**
     * Return import paths from source
     *
     * @param sourceFile
     * @return string[]
     */
    static getImportPaths(sourceFile) {
        const imports = sourceFile.getImportDeclarations();
        const paths = [];
        for (const importObj of imports) {
            paths.push(importObj.getModuleSpecifier().getLiteralValue());
        }
        return paths;
    }
    /**
     * Return import items from source
     *
     * @param sourceFile
     * @return string[]
     */
    static getImportedDeclarations(sourceFile) {
        const imports = sourceFile.getImportDeclarations();
        let declarations = [];
        for (const importObj of imports) {
            declarations = [
                ...declarations,
                ...importObj.getNamedImports().map((i) => i.getName()),
            ];
        }
        return declarations;
    }
    static hasImportDeclarations(sourceFile, declaration) {
        const importedDeclarations =
            ImportDriver.getImportedDeclarations(sourceFile);
        return importedDeclarations.includes(declaration);
    }
}
exports.ImportDriver = ImportDriver;
