/**
 * @aurora-generated
 * @source cliter/business-partner-portal/sales-invoice-position.aurora.yaml
 */
import gql from 'graphql-tag';

export const fields = `
    rowId
    salesInvoiceHeaderId
    salesInvoiceHeader {
        id
        rowId
        invoiceNumber
        externalId
        externalSystemCode
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
    }
    positionNumber
    description
    productCode
    quantity
    unitPrice
    discountPercent
    discountAmount
    taxPercent
    taxAmount
    subtotal
    positionTotal
    notes
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query BusinessPartnerPortalPaginateSalesInvoicePositions(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: businessPartnerPortalPaginateSalesInvoicePositions(
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
    query BusinessPartnerPortalGetSalesInvoicePositions(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: businessPartnerPortalGetSalesInvoicePositions(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query BusinessPartnerPortalFindSalesInvoicePositionById(
        $id: ID
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindSalesInvoicePositionById(
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query BusinessPartnerPortalFindSalesInvoicePosition(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindSalesInvoicePosition(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation BusinessPartnerPortalCreateSalesInvoicePosition (
        $payload: BusinessPartnerPortalCreateSalesInvoicePositionInput!
    ) {
        businessPartnerPortalCreateSalesInvoicePosition (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation BusinessPartnerPortalCreateSalesInvoicePositions(
        $payload: [BusinessPartnerPortalCreateSalesInvoicePositionInput]!
    ) {
        businessPartnerPortalCreateSalesInvoicePositions(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation BusinessPartnerPortalUpdateSalesInvoicePositionById (
        $payload: BusinessPartnerPortalUpdateSalesInvoicePositionByIdInput!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdateSalesInvoicePositionById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation BusinessPartnerPortalUpdateSalesInvoicePositions (
        $payload: BusinessPartnerPortalUpdateSalesInvoicePositionsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdateSalesInvoicePositions (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation BusinessPartnerPortalDeleteSalesInvoicePositionById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeleteSalesInvoicePositionById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation BusinessPartnerPortalDeleteSalesInvoicePositions (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeleteSalesInvoicePositions (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
