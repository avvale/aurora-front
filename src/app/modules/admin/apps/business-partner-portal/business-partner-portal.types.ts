import {
    CommonAdministrativeAreaLevel1,
    CommonAdministrativeAreaLevel2,
    CommonAdministrativeAreaLevel3,
    CommonCountry,
} from '@apps/common';

export interface BusinessPartnerPortalPartnerAddress {
    id: string;
    rowId: number;
    businessPartnerId: string;
    businessPartner: BusinessPartnerPortalBusinessPartner;
    type: string;
    label?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode?: string;
    countryId: string;
    country: CommonCountry;
    administrativeAreaLevel1Id?: string;
    administrativeAreaLevel1?: CommonAdministrativeAreaLevel1;
    administrativeAreaLevel2Id?: string;
    administrativeAreaLevel2?: CommonAdministrativeAreaLevel2;
    administrativeAreaLevel3Id?: string;
    administrativeAreaLevel3?: CommonAdministrativeAreaLevel3;
    latitude?: number;
    longitude?: number;
    isPrimary: boolean;
    isActive: boolean;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface BusinessPartnerPortalCreatePartnerAddress {
    id: string;
    rowId: number;
    businessPartnerId: string;
    type:
        | 'BILLING'
        | 'SHIPPING'
        | 'OFFICE'
        | 'WAREHOUSE'
        | 'HEADQUARTERS'
        | 'OTHER';
    label?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode?: string;
    countryId: string;
    administrativeAreaLevel1Id?: string;
    administrativeAreaLevel2Id?: string;
    administrativeAreaLevel3Id?: string;
    latitude?: number;
    longitude?: number;
    isPrimary: boolean;
    isActive: boolean;
    notes?: string;
}

export interface BusinessPartnerPortalUpdatePartnerAddressById {
    id: string;
    rowId?: number;
    businessPartnerId?: string;
    type?: string;
    label?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    postalCode?: string;
    countryId?: string;
    administrativeAreaLevel1Id?: string;
    administrativeAreaLevel2Id?: string;
    administrativeAreaLevel3Id?: string;
    latitude?: number;
    longitude?: number;
    isPrimary?: boolean;
    isActive?: boolean;
    notes?: string;
}

export interface BusinessPartnerPortalUpdatePartnerAddresses {
    id?: string;
    rowId?: number;
    businessPartnerId?: string;
    type?:
        | 'BILLING'
        | 'SHIPPING'
        | 'OFFICE'
        | 'WAREHOUSE'
        | 'HEADQUARTERS'
        | 'OTHER';
    label?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    postalCode?: string;
    countryId?: string;
    administrativeAreaLevel1Id?: string;
    administrativeAreaLevel2Id?: string;
    administrativeAreaLevel3Id?: string;
    latitude?: number;
    longitude?: number;
    isPrimary?: boolean;
    isActive?: boolean;
    notes?: string;
}

export interface BusinessPartnerPortalPartnerContact {
    id: string;
    rowId: number;
    businessPartnerId: string;
    businessPartner: BusinessPartnerPortalBusinessPartner;
    firstName: string;
    lastName: string;
    position?: string;
    department?: string;
    email: string;
    phone?: string;
    mobile?: string;
    isPrimary: boolean;
    isActive: boolean;
    isUser: boolean;
    userId?: string;
    preferredLanguage?: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface BusinessPartnerPortalCreatePartnerContact {
    id: string;
    rowId: number;
    businessPartnerId: string;
    firstName: string;
    lastName: string;
    position?: string;
    department?: string;
    email: string;
    phone?: string;
    mobile?: string;
    isPrimary: boolean;
    isActive: boolean;
    isUser: boolean;
    userId?: string;
    preferredLanguage?: string;
    notes?: string;
}

export interface BusinessPartnerPortalUpdatePartnerContactById {
    id: string;
    rowId?: number;
    businessPartnerId?: string;
    firstName?: string;
    lastName?: string;
    position?: string;
    department?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    isPrimary?: boolean;
    isActive?: boolean;
    isUser?: boolean;
    userId?: string;
    preferredLanguage?: string;
    notes?: string;
}

export interface BusinessPartnerPortalUpdatePartnerContacts {
    id?: string;
    rowId?: number;
    businessPartnerId?: string;
    firstName?: string;
    lastName?: string;
    position?: string;
    department?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    isPrimary?: boolean;
    isActive?: boolean;
    isUser?: boolean;
    userId?: string;
    preferredLanguage?: string;
    notes?: string;
}

export interface BusinessPartnerPortalPaymentMode {
    id: string;
    rowId: number;
    externalId?: string;
    code?: string;
    name: string;
    description?: string;
    type: string;
    isAccountNumberRequired: boolean;
    isRoutingInfoRequired: boolean;
    isRecurringSupported: boolean;
    sort?: number;
    isActive: boolean;
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface BusinessPartnerPortalCreatePaymentMode {
    id: string;
    rowId: number;
    externalId?: string;
    code?: string;
    name: string;
    description?: string;
    type:
        | 'ELECTRONIC'
        | 'CASH'
        | 'CHECK'
        | 'CARD'
        | 'WIRE'
        | 'DIRECT_DEBIT'
        | 'DIGITAL_WALLET'
        | 'OTHER';
    isAccountNumberRequired: boolean;
    isRoutingInfoRequired: boolean;
    isRecurringSupported: boolean;
    sort?: number;
    isActive: boolean;
    meta?: any;
}

export interface BusinessPartnerPortalUpdatePaymentModeById {
    id: string;
    rowId?: number;
    externalId?: string;
    code?: string;
    name?: string;
    description?: string;
    type?: string;
    isAccountNumberRequired?: boolean;
    isRoutingInfoRequired?: boolean;
    isRecurringSupported?: boolean;
    sort?: number;
    isActive?: boolean;
    meta?: any;
}

export interface BusinessPartnerPortalUpdatePaymentModes {
    id?: string;
    rowId?: number;
    externalId?: string;
    code?: string;
    name?: string;
    description?: string;
    type?:
        | 'ELECTRONIC'
        | 'CASH'
        | 'CHECK'
        | 'CARD'
        | 'WIRE'
        | 'DIRECT_DEBIT'
        | 'DIGITAL_WALLET'
        | 'OTHER';
    isAccountNumberRequired?: boolean;
    isRoutingInfoRequired?: boolean;
    isRecurringSupported?: boolean;
    sort?: number;
    isActive?: boolean;
    meta?: any;
}

export interface BusinessPartnerPortalPaymentCollectionMode {
    id: string;
    rowId: number;
    businessPartnerId: string;
    businessPartner: BusinessPartnerPortalBusinessPartner;
    paymentModeId: string;
    paymentMode: BusinessPartnerPortalPaymentMode;
    label?: string;
    accountNumber?: string;
    accountHolderName?: string;
    bankName?: string;
    routingNumber?: string;
    iban?: string;
    swiftCode?: string;
    currencyCode?: string;
    expirationDate?: string;
    isPrimary: boolean;
    isActive: boolean;
    notes?: string;
    lastUsedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface BusinessPartnerPortalCreatePaymentCollectionMode {
    id: string;
    rowId: number;
    businessPartnerId: string;
    paymentModeId: string;
    label?: string;
    accountNumber?: string;
    accountHolderName?: string;
    bankName?: string;
    routingNumber?: string;
    iban?: string;
    swiftCode?: string;
    currencyCode?: string;
    expirationDate?: string;
    isPrimary: boolean;
    isActive: boolean;
    notes?: string;
    lastUsedAt?: string;
}

export interface BusinessPartnerPortalUpdatePaymentCollectionModeById {
    id: string;
    rowId?: number;
    businessPartnerId?: string;
    paymentModeId?: string;
    label?: string;
    accountNumber?: string;
    accountHolderName?: string;
    bankName?: string;
    routingNumber?: string;
    iban?: string;
    swiftCode?: string;
    currencyCode?: string;
    expirationDate?: string;
    isPrimary?: boolean;
    isActive?: boolean;
    notes?: string;
    lastUsedAt?: string;
}

export interface BusinessPartnerPortalUpdatePaymentCollectionModes {
    id?: string;
    rowId?: number;
    businessPartnerId?: string;
    paymentModeId?: string;
    label?: string;
    accountNumber?: string;
    accountHolderName?: string;
    bankName?: string;
    routingNumber?: string;
    iban?: string;
    swiftCode?: string;
    currencyCode?: string;
    expirationDate?: string;
    isPrimary?: boolean;
    isActive?: boolean;
    notes?: string;
    lastUsedAt?: string;
}

export interface BusinessPartnerPortalSalesInvoiceHeader {
    id: string;
    rowId: number;
    invoiceNumber: string;
    externalId?: string;
    externalSystemCode?: string;
    businessPartnerId: string;
    businessPartner: BusinessPartnerPortalBusinessPartner;
    invoiceDate: string;
    dueDate?: string;
    status: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    paidAmount: number;
    currencyCode: string;
    paymentTermDays?: number;
    notes?: string;
    customerNotes?: string;
    positions?: BusinessPartnerPortalSalesInvoicePosition[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface BusinessPartnerPortalCreateSalesInvoiceHeader {
    id: string;
    rowId: number;
    invoiceNumber: string;
    externalId?: string;
    externalSystemCode?: string;
    businessPartnerId: string;
    invoiceDate: string;
    dueDate?: string;
    status:
        | 'DRAFT'
        | 'SENT'
        | 'PAID'
        | 'PARTIALLY_PAID'
        | 'OVERDUE'
        | 'CANCELLED'
        | 'REFUNDED';
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    paidAmount: number;
    currencyCode: string;
    paymentTermDays?: number;
    notes?: string;
    customerNotes?: string;
    positions?: BusinessPartnerPortalSalesInvoicePosition[];
}

export interface BusinessPartnerPortalUpdateSalesInvoiceHeaderById {
    id: string;
    rowId?: number;
    invoiceNumber?: string;
    externalId?: string;
    externalSystemCode?: string;
    businessPartnerId?: string;
    invoiceDate?: string;
    dueDate?: string;
    status?: string;
    subtotal?: number;
    taxAmount?: number;
    discountAmount?: number;
    totalAmount?: number;
    paidAmount?: number;
    currencyCode?: string;
    paymentTermDays?: number;
    notes?: string;
    customerNotes?: string;
    positions?: BusinessPartnerPortalSalesInvoicePosition[];
}

export interface BusinessPartnerPortalUpdateSalesInvoiceHeaders {
    id?: string;
    rowId?: number;
    invoiceNumber?: string;
    externalId?: string;
    externalSystemCode?: string;
    businessPartnerId?: string;
    invoiceDate?: string;
    dueDate?: string;
    status?:
        | 'DRAFT'
        | 'SENT'
        | 'PAID'
        | 'PARTIALLY_PAID'
        | 'OVERDUE'
        | 'CANCELLED'
        | 'REFUNDED';
    subtotal?: number;
    taxAmount?: number;
    discountAmount?: number;
    totalAmount?: number;
    paidAmount?: number;
    currencyCode?: string;
    paymentTermDays?: number;
    notes?: string;
    customerNotes?: string;
    positions?: BusinessPartnerPortalSalesInvoicePosition[];
}

export interface BusinessPartnerPortalSalesInvoicePosition {
    id: string;
    rowId: number;
    salesInvoiceHeaderId: string;
    salesInvoiceHeader: BusinessPartnerPortalSalesInvoiceHeader;
    positionNumber: number;
    description: string;
    productCode?: string;
    quantity: number;
    unitPrice: number;
    discountPercent: number;
    discountAmount: number;
    taxPercent: number;
    taxAmount: number;
    subtotal: number;
    positionTotal: number;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface BusinessPartnerPortalCreateSalesInvoicePosition {
    id: string;
    rowId: number;
    salesInvoiceHeaderId: string;
    positionNumber: number;
    description: string;
    productCode?: string;
    quantity: number;
    unitPrice: number;
    discountPercent: number;
    discountAmount: number;
    taxPercent: number;
    taxAmount: number;
    subtotal: number;
    positionTotal: number;
    notes?: string;
}

export interface BusinessPartnerPortalUpdateSalesInvoicePositionById {
    id: string;
    rowId?: number;
    salesInvoiceHeaderId?: string;
    positionNumber?: number;
    description?: string;
    productCode?: string;
    quantity?: number;
    unitPrice?: number;
    discountPercent?: number;
    discountAmount?: number;
    taxPercent?: number;
    taxAmount?: number;
    subtotal?: number;
    positionTotal?: number;
    notes?: string;
}

export interface BusinessPartnerPortalUpdateSalesInvoicePositions {
    id?: string;
    rowId?: number;
    salesInvoiceHeaderId?: string;
    positionNumber?: number;
    description?: string;
    productCode?: string;
    quantity?: number;
    unitPrice?: number;
    discountPercent?: number;
    discountAmount?: number;
    taxPercent?: number;
    taxAmount?: number;
    subtotal?: number;
    positionTotal?: number;
    notes?: string;
}

export interface BusinessPartnerPortalPurchaseInvoiceHeader {
    id: string;
    rowId: number;
    invoiceNumber: string;
    supplierInvoiceNumber?: string;
    externalId?: string;
    externalSystemCode?: string;
    businessPartnerId: string;
    businessPartner: BusinessPartnerPortalBusinessPartner;
    invoiceDate: string;
    receivedDate?: string;
    dueDate?: string;
    status: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    paidAmount: number;
    currencyCode: string;
    paymentTermDays?: number;
    notes?: string;
    approvalNotes?: string;
    positions?: BusinessPartnerPortalPurchaseInvoicePosition[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface BusinessPartnerPortalCreatePurchaseInvoiceHeader {
    id: string;
    rowId: number;
    invoiceNumber: string;
    supplierInvoiceNumber?: string;
    externalId?: string;
    externalSystemCode?: string;
    businessPartnerId: string;
    invoiceDate: string;
    receivedDate?: string;
    dueDate?: string;
    status:
        | 'DRAFT'
        | 'RECEIVED'
        | 'APPROVED'
        | 'PAID'
        | 'PARTIALLY_PAID'
        | 'OVERDUE'
        | 'CANCELLED'
        | 'REFUNDED';
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    paidAmount: number;
    currencyCode: string;
    paymentTermDays?: number;
    notes?: string;
    approvalNotes?: string;
    positions?: BusinessPartnerPortalPurchaseInvoicePosition[];
}

export interface BusinessPartnerPortalUpdatePurchaseInvoiceHeaderById {
    id: string;
    rowId?: number;
    invoiceNumber?: string;
    supplierInvoiceNumber?: string;
    externalId?: string;
    externalSystemCode?: string;
    businessPartnerId?: string;
    invoiceDate?: string;
    receivedDate?: string;
    dueDate?: string;
    status?: string;
    subtotal?: number;
    taxAmount?: number;
    discountAmount?: number;
    totalAmount?: number;
    paidAmount?: number;
    currencyCode?: string;
    paymentTermDays?: number;
    notes?: string;
    approvalNotes?: string;
    positions?: BusinessPartnerPortalPurchaseInvoicePosition[];
}

export interface BusinessPartnerPortalUpdatePurchaseInvoiceHeaders {
    id?: string;
    rowId?: number;
    invoiceNumber?: string;
    supplierInvoiceNumber?: string;
    externalId?: string;
    externalSystemCode?: string;
    businessPartnerId?: string;
    invoiceDate?: string;
    receivedDate?: string;
    dueDate?: string;
    status?:
        | 'DRAFT'
        | 'RECEIVED'
        | 'APPROVED'
        | 'PAID'
        | 'PARTIALLY_PAID'
        | 'OVERDUE'
        | 'CANCELLED'
        | 'REFUNDED';
    subtotal?: number;
    taxAmount?: number;
    discountAmount?: number;
    totalAmount?: number;
    paidAmount?: number;
    currencyCode?: string;
    paymentTermDays?: number;
    notes?: string;
    approvalNotes?: string;
    positions?: BusinessPartnerPortalPurchaseInvoicePosition[];
}

export interface BusinessPartnerPortalPurchaseInvoicePosition {
    id: string;
    rowId: number;
    purchaseInvoiceHeaderId: string;
    purchaseInvoiceHeader: BusinessPartnerPortalPurchaseInvoiceHeader;
    positionNumber: number;
    description: string;
    productCode?: string;
    quantity: number;
    unitPrice: number;
    discountPercent: number;
    discountAmount: number;
    taxPercent: number;
    taxAmount: number;
    subtotal: number;
    positionTotal: number;
    expenseCategory?: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface BusinessPartnerPortalCreatePurchaseInvoicePosition {
    id: string;
    rowId: number;
    purchaseInvoiceHeaderId: string;
    positionNumber: number;
    description: string;
    productCode?: string;
    quantity: number;
    unitPrice: number;
    discountPercent: number;
    discountAmount: number;
    taxPercent: number;
    taxAmount: number;
    subtotal: number;
    positionTotal: number;
    expenseCategory?: string;
    notes?: string;
}

export interface BusinessPartnerPortalUpdatePurchaseInvoicePositionById {
    id: string;
    rowId?: number;
    purchaseInvoiceHeaderId?: string;
    positionNumber?: number;
    description?: string;
    productCode?: string;
    quantity?: number;
    unitPrice?: number;
    discountPercent?: number;
    discountAmount?: number;
    taxPercent?: number;
    taxAmount?: number;
    subtotal?: number;
    positionTotal?: number;
    expenseCategory?: string;
    notes?: string;
}

export interface BusinessPartnerPortalUpdatePurchaseInvoicePositions {
    id?: string;
    rowId?: number;
    purchaseInvoiceHeaderId?: string;
    positionNumber?: number;
    description?: string;
    productCode?: string;
    quantity?: number;
    unitPrice?: number;
    discountPercent?: number;
    discountAmount?: number;
    taxPercent?: number;
    taxAmount?: number;
    subtotal?: number;
    positionTotal?: number;
    expenseCategory?: string;
    notes?: string;
}

export interface BusinessPartnerPortalSupplierDocument {
    id: string;
    rowId: number;
    businessPartnerId: string;
    businessPartner: BusinessPartnerPortalBusinessPartner;
    documentNumber?: string;
    documentType?: string;
    status: string;
    file?: any;
    fileHash?: string;
    supplierInvoiceNumber?: string;
    supplierInvoiceDate?: string;
    supplierInvoiceAmount?: number;
    currencyCode?: string;
    externalDocumentId?: string;
    externalCompanyCode?: string;
    externalProcessingStatus?: string;
    purchaseInvoiceHeaderId?: string;
    purchaseInvoiceHeader?: BusinessPartnerPortalPurchaseInvoiceHeader;
    ocrConfidenceScore?: number;
    ocrData?: any;
    sentForProcessingAt?: string;
    processedAt?: string;
    linkedAt?: string;
    errorCode?: string;
    errorMessage?: string;
    retryCount: number;
    lastRetryAt?: string;
    notes?: string;
    supplierNotes?: string;
    isArchived: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface BusinessPartnerPortalCreateSupplierDocument {
    id: string;
    rowId: number;
    businessPartnerId: string;
    documentNumber?: string;
    documentType?:
        | 'INVOICE'
        | 'CREDIT_NOTE'
        | 'DEBIT_NOTE'
        | 'PROFORMA'
        | 'OTHER';
    status:
        | 'PENDING_UPLOAD'
        | 'UPLOADED'
        | 'VALIDATING'
        | 'SENT_FOR_PROCESSING'
        | 'PROCESSING'
        | 'PROCESSED'
        | 'LINKED'
        | 'ERROR'
        | 'REJECTED';
    file?: any;
    fileHash?: string;
    supplierInvoiceNumber?: string;
    supplierInvoiceDate?: string;
    supplierInvoiceAmount?: number;
    currencyCode?: string;
    externalDocumentId?: string;
    externalCompanyCode?: string;
    externalProcessingStatus?: string;
    purchaseInvoiceHeaderId?: string;
    ocrConfidenceScore?: number;
    ocrData?: any;
    sentForProcessingAt?: string;
    processedAt?: string;
    linkedAt?: string;
    errorCode?: string;
    errorMessage?: string;
    retryCount: number;
    lastRetryAt?: string;
    notes?: string;
    supplierNotes?: string;
    isArchived: boolean;
}

export interface BusinessPartnerPortalUpdateSupplierDocumentById {
    id: string;
    rowId?: number;
    businessPartnerId?: string;
    documentNumber?: string;
    documentType?: string;
    status?: string;
    file?: any;
    fileHash?: string;
    supplierInvoiceNumber?: string;
    supplierInvoiceDate?: string;
    supplierInvoiceAmount?: number;
    currencyCode?: string;
    externalDocumentId?: string;
    externalCompanyCode?: string;
    externalProcessingStatus?: string;
    purchaseInvoiceHeaderId?: string;
    ocrConfidenceScore?: number;
    ocrData?: any;
    sentForProcessingAt?: string;
    processedAt?: string;
    linkedAt?: string;
    errorCode?: string;
    errorMessage?: string;
    retryCount?: number;
    lastRetryAt?: string;
    notes?: string;
    supplierNotes?: string;
    isArchived?: boolean;
}

export interface BusinessPartnerPortalUpdateSupplierDocuments {
    id?: string;
    rowId?: number;
    businessPartnerId?: string;
    documentNumber?: string;
    documentType?:
        | 'INVOICE'
        | 'CREDIT_NOTE'
        | 'DEBIT_NOTE'
        | 'PROFORMA'
        | 'OTHER';
    status?:
        | 'PENDING_UPLOAD'
        | 'UPLOADED'
        | 'VALIDATING'
        | 'SENT_FOR_PROCESSING'
        | 'PROCESSING'
        | 'PROCESSED'
        | 'LINKED'
        | 'ERROR'
        | 'REJECTED';
    file?: any;
    fileHash?: string;
    supplierInvoiceNumber?: string;
    supplierInvoiceDate?: string;
    supplierInvoiceAmount?: number;
    currencyCode?: string;
    externalDocumentId?: string;
    externalCompanyCode?: string;
    externalProcessingStatus?: string;
    purchaseInvoiceHeaderId?: string;
    ocrConfidenceScore?: number;
    ocrData?: any;
    sentForProcessingAt?: string;
    processedAt?: string;
    linkedAt?: string;
    errorCode?: string;
    errorMessage?: string;
    retryCount?: number;
    lastRetryAt?: string;
    notes?: string;
    supplierNotes?: string;
    isArchived?: boolean;
}

export interface BusinessPartnerPortalBusinessPartner {
    id: string;
    rowId: number;
    externalId?: string;
    code?: string;
    type;
    name: string;
    tin?: string;
    email?: string;
    website?: string;
    phone?: string;
    phoneCountryPrefix?: string;
    phoneSanitized?: string;
    isActive: boolean;
    contacts?: BusinessPartnerPortalPartnerContact[];
    addresses?: BusinessPartnerPortalPartnerAddress[];
    paymentCollectionModes?: BusinessPartnerPortalPaymentCollectionMode[];
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface BusinessPartnerPortalCreateBusinessPartner {
    id: string;
    rowId: number;
    externalId?: string;
    code?: string;
    type: string[];
    name: string;
    tin?: string;
    email?: string;
    website?: string;
    phone?: string;
    phoneCountryPrefix?: string;
    phoneSanitized?: string;
    isActive: boolean;
    contacts?: BusinessPartnerPortalPartnerContact[];
    addresses?: BusinessPartnerPortalPartnerAddress[];
    paymentCollectionModes?: BusinessPartnerPortalPaymentCollectionMode[];
    meta?: any;
}

export interface BusinessPartnerPortalUpdateBusinessPartnerById {
    id: string;
    rowId?: number;
    externalId?: string;
    code?: string;
    type?;
    name?: string;
    tin?: string;
    email?: string;
    website?: string;
    phone?: string;
    phoneCountryPrefix?: string;
    phoneSanitized?: string;
    isActive?: boolean;
    contacts?: BusinessPartnerPortalPartnerContact[];
    addresses?: BusinessPartnerPortalPartnerAddress[];
    paymentCollectionModes?: BusinessPartnerPortalPaymentCollectionMode[];
    meta?: any;
}

export interface BusinessPartnerPortalUpdateBusinessPartners {
    id?: string;
    rowId?: number;
    externalId?: string;
    code?: string;
    type?: string[];
    name?: string;
    tin?: string;
    email?: string;
    website?: string;
    phone?: string;
    phoneCountryPrefix?: string;
    phoneSanitized?: string;
    isActive?: boolean;
    contacts?: BusinessPartnerPortalPartnerContact[];
    addresses?: BusinessPartnerPortalPartnerAddress[];
    paymentCollectionModes?: BusinessPartnerPortalPaymentCollectionMode[];
    meta?: any;
}

export enum BusinessPartnerPortalBusinessPartnerType {
    CUSTOMER = 'CUSTOMER',
    SUPPLIER = 'SUPPLIER',
    VENDOR = 'VENDOR',
    AFFILIATE = 'AFFILIATE',
    PARTNER = 'PARTNER',
    OTHER = 'OTHER',
}
