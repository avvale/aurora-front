/**
 * @aurora-generated
 * @source cliter/business-partner-portal/payment-mode.aurora.yaml
 */
import gql from 'graphql-tag';

export const fields = `
    rowId
    externalId
    code
    name
    description
    type
    isAccountNumberRequired
    isRoutingInfoRequired
    isRecurringSupported
    sort
    isActive
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query BusinessPartnerPortalPaginatePaymentModes(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: businessPartnerPortalPaginatePaymentModes(
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
    query BusinessPartnerPortalGetPaymentModes(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: businessPartnerPortalGetPaymentModes(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query BusinessPartnerPortalFindPaymentModeById(
        $id: ID
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPaymentModeById(
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query BusinessPartnerPortalFindPaymentMode(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPaymentMode(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation BusinessPartnerPortalCreatePaymentMode (
        $payload: BusinessPartnerPortalCreatePaymentModeInput!
    ) {
        businessPartnerPortalCreatePaymentMode (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation BusinessPartnerPortalCreatePaymentModes(
        $payload: [BusinessPartnerPortalCreatePaymentModeInput]!
    ) {
        businessPartnerPortalCreatePaymentModes(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation BusinessPartnerPortalUpdatePaymentModeById (
        $payload: BusinessPartnerPortalUpdatePaymentModeByIdInput!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePaymentModeById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation BusinessPartnerPortalUpdatePaymentModes (
        $payload: BusinessPartnerPortalUpdatePaymentModesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePaymentModes (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation BusinessPartnerPortalDeletePaymentModeById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePaymentModeById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation BusinessPartnerPortalDeletePaymentModes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePaymentModes (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
