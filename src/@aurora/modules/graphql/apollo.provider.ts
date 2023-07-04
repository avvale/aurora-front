import { EnvironmentProviders, Provider, importProvidersFrom } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoService } from '@ngneat/transloco';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { apolloFactory } from './apollo.factory';

export const provideApollo = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        importProvidersFrom(ApolloModule),
        {
            provide   : APOLLO_OPTIONS,
            useFactory: apolloFactory,
            deps      : [
                HttpLink,
                AuthenticationService,
                FuseConfirmationService,
                TranslocoService,
            ],
        },
    ];
};
