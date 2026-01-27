/**
 * @aurora-generated
 * @source cliter/business-partner-portal/payment-collection-mode.aurora.yaml
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
    paymentModeId
    paymentMode {
        id
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
    }
    label
    accountNumber
    accountHolderName
    bankName
    routingNumber
    iban
    swiftCode
    currencyCode
    expirationDate
    isPrimary
    isActive
    notes
    lastUsedAt
    createdAt
    updatedAt
`;

export const relationsFields = `
    businessPartnerPortalGetBusinessPartners (
        query: $queryBusinessPartners
        constraint: $constraintBusinessPartners
    ) {
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
    businessPartnerPortalGetPaymentModes (
        query: $queryPaymentModes
        constraint: $constraintPaymentModes
    ) {
        id
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
    }
`;

// default methods
export const paginationQuery = gql`
    query BusinessPartnerPortalPaginatePaymentCollectionModes(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: businessPartnerPortalPaginatePaymentCollectionModes(
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
    query BusinessPartnerPortalGetPaymentCollectionModes(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: businessPartnerPortalGetPaymentCollectionModes(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query BusinessPartnerPortalGetPaymentCollectionModesRelations (
        $queryBusinessPartners: QueryStatement
        $constraintBusinessPartners: QueryStatement
        $queryPaymentModes: QueryStatement
        $constraintPaymentModes: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query BusinessPartnerPortalFindPaymentCollectionModeById(
        $id: ID
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPaymentCollectionModeById(
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query BusinessPartnerPortalFindPaymentCollectionModeByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryBusinessPartners: QueryStatement
        $constraintBusinessPartners: QueryStatement
        $queryPaymentModes: QueryStatement
        $constraintPaymentModes: QueryStatement
    ) {
        object: businessPartnerPortalFindPaymentCollectionModeById (
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
    query BusinessPartnerPortalFindPaymentCollectionMode(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPaymentCollectionMode(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation BusinessPartnerPortalCreatePaymentCollectionMode (
        $payload: BusinessPartnerPortalCreatePaymentCollectionModeInput!
    ) {
        businessPartnerPortalCreatePaymentCollectionMode (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation BusinessPartnerPortalCreatePaymentCollectionModes(
        $payload: [BusinessPartnerPortalCreatePaymentCollectionModeInput]!
    ) {
        businessPartnerPortalCreatePaymentCollectionModes(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation BusinessPartnerPortalUpdatePaymentCollectionModeById (
        $payload: BusinessPartnerPortalUpdatePaymentCollectionModeByIdInput!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePaymentCollectionModeById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation BusinessPartnerPortalUpdatePaymentCollectionModes (
        $payload: BusinessPartnerPortalUpdatePaymentCollectionModesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePaymentCollectionModes (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation BusinessPartnerPortalDeletePaymentCollectionModeById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePaymentCollectionModeById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation BusinessPartnerPortalDeletePaymentCollectionModes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePaymentCollectionModes (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
