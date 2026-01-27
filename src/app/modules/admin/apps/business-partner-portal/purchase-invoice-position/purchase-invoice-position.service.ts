/**
 * @aurora-generated
 * @source cliter/business-partner-portal/purchase-invoice-position.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    BusinessPartnerPortalCreatePurchaseInvoicePosition,
    BusinessPartnerPortalPurchaseInvoicePosition,
    BusinessPartnerPortalUpdatePurchaseInvoicePositionById,
    BusinessPartnerPortalUpdatePurchaseInvoicePositions,
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
} from '@apps/business-partner-portal/purchase-invoice-position';
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
export class PurchaseInvoicePositionService {
    paginationSubject$: BehaviorSubject<GridData<BusinessPartnerPortalPurchaseInvoicePosition> | null> =
        new BehaviorSubject(null);
    purchaseInvoicePositionSubject$: BehaviorSubject<BusinessPartnerPortalPurchaseInvoicePosition | null> =
        new BehaviorSubject(null);
    purchaseInvoicePositionsSubject$: BehaviorSubject<
        BusinessPartnerPortalPurchaseInvoicePosition[] | null
    > = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [
            key: string
        ]: BehaviorSubject<GridData<BusinessPartnerPortalPurchaseInvoicePosition> | null>;
    } = {};
    purchaseInvoicePositionScoped: {
        [
            key: string
        ]: BehaviorSubject<BusinessPartnerPortalPurchaseInvoicePosition | null>;
    } = {};
    purchaseInvoicePositionsScoped: {
        [key: string]: BehaviorSubject<
            BusinessPartnerPortalPurchaseInvoicePosition[] | null
        >;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<
        GridData<BusinessPartnerPortalPurchaseInvoicePosition>
    > {
        return this.paginationSubject$.asObservable();
    }

    get purchaseInvoicePosition$(): Observable<BusinessPartnerPortalPurchaseInvoicePosition> {
        return this.purchaseInvoicePositionSubject$.asObservable();
    }

    get purchaseInvoicePositions$(): Observable<
        BusinessPartnerPortalPurchaseInvoicePosition[]
    > {
        return this.purchaseInvoicePositionsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<BusinessPartnerPortalPurchaseInvoicePosition>,
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
    ): Observable<GridData<BusinessPartnerPortalPurchaseInvoicePosition>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopePurchaseInvoicePosition(
        scope: string,
        object: BusinessPartnerPortalPurchaseInvoicePosition,
    ): void {
        if (this.purchaseInvoicePositionScoped[scope]) {
            this.purchaseInvoicePositionScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.purchaseInvoicePositionScoped[scope] = new BehaviorSubject(object);
    }

    getScopePurchaseInvoicePosition(
        scope: string,
    ): Observable<BusinessPartnerPortalPurchaseInvoicePosition> {
        if (!this.purchaseInvoicePositionScoped[scope])
            this.purchaseInvoicePositionScoped[scope] = new BehaviorSubject(
                null,
            );
        return this.purchaseInvoicePositionScoped[scope].asObservable();
    }

    setScopePurchaseInvoicePositions(
        scope: string,
        objects: BusinessPartnerPortalPurchaseInvoicePosition[],
    ): void {
        if (this.purchaseInvoicePositionsScoped[scope]) {
            this.purchaseInvoicePositionsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.purchaseInvoicePositionsScoped[scope] = new BehaviorSubject(
            objects,
        );
    }

    getScopePurchaseInvoicePositions(
        scope: string,
    ): Observable<BusinessPartnerPortalPurchaseInvoicePosition[]> {
        if (!this.purchaseInvoicePositionsScoped[scope])
            this.purchaseInvoicePositionsScoped[scope] = new BehaviorSubject(
                null,
            );
        return this.purchaseInvoicePositionsScoped[scope].asObservable();
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
    } = {}): Observable<
        GridData<BusinessPartnerPortalPurchaseInvoicePosition>
    > {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<BusinessPartnerPortalPurchaseInvoicePosition>;
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
        object: BusinessPartnerPortalPurchaseInvoicePosition;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPurchaseInvoicePosition;
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
                        ? this.setScopePurchaseInvoicePosition(
                              scope,
                              data.object,
                          )
                        : this.purchaseInvoicePositionSubject$.next(
                              data.object,
                          ),
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
        object: BusinessPartnerPortalPurchaseInvoicePosition;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPurchaseInvoicePosition;
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
                        ? this.setScopePurchaseInvoicePosition(
                              scope,
                              data.object,
                          )
                        : this.purchaseInvoicePositionSubject$.next(
                              data.object,
                          ),
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
        objects: BusinessPartnerPortalPurchaseInvoicePosition[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: BusinessPartnerPortalPurchaseInvoicePosition[];
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
                        ? this.setScopePurchaseInvoicePositions(
                              scope,
                              data.objects,
                          )
                        : this.purchaseInvoicePositionsSubject$.next(
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
        object?: BusinessPartnerPortalCreatePurchaseInvoicePosition;
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
        objects?: BusinessPartnerPortalCreatePurchaseInvoicePosition[];
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
        object?: BusinessPartnerPortalUpdatePurchaseInvoicePositionById;
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
        object?: BusinessPartnerPortalUpdatePurchaseInvoicePositions;
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
