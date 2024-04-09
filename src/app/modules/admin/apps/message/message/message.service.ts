import { Injectable, inject } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { IamAccount, IamTag, IamTenant } from '@apps/iam';
import { AccountService } from '@apps/iam/account';
import { TagService } from '@apps/iam/tag';
import { TenantService } from '@apps/iam/tenant';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, getRelations, paginationQuery, removeAttachmentMessageMutation, updateByIdMutation, updateMutation } from '@apps/message/message';
import { MessageCreateMessage, MessageMessage, MessageUpdateMessageById, MessageUpdateMessages } from '@apps/message/message.types';
import { ClientService } from '@apps/o-auth/client';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { messageAccountsScopePagination } from './message-detail.component';

@Injectable({
    providedIn: 'root',
})
export class MessageService
{
    paginationSubject$: BehaviorSubject<GridData<MessageMessage> | null> = new BehaviorSubject(null);
    messageSubject$: BehaviorSubject<MessageMessage | null> = new BehaviorSubject(null);
    messagesSubject$: BehaviorSubject<MessageMessage[] | null> = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: { [key: string]: BehaviorSubject<GridData<MessageMessage> | null>; } = {};
    messageScoped: { [key: string]: BehaviorSubject<MessageMessage | null>; } = {};
    messagesScoped: { [key: string]: BehaviorSubject<MessageMessage[] | null>; } = {};

    private tagService = inject(TagService);
    private tenantService = inject(TenantService);
    private clientService = inject(ClientService);
    private accountService = inject(AccountService);

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

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(scope: string, pagination: GridData<MessageMessage>): void
    {
        if (this.paginationScoped[scope])
        {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(scope: string): Observable<GridData<MessageMessage>>
    {
        if (this.paginationScoped[scope]) return this.paginationScoped[scope].asObservable();
        return null;
    }

    setScopeMessage(scope: string, object: MessageMessage): void
    {
        if (this.messageScoped[scope])
        {
            this.messageScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.messageScoped[scope] = new BehaviorSubject(object);
    }

    getScopeMessage(scope: string): Observable<MessageMessage>
    {
        if (this.messageScoped[scope]) return this.messageScoped[scope].asObservable();
        return null;
    }

    setScopeMessages(scope: string, objects: MessageMessage[]): void
    {
        if (this.messagesScoped[scope])
        {
            this.messagesScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.messagesScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeMessages(scope: string): Observable<MessageMessage[]>
    {
        if (this.messagesScoped[scope]) return this.messagesScoped[scope].asObservable();
        return null;
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
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
                tap(pagination => scope ? this.setScopePagination(scope, pagination) : this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
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
                tap(data => scope ? this.setScopeMessage(scope, data.object) : this.messageSubject$.next(data.object)),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
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
                tap(data => scope ? this.setScopeMessage(scope, data.object) : this.messageSubject$.next(data.object)),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
            headers = {},
            scope,
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            scope?: string;
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
                tap(data => scope ? this.setScopeMessages(scope, data.objects) : this.messagesSubject$.next(data.objects)),
            );
    }

    getRelations(
        {
            queryTags = {},
            constraintTags = {},
            queryTenants = {},
            constraintTenants = {},
            queryPaginateAccounts = {},
            constraintPaginateAccounts = {},
            clientId = '',
            constraintClient = {},
            headers = {},
        }: {
            queryTags?: QueryStatement;
            constraintTags?: QueryStatement;
            queryTenants?: QueryStatement;
            constraintTenants?: QueryStatement;
            queryPaginateAccounts?: QueryStatement;
            constraintPaginateAccounts?: QueryStatement;
            clientId?: string;
            constraintClient?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        iamGetTags: IamTag[];
        iamGetTenants: IamTenant[];
        iamPaginateAccounts: GridData<IamAccount>;
        oAuthFindClientById: OAuthClient;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                iamGetTags: IamTag[];
                iamGetTenants: IamTenant[];
                oAuthFindClientById: OAuthClient;
                iamPaginateAccounts: GridData<IamAccount>;
            }>({
                query    : getRelations,
                variables: {
                    queryTags,
                    constraintTags,
                    queryTenants,
                    constraintTenants,
                    queryPaginateAccounts,
                    constraintPaginateAccounts,
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
                    this.accountService.setScopePagination(messageAccountsScopePagination, data.iamPaginateAccounts);
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

    // Mutation additionalApis
    removeAttachmentMessage<T>(
        {
            graphqlStatement = removeAttachmentMessageMutation,
            message,
            attachmentId,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            message?: MessageUpdateMessageById;
            attachmentId?: string;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    message,
                    attachmentId,
                },
                context: {
                    headers,
                },
            });
    }
}
