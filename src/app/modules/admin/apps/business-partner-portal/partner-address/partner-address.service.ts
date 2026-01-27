/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-address.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    BusinessPartnerPortalBusinessPartner,
    BusinessPartnerPortalCreatePartnerAddress,
    BusinessPartnerPortalPartnerAddress,
    BusinessPartnerPortalUpdatePartnerAddressById,
    BusinessPartnerPortalUpdatePartnerAddresses,
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
} from '@apps/business-partner-portal/partner-address';
import {
    CommonAdministrativeAreaLevel1,
    CommonAdministrativeAreaLevel2,
    CommonAdministrativeAreaLevel3,
    CommonCountry,
} from '@apps/common';
import { AdministrativeAreaLevel1Service } from '@apps/common/administrative-area-level-1';
import { AdministrativeAreaLevel2Service } from '@apps/common/administrative-area-level-2';
import { AdministrativeAreaLevel3Service } from '@apps/common/administrative-area-level-3';
import { CountryService } from '@apps/common/country';
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
export class PartnerAddressService {
    paginationSubject$: BehaviorSubject<GridData<BusinessPartnerPortalPartnerAddress> | null> =
        new BehaviorSubject(null);
    partnerAddressSubject$: BehaviorSubject<BusinessPartnerPortalPartnerAddress | null> =
        new BehaviorSubject(null);
    partnerAddressesSubject$: BehaviorSubject<
        BusinessPartnerPortalPartnerAddress[] | null
    > = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [
            key: string
        ]: BehaviorSubject<GridData<BusinessPartnerPortalPartnerAddress> | null>;
    } = {};
    partnerAddressScoped: {
        [
            key: string
        ]: BehaviorSubject<BusinessPartnerPortalPartnerAddress | null>;
    } = {};
    partnerAddressesScoped: {
        [key: string]: BehaviorSubject<
            BusinessPartnerPortalPartnerAddress[] | null
        >;
    } = {};

    constructor(
        private readonly administrativeAreaLevel1Service: AdministrativeAreaLevel1Service,
        private readonly administrativeAreaLevel2Service: AdministrativeAreaLevel2Service,
        private readonly administrativeAreaLevel3Service: AdministrativeAreaLevel3Service,
        private readonly businessPartnerService: BusinessPartnerService,
        private readonly countryService: CountryService,
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
     * Getters
     */
    get pagination$(): Observable<
        GridData<BusinessPartnerPortalPartnerAddress>
    > {
        return this.paginationSubject$.asObservable();
    }

    get partnerAddress$(): Observable<BusinessPartnerPortalPartnerAddress> {
        return this.partnerAddressSubject$.asObservable();
    }

    get partnerAddresses$(): Observable<BusinessPartnerPortalPartnerAddress[]> {
        return this.partnerAddressesSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<BusinessPartnerPortalPartnerAddress>,
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
    ): Observable<GridData<BusinessPartnerPortalPartnerAddress>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopePartnerAddress(
        scope: string,
        object: BusinessPartnerPortalPartnerAddress,
    ): void {
        if (this.partnerAddressScoped[scope]) {
            this.partnerAddressScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.partnerAddressScoped[scope] = new BehaviorSubject(object);
    }

    getScopePartnerAddress(
        scope: string,
    ): Observable<BusinessPartnerPortalPartnerAddress> {
        if (!this.partnerAddressScoped[scope])
            this.partnerAddressScoped[scope] = new BehaviorSubject(null);
        return this.partnerAddressScoped[scope].asObservable();
    }

    setScopePartnerAddresses(
        scope: string,
        objects: BusinessPartnerPortalPartnerAddress[],
    ): void {
        if (this.partnerAddressesScoped[scope]) {
            this.partnerAddressesScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.partnerAddressesScoped[scope] = new BehaviorSubject(objects);
    }

    getScopePartnerAddresses(
        scope: string,
    ): Observable<BusinessPartnerPortalPartnerAddress[]> {
        if (!this.partnerAddressesScoped[scope])
            this.partnerAddressesScoped[scope] = new BehaviorSubject(null);
        return this.partnerAddressesScoped[scope].asObservable();
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
    } = {}): Observable<GridData<BusinessPartnerPortalPartnerAddress>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<BusinessPartnerPortalPartnerAddress>;
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
        object: BusinessPartnerPortalPartnerAddress;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPartnerAddress;
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
                        ? this.setScopePartnerAddress(scope, data.object)
                        : this.partnerAddressSubject$.next(data.object),
                ),
            );
    }

    findByIdWithRelations({
        graphqlStatement = findByIdWithRelationsQuery,
        id = '',
        constraint = {},
        queryBusinessPartners = {},
        constraintBusinessPartners = {},
        queryCountries = {},
        constraintCountries = {},
        queryAdministrativeAreasLevel1 = {},
        constraintAdministrativeAreasLevel1 = {},
        queryAdministrativeAreasLevel2 = {},
        constraintAdministrativeAreasLevel2 = {},
        queryAdministrativeAreasLevel3 = {},
        constraintAdministrativeAreasLevel3 = {},
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        queryBusinessPartners?: QueryStatement;
        constraintBusinessPartners?: QueryStatement;
        queryCountries?: QueryStatement;
        constraintCountries?: QueryStatement;
        queryAdministrativeAreasLevel1?: QueryStatement;
        constraintAdministrativeAreasLevel1?: QueryStatement;
        queryAdministrativeAreasLevel2?: QueryStatement;
        constraintAdministrativeAreasLevel2?: QueryStatement;
        queryAdministrativeAreasLevel3?: QueryStatement;
        constraintAdministrativeAreasLevel3?: QueryStatement;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        object: BusinessPartnerPortalPartnerAddress;
        businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
        commonGetCountries: CommonCountry[];
        commonGetAdministrativeAreasLevel1: CommonAdministrativeAreaLevel1[];
        commonGetAdministrativeAreasLevel2: CommonAdministrativeAreaLevel2[];
        commonGetAdministrativeAreasLevel3: CommonAdministrativeAreaLevel3[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPartnerAddress;
                businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
                commonGetCountries: CommonCountry[];
                commonGetAdministrativeAreasLevel1: CommonAdministrativeAreaLevel1[];
                commonGetAdministrativeAreasLevel2: CommonAdministrativeAreaLevel2[];
                commonGetAdministrativeAreasLevel3: CommonAdministrativeAreaLevel3[];
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryBusinessPartners,
                    constraintBusinessPartners,
                    queryCountries,
                    constraintCountries,
                    queryAdministrativeAreasLevel1,
                    constraintAdministrativeAreasLevel1,
                    queryAdministrativeAreasLevel2,
                    constraintAdministrativeAreasLevel2,
                    queryAdministrativeAreasLevel3,
                    constraintAdministrativeAreasLevel3,
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
                        this.setScopePartnerAddress(scope, data.object);
                    } else {
                        this.partnerAddressSubject$.next(data.object);
                    }
                    this.businessPartnerService.businessPartnersSubject$.next(
                        data.businessPartnerPortalGetBusinessPartners,
                    );
                    this.countryService.countriesSubject$.next(
                        data.commonGetCountries,
                    );
                    this.administrativeAreaLevel1Service.administrativeAreasLevel1Subject$.next(
                        data.commonGetAdministrativeAreasLevel1,
                    );
                    this.administrativeAreaLevel2Service.administrativeAreasLevel2Subject$.next(
                        data.commonGetAdministrativeAreasLevel2,
                    );
                    this.administrativeAreaLevel3Service.administrativeAreasLevel3Subject$.next(
                        data.commonGetAdministrativeAreasLevel3,
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
        object: BusinessPartnerPortalPartnerAddress;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPartnerAddress;
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
                        ? this.setScopePartnerAddress(scope, data.object)
                        : this.partnerAddressSubject$.next(data.object),
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
        objects: BusinessPartnerPortalPartnerAddress[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: BusinessPartnerPortalPartnerAddress[];
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
                        ? this.setScopePartnerAddresses(scope, data.objects)
                        : this.partnerAddressesSubject$.next(data.objects),
                ),
            );
    }

    getRelations({
        queryBusinessPartners = {},
        constraintBusinessPartners = {},
        queryCountries = {},
        constraintCountries = {},
        queryAdministrativeAreasLevel1 = {},
        constraintAdministrativeAreasLevel1 = {},
        queryAdministrativeAreasLevel2 = {},
        constraintAdministrativeAreasLevel2 = {},
        queryAdministrativeAreasLevel3 = {},
        constraintAdministrativeAreasLevel3 = {},
        headers = {},
    }: {
        queryBusinessPartners?: QueryStatement;
        constraintBusinessPartners?: QueryStatement;
        queryCountries?: QueryStatement;
        constraintCountries?: QueryStatement;
        queryAdministrativeAreasLevel1?: QueryStatement;
        constraintAdministrativeAreasLevel1?: QueryStatement;
        queryAdministrativeAreasLevel2?: QueryStatement;
        constraintAdministrativeAreasLevel2?: QueryStatement;
        queryAdministrativeAreasLevel3?: QueryStatement;
        constraintAdministrativeAreasLevel3?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<{
        businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
        commonGetCountries: CommonCountry[];
        commonGetAdministrativeAreasLevel1: CommonAdministrativeAreaLevel1[];
        commonGetAdministrativeAreasLevel2: CommonAdministrativeAreaLevel2[];
        commonGetAdministrativeAreasLevel3: CommonAdministrativeAreaLevel3[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
                commonGetCountries: CommonCountry[];
                commonGetAdministrativeAreasLevel1: CommonAdministrativeAreaLevel1[];
                commonGetAdministrativeAreasLevel2: CommonAdministrativeAreaLevel2[];
                commonGetAdministrativeAreasLevel3: CommonAdministrativeAreaLevel3[];
            }>({
                query: getRelations,
                variables: {
                    queryBusinessPartners,
                    constraintBusinessPartners,
                    queryCountries,
                    constraintCountries,
                    queryAdministrativeAreasLevel1,
                    constraintAdministrativeAreasLevel1,
                    queryAdministrativeAreasLevel2,
                    constraintAdministrativeAreasLevel2,
                    queryAdministrativeAreasLevel3,
                    constraintAdministrativeAreasLevel3,
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
                    this.countryService.countriesSubject$.next(
                        data.commonGetCountries,
                    );
                    this.administrativeAreaLevel1Service.administrativeAreasLevel1Subject$.next(
                        data.commonGetAdministrativeAreasLevel1,
                    );
                    this.administrativeAreaLevel2Service.administrativeAreasLevel2Subject$.next(
                        data.commonGetAdministrativeAreasLevel2,
                    );
                    this.administrativeAreaLevel3Service.administrativeAreasLevel3Subject$.next(
                        data.commonGetAdministrativeAreasLevel3,
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
        object?: BusinessPartnerPortalCreatePartnerAddress;
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
        objects?: BusinessPartnerPortalCreatePartnerAddress[];
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
        object?: BusinessPartnerPortalUpdatePartnerAddressById;
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
        object?: BusinessPartnerPortalUpdatePartnerAddresses;
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
