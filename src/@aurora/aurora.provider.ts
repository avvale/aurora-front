import { APP_INITIALIZER, EnvironmentProviders, Provider } from '@angular/core';
import { AuthenticationAuroraAdapterService, AuthenticationService, BootstrapService, COMPACT_NAVIGATION, DEFAULT_NAVIGATION, FUTURISTIC_NAVIGATION, HORIZONTAL_NAVIGATION, IamAuroraAdapterService, IamService, SessionLocalStorageService, SessionService, UserMetaStorageLocalStorageAdapterService, UserMetaStorageService, compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation, provideApollo } from '@aurora';

import './prototypes/string-to-camel-case.interface';
import './prototypes/string-to-camel-case';
import './prototypes/string-to-kebab-case.interface';
import './prototypes/string-to-kebab-case';
import './prototypes/string-to-pascal-case.interface';
import './prototypes/string-to-pascal-case';
import './prototypes/string-to-snake-case.interface';
import './prototypes/string-to-snake-case';

import { UserMetaStorageIamAdapterService } from 'app/modules/admin/apps/iam';

export const provideAurora = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        provideApollo(),
        {
            provide   : APP_INITIALIZER,
            useFactory: (bootstrapService: BootstrapService): () => void => () => bootstrapService.init(),
            deps      : [BootstrapService],
            multi     : true,
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
    ];
};
