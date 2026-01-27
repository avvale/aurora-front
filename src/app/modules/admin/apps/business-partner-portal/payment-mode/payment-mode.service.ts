/**
 * @aurora-generated
 * @source cliter/business-partner-portal/payment-mode.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    BusinessPartnerPortalCreatePaymentMode,
    BusinessPartnerPortalPaymentMode,
    BusinessPartnerPortalUpdatePaymentModeById,
    BusinessPartnerPortalUpdatePaymentModes,
} from '@apps/business-partner-portal';
import {
    createMutation,
    deleteByIdMutation,
    deleteMutation,
    fields,
    findByIdQuery,
    findQuery,
    getQuery,
    insertMutation,
    paginationQuery,
    updateByIdMutation,
    updateMutation,
} from '@apps/business-partner-portal/payment-mode';
import {
    GraphQLHeaders,
    GraphQLService,
    GridData,
    parseGqlFields,
    QueryStatement,
} from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaymentModeService {
    paginationSubject$: BehaviorSubject<GridData<BusinessPartnerPortalPaymentMode> | null> =
        new BehaviorSubject(null);
    paymentModeSubject$: BehaviorSubject<BusinessPartnerPortalPaymentMode | null> =
        new BehaviorSubject(null);
    paymentModesSubject$: BehaviorSubject<
        BusinessPartnerPortalPaymentMode[] | null
    > = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [
            key: string
        ]: BehaviorSubject<GridData<BusinessPartnerPortalPaymentMode> | null>;
    } = {};
    paymentModeScoped: {
        [key: string]: BehaviorSubject<BusinessPartnerPortalPaymentMode | null>;
    } = {};
    paymentModesScoped: {
        [key: string]: BehaviorSubject<
            BusinessPartnerPortalPaymentMode[] | null
        >;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<GridData<BusinessPartnerPortalPaymentMode>> {
        return this.paginationSubject$.asObservable();
    }

    get paymentMode$(): Observable<BusinessPartnerPortalPaymentMode> {
        return this.paymentModeSubject$.asObservable();
    }

    get paymentModes$(): Observable<BusinessPartnerPortalPaymentMode[]> {
        return this.paymentModesSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<BusinessPartnerPortalPaymentMode>,
    ): void {
        if (this.paginationScoped[scope]) {
            this.paginationScoped[scope].next(pagination);
            return;
        }
        // create new subject if not exist
        this.paginationScoped[scope] = new BehaviorSubject(pagination);
    }

    // get pagination observable by scope
    getScopePagination(
        scope: string,
    ): Observable<GridData<BusinessPartnerPortalPaymentMode>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopePaymentMode(
        scope: string,
        object: BusinessPartnerPortalPaymentMode,
    ): void {
        if (this.paymentModeScoped[scope]) {
            this.paymentModeScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.paymentModeScoped[scope] = new BehaviorSubject(object);
    }

    getScopePaymentMode(
        scope: string,
    ): Observable<BusinessPartnerPortalPaymentMode> {
        if (!this.paymentModeScoped[scope])
            this.paymentModeScoped[scope] = new BehaviorSubject(null);
        return this.paymentModeScoped[scope].asObservable();
    }

    setScopePaymentModes(
        scope: string,
        objects: BusinessPartnerPortalPaymentMode[],
    ): void {
        if (this.paymentModesScoped[scope]) {
            this.paymentModesScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.paymentModesScoped[scope] = new BehaviorSubject(objects);
    }

    getScopePaymentModes(
        scope: string,
    ): Observable<BusinessPartnerPortalPaymentMode[]> {
        if (!this.paymentModesScoped[scope])
            this.paymentModesScoped[scope] = new BehaviorSubject(null);
        return this.paymentModesScoped[scope].asObservable();
    }

    pagination({
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
    } = {}): Observable<GridData<BusinessPartnerPortalPaymentMode>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<BusinessPartnerPortalPaymentMode>;
            }>({
                query: graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data.pagination),
                tap((pagination) =>
                    scope
                        ? this.setScopePagination(scope, pagination)
                        : this.paginationSubject$.next(pagination),
                ),
            );
    }

    findById({
        graphqlStatement = findByIdQuery,
        id = null,
        constraint = {},
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        object: BusinessPartnerPortalPaymentMode;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPaymentMode;
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) =>
                    scope
                        ? this.setScopePaymentMode(scope, data.object)
                        : this.paymentModeSubject$.next(data.object),
                ),
            );
    }

    find({
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
    } = {}): Observable<{
        object: BusinessPartnerPortalPaymentMode;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPaymentMode;
            }>({
                query: parseGqlFields(
                    graphqlStatement,
                    fields,
                    query,
                    constraint,
                ),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) =>
                    scope
                        ? this.setScopePaymentMode(scope, data.object)
                        : this.paymentModeSubject$.next(data.object),
                ),
            );
    }

    get({
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
    } = {}): Observable<{
        objects: BusinessPartnerPortalPaymentMode[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: BusinessPartnerPortalPaymentMode[];
            }>({
                query: parseGqlFields(
                    graphqlStatement,
                    fields,
                    query,
                    constraint,
                ),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) =>
                    scope
                        ? this.setScopePaymentModes(scope, data.objects)
                        : this.paymentModesSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: BusinessPartnerPortalCreatePaymentMode;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                payload: object,
            },
            context: {
                headers,
            },
        });
    }

    insert<T>({
        graphqlStatement = insertMutation,
        objects = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        objects?: BusinessPartnerPortalCreatePaymentMode[];
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                payload: objects,
            },
            context: {
                headers,
            },
        });
    }

    updateById<T>({
        graphqlStatement = updateByIdMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: BusinessPartnerPortalUpdatePaymentModeById;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                payload: object,
            },
            context: {
                headers,
            },
        });
    }

    update<T>({
        graphqlStatement = updateMutation,
        object = null,
        query = {},
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: BusinessPartnerPortalUpdatePaymentModes;
        query?: QueryStatement;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
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

    deleteById<T>({
        graphqlStatement = deleteByIdMutation,
        id = null,
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
            variables: {
                id,
                constraint,
            },
            context: {
                headers,
            },
        });
    }

    delete<T>({
        graphqlStatement = deleteMutation,
        query = {},
        constraint = {},
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        query?: QueryStatement;
        constraint?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<FetchResult<T>> {
        return this.graphqlService.client().mutate({
            mutation: graphqlStatement,
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
