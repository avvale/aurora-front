/**
 * @aurora-generated
 * @source cliter/business-partner-portal/sales-invoice-position.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    BusinessPartnerPortalCreateSalesInvoicePosition,
    BusinessPartnerPortalSalesInvoicePosition,
    BusinessPartnerPortalUpdateSalesInvoicePositionById,
    BusinessPartnerPortalUpdateSalesInvoicePositions,
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
} from '@apps/business-partner-portal/sales-invoice-position';
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
export class SalesInvoicePositionService {
    paginationSubject$: BehaviorSubject<GridData<BusinessPartnerPortalSalesInvoicePosition> | null> =
        new BehaviorSubject(null);
    salesInvoicePositionSubject$: BehaviorSubject<BusinessPartnerPortalSalesInvoicePosition | null> =
        new BehaviorSubject(null);
    salesInvoicePositionsSubject$: BehaviorSubject<
        BusinessPartnerPortalSalesInvoicePosition[] | null
    > = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [
            key: string
        ]: BehaviorSubject<GridData<BusinessPartnerPortalSalesInvoicePosition> | null>;
    } = {};
    salesInvoicePositionScoped: {
        [
            key: string
        ]: BehaviorSubject<BusinessPartnerPortalSalesInvoicePosition | null>;
    } = {};
    salesInvoicePositionsScoped: {
        [key: string]: BehaviorSubject<
            BusinessPartnerPortalSalesInvoicePosition[] | null
        >;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<
        GridData<BusinessPartnerPortalSalesInvoicePosition>
    > {
        return this.paginationSubject$.asObservable();
    }

    get salesInvoicePosition$(): Observable<BusinessPartnerPortalSalesInvoicePosition> {
        return this.salesInvoicePositionSubject$.asObservable();
    }

    get salesInvoicePositions$(): Observable<
        BusinessPartnerPortalSalesInvoicePosition[]
    > {
        return this.salesInvoicePositionsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<BusinessPartnerPortalSalesInvoicePosition>,
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
    ): Observable<GridData<BusinessPartnerPortalSalesInvoicePosition>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeSalesInvoicePosition(
        scope: string,
        object: BusinessPartnerPortalSalesInvoicePosition,
    ): void {
        if (this.salesInvoicePositionScoped[scope]) {
            this.salesInvoicePositionScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.salesInvoicePositionScoped[scope] = new BehaviorSubject(object);
    }

    getScopeSalesInvoicePosition(
        scope: string,
    ): Observable<BusinessPartnerPortalSalesInvoicePosition> {
        if (!this.salesInvoicePositionScoped[scope])
            this.salesInvoicePositionScoped[scope] = new BehaviorSubject(null);
        return this.salesInvoicePositionScoped[scope].asObservable();
    }

    setScopeSalesInvoicePositions(
        scope: string,
        objects: BusinessPartnerPortalSalesInvoicePosition[],
    ): void {
        if (this.salesInvoicePositionsScoped[scope]) {
            this.salesInvoicePositionsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.salesInvoicePositionsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeSalesInvoicePositions(
        scope: string,
    ): Observable<BusinessPartnerPortalSalesInvoicePosition[]> {
        if (!this.salesInvoicePositionsScoped[scope])
            this.salesInvoicePositionsScoped[scope] = new BehaviorSubject(null);
        return this.salesInvoicePositionsScoped[scope].asObservable();
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
    } = {}): Observable<GridData<BusinessPartnerPortalSalesInvoicePosition>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<BusinessPartnerPortalSalesInvoicePosition>;
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
        object: BusinessPartnerPortalSalesInvoicePosition;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalSalesInvoicePosition;
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
                        ? this.setScopeSalesInvoicePosition(scope, data.object)
                        : this.salesInvoicePositionSubject$.next(data.object),
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
        object: BusinessPartnerPortalSalesInvoicePosition;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalSalesInvoicePosition;
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
                        ? this.setScopeSalesInvoicePosition(scope, data.object)
                        : this.salesInvoicePositionSubject$.next(data.object),
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
        objects: BusinessPartnerPortalSalesInvoicePosition[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: BusinessPartnerPortalSalesInvoicePosition[];
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
                        ? this.setScopeSalesInvoicePositions(
                              scope,
                              data.objects,
                          )
                        : this.salesInvoicePositionsSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: BusinessPartnerPortalCreateSalesInvoicePosition;
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
        objects?: BusinessPartnerPortalCreateSalesInvoicePosition[];
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
        object?: BusinessPartnerPortalUpdateSalesInvoicePositionById;
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
        object?: BusinessPartnerPortalUpdateSalesInvoicePositions;
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
