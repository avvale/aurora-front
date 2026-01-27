/**
 * @aurora-generated
 * @source cliter/business-partner-portal/supplier-document.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const supplierDocumentColumnsConfig: (properties?: {
    translator?: TranslocoService;
}) => ColumnConfig[] = ({
    translator = null,
}: {
    translator?: TranslocoService;
} = {}): ColumnConfig[] => [
    {
        type: ColumnDataType.NUMBER,
        field: 'rowId',
        sort: 'rowId',
        translation: 'businessPartnerPortal.RowId',
    },
    {
        type: ColumnDataType.STRING,
        field: 'businessPartner.name',
        searchableField: '$businessPartner.name$',
        sort: 'businessPartner.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'documentNumber',
        sort: 'documentNumber',
        translation: 'businessPartnerPortal.DocumentNumber',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.ENUM,
        field: 'documentType',
        sort: 'documentType',
        translation: 'businessPartnerPortal.DocumentType',
    },
    {
        type: ColumnDataType.ENUM,
        field: 'status',
        sort: 'status',
        translation: 'businessPartnerPortal.Status',
    },
    {
        type: ColumnDataType.JSONB,
        field: 'file',
        sort: 'file',
        translation: 'businessPartnerPortal.File',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'fileHash',
        sort: 'fileHash',
        translation: 'businessPartnerPortal.FileHash',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'supplierInvoiceNumber',
        sort: 'supplierInvoiceNumber',
        translation: 'businessPartnerPortal.SupplierInvoiceNumber',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.DATE,
        field: 'supplierInvoiceDate',
        sort: 'supplierInvoiceDate',
        translation: 'businessPartnerPortal.SupplierInvoiceDate',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'supplierInvoiceAmount',
        sort: 'supplierInvoiceAmount',
        translation: 'businessPartnerPortal.SupplierInvoiceAmount',
    },
    {
        type: ColumnDataType.STRING,
        field: 'currencyCode',
        sort: 'currencyCode',
        translation: 'businessPartnerPortal.CurrencyCode',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'externalDocumentId',
        sort: 'externalDocumentId',
        translation: 'businessPartnerPortal.ExternalDocumentId',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'externalCompanyCode',
        sort: 'externalCompanyCode',
        translation: 'businessPartnerPortal.ExternalCompanyCode',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'externalProcessingStatus',
        sort: 'externalProcessingStatus',
        translation: 'businessPartnerPortal.ExternalProcessingStatus',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'purchaseInvoiceHeader.name',
        searchableField: '$purchaseInvoiceHeader.name$',
        sort: 'purchaseInvoiceHeader.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'ocrConfidenceScore',
        sort: 'ocrConfidenceScore',
        translation: 'businessPartnerPortal.OcrConfidenceScore',
    },
    {
        type: ColumnDataType.JSONB,
        field: 'ocrData',
        sort: 'ocrData',
        translation: 'businessPartnerPortal.OcrData',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.TIMESTAMP,
        field: 'sentForProcessingAt',
        sort: 'sentForProcessingAt',
        translation: 'businessPartnerPortal.SentForProcessingAt',
    },
    {
        type: ColumnDataType.TIMESTAMP,
        field: 'processedAt',
        sort: 'processedAt',
        translation: 'businessPartnerPortal.ProcessedAt',
    },
    {
        type: ColumnDataType.TIMESTAMP,
        field: 'linkedAt',
        sort: 'linkedAt',
        translation: 'businessPartnerPortal.LinkedAt',
    },
    {
        type: ColumnDataType.STRING,
        field: 'errorCode',
        sort: 'errorCode',
        translation: 'businessPartnerPortal.ErrorCode',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'errorMessage',
        sort: 'errorMessage',
        translation: 'businessPartnerPortal.ErrorMessage',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'retryCount',
        sort: 'retryCount',
        translation: 'businessPartnerPortal.RetryCount',
    },
    {
        type: ColumnDataType.TIMESTAMP,
        field: 'lastRetryAt',
        sort: 'lastRetryAt',
        translation: 'businessPartnerPortal.LastRetryAt',
    },
    {
        type: ColumnDataType.STRING,
        field: 'notes',
        sort: 'notes',
        translation: 'businessPartnerPortal.Notes',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'supplierNotes',
        sort: 'supplierNotes',
        translation: 'businessPartnerPortal.SupplierNotes',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isArchived',
        sort: 'isArchived',
        translation: 'businessPartnerPortal.IsArchived',
    },
];
