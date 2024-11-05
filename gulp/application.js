/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const { src, dest, series } = require('gulp');
const codeWriter = require('./helpers/code-writer');
const cp = require('node:child_process');
const fs = require('node:fs');
const fse = require('fs-extra');
const jeditor = require('gulp-json-editor');
const path = require('node:path');
const ts = require('typescript');

function cleanSourceDirectory(cb) {
    cp.exec('find . -name ".DS_Store" -delete', () => cb());
}

/**
 * Copy application files to publish folder
 */
function copyApplication()
{
    // by default don't copy hidden files
    return src([
        '**/*',
        '**/.gitkeep',
        '.editorconfig',
        '.gitignore',
        '.npmrc',
        '.nvmrc',
        '.prettierrc',
        '!cliter/**',
        '!dist/**',
        '!gulp/**',
        '!node_modules/**',
        '!node_modules/**/.gitkeep',
        '!src/app/modules/admin/apps/auditing/**',
        '!src/app/modules/admin/apps/common/**',
        '!src/app/modules/admin/apps/iam/**',
        '!src/app/modules/admin/apps/o-auth/**',
        '!src/app/modules/admin/apps/queue-manager/**',
        '!src/app/modules/admin/apps/search-engine/**',
        '!src/app/modules/admin/apps/message/**',
        '!src/app/modules/admin/apps/settings/**',
        '!src/app/modules/admin/kitchen-sink/**',
        '!src/app/modules/azure-ad/**',
        '!public/i18n/auditing/**',
        '!public/i18n/common/**',
        '!public/i18n/iam/**',
        '!public/i18n/o-auth/**',
        '!public/i18n/queue-manager/**',
        '!public/i18n/search-engine/**',
        '!public/i18n/message/**',
        '!public/i18n/settings/**',
        '!public/i18n/kitchen-sink/**',
        '!src/index.ts',
        '!gulpfile.js',
        '!package.json',
        '!package-lock.json',
    ]).pipe(dest('publish/'));
}

/**
 * Clean dependencies that will not used in application
 */
function editPackageJson()
{
    return src(['package.json'])
        .pipe(
            jeditor(function (json) {
                // delete json.dependencies['@angular-material-extensions/password-strength'];
                delete json.dependencies['@azure/msal-angular'];
                delete json.dependencies['@azure/msal-browser'];

                delete json.devDependencies['fs-extra'];
                delete json.devDependencies['gulp'];
                delete json.devDependencies['gulp-json-editor'];
                delete json.devDependencies['ts-morph'];

                return json;
            })
        )
        .pipe(dest('publish'));
}

async function cleanAppRoutes()
{
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, [
        'publish',
        'src',
        'app',
        'app.routes.ts',
    ]);

    const appRoutes = sourceFile.getVariableDeclarationOrThrow('appRoutes');
    const appRoutesArray = appRoutes.getInitializerIfKindOrThrow(
        ts.SyntaxKind.ArrayLiteralExpression
    );
    const objectRoute = appRoutesArray.getElements()[5]; // Admin routes
    const childrenRoutes = objectRoute.getPropertyOrThrow('children');
    const childrenRoutesArray = childrenRoutes?.getInitializerIfKindOrThrow(
        ts.SyntaxKind.ArrayLiteralExpression
    );

    codeWriter.removeItemsFromObjectArrayAccordPropertyValue(
        childrenRoutesArray,
        'path',
        [
            'auditing',
            'common',
            'iam',
            'o-auth',
            'queue-manager',
            'search-engine',
            'message',
            'kitchen-sink',
            'settings',
        ]
    );

    sourceFile.saveSync();
}

async function cleanAdminNavigation()
{
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, [
        'publish',
        'src',
        'app',
        'modules',
        'admin',
        'admin.navigation.ts',
    ]);

    codeWriter.removeImport(sourceFile, './apps/auditing/auditing.navigation');
    codeWriter.removeImport(sourceFile, './apps/common/common.navigation');
    codeWriter.removeImport(sourceFile, './apps/iam/iam.navigation');
    codeWriter.removeImport(sourceFile, './apps/o-auth/o-auth.navigation');
    codeWriter.removeImport(
        sourceFile,
        './apps/queue-manager/queue-manager.navigation'
    );
    codeWriter.removeImport(
        sourceFile,
        './apps/search-engine/search-engine.navigation'
    );
    codeWriter.removeImport(sourceFile, './apps/message/message.navigation');
    codeWriter.removeImport(
        sourceFile,
        './kitchen-sink/kitchen-sink.navigation'
    );

    const adminNavigation =
        sourceFile.getVariableDeclarationOrThrow('adminNavigation');
    const adminNavigationArray = adminNavigation.getInitializerIfKindOrThrow(
        ts.SyntaxKind.ArrayLiteralExpression
    );

    codeWriter.removeArrayItemsAccordValue(adminNavigationArray, [
        'auditingNavigation',
        'commonNavigation',
        'iamNavigation',
        'oAuthNavigation',
        'queueManagerNavigation',
        'searchEngineNavigation',
        'kitchenSinkNavigation',
        'messageNavigation',
    ]);

    sourceFile.saveSync();
}

async function cleanAppResolvers() {
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, [
        'publish',
        'src',
        'app',
        'app.resolvers.ts',
    ]);

    codeWriter.removeImport(sourceFile, '@apps/message/inbox');

    // delete const inboxService = inject(InboxService);
    const variableThatContainsAnonymousFunction =
        sourceFile.getVariableDeclarationOrThrow('initialDataResolver');
    const anonymousFunction =
        variableThatContainsAnonymousFunction.getInitializerIfKindOrThrow(
            ts.SyntaxKind.ArrowFunction
        );
    const variableToDelete =
        anonymousFunction.getVariableDeclarationOrThrow('inboxService');
    variableToDelete.remove();

    // delete inboxService.checkMessagesInbox(), from forkJoin
    const forkJoinCall = anonymousFunction
        .getDescendantStatements()
        .find((statement) =>
            statement.getText().startsWith('return forkJoin([')
        );
    const argumentsForkJoinArray = forkJoinCall
        .getChildrenOfKind(ts.SyntaxKind.CallExpression)[0]
        .getArguments()[0];
    for (const argument of argumentsForkJoinArray.getElements()) {
        if (argument.getText().includes('inboxService.checkMessagesInbox()')) {
            argumentsForkJoinArray.removeElement(argument);
        }
    }

    sourceFile.saveSync();
}

async function cleanClassyComponent() {
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, [
        'publish',
        'src',
        'app',
        'layout',
        'layouts',
        'vertical',
        'classy',
        'classy.component.ts',
    ]);

    codeWriter.removeImport(sourceFile, '@apps/message');
    codeWriter.removeDecoratorProperty(
        sourceFile,
        'ClassyLayoutComponent',
        'Component',
        'imports',
        'MessageQuickViewComponent'
    );

    sourceFile.saveSync();
}

async function cleanClassyTemplate() {
    let html = fs.readFileSync(
        path.join(
            'publish',
            'src',
            'app',
            'layout',
            'layouts',
            'vertical',
            'classy',
            'classy.component.html'
        ),
        'utf8'
    );
    const tag = 'au-message-quick-view';
    const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, 'gs');
    html = html.replace(regex, '');
    fs.writeFileSync(
        path.join(
            'publish',
            'src',
            'app',
            'layout',
            'layouts',
            'vertical',
            'classy',
            'classy.component.html'
        ),
        html
    );
}

async function cleanUserComponent() {
    let html = fs.readFileSync(
        path.join(
            'publish',
            'src',
            'app',
            'layout',
            'common',
            'user',
            'user.component.html'
        ),
        'utf8'
    );
    const regex =
        /<button\s+mat-menu-item\s+\[routerLink\]="\['settings', 'account'\]"\s*>\s*<mat-icon svgIcon="heroicons_outline:cog-8-tooth"><\/mat-icon>\s*<span>{{ t\('Settings'\) }}<\/span>\s*<\/button>/gi;
    html = html.replace(regex, '');
    fs.writeFileSync(
        path.join(
            'publish',
            'src',
            'app',
            'layout',
            'common',
            'user',
            'user.component.html'
        ),
        html
    );
}

