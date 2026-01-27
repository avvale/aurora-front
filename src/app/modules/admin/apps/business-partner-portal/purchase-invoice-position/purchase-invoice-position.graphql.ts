/**
 * @aurora-generated
 * @source cliter/business-partner-portal/purchase-invoice-position.aurora.yaml
 */
import gql from 'graphql-tag';

export const fields = `
    rowId
    purchaseInvoiceHeaderId
    purchaseInvoiceHeader {
        id
        rowId
        invoiceNumber
        supplierInvoiceNumber
        externalId
        externalSystemCode
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
    expenseCategory
    notes
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query BusinessPartnerPortalPaginatePurchaseInvoicePositions(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: businessPartnerPortalPaginatePurchaseInvoicePositions(
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
    query BusinessPartnerPortalGetPurchaseInvoicePositions(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: businessPartnerPortalGetPurchaseInvoicePositions(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query BusinessPartnerPortalFindPurchaseInvoicePositionById(
        $id: ID
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPurchaseInvoicePositionById(
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query BusinessPartnerPortalFindPurchaseInvoicePosition(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPurchaseInvoicePosition(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation BusinessPartnerPortalCreatePurchaseInvoicePosition (
        $payload: BusinessPartnerPortalCreatePurchaseInvoicePositionInput!
    ) {
        businessPartnerPortalCreatePurchaseInvoicePosition (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation BusinessPartnerPortalCreatePurchaseInvoicePositions(
        $payload: [BusinessPartnerPortalCreatePurchaseInvoicePositionInput]!
    ) {
        businessPartnerPortalCreatePurchaseInvoicePositions(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation BusinessPartnerPortalUpdatePurchaseInvoicePositionById (
        $payload: BusinessPartnerPortalUpdatePurchaseInvoicePositionByIdInput!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePurchaseInvoicePositionById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation BusinessPartnerPortalUpdatePurchaseInvoicePositions (
        $payload: BusinessPartnerPortalUpdatePurchaseInvoicePositionsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePurchaseInvoicePositions (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation BusinessPartnerPortalDeletePurchaseInvoicePositionById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePurchaseInvoicePositionById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation BusinessPartnerPortalDeletePurchaseInvoicePositions (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePurchaseInvoicePositions (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
