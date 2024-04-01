import { checkMessagesInboxMutation, deleteCustomerMessageInboxMutation, findCustomerMessageInboxQuery, paginateCustomerMessagesInboxQuery, readCustomerMessageInboxMutation, unreadCustomerMessageInboxMutation } from './inbox.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findQuery, getQuery, paginationQuery, updateByIdMutation, updateMutation } from '@apps/message/inbox';
import { MessageCreateInbox, MessageInbox, MessageUpdateInboxById, MessageUpdateInboxes } from '@apps/message/message.types';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InboxService
{
    paginationSubject$: BehaviorSubject<GridData<MessageInbox> | null> = new BehaviorSubject(null);
    inboxSubject$: BehaviorSubject<MessageInbox | null> = new BehaviorSubject(null);
    inboxesSubject$: BehaviorSubject<MessageInbox[] | null> = new BehaviorSubject(null);

    // ---- customizations ----
    paginationCustomerCenterSubject$: BehaviorSubject<GridData<MessageInbox> | null> = new BehaviorSubject(null);
    inboxCustomerCenterSubject$: BehaviorSubject<MessageInbox | null> = new BehaviorSubject(null);
    paginationCustomerQuickViewSubject$: BehaviorSubject<GridData<MessageInbox> | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<MessageInbox>>
    {
        return this.paginationSubject$.asObservable();
    }

    get inbox$(): Observable<MessageInbox>
    {
        return this.inboxSubject$.asObservable();
    }

    get inboxes$(): Observable<MessageInbox[]>
    {
        return this.inboxesSubject$.asObservable();
    }

    // ---- customizations ----
    get paginationCustomerCenter$(): Observable<GridData<MessageInbox>>
    {
        return this.paginationCustomerCenterSubject$.asObservable();
    }

    get inboxCustomerCenter$(): Observable<MessageInbox>
    {
        return this.inboxCustomerCenterSubject$.asObservable();
    }

    get paginationCustomerQuickView$(): Observable<GridData<MessageInbox>>
    {
        return this.paginationCustomerQuickViewSubject$.asObservable();
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
    ): Observable<GridData<MessageInbox>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<MessageInbox>; }>({
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
        object: MessageInbox;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: MessageInbox;
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
                    this.inboxSubject$.next(data.object);
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
        object: MessageInbox;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: MessageInbox;
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
                    this.inboxSubject$.next(data.object);
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
        objects: MessageInbox[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: MessageInbox[];
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
                    this.inboxesSubject$.next(data.objects);
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
            object?: MessageCreateInbox;
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
            object?: MessageUpdateInboxById;
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
            object?: MessageUpdateInboxes;
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

    // Queries additionalApis
    paginateCustomerCenterMessagesInbox(
        {
            graphqlStatement = paginateCustomerMessagesInboxQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<MessageInbox>>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<MessageInbox>;
            }>({
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
                tap(pagination => this.paginationCustomerCenterSubject$.next(pagination)),
            );
    }

    paginateCustomerQuickVewMessagesInbox(
        {
            graphqlStatement = paginateCustomerMessagesInboxQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<MessageInbox>>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<MessageInbox>;
            }>({
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
                tap(pagination => this.paginationCustomerQuickViewSubject$.next(pagination)),
            );
    }

    findCustomerMessageInbox(
        {
            graphqlStatement = findCustomerMessageInboxQuery,
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
        object: MessageInbox;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: MessageInbox;
            }>({
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
                map(result => result.data),
                tap(data =>
                {
                    this.inboxCustomerCenterSubject$.next(data.object);
                }),
            );
    }

    // Mutation additionalApis
    checkMessagesInbox<T>(
        {
            graphqlStatement = checkMessagesInboxMutation,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        // check messages in outbox and copy to inbox
        return this.graphqlService
            .client()
            .mutate({
                mutation: graphqlStatement,
                context : {
                    headers,
                },
            });
    }

    deleteCustomerMessageInbox<T>(
        {
            graphqlStatement = deleteCustomerMessageInboxMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: MessageUpdateInboxById;
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

    readCustomerMessageInbox<T>(
        {
            graphqlStatement = readCustomerMessageInboxMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: MessageUpdateInboxById;
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

    unreadCustomerMessageInbox<T>(
        {
            graphqlStatement = unreadCustomerMessageInboxMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: MessageUpdateInboxById;
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
}
