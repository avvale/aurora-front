/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const fse = require('fs-extra');
const { src, dest, series } = require('gulp');
const jeditor = require('gulp-json-editor');
const codeWriter = require('./helpers/code-writer');
const ts = require('typescript');

/**
 * Copy application files to publish folder
 */
function copyApplication()
{
    // by default don't copy hidden files
    return src(
        [
            '**/*',
            '**/.gitkeep',
            '.editorconfig',
            '.eslintrc.json',
            '.gitignore',
            '.npmrc',
            '.nvmrc',
            '!cliter/**',
            '!dist/**',
            '!gulp/**',
            '!node_modules/**',
            '!src/app/modules/admin/apps/auditing/**',
            '!src/app/modules/admin/apps/iam/**',
            '!src/app/modules/admin/apps/o-auth/**',
            '!src/assets/i18n/auditing/**',
            '!src/assets/i18n/iam/**',
            '!src/assets/i18n/o-auth/**',
            '!src/index.ts',
            '!gulpfile.js',
            '!package.json',
            '!package-lock.json',
        ])
        .pipe(
            dest('publish/'),
        );
}

/**
 * Clean dependencies that will not used in application
 */
function editPackageJson()
{
    return src(
        [
            'package.json',
        ])
        .pipe(
            jeditor(function(json)
            {
                delete json.devDependencies['fs-extra'];
                delete json.devDependencies.gulp;
                delete json.devDependencies['gulp-json-editor'];
                delete json.devDependencies['ts-morph'];

                return json;
            }),
        )
        .pipe(
            dest('publish'),
        );
}

async function cleanAppRouting()
{
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, ['publish', 'src', 'app', 'app.routing.ts']);

    const appRoutes = sourceFile.getVariableDeclarationOrThrow('appRoutes');
    const appRoutesArray = appRoutes.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression);
    const objectRoute = appRoutesArray.getElements()[5];
    const childrenRoutes = objectRoute.getPropertyOrThrow('children');
    const childrenRoutesArray = childrenRoutes?.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression);

    codeWriter.removeItemsFromObjectArrayAccordPropertyValue(childrenRoutesArray, 'path', ['auditing', 'iam', 'o-auth']);

    sourceFile.saveSync();
}

async function cleanAdminNavigation()
{
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, ['publish', 'src', 'app', 'modules', 'admin', 'admin.navigation.ts']);

    codeWriter.removeImport(sourceFile, './apps/o-auth/o-auth.navigation');
    codeWriter.removeImport(sourceFile, './apps/iam/iam.navigation');
    codeWriter.removeImport(sourceFile, './apps/auditing/auditing.navigation');

    const adminNavigation = sourceFile.getVariableDeclarationOrThrow('adminNavigation');
    const adminNavigationArray = adminNavigation.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression);

    codeWriter.removeItemsArrayAccordValue(adminNavigationArray, [
        'oAuthNavigation',
        'iamNavigation',
        'auditingNavigation',
    ]);

    sourceFile.saveSync();
}

async function cleanAppModule()
{
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, ['publish', 'src', 'app', 'app.module.ts']);

    // remove UserMetaStorageIamService
    codeWriter.removeImport(sourceFile, './modules/admin/apps/iam/user-meta/user-meta-storage-iam-adapter.service');
    codeWriter.changeDecoratorPropertyAdapter(sourceFile, 'AppModule', 'providers', 'UserMetaStorageService', 'UserMetaStorageLocalStorageAdapterService');

    sourceFile.saveSync();
}

function copyToCLI()
{
    // remove old cli application files
    fs.rmSync('../aurora-cli/src/templates/front/application', { recursive: true, force: true });
    // copy new cli application files
    return fse.copy('publish', '../aurora-cli/src/templates/front/application', { overwrite: true });
}

async function clean()
{
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishApplication = series(
    copyApplication,
    editPackageJson,
    cleanAppRouting,
    cleanAdminNavigation,
    cleanAppModule,
    copyToCLI,
    clean,
);