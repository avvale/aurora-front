import { EnvironmentProviders, inject, provideAppInitializer, Provider } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AuroraGridManagerService, AuthenticationAuroraAdapterService, AuthenticationDisabledAdapterGuard, AuthenticationMockAdapterService, AuthenticationService, AuthorizationDisabledService, AuthorizationService, COMPACT_NAVIGATION, compactNavigation, DatePickerDayjsAdapter, DatePickerDayjsFormats, DateTimePickerDayjsAdapter, DatetimePickerDayjsFormats, DEFAULT_NAVIGATION, defaultNavigation, EnvironmentsInformationMockAdapterService, EnvironmentsInformationService, FUTURISTIC_NAVIGATION, futuristicNavigation, GridManagerService, HORIZONTAL_NAVIGATION, horizontalNavigation, IamAuroraAdapterService, IamMockAdapterService, IamService, InitializerService, PaginatorIntlService, provideApollo, provideApolloErrorTranslations, provideCustomIcons, provideValidationMessages, SessionLocalStorageService, SessionService, UserMetaStorageLocalStorageAdapterService, UserMetaStorageService } from '@aurora';
import '@aurora/aurora.prototypes';
import { DatetimeAdapter, MTX_DATETIME_FORMATS } from '@ng-matero/extensions/core';
import { UserMetaStorageIamAdapterService } from 'app/modules/admin/apps/iam';

export const provideAurora = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        provideApollo(),
        provideValidationMessages(),
        provideApolloErrorTranslations(),
        provideCustomIcons(),
        provideAppInitializer(() => inject(InitializerService).bootstrapInitializer()),
        {
            provide : MatPaginatorIntl,
            useClass: PaginatorIntlService,
        },
        {
            provide : AuthenticationService,
            useClass: AuthenticationAuroraAdapterService,
        },
        {
            provide : UserMetaStorageService,
            useClass: UserMetaStorageIamAdapterService,
        },
        {
            provide : SessionService,
            useClass: SessionLocalStorageService,
        },
        {
            provide : IamService,
            useClass: IamAuroraAdapterService,
        },
        {
            provide : GridManagerService,
            useClass: AuroraGridManagerService,
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
        {
            provide : DateAdapter,
            useClass: DatePickerDayjsAdapter,
            deps    : [MAT_DATE_LOCALE],
        },
        {
            provide : MAT_DATE_FORMATS,
            useValue: DatePickerDayjsFormats,
        },
        {
            provide : DatetimeAdapter,
            useClass: DateTimePickerDayjsAdapter,
        },
        {
            provide : MTX_DATETIME_FORMATS,
            useValue: DatetimePickerDayjsFormats,
        },
    ];
};
