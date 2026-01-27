/**
 * @aurora-generated
 * @source cliter/business-partner-portal/supplier-document.aurora.yaml
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
    documentNumber
    documentType
    status
    file
    fileHash
    supplierInvoiceNumber
    supplierInvoiceDate
    supplierInvoiceAmount
    currencyCode
    externalDocumentId
    externalCompanyCode
    externalProcessingStatus
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
    ocrConfidenceScore
    ocrData
    sentForProcessingAt
    processedAt
    linkedAt
    errorCode
    errorMessage
    retryCount
    lastRetryAt
    notes
    supplierNotes
    isArchived
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
    businessPartnerPortalGetPurchaseInvoiceHeaders (
        query: $queryPurchaseInvoiceHeaders
        constraint: $constraintPurchaseInvoiceHeaders
    ) {
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
`;

// default methods
export const paginationQuery = gql`
    query BusinessPartnerPortalPaginateSupplierDocuments(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: businessPartnerPortalPaginateSupplierDocuments(
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
    query BusinessPartnerPortalGetSupplierDocuments(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: businessPartnerPortalGetSupplierDocuments(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query BusinessPartnerPortalGetSupplierDocumentsRelations (
        $queryBusinessPartners: QueryStatement
        $constraintBusinessPartners: QueryStatement
        $queryPurchaseInvoiceHeaders: QueryStatement
        $constraintPurchaseInvoiceHeaders: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query BusinessPartnerPortalFindSupplierDocumentById(
        $id: ID
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindSupplierDocumentById(
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query BusinessPartnerPortalFindSupplierDocumentByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryBusinessPartners: QueryStatement
        $constraintBusinessPartners: QueryStatement
        $queryPurchaseInvoiceHeaders: QueryStatement
        $constraintPurchaseInvoiceHeaders: QueryStatement
    ) {
        object: businessPartnerPortalFindSupplierDocumentById (
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
    query BusinessPartnerPortalFindSupplierDocument(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindSupplierDocument(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation BusinessPartnerPortalCreateSupplierDocument (
        $payload: BusinessPartnerPortalCreateSupplierDocumentInput!
    ) {
        businessPartnerPortalCreateSupplierDocument (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation BusinessPartnerPortalCreateSupplierDocuments(
        $payload: [BusinessPartnerPortalCreateSupplierDocumentInput]!
    ) {
        businessPartnerPortalCreateSupplierDocuments(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation BusinessPartnerPortalUpdateSupplierDocumentById (
        $payload: BusinessPartnerPortalUpdateSupplierDocumentByIdInput!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdateSupplierDocumentById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation BusinessPartnerPortalUpdateSupplierDocuments (
        $payload: BusinessPartnerPortalUpdateSupplierDocumentsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdateSupplierDocuments (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation BusinessPartnerPortalDeleteSupplierDocumentById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeleteSupplierDocumentById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation BusinessPartnerPortalDeleteSupplierDocuments (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeleteSupplierDocuments (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
