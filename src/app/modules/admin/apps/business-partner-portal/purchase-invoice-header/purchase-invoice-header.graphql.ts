/**
 * @aurora-generated
 * @source cliter/business-partner-portal/purchase-invoice-header.aurora.yaml
 */
import gql from 'graphql-tag';

export const fields = `
    rowId
    invoiceNumber
    supplierInvoiceNumber
    externalId
    externalSystemCode
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
    invoiceDate
    receivedDate
    dueDate
    status
    subtotal
    taxAmount
    discountAmount
    totalAmount
    paidAmount
    currencyCode
    paymentTermDays
    notes
    approvalNotes
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query BusinessPartnerPortalPaginatePurchaseInvoiceHeaders(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: businessPartnerPortalPaginatePurchaseInvoiceHeaders(
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
    query BusinessPartnerPortalGetPurchaseInvoiceHeaders(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: businessPartnerPortalGetPurchaseInvoiceHeaders(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query BusinessPartnerPortalFindPurchaseInvoiceHeaderById(
        $id: ID
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPurchaseInvoiceHeaderById(
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query BusinessPartnerPortalFindPurchaseInvoiceHeader(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPurchaseInvoiceHeader(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation BusinessPartnerPortalCreatePurchaseInvoiceHeader (
        $payload: BusinessPartnerPortalCreatePurchaseInvoiceHeaderInput!
    ) {
        businessPartnerPortalCreatePurchaseInvoiceHeader (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation BusinessPartnerPortalCreatePurchaseInvoiceHeaders(
        $payload: [BusinessPartnerPortalCreatePurchaseInvoiceHeaderInput]!
    ) {
        businessPartnerPortalCreatePurchaseInvoiceHeaders(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation BusinessPartnerPortalUpdatePurchaseInvoiceHeaderById (
        $payload: BusinessPartnerPortalUpdatePurchaseInvoiceHeaderByIdInput!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePurchaseInvoiceHeaderById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation BusinessPartnerPortalUpdatePurchaseInvoiceHeaders (
        $payload: BusinessPartnerPortalUpdatePurchaseInvoiceHeadersInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePurchaseInvoiceHeaders (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation BusinessPartnerPortalDeletePurchaseInvoiceHeaderById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePurchaseInvoiceHeaderById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation BusinessPartnerPortalDeletePurchaseInvoiceHeaders (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePurchaseInvoiceHeaders (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
