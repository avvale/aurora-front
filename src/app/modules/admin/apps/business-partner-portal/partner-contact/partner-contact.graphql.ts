/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-contact.aurora.yaml
 */
import gql from 'graphql-tag';

export const fields = `
    rowId
    businessPartnerId
    businessPartner {
        id
        rowId
        externalId
        code
        type
        name
        tin
        email
        website
        phone
        phoneCountryPrefix
        phoneSanitized
        isActive
        meta
    }
    firstName
    lastName
    position
    department
    email
    phone
    phoneCountryPrefix
    phoneSanitized
    mobile
    mobileCountryPrefix
    mobileSanitized
    isPrincipal
    isActive
    isUser
    userId
    preferredLanguage
    notes
    createdAt
    updatedAt
`;

export const relationsFields = `
    iamGetUsers (
        query: $queryUsers
        constraint: $constraintUsers
    ) {
        id
        rowId
        name
        surname
        avatar
        mobile
        langId
        password
        isTwoFactorAuthenticationEnabled
        twoFactorAuthenticationSecret
        rememberToken
        meta
    }
`;

// default methods
export const paginationQuery = gql`
    query BusinessPartnerPortalPaginatePartnerContacts(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: businessPartnerPortalPaginatePartnerContacts(
            query: $query
            constraint: $constraint
        ) {
            total
            rows
            count
        }
    }
`;

export const getQuery = gql`
    query BusinessPartnerPortalGetPartnerContacts(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: businessPartnerPortalGetPartnerContacts(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query BusinessPartnerPortalGetPartnerContactsRelations (
        $queryUsers: QueryStatement
        $constraintUsers: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query BusinessPartnerPortalFindPartnerContactById(
        $id: ID
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPartnerContactById(
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query BusinessPartnerPortalFindPartnerContactByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryUsers: QueryStatement
        $constraintUsers: QueryStatement
    ) {
        object: businessPartnerPortalFindPartnerContactById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query BusinessPartnerPortalFindPartnerContact(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPartnerContact(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation BusinessPartnerPortalCreatePartnerContact (
        $payload: BusinessPartnerPortalCreatePartnerContactInput!
    ) {
        businessPartnerPortalCreatePartnerContact (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation BusinessPartnerPortalCreatePartnerContacts(
        $payload: [BusinessPartnerPortalCreatePartnerContactInput]!
    ) {
        businessPartnerPortalCreatePartnerContacts(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation BusinessPartnerPortalUpdatePartnerContactById (
        $payload: BusinessPartnerPortalUpdatePartnerContactByIdInput!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePartnerContactById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation BusinessPartnerPortalUpdatePartnerContacts (
        $payload: BusinessPartnerPortalUpdatePartnerContactsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePartnerContacts (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation BusinessPartnerPortalDeletePartnerContactById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePartnerContactById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation BusinessPartnerPortalDeletePartnerContacts (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePartnerContacts (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
