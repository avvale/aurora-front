import { Injectable, inject } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { IamTag, IamTenant } from '@apps/iam';
import { TagService } from '@apps/iam/tag';
import { TenantService } from '@apps/iam/tenant';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, getRelations, paginationQuery, updateByIdMutation, updateMutation } from '@apps/message/message';
import { MessageCreateMessage, MessageMessage, MessageUpdateMessageById, MessageUpdateMessages } from '@apps/message/message.types';
import { ClientService } from '@apps/o-auth/client';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MessageService
{
    paginationSubject$: BehaviorSubject<GridData<MessageMessage> | null> = new BehaviorSubject(null);
    messageSubject$: BehaviorSubject<MessageMessage | null> = new BehaviorSubject(null);
    messagesSubject$: BehaviorSubject<MessageMessage[] | null> = new BehaviorSubject(null);

    private tagService = inject(TagService);
    private tenantService = inject(TenantService);
    private clientService = inject(ClientService);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<MessageMessage>>
    {
        return this.paginationSubject$.asObservable();
    }

    get message$(): Observable<MessageMessage>
    {
        return this.messageSubject$.asObservable();
    }

    get messages$(): Observable<MessageMessage[]>
    {
        return this.messagesSubject$.asObservable();
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
    ): Observable<GridData<MessageMessage>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<MessageMessage>; }>({
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
        object: MessageMessage;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: MessageMessage;
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
                    this.messageSubject$.next(data.object);
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
        object: MessageMessage;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: MessageMessage;
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
                    this.messageSubject$.next(data.object);
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
        objects: MessageMessage[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: MessageMessage[];
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
                    this.messagesSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            queryTags = {},
            constraintTags = {},
            queryTenants = {},
            constraintTenants = {},
            clientId = '',
            constraintClient = {},
            headers = {},
        }: {
            queryTags?: QueryStatement;
            constraintTags?: QueryStatement;
            queryTenants?: QueryStatement;
            constraintTenants?: QueryStatement;
            clientId?: string;
            constraintClient?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        iamGetTags: IamTag[];
        iamGetTenants: IamTenant[];
        oAuthFindClientById: OAuthClient;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                iamGetTags: IamTag[];
                iamGetTenants: IamTenant[];
                oAuthFindClientById: OAuthClient;
            }>({
                query    : getRelations,
                variables: {
                    queryTags,
                    constraintTags,
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
                    this.tagService.tagsSubject$.next(data.iamGetTags);
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
            object?: MessageCreateMessage;
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
            object?: MessageUpdateMessageById;
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
            object?: MessageUpdateMessages;
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