async function cleanAuroraProvider() {
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);
    const sourceFile = codeWriter.createSourceFile(project, [
        'publish',
        'src',
        'app',
        'aurora.provider.ts',
    ]);

    // get provideAurora return array
    const provideAurora =
        sourceFile.getVariableDeclarationOrThrow('provideAurora');
    const provideAuroraFunction = provideAurora.getInitializerIfKindOrThrow(
        ts.SyntaxKind.ArrowFunction
    );
    const returnFunction = provideAuroraFunction.getDescendantsOfKind(
        ts.SyntaxKind.ReturnStatement
    )[0];
    const returnArray = returnFunction.getDescendantsOfKind(
        ts.SyntaxKind.ArrayLiteralExpression
    )[0];

    // change source of UserMetaStorageService
    codeWriter.removeImport(sourceFile, 'app/modules/admin/apps/iam');
    codeWriter.changeProviderArray(
        returnArray,
        'UserMetaStorageService',
        'UserMetaStorageLocalStorageAdapterService'
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

    // remove Azure AuthorizationService
    codeWriter.removeImport(
        sourceFile,
        './modules/azure-ad/authorization-azure-ad-adapter.service'
    );
    codeWriter.deleteProviderArray(returnArray, 'AuthorizationService');

    // remove Azure AuthenticationService
    codeWriter.removeImport(
        sourceFile,
        './modules/azure-ad/authentication-azure-ad-adapter.service'
    );

    codeWriter.changeProviderArray(
        returnArray,
        'AuthenticationService',
        'AuthenticationMockAdapterService'
    );

    // change IamService
    codeWriter.removeImport(
        sourceFile,
        './modules/azure-ad/iam-azure-ad-adapter.service'
    );
    codeWriter.changeProviderArray(
        returnArray,
        'IamService',
        'IamMockAdapterService'
    );

    // add EnvironmentsInformationMockAdapterService to disable environment information service
    // EnvironmentsInformationService has implementation
    codeWriter.addArrayItem(
        returnArray,
        `
{
    provide : EnvironmentsInformationService,
    useClass: EnvironmentsInformationMockAdapterService
}`
    );

    // add AuthenticationDisabledAdapterGuard to disable AuthGuard
    // AuthGuard has implementation
    codeWriter.addArrayItem(
        returnArray,
        `
{
    provide : AuthGuard,
    useClass: AuthenticationDisabledAdapterGuard
}`
    );

    // add AuthenticationDisabledAdapterGuard to disable AuthGuard
    // AuthGuard has implementation
    codeWriter.addArrayItem(
        returnArray,
        `
{
    provide : AuthorizationService,
    useClass: AuthorizationDisabledService
}`
    );

    sourceFile.saveSync();
}

async function cleanEnvironments() {
    const project = codeWriter.createProject(['publish', 'tsconfig.json']);

    const environmentFile = codeWriter.createSourceFile(project, [
        'publish',
        'src',
        'environments',
        'environment.ts',
    ]);
    codeWriter.removeObjectProperty(environmentFile, 'environment', 'azureAd');
    environmentFile.saveSync();

    const environmentProdFile = codeWriter.createSourceFile(project, [
        'publish',
        'src',
        'environments',
        'environment.prod.ts',
    ]);
    codeWriter.removeObjectProperty(
        environmentProdFile,
        'environment',
        'azureAd'
    );
    environmentProdFile.saveSync();

    const environmentLocalFile = codeWriter.createSourceFile(project, [
        'publish',
        'src',
        'environments',
        'environment.local.ts',
    ]);
    codeWriter.removeObjectProperty(
        environmentLocalFile,
        'environment',
        'azureAd'
    );
    environmentLocalFile.saveSync();

    const environmentDevFile = codeWriter.createSourceFile(project, [
        'publish',
        'src',
        'environments',
        'environment.dev.ts',
    ]);
    codeWriter.removeObjectProperty(
        environmentDevFile,
        'environment',
        'azureAd'
    );
    environmentDevFile.saveSync();
}

function copyToCLI()
{
    // remove old cli application files
    fs.rmSync('../aurora-cli/src/templates/front/application', {
        recursive: true,
        force: true,
    });

    // copy new cli application files
    return fse.copy(
        'publish',
        '../aurora-cli/src/templates/front/application',
        { overwrite: true }
    );
}

async function clean() {
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishApplication = series(
    cleanSourceDirectory,
    copyApplication,
    editPackageJson,
    cleanAppRoutes,
    cleanAdminNavigation,
    cleanAppResolvers,
    cleanClassyComponent,
    cleanClassyTemplate,
    cleanUserComponent,
    cleanAuroraProvider,
    cleanEnvironments,
    copyToCLI,
    clean
);
