/**
 * @aurora-generated
 * @source cliter/business-partner-portal/payment-collection-mode.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    BusinessPartnerPortalBusinessPartner,
    BusinessPartnerPortalCreatePaymentCollectionMode,
    BusinessPartnerPortalPaymentCollectionMode,
    BusinessPartnerPortalPaymentMode,
    BusinessPartnerPortalUpdatePaymentCollectionModeById,
    BusinessPartnerPortalUpdatePaymentCollectionModes,
} from '@apps/business-partner-portal';
import { BusinessPartnerService } from '@apps/business-partner-portal/business-partner';
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
} from '@apps/business-partner-portal/payment-collection-mode';
import { PaymentModeService } from '@apps/business-partner-portal/payment-mode';
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
export class PaymentCollectionModeService {
    paginationSubject$: BehaviorSubject<GridData<BusinessPartnerPortalPaymentCollectionMode> | null> =
        new BehaviorSubject(null);
    paymentCollectionModeSubject$: BehaviorSubject<BusinessPartnerPortalPaymentCollectionMode | null> =
        new BehaviorSubject(null);
    paymentCollectionModesSubject$: BehaviorSubject<
        BusinessPartnerPortalPaymentCollectionMode[] | null
    > = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [
            key: string
        ]: BehaviorSubject<GridData<BusinessPartnerPortalPaymentCollectionMode> | null>;
    } = {};
    paymentCollectionModeScoped: {
        [
            key: string
        ]: BehaviorSubject<BusinessPartnerPortalPaymentCollectionMode | null>;
    } = {};
    paymentCollectionModesScoped: {
        [key: string]: BehaviorSubject<
            BusinessPartnerPortalPaymentCollectionMode[] | null
        >;
    } = {};

    constructor(
        private readonly businessPartnerService: BusinessPartnerService,
        private readonly graphqlService: GraphQLService,
        private readonly paymentModeService: PaymentModeService,
    ) {}

    /**
     * Getters
     */
    get pagination$(): Observable<
        GridData<BusinessPartnerPortalPaymentCollectionMode>
    > {
        return this.paginationSubject$.asObservable();
    }

    get paymentCollectionMode$(): Observable<BusinessPartnerPortalPaymentCollectionMode> {
        return this.paymentCollectionModeSubject$.asObservable();
    }

    get paymentCollectionModes$(): Observable<
        BusinessPartnerPortalPaymentCollectionMode[]
    > {
        return this.paymentCollectionModesSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<BusinessPartnerPortalPaymentCollectionMode>,
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
    ): Observable<GridData<BusinessPartnerPortalPaymentCollectionMode>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopePaymentCollectionMode(
        scope: string,
        object: BusinessPartnerPortalPaymentCollectionMode,
    ): void {
        if (this.paymentCollectionModeScoped[scope]) {
            this.paymentCollectionModeScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.paymentCollectionModeScoped[scope] = new BehaviorSubject(object);
    }

    getScopePaymentCollectionMode(
        scope: string,
    ): Observable<BusinessPartnerPortalPaymentCollectionMode> {
        if (!this.paymentCollectionModeScoped[scope])
            this.paymentCollectionModeScoped[scope] = new BehaviorSubject(null);
        return this.paymentCollectionModeScoped[scope].asObservable();
    }

    setScopePaymentCollectionModes(
        scope: string,
        objects: BusinessPartnerPortalPaymentCollectionMode[],
    ): void {
        if (this.paymentCollectionModesScoped[scope]) {
            this.paymentCollectionModesScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.paymentCollectionModesScoped[scope] = new BehaviorSubject(objects);
    }

    getScopePaymentCollectionModes(
        scope: string,
    ): Observable<BusinessPartnerPortalPaymentCollectionMode[]> {
        if (!this.paymentCollectionModesScoped[scope])
            this.paymentCollectionModesScoped[scope] = new BehaviorSubject(
                null,
            );
        return this.paymentCollectionModesScoped[scope].asObservable();
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
    } = {}): Observable<GridData<BusinessPartnerPortalPaymentCollectionMode>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<BusinessPartnerPortalPaymentCollectionMode>;
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
        object: BusinessPartnerPortalPaymentCollectionMode;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPaymentCollectionMode;
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
                        ? this.setScopePaymentCollectionMode(scope, data.object)
                        : this.paymentCollectionModeSubject$.next(data.object),
                ),
            );
    }

    findByIdWithRelations({
        graphqlStatement = findByIdWithRelationsQuery,
        id = '',
        constraint = {},
        queryBusinessPartners = {},
        constraintBusinessPartners = {},
        queryPaymentModes = {},
        constraintPaymentModes = {},
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        queryBusinessPartners?: QueryStatement;
        constraintBusinessPartners?: QueryStatement;
        queryPaymentModes?: QueryStatement;
        constraintPaymentModes?: QueryStatement;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        object: BusinessPartnerPortalPaymentCollectionMode;
        businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
        businessPartnerPortalGetPaymentModes: BusinessPartnerPortalPaymentMode[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPaymentCollectionMode;
                businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
                businessPartnerPortalGetPaymentModes: BusinessPartnerPortalPaymentMode[];
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryBusinessPartners,
                    constraintBusinessPartners,
                    queryPaymentModes,
                    constraintPaymentModes,
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
                        this.setScopePaymentCollectionMode(scope, data.object);
                    } else {
                        this.paymentCollectionModeSubject$.next(data.object);
                    }
                    this.businessPartnerService.businessPartnersSubject$.next(
                        data.businessPartnerPortalGetBusinessPartners,
                    );
                    this.paymentModeService.paymentModesSubject$.next(
                        data.businessPartnerPortalGetPaymentModes,
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
        object: BusinessPartnerPortalPaymentCollectionMode;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPaymentCollectionMode;
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
                        ? this.setScopePaymentCollectionMode(scope, data.object)
                        : this.paymentCollectionModeSubject$.next(data.object),
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
        objects: BusinessPartnerPortalPaymentCollectionMode[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: BusinessPartnerPortalPaymentCollectionMode[];
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
                        ? this.setScopePaymentCollectionModes(
                              scope,
                              data.objects,
                          )
                        : this.paymentCollectionModesSubject$.next(
                              data.objects,
                          ),
                ),
            );
    }

    getRelations({
        queryBusinessPartners = {},
        constraintBusinessPartners = {},
        queryPaymentModes = {},
        constraintPaymentModes = {},
        headers = {},
    }: {
        queryBusinessPartners?: QueryStatement;
        constraintBusinessPartners?: QueryStatement;
        queryPaymentModes?: QueryStatement;
        constraintPaymentModes?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<{
        businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
        businessPartnerPortalGetPaymentModes: BusinessPartnerPortalPaymentMode[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
                businessPartnerPortalGetPaymentModes: BusinessPartnerPortalPaymentMode[];
            }>({
                query: getRelations,
                variables: {
                    queryBusinessPartners,
                    constraintBusinessPartners,
                    queryPaymentModes,
                    constraintPaymentModes,
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
                    this.paymentModeService.paymentModesSubject$.next(
                        data.businessPartnerPortalGetPaymentModes,
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
        object?: BusinessPartnerPortalCreatePaymentCollectionMode;
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
        objects?: BusinessPartnerPortalCreatePaymentCollectionMode[];
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
        object?: BusinessPartnerPortalUpdatePaymentCollectionModeById;
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
        object?: BusinessPartnerPortalUpdatePaymentCollectionModes;
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
