/**
 * @aurora-generated
 * @source cliter/business-partner-portal/sales-invoice-header.aurora.yaml
 */
import gql from 'graphql-tag';

export const fields = `
    rowId
    invoiceNumber
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
    customerNotes
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query BusinessPartnerPortalPaginateSalesInvoiceHeaders(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: businessPartnerPortalPaginateSalesInvoiceHeaders(
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
    query BusinessPartnerPortalGetSalesInvoiceHeaders(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: businessPartnerPortalGetSalesInvoiceHeaders(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query BusinessPartnerPortalFindSalesInvoiceHeaderById(
        $id: ID
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindSalesInvoiceHeaderById(
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query BusinessPartnerPortalFindSalesInvoiceHeader(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindSalesInvoiceHeader(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation BusinessPartnerPortalCreateSalesInvoiceHeader (
        $payload: BusinessPartnerPortalCreateSalesInvoiceHeaderInput!
    ) {
        businessPartnerPortalCreateSalesInvoiceHeader (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation BusinessPartnerPortalCreateSalesInvoiceHeaders(
        $payload: [BusinessPartnerPortalCreateSalesInvoiceHeaderInput]!
    ) {
        businessPartnerPortalCreateSalesInvoiceHeaders(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation BusinessPartnerPortalUpdateSalesInvoiceHeaderById (
        $payload: BusinessPartnerPortalUpdateSalesInvoiceHeaderByIdInput!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdateSalesInvoiceHeaderById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation BusinessPartnerPortalUpdateSalesInvoiceHeaders (
        $payload: BusinessPartnerPortalUpdateSalesInvoiceHeadersInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdateSalesInvoiceHeaders (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation BusinessPartnerPortalDeleteSalesInvoiceHeaderById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeleteSalesInvoiceHeaderById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation BusinessPartnerPortalDeleteSalesInvoiceHeaders (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeleteSalesInvoiceHeaders (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
