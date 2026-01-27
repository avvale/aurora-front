/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-contact.aurora.yaml
 */
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import {
    BusinessPartnerPortalBusinessPartner,
    BusinessPartnerPortalCreatePartnerContact,
    BusinessPartnerPortalPartnerContact,
    BusinessPartnerPortalUpdatePartnerContactById,
    BusinessPartnerPortalUpdatePartnerContacts,
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
} from '@apps/business-partner-portal/partner-contact';
import { IamUser } from '@apps/iam';
import { UserService } from '@apps/iam/user';
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
export class PartnerContactService {
    paginationSubject$: BehaviorSubject<GridData<BusinessPartnerPortalPartnerContact> | null> =
        new BehaviorSubject(null);
    partnerContactSubject$: BehaviorSubject<BusinessPartnerPortalPartnerContact | null> =
        new BehaviorSubject(null);
    partnerContactsSubject$: BehaviorSubject<
        BusinessPartnerPortalPartnerContact[] | null
    > = new BehaviorSubject(null);

    // scoped subjects
    paginationScoped: {
        [
            key: string
        ]: BehaviorSubject<GridData<BusinessPartnerPortalPartnerContact> | null>;
    } = {};
    partnerContactScoped: {
        [
            key: string
        ]: BehaviorSubject<BusinessPartnerPortalPartnerContact | null>;
    } = {};
    partnerContactsScoped: {
        [key: string]: BehaviorSubject<
            BusinessPartnerPortalPartnerContact[] | null
        >;
    } = {};

    constructor(
        private readonly businessPartnerService: BusinessPartnerService,
        private readonly graphqlService: GraphQLService,
        private readonly userService: UserService,
    ) {}

    /**
     * Getters
     */
    get pagination$(): Observable<
        GridData<BusinessPartnerPortalPartnerContact>
    > {
        return this.paginationSubject$.asObservable();
    }

    get partnerContact$(): Observable<BusinessPartnerPortalPartnerContact> {
        return this.partnerContactSubject$.asObservable();
    }

    get partnerContacts$(): Observable<BusinessPartnerPortalPartnerContact[]> {
        return this.partnerContactsSubject$.asObservable();
    }

    // allows to store different types of pagination under different scopes this allows us
    // to have multiple observables with different streams of pagination data.
    setScopePagination(
        scope: string,
        pagination: GridData<BusinessPartnerPortalPartnerContact>,
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
    ): Observable<GridData<BusinessPartnerPortalPartnerContact>> {
        if (!this.paginationScoped[scope])
            this.paginationScoped[scope] = new BehaviorSubject(null);
        return this.paginationScoped[scope].asObservable();
    }

    setScopePartnerContact(
        scope: string,
        object: BusinessPartnerPortalPartnerContact,
    ): void {
        if (this.partnerContactScoped[scope]) {
            this.partnerContactScoped[scope].next(object);
            return;
        }
        // create new subject if not exist
        this.partnerContactScoped[scope] = new BehaviorSubject(object);
    }

    getScopePartnerContact(
        scope: string,
    ): Observable<BusinessPartnerPortalPartnerContact> {
        if (!this.partnerContactScoped[scope])
            this.partnerContactScoped[scope] = new BehaviorSubject(null);
        return this.partnerContactScoped[scope].asObservable();
    }

    setScopePartnerContacts(
        scope: string,
        objects: BusinessPartnerPortalPartnerContact[],
    ): void {
        if (this.partnerContactsScoped[scope]) {
            this.partnerContactsScoped[scope].next(objects);
            return;
        }
        // create new subject if not exist
        this.partnerContactsScoped[scope] = new BehaviorSubject(objects);
    }

    getScopePartnerContacts(
        scope: string,
    ): Observable<BusinessPartnerPortalPartnerContact[]> {
        if (!this.partnerContactsScoped[scope])
            this.partnerContactsScoped[scope] = new BehaviorSubject(null);
        return this.partnerContactsScoped[scope].asObservable();
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
    } = {}): Observable<GridData<BusinessPartnerPortalPartnerContact>> {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{
                pagination: GridData<BusinessPartnerPortalPartnerContact>;
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
        object: BusinessPartnerPortalPartnerContact;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPartnerContact;
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
                        ? this.setScopePartnerContact(scope, data.object)
                        : this.partnerContactSubject$.next(data.object),
                ),
            );
    }

    findByIdWithRelations({
        graphqlStatement = findByIdWithRelationsQuery,
        id = '',
        constraint = {},
        queryBusinessPartners = {},
        constraintBusinessPartners = {},
        queryUsers = {},
        constraintUsers = {},
        headers = {},
        scope,
    }: {
        graphqlStatement?: DocumentNode;
        id?: string;
        constraint?: QueryStatement;
        queryBusinessPartners?: QueryStatement;
        constraintBusinessPartners?: QueryStatement;
        queryUsers?: QueryStatement;
        constraintUsers?: QueryStatement;
        headers?: GraphQLHeaders;
        scope?: string;
    } = {}): Observable<{
        object: BusinessPartnerPortalPartnerContact;
        businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
        iamGetUsers: IamUser[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPartnerContact;
                businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
                iamGetUsers: IamUser[];
            }>({
                query: parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryBusinessPartners,
                    constraintBusinessPartners,
                    queryUsers,
                    constraintUsers,
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
                        this.setScopePartnerContact(scope, data.object);
                    } else {
                        this.partnerContactSubject$.next(data.object);
                    }
                    this.businessPartnerService.businessPartnersSubject$.next(
                        data.businessPartnerPortalGetBusinessPartners,
                    );
                    this.userService.usersSubject$.next(data.iamGetUsers);
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
        object: BusinessPartnerPortalPartnerContact;
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: BusinessPartnerPortalPartnerContact;
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
                        ? this.setScopePartnerContact(scope, data.object)
                        : this.partnerContactSubject$.next(data.object),
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
        objects: BusinessPartnerPortalPartnerContact[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: BusinessPartnerPortalPartnerContact[];
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
                        ? this.setScopePartnerContacts(scope, data.objects)
                        : this.partnerContactsSubject$.next(data.objects),
                ),
            );
    }

    getRelations({
        queryBusinessPartners = {},
        constraintBusinessPartners = {},
        queryUsers = {},
        constraintUsers = {},
        headers = {},
    }: {
        queryBusinessPartners?: QueryStatement;
        constraintBusinessPartners?: QueryStatement;
        queryUsers?: QueryStatement;
        constraintUsers?: QueryStatement;
        headers?: GraphQLHeaders;
    } = {}): Observable<{
        businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
        iamGetUsers: IamUser[];
    }> {
        return this.graphqlService
            .client()
            .watchQuery<{
                businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
                iamGetUsers: IamUser[];
            }>({
                query: getRelations,
                variables: {
                    queryBusinessPartners,
                    constraintBusinessPartners,
                    queryUsers,
                    constraintUsers,
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
                    this.userService.usersSubject$.next(data.iamGetUsers);
                }),
            );
    }

    create<T>({
        graphqlStatement = createMutation,
        object = null,
        headers = {},
    }: {
        graphqlStatement?: DocumentNode;
        object?: BusinessPartnerPortalCreatePartnerContact;
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
        objects?: BusinessPartnerPortalCreatePartnerContact[];
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
        object?: BusinessPartnerPortalUpdatePartnerContactById;
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
        object?: BusinessPartnerPortalUpdatePartnerContacts;
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
