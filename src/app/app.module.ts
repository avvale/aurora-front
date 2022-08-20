import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouteReuseStrategy, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { AuroraModule, LangService, JsonLangService, RouteReuseStrategyService, UserDataStorageService, SessionService, SessionLocalStorageService, IamService, IamAuroraAdapterService, COMPACT_NAVIGATION, DEFAULT_NAVIGATION, FUTURISTIC_NAVIGATION, HORIZONTAL_NAVIGATION } from '@aurora';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { UserDataStorageLocalStorageService } from '@aurora/components/user-data-storage/user-data-storage-local-storage-adapter.service';
import { IamMockAdapterService } from '@aurora/modules/iam/iam-mock-adapter.service';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from './core/navigation/default-navigation';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // Aurora front module
        AuroraModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
    ],
    providers: [
        {
            provide    : LangService,
            useExisting: JsonLangService,
        },
        {
            provide : RouteReuseStrategy,
            useClass: RouteReuseStrategyService,
        },
        {
            provide : UserDataStorageService,
            useClass: UserDataStorageLocalStorageService,
        },
        {
            provide : SessionService,
            useClass: SessionLocalStorageService,
        },
        {
            provide : IamService,
            useClass: IamMockAdapterService,
        },
        {
            provide : COMPACT_NAVIGATION,
            useValue: compactNavigation,
        },
        {
            provide : DEFAULT_NAVIGATION,
            useValue: defaultNavigation,
        },
        {
            provide : FUTURISTIC_NAVIGATION,
            useValue: futuristicNavigation,
        },
        {
            provide : HORIZONTAL_NAVIGATION,
            useValue: horizontalNavigation,
        },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule
{
}
