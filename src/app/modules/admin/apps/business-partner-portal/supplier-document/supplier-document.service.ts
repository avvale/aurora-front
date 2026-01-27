/**
 * @aurora-generated
 * @source cliter/business-partner-portal/supplier-document.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    BusinessPartnerPortalBusinessPartner,
    BusinessPartnerPortalCreateSupplierDocument,
    BusinessPartnerPortalPurchaseInvoiceHeader,
    BusinessPartnerPortalSupplierDocument,
    BusinessPartnerPortalUpdateSupplierDocumentById,
    BusinessPartnerPortalUpdateSupplierDocuments,
} from '@apps/business-partner-portal';
import { BusinessPartnerService } from '@apps/business-partner-portal/business-partner';
import { PurchaseInvoiceHeaderService } from '@apps/business-partner-portal/purchase-invoice-header';
import {
    createMutation,
    deleteByIdMutation,
    deleteMutation,
    fields,
    findByIdQuery,
    findByIdWithRelationsQuery,
    findQuery,
    getQuery,
    getRelations,
    insertMutation,
    paginationQuery,
    updateByIdMutation,
    updateMutation,
} from '@apps/business-partner-portal/supplier-document';
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
export class SupplierDocumentService {
    paginationSubject$: BehaviorSubject<GridData<BusinessPartnerPortalSupplierDocument> | null> =
        new BehaviorSubject(null);
    supplierDocumentSubject$: BehaviorSubject<BusinessPartnerPortalSupplierDocument | null> =
        new BehaviorSubject(null);
    supplierDocumentsSubject$: BehaviorSubject<
        BusinessPartnerPortalSupplierDocument[] | null
    > = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [
            key: string
        ]: BehaviorSubject<GridData<BusinessPartnerPortalSupplierDocument> | null>;
    } = {};
    supplierDocumentScoped: {
        [
            key: string
        ]: BehaviorSubject<BusinessPartnerPortalSupplierDocument | null>;
    } = {};
    supplierDocumentsScoped: {
        [key: string]: BehaviorSubject<
            BusinessPartnerPortalSupplierDocument[] | null
        >;
    } = {};

    constructor(
        private readonly businessPartnerService: BusinessPartnerService,
        private readonly graphqlService: GraphQLService,
        private readonly purchaseInvoiceHeaderService: PurchaseInvoiceHeaderService,
    ) {}

    /**
     * Getters
     */
    get pagination$(): Observable<
        GridData<BusinessPartnerPortalSupplierDocument>
    > {
        return this.paginationSubject$.asObservable();
    }

    get supplierDocument$(): Observable<BusinessPartnerPortalSupplierDocument> {
        return this.supplierDocumentSubject$.asObservable();
    }

    get supplierDocuments$(): Observable<
        BusinessPartnerPortalSupplierDocument[]
    > {
        return this.supplierDocumentsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<BusinessPartnerPortalSupplierDocument>,
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
    ): Observable<GridData<BusinessPartnerPortalSupplierDocument>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopeSupplierDocument(
        scope: string,
        object: BusinessPartnerPortalSupplierDocument,
    ): void {
        if (this.supplierDocumentScoped[scope]) {
            this.supplierDocumentScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.supplierDocumentScoped[scope] = new BehaviorSubject(object);
    }

    getScopeSupplierDocument(
        scope: string,
    ): Observable<BusinessPartnerPortalSupplierDocument> {
        if (!this.supplierDocumentScoped[scope])
            this.supplierDocumentScoped[scope] = new BehaviorSubject(null);
        return this.supplierDocumentScoped[scope].asObservable();
    }

    setScopeSupplierDocuments(
        scope: string,
        objects: BusinessPartnerPortalSupplierDocument[],
    ): void {
        if (this.supplierDocumentsScoped[scope]) {
            this.supplierDocumentsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.supplierDocumentsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopeSupplierDocuments(
        scope: string,
    ): Observable<BusinessPartnerPortalSupplierDocument[]> {
        if (!this.supplierDocumentsScoped[scope])
            this.supplierDocumentsScoped[scope] = new BehaviorSubject(null);
        return this.supplierDocumentsScoped[scope].asObservable();
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
    } = {}): Observable<GridData<BusinessPartnerPortalSupplierDocument>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<BusinessPartnerPortalSupplierDocument>;
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
        object: BusinessPartnerPortalSupplierDocument;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalSupplierDocument;
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
                        ? this.setScopeSupplierDocument(scope, data.object)
                        : this.supplierDocumentSubject$.next(data.object),
                ),
            );
    }

    findByIdWithRelations({
        graphqlStatement = findByIdWithRelationsQuery,
        id = '',
        constraint = {},
        queryBusinessPartners = {},
        constraintBusinessPartners = {},
        queryPurchaseInvoiceHeaders = {},
        constraintPurchaseInvoiceHeaders = {},
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        queryBusinessPartners?: QueryStatement;
        constraintBusinessPartners?: QueryStatement;
        queryPurchaseInvoiceHeaders?: QueryStatement;
        constraintPurchaseInvoiceHeaders?: QueryStatement;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        object: BusinessPartnerPortalSupplierDocument;
        businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
        businessPartnerPortalGetPurchaseInvoiceHeaders: BusinessPartnerPortalPurchaseInvoiceHeader[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalSupplierDocument;
                businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
                businessPartnerPortalGetPurchaseInvoiceHeaders: BusinessPartnerPortalPurchaseInvoiceHeader[];
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryBusinessPartners,
                    constraintBusinessPartners,
                    queryPurchaseInvoiceHeaders,
                    constraintPurchaseInvoiceHeaders,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => {
                    if (scope) {
                        this.setScopeSupplierDocument(scope, data.object);
                    } else {
                        this.supplierDocumentSubject$.next(data.object);
                    }
                    this.businessPartnerService.businessPartnersSubject$.next(
                        data.businessPartnerPortalGetBusinessPartners,
                    );
                    this.purchaseInvoiceHeaderService.purchaseInvoiceHeadersSubject$.next(
                        data.businessPartnerPortalGetPurchaseInvoiceHeaders,
                    );
                }),
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
        object: BusinessPartnerPortalSupplierDocument;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalSupplierDocument;
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
                        ? this.setScopeSupplierDocument(scope, data.object)
                        : this.supplierDocumentSubject$.next(data.object),
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
        objects: BusinessPartnerPortalSupplierDocument[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: BusinessPartnerPortalSupplierDocument[];
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
                        ? this.setScopeSupplierDocuments(scope, data.objects)
                        : this.supplierDocumentsSubject$.next(data.objects),
                ),
            );
    }

    getRelations({
        queryBusinessPartners = {},
        constraintBusinessPartners = {},
        queryPurchaseInvoiceHeaders = {},
        constraintPurchaseInvoiceHeaders = {},
        headers = {},
    }: {
        queryBusinessPartners?: QueryStatement;
        constraintBusinessPartners?: QueryStatement;
        queryPurchaseInvoiceHeaders?: QueryStatement;
        constraintPurchaseInvoiceHeaders?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<{
        businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
        businessPartnerPortalGetPurchaseInvoiceHeaders: BusinessPartnerPortalPurchaseInvoiceHeader[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
                businessPartnerPortalGetPurchaseInvoiceHeaders: BusinessPartnerPortalPurchaseInvoiceHeader[];
            }>({
                query: getRelations,
                variables: {
                    queryBusinessPartners,
                    constraintBusinessPartners,
                    queryPurchaseInvoiceHeaders,
                    constraintPurchaseInvoiceHeaders,
                },
                context: {
                    headers,
                },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data),
                tap((data) => {
                    this.businessPartnerService.businessPartnersSubject$.next(
                        data.businessPartnerPortalGetBusinessPartners,
                    );
                    this.purchaseInvoiceHeaderService.purchaseInvoiceHeadersSubject$.next(
                        data.businessPartnerPortalGetPurchaseInvoiceHeaders,
                    );
                }),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: BusinessPartnerPortalCreateSupplierDocument;
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
        objects?: BusinessPartnerPortalCreateSupplierDocument[];
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
        object?: BusinessPartnerPortalUpdateSupplierDocumentById;
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
        object?: BusinessPartnerPortalUpdateSupplierDocuments;
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
