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
            '!src/app/modules/admin/apps/search-engine/**',
            '!src/app/modules/admin/kitchen-sink/**',
            '!src/app/modules/azure-ad/**',
            '!src/assets/i18n/auditing/**',
            '!src/assets/i18n/common/**',
            '!src/assets/i18n/iam/**',
            '!src/assets/i18n/o-auth/**',
            '!src/assets/i18n/queue-manager/**',
            '!src/assets/i18n/search-engine/**',
            '!src/assets/i18n/kitchen-sink/**',
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

async function cleanAppRoutes()
{
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, ['publish', 'src', 'app', 'app.routes.ts']);

    const appRoutes = sourceFile.getVariableDeclarationOrThrow('appRoutes');
    const appRoutesArray = appRoutes.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression);
    const objectRoute = appRoutesArray.getElements()[5]; // Admin routes
    const childrenRoutes = objectRoute.getPropertyOrThrow('children');
    const childrenRoutesArray = childrenRoutes?.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression);

    codeWriter.removeItemsFromObjectArrayAccordPropertyValue(childrenRoutesArray, 'path', [
        'auditing',
        'common',
        'iam',
        'o-auth',
        'queue-manager',
        'search-engine',
        'kitchen-sink',
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
    codeWriter.removeImport(sourceFile, './apps/search-engine/search-engine.navigation');
    codeWriter.removeImport(sourceFile, './kitchen-sink/kitchen-sink.navigation');

    const adminNavigation = sourceFile.getVariableDeclarationOrThrow('adminNavigation');
    const adminNavigationArray = adminNavigation.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression);

    codeWriter.removeArrayItemsAccordValue(adminNavigationArray, [
        'auditingNavigation',
        'commonNavigation',
        'iamNavigation',
        'oAuthNavigation',
        'queueManagerNavigation',
        'searchEngineNavigation',
        'kitchenSinkNavigation',
    ]);

    sourceFile.saveSync();
}

async function cleanAppModule()
{
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, ['publish', 'src', '@aurora', 'aurora.provider.ts']);

    // get provideAurora return array
    const provideAurora = sourceFile.getVariableDeclarationOrThrow('provideAurora');
    const provideAuroraFunction = provideAurora.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrowFunction);
    const returnFunction = provideAuroraFunction.getDescendantsOfKind(ts.SyntaxKind.ReturnStatement)[0];
    const returnArray = returnFunction.getDescendantsOfKind(ts.SyntaxKind.ArrayLiteralExpression)[0];

    // change source of UserMetaStorageService
    codeWriter.removeImport(sourceFile, 'app/modules/admin/apps/iam');
    codeWriter.changeProviderArray(
        returnArray,
        'UserMetaStorageService',
        'UserMetaStorageLocalStorageAdapterService',
    );

    // remove AzureModule
    codeWriter.removeImport(sourceFile, './modules/azure-ad/azure-ad.module');
    /* codeWriter.deleteProviderArray(
        returnArray,
        'AzureAdModule',
    ); */

    // remove MsalGuard
    codeWriter.removeImport(sourceFile, '@azure/msal-angular');
    /* codeWriter.deleteProviderArray(
        returnArray,
        'AuthGuard',
    ); */

    // remove AuthorizationService
    codeWriter.removeImport(sourceFile, './modules/azure-ad/authorization-azure-ad-adapter.service');
    codeWriter.deleteProviderArray(
        returnArray,
        'AuthorizationService',
    );

    // change AuthenticationService
    codeWriter.removeImport(sourceFile, './modules/azure-ad/authentication-azure-ad-adapter.service');
    codeWriter.changeProviderArray(
        returnArray,
        'AuthenticationService',
        'AuthenticationMockAdapterService',
    );

    // change IamService
    codeWriter.removeImport(sourceFile, './modules/azure-ad/iam-azure-ad-adapter.service');
    codeWriter.changeProviderArray(
        returnArray,
        'IamService',
        'IamMockAdapterService',
    );

    // add EnvironmentsInformationMockAdapterService to disable environment information service
    // EnvironmentsInformationService has implementation
    codeWriter.addArrayItem(
        returnArray,
        `
{
    provide : EnvironmentsInformationService,
    useClass: EnvironmentsInformationMockAdapterService
}`,
    );

    // add AuthenticationDisabledAdapterGuard to disable AuthGuard
    // AuthGuard has implementation
    codeWriter.addArrayItem(
        returnArray,
        `
{
    provide : AuthGuard,
    useClass: AuthenticationDisabledAdapterGuard
}`,
    );

    // add AuthenticationDisabledAdapterGuard to disable AuthGuard
    // AuthGuard has implementation
    codeWriter.addArrayItem(
        returnArray,
        `
{
    provide : AuthorizationService,
    useClass: AuthorizationDisabledService
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
    cleanAppRoutes,
    cleanAdminNavigation,
    cleanAppModule,
    cleanEnvironments,
    copyToCLI,
    clean,
);