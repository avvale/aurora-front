/**
 * @aurora-generated
 * @source cliter/business-partner-portal/sales-invoice-header.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    BusinessPartnerPortalCreateSalesInvoiceHeader,
    BusinessPartnerPortalSalesInvoiceHeader,
    BusinessPartnerPortalUpdateSalesInvoiceHeaderById,
    BusinessPartnerPortalUpdateSalesInvoiceHeaders,
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
} from '@apps/business-partner-portal/sales-invoice-header';
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
export class SalesInvoiceHeaderService {
    paginationSubject$: BehaviorSubject<GridData<BusinessPartnerPortalSalesInvoiceHeader> | null> =
        new BehaviorSubject(null);
    salesInvoiceHeaderSubject$: BehaviorSubject<BusinessPartnerPortalSalesInvoiceHeader | null> =
        new BehaviorSubject(null);
    salesInvoiceHeadersSubject$: BehaviorSubject<
        BusinessPartnerPortalSalesInvoiceHeader[] | null
    > = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [
            key: string
        ]: BehaviorSubject<GridData<BusinessPartnerPortalSalesInvoiceHeader> | null>;
    } = {};
    salesInvoiceHeaderScoped: {
        [
            key: string
        ]: BehaviorSubject<BusinessPartnerPortalSalesInvoiceHeader | null>;
    } = {};
    salesInvoiceHeadersScoped: {
        [key: string]: BehaviorSubject<
            BusinessPartnerPortalSalesInvoiceHeader[] | null
        >;
    } = {};

    constructor(private readonly graphqlService: GraphQLService) {}

    /**
     * Getters
     */
    get pagination$(): Observable<
        GridData<BusinessPartnerPortalSalesInvoiceHeader>
    > {
        return this.paginationSubject$.asObservable();
    }

    get salesInvoiceHeader$(): Observable<BusinessPartnerPortalSalesInvoiceHeader> {
        return this.salesInvoiceHeaderSubject$.asObservable();
    }

    get salesInvoiceHeaders$(): Observable<
        BusinessPartnerPortalSalesInvoiceHeader[]
    > {
        return this.salesInvoiceHeadersSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<BusinessPartnerPortalSalesInvoiceHeader>,
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
    ): Observable<GridData<BusinessPartnerPortalSalesInvoiceHeader>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeSalesInvoiceHeader(
        scope: string,
        object: BusinessPartnerPortalSalesInvoiceHeader,
    ): void {
        if (this.salesInvoiceHeaderScoped[scope]) {
            this.salesInvoiceHeaderScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.salesInvoiceHeaderScoped[scope] = new BehaviorSubject(object);
    }

    getScopeSalesInvoiceHeader(
        scope: string,
    ): Observable<BusinessPartnerPortalSalesInvoiceHeader> {
        if (!this.salesInvoiceHeaderScoped[scope])
            this.salesInvoiceHeaderScoped[scope] = new BehaviorSubject(null);
        return this.salesInvoiceHeaderScoped[scope].asObservable();
    }

    setScopeSalesInvoiceHeaders(
        scope: string,
        objects: BusinessPartnerPortalSalesInvoiceHeader[],
    ): void {
        if (this.salesInvoiceHeadersScoped[scope]) {
            this.salesInvoiceHeadersScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.salesInvoiceHeadersScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeSalesInvoiceHeaders(
        scope: string,
    ): Observable<BusinessPartnerPortalSalesInvoiceHeader[]> {
        if (!this.salesInvoiceHeadersScoped[scope])
            this.salesInvoiceHeadersScoped[scope] = new BehaviorSubject(null);
        return this.salesInvoiceHeadersScoped[scope].asObservable();
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
    } = {}): Observable<GridData<BusinessPartnerPortalSalesInvoiceHeader>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<BusinessPartnerPortalSalesInvoiceHeader>;
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
        object: BusinessPartnerPortalSalesInvoiceHeader;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalSalesInvoiceHeader;
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
                        ? this.setScopeSalesInvoiceHeader(scope, data.object)
                        : this.salesInvoiceHeaderSubject$.next(data.object),
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
        object: BusinessPartnerPortalSalesInvoiceHeader;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalSalesInvoiceHeader;
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
                        ? this.setScopeSalesInvoiceHeader(scope, data.object)
                        : this.salesInvoiceHeaderSubject$.next(data.object),
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
        objects: BusinessPartnerPortalSalesInvoiceHeader[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: BusinessPartnerPortalSalesInvoiceHeader[];
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
                        ? this.setScopeSalesInvoiceHeaders(scope, data.objects)
                        : this.salesInvoiceHeadersSubject$.next(data.objects),
                ),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: BusinessPartnerPortalCreateSalesInvoiceHeader;
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
        objects?: BusinessPartnerPortalCreateSalesInvoiceHeader[];
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
        object?: BusinessPartnerPortalUpdateSalesInvoiceHeaderById;
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
        object?: BusinessPartnerPortalUpdateSalesInvoiceHeaders;
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
