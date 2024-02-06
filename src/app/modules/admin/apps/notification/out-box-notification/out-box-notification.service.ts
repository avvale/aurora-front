import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { IamTenant } from '@apps/iam/iam.types';
import { TenantService } from '@apps/iam/tenant';
import { NotificationCreateOutBoxNotification, NotificationOutBoxNotification, NotificationUpdateOutBoxNotificationById, NotificationUpdateOutBoxNotifications } from '@apps/notification/notification.types';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, getRelations, paginationQuery, updateByIdMutation, updateMutation } from '@apps/notification/out-box-notification';
import { ClientService } from '@apps/o-auth/client';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OutBoxNotificationService
{
    paginationSubject$: BehaviorSubject<GridData<NotificationOutBoxNotification> | null> = new BehaviorSubject(null);
    outBoxNotificationSubject$: BehaviorSubject<NotificationOutBoxNotification | null> = new BehaviorSubject(null);
    outBoxNotificationsSubject$: BehaviorSubject<NotificationOutBoxNotification[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly tenantService: TenantService,
        private readonly clientService: ClientService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<NotificationOutBoxNotification>>
    {
        return this.paginationSubject$.asObservable();
    }

    get outBoxNotification$(): Observable<NotificationOutBoxNotification>
    {
        return this.outBoxNotificationSubject$.asObservable();
    }

    get outBoxNotifications$(): Observable<NotificationOutBoxNotification[]>
    {
        return this.outBoxNotificationsSubject$.asObservable();
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<NotificationOutBoxNotification>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<NotificationOutBoxNotification>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: NotificationOutBoxNotification;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: NotificationOutBoxNotification;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.outBoxNotificationSubject$.next(data.object);
                }),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: NotificationOutBoxNotification;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: NotificationOutBoxNotification;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.outBoxNotificationSubject$.next(data.object);
                }),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        objects: NotificationOutBoxNotification[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: NotificationOutBoxNotification[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.outBoxNotificationsSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            queryTenants = {},
            constraintTenants = {},
            clientId = '',
            constraintClient = {},
            headers = {},
        }: {
            queryTenants?: QueryStatement;
            constraintTenants?: QueryStatement;
            clientId?: string;
            constraintClient?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        iamGetTenants: IamTenant[];
        oAuthFindClientById: OAuthClient;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                iamGetTenants: IamTenant[];
                oAuthFindClientById: OAuthClient;
            }>({
                query    : getRelations,
                variables: {
                    queryTenants,
                    constraintTenants,
                    clientId,
                    constraintClient,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.tenantService.tenantsSubject$.next(data.iamGetTenants);
                    this.clientService.clientSubject$.next(data.oAuthFindClientById);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: NotificationCreateOutBoxNotification;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: NotificationUpdateOutBoxNotificationById;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    update<T>(
        {
            graphqlStatement = updateMutation,
            object = null,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: NotificationUpdateOutBoxNotifications;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    deleteById<T>(
        {
            graphqlStatement = deleteByIdMutation,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }
}