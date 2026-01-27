/**
 * @aurora-generated
 * @source cliter/business-partner-portal/business-partner.aurora.yaml
 */
import gql from 'graphql-tag';

export const fields = `
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
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query BusinessPartnerPortalPaginateBusinessPartners(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: businessPartnerPortalPaginateBusinessPartners(
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
    query BusinessPartnerPortalGetBusinessPartners(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: businessPartnerPortalGetBusinessPartners(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query BusinessPartnerPortalFindBusinessPartnerById(
        $id: ID
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindBusinessPartnerById(
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query BusinessPartnerPortalFindBusinessPartner(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindBusinessPartner(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation BusinessPartnerPortalCreateBusinessPartner (
        $payload: BusinessPartnerPortalCreateBusinessPartnerInput!
    ) {
        businessPartnerPortalCreateBusinessPartner (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation BusinessPartnerPortalCreateBusinessPartners(
        $payload: [BusinessPartnerPortalCreateBusinessPartnerInput]!
    ) {
        businessPartnerPortalCreateBusinessPartners(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation BusinessPartnerPortalUpdateBusinessPartnerById (
        $payload: BusinessPartnerPortalUpdateBusinessPartnerByIdInput!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdateBusinessPartnerById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation BusinessPartnerPortalUpdateBusinessPartners (
        $payload: BusinessPartnerPortalUpdateBusinessPartnersInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdateBusinessPartners (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation BusinessPartnerPortalDeleteBusinessPartnerById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeleteBusinessPartnerById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation BusinessPartnerPortalDeleteBusinessPartners (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeleteBusinessPartners (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
