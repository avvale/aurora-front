import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { log } from '@aurora/functions/log';
import { ApolloClientOptions, ApolloLink, DefaultOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { HttpLink } from 'apollo-angular/http/http-link';
import { environment } from 'environments/environment';
import { AuthService } from '../auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { extractGraphqlMessageErrors } from './graphql.functions';

export const apolloFactory = (
    httpLink: HttpLink,
    authService: AuthService,
    confirmationService: FuseConfirmationService,
): ApolloClientOptions<NormalizedCacheObject> =>
{
    const auth = setContext(async(operation, context) =>
    {
        // return basic authentication form login
        if (operation.operationName === 'oAuthCreateCredentials')
        {
            return {
                headers: {
                    Authorization: `Basic ${btoa(environment.oAuth.applicationCode + ':' + environment.oAuth.applicationSecret)}`,
                },
            };
        }

        // check access token, if is expired create other one with refresh token
        await lastValueFrom(authService.check());

        // return bearer token
        return {
            headers: {
                Authorization: `Bearer ${authService.accessToken}`,
            },
        };
    });

    // manage errors
    const error = onError(({ graphQLErrors, networkError, response, operation, forward }) =>
    {
        // graphql error
        if (graphQLErrors)
        {
            log(`[DEBUG] GraphQL Error: ${extractGraphqlMessageErrors(graphQLErrors)}`);

            const unauthorizedError = graphQLErrors.find(({ message, extensions }: { message: string; extensions: any; }) => extensions.response?.statusCode === 401);

            if (unauthorizedError)
            {
                authService.signOut();
                location.reload();
                return;
            }

            confirmationService.open({
                title  : 'Error',
                message: extractGraphqlMessageErrors(graphQLErrors),
                icon   : {
                    show : true,
                    name : 'error',
                    color: 'error',
                },
                actions: {
                    confirm: {
                        show : true,
                        label: 'Ok',
                        color: 'warn',
                    },
                    cancel: {
                        show: false,
                    },
                },
            });
        }

        // network error
        if (networkError)
        {
            log('[DEBUG] - network GraphQL error', networkError);

            switch (networkError['status'])
            {
                case 0:
                    // ver src/@horus/components/apollo/apollo.service.ts de horus cci
                    break;

                case 500:
                    // ver src/@horus/components/apollo/apollo.service.ts de horus cci
                    break;
            }
        }
    });


    const link = ApolloLink.from([auth, error, httpLink.create({ uri: environment.api.graphql })]);
    const cache = new InMemoryCache({
        addTypename: true,  // add __typename field in graphql types
    });

    // disabled cache
    const defaultOptions: DefaultOptions = {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    };

    return {
        link,
        cache,
        defaultOptions,
    };
};
