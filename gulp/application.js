/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const cp = require('node:child_process');
const fse = require('fs-extra');
const { src, dest, series } = require('gulp');
const jeditor = require('gulp-json-editor');
const codeWriter = require('./helpers/code-writer');
const ts = require('typescript');

function cleanSourceDirectory(cb)
{
    cp.exec('find . -name ".DS_Store" -delete', () => cb());
}

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
            '!src/app/modules/admin/apps/common/**',
            '!src/app/modules/admin/apps/iam/**',
            '!src/app/modules/admin/apps/o-auth/**',
            '!src/app/modules/admin/apps/queue-manager/**',
            '!src/app/modules/azure-ad/**',
            '!src/assets/i18n/auditing/**',
            '!src/assets/i18n/common/**',
            '!src/assets/i18n/iam/**',
            '!src/assets/i18n/o-auth/**',
            '!src/assets/i18n/queue-manager/**',
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
                delete json.dependencies['@azure/msal-angular'];
                delete json.dependencies['@azure/msal-browser'];

                delete json.devDependencies['fs-extra'];
                delete json.devDependencies['gulp'];
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

    codeWriter.removeItemsFromObjectArrayAccordPropertyValue(childrenRoutesArray, 'path', [
        'auditing',
        'common',
        'iam',
        'o-auth',
        'queue-manager',
    ]);

    sourceFile.saveSync();
}

async function cleanAdminNavigation()
{
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, ['publish', 'src', 'app', 'modules', 'admin', 'admin.navigation.ts']);

    codeWriter.removeImport(sourceFile, './apps/auditing/auditing.navigation');
    codeWriter.removeImport(sourceFile, './apps/common/common.navigation');
    codeWriter.removeImport(sourceFile, './apps/iam/iam.navigation');
    codeWriter.removeImport(sourceFile, './apps/o-auth/o-auth.navigation');
    codeWriter.removeImport(sourceFile, './apps/queue-manager/queue-manager.navigation');

    const adminNavigation = sourceFile.getVariableDeclarationOrThrow('adminNavigation');
    const adminNavigationArray = adminNavigation.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression);

    codeWriter.removeArrayItemsAccordValue(adminNavigationArray, [
        'auditingNavigation',
        'commonNavigation',
        'iamNavigation',
        'oAuthNavigation',
        'queueManagerNavigation',
    ]);

    sourceFile.saveSync();
}

async function cleanAppModule()
{
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, ['publish', 'src', 'app', 'app.module.ts']);

    // remove UserMetaStorageIamService
    codeWriter.removeImport(sourceFile, './modules/admin/apps/iam/user-meta/user-meta-storage-iam-adapter.service');
    codeWriter.changeDecoratorPropertyAdapter(
        sourceFile,
        'AppModule',
        'providers',
        'UserMetaStorageService',
        'UserMetaStorageLocalStorageAdapterService',
    );

    // remove AzureModule
    codeWriter.removeImport(sourceFile, './modules/azure-ad/azure-ad.module');
    codeWriter.removeDecoratorProperty(
        sourceFile,
        'AppModule',
        'NgModule',
        'imports',
        'AzureAdModule',
    );

    // remove MsalGuard
    codeWriter.removeImport(sourceFile, '@azure/msal-angular');
    codeWriter.removeDecoratorPropertyAdapter(
        sourceFile,
        'AppModule',
        'NgModule',
        'providers',
        'AuthGuard',
    );

    // remove AuthorizationService
    codeWriter.removeImport(sourceFile, './modules/azure-ad/authorization-azure-ad-adapter.service');
    codeWriter.removeDecoratorPropertyAdapter(
        sourceFile,
        'AppModule',
        'NgModule',
        'providers',
        'AuthorizationService',
    );

    // change AuthenticationService
    codeWriter.removeImport(sourceFile, './modules/azure-ad/authentication-azure-ad-adapter.service');
    codeWriter.changeDecoratorPropertyAdapter(
        sourceFile,
        'AppModule',
        'providers',
        'AuthenticationService',
        'AuthenticationMockAdapterService',
    );

    // change IamService
    codeWriter.removeImport(sourceFile, './modules/azure-ad/iam-azure-ad-adapter.service');
    codeWriter.changeDecoratorPropertyAdapter(
        sourceFile,
        'AppModule',
        'providers',
        'IamService',
        'IamMockAdapterService',
    );

    // add EnvironmentsInformationMockAdapterService implementation
    codeWriter.addDecoratorPropertyAdapter(
        sourceFile,
        'AppModule',
        'providers',
        `
{
    provide : EnvironmentsInformationService,
    useClass: EnvironmentsInformationMockAdapterService
}`,
    );

    // add AuthenticationDisabledAdapterGuard implementation
    codeWriter.addDecoratorPropertyAdapter(
        sourceFile,
        'AppModule',
        'providers',
        `
{
    provide : AuthGuard,
    useClass: AuthenticationDisabledAdapterGuard
}`,
    );

    sourceFile.saveSync();
}

async function cleanEnvironments()
{
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);

    const environmentFile = codeWriter.createSourceFile(project, ['publish', 'src', 'environments', 'environment.ts']);
    codeWriter.removeObjectProperty(environmentFile, 'environment', 'azureAd');
    environmentFile.saveSync();

    const environmentProdFile = codeWriter.createSourceFile(project, ['publish', 'src', 'environments', 'environment.prod.ts']);
    codeWriter.removeObjectProperty(environmentProdFile, 'environment', 'azureAd');
    environmentProdFile.saveSync();

    const environmentLocalFile = codeWriter.createSourceFile(project, ['publish', 'src', 'environments', 'environment.local.ts']);
    codeWriter.removeObjectProperty(environmentLocalFile, 'environment', 'azureAd');
    environmentLocalFile.saveSync();

    const environmentDevFile = codeWriter.createSourceFile(project, ['publish', 'src', 'environments', 'environment.dev.ts']);
    codeWriter.removeObjectProperty(environmentDevFile, 'environment', 'azureAd');
    environmentDevFile.saveSync();
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
    cleanSourceDirectory,
    copyApplication,
    editPackageJson,
    cleanAppRouting,
    cleanAdminNavigation,
    cleanAppModule,
    cleanEnvironments,
    copyToCLI,
    clean,
);