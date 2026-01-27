/**
 * @aurora-generated
 * @source cliter/business-partner-portal/purchase-invoice-header.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    BusinessPartnerPortalCreatePurchaseInvoiceHeader,
    BusinessPartnerPortalPurchaseInvoiceHeader,
    BusinessPartnerPortalUpdatePurchaseInvoiceHeaderById,
    BusinessPartnerPortalUpdatePurchaseInvoiceHeaders,
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
} from '@apps/business-partner-portal/purchase-invoice-header';
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
export class PurchaseInvoiceHeaderService {
    paginationSubject$: BehaviorSubject<GridData<BusinessPartnerPortalPurchaseInvoiceHeader> | null> =
        new BehaviorSubject(null);
    purchaseInvoiceHeaderSubject$: BehaviorSubject<BusinessPartnerPortalPurchaseInvoiceHeader | null> =
        new BehaviorSubject(null);
    purchaseInvoiceHeadersSubject$: BehaviorSubject<
        BusinessPartnerPortalPurchaseInvoiceHeader[] | null
    > = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [
            key: string
        ]: BehaviorSubject<GridData<BusinessPartnerPortalPurchaseInvoiceHeader> | null>;
    } = {};
    purchaseInvoiceHeaderScoped: {
        [
            key: string
        ]: BehaviorSubject<BusinessPartnerPortalPurchaseInvoiceHeader | null>;
    } = {};
    purchaseInvoiceHeadersScoped: {
        [key: string]: BehaviorSubject<
            BusinessPartnerPortalPurchaseInvoiceHeader[] | null
        >;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<
        GridData<BusinessPartnerPortalPurchaseInvoiceHeader>
    > {
        return this.paginationSubject$.asObservable();
    }

    get purchaseInvoiceHeader$(): Observable<BusinessPartnerPortalPurchaseInvoiceHeader> {
        return this.purchaseInvoiceHeaderSubject$.asObservable();
    }

    get purchaseInvoiceHeaders$(): Observable<
        BusinessPartnerPortalPurchaseInvoiceHeader[]
    > {
        return this.purchaseInvoiceHeadersSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<BusinessPartnerPortalPurchaseInvoiceHeader>,
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
    ): Observable<GridData<BusinessPartnerPortalPurchaseInvoiceHeader>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopePurchaseInvoiceHeader(
        scope: string,
        object: BusinessPartnerPortalPurchaseInvoiceHeader,
    ): void {
        if (this.purchaseInvoiceHeaderScoped[scope]) {
            this.purchaseInvoiceHeaderScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.purchaseInvoiceHeaderScoped[scope] = new BehaviorSubject(object);
    }

    getScopePurchaseInvoiceHeader(
        scope: string,
    ): Observable<BusinessPartnerPortalPurchaseInvoiceHeader> {
        if (!this.purchaseInvoiceHeaderScoped[scope])
            this.purchaseInvoiceHeaderScoped[scope] = new BehaviorSubject(null);
        return this.purchaseInvoiceHeaderScoped[scope].asObservable();
    }

    setScopePurchaseInvoiceHeaders(
        scope: string,
        objects: BusinessPartnerPortalPurchaseInvoiceHeader[],
    ): void {
        if (this.purchaseInvoiceHeadersScoped[scope]) {
            this.purchaseInvoiceHeadersScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.purchaseInvoiceHeadersScoped[scope] = new BehaviorSubject(objects);
    }

    getScopePurchaseInvoiceHeaders(
        scope: string,
    ): Observable<BusinessPartnerPortalPurchaseInvoiceHeader[]> {
        if (!this.purchaseInvoiceHeadersScoped[scope])
            this.purchaseInvoiceHeadersScoped[scope] = new BehaviorSubject(
                null,
            );
        return this.purchaseInvoiceHeadersScoped[scope].asObservable();
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
    } = {}): Observable<GridData<BusinessPartnerPortalPurchaseInvoiceHeader>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<BusinessPartnerPortalPurchaseInvoiceHeader>;
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
        object: BusinessPartnerPortalPurchaseInvoiceHeader;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPurchaseInvoiceHeader;
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
                        ? this.setScopePurchaseInvoiceHeader(scope, data.object)
                        : this.purchaseInvoiceHeaderSubject$.next(data.object),
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
        object: BusinessPartnerPortalPurchaseInvoiceHeader;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPurchaseInvoiceHeader;
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
                        ? this.setScopePurchaseInvoiceHeader(scope, data.object)
                        : this.purchaseInvoiceHeaderSubject$.next(data.object),
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
        objects: BusinessPartnerPortalPurchaseInvoiceHeader[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: BusinessPartnerPortalPurchaseInvoiceHeader[];
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
                        ? this.setScopePurchaseInvoiceHeaders(
                              scope,
                              data.objects,
                          )
                        : this.purchaseInvoiceHeadersSubject$.next(
                              data.objects,
                          ),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: BusinessPartnerPortalCreatePurchaseInvoiceHeader;
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
        objects?: BusinessPartnerPortalCreatePurchaseInvoiceHeader[];
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
        object?: BusinessPartnerPortalUpdatePurchaseInvoiceHeaderById;
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
        object?: BusinessPartnerPortalUpdatePurchaseInvoiceHeaders;
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
