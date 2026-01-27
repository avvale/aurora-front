/**
 * @aurora-generated
 * @source cliter/business-partner-portal/purchase-invoice-header.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const purchaseInvoiceHeaderColumnsConfig: (properties?: {
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
        field: 'invoiceNumber',
        sort: 'invoiceNumber',
        translation: 'businessPartnerPortal.InvoiceNumber',
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
        type: ColumnDataType.STRING,
        field: 'externalId',
        sort: 'externalId',
        translation: 'businessPartnerPortal.ExternalId',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'externalSystemCode',
        sort: 'externalSystemCode',
        translation: 'businessPartnerPortal.ExternalSystemCode',
        isUnaccent: true,
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
        type: ColumnDataType.DATE,
        field: 'invoiceDate',
        sort: 'invoiceDate',
        translation: 'businessPartnerPortal.InvoiceDate',
    },
    {
        type: ColumnDataType.DATE,
        field: 'receivedDate',
        sort: 'receivedDate',
        translation: 'businessPartnerPortal.ReceivedDate',
    },
    {
        type: ColumnDataType.DATE,
        field: 'dueDate',
        sort: 'dueDate',
        translation: 'businessPartnerPortal.DueDate',
    },
    {
        type: ColumnDataType.ENUM,
        field: 'status',
        sort: 'status',
        translation: 'businessPartnerPortal.Status',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'subtotal',
        sort: 'subtotal',
        translation: 'businessPartnerPortal.Subtotal',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'taxAmount',
        sort: 'taxAmount',
        translation: 'businessPartnerPortal.TaxAmount',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'discountAmount',
        sort: 'discountAmount',
        translation: 'businessPartnerPortal.DiscountAmount',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'totalAmount',
        sort: 'totalAmount',
        translation: 'businessPartnerPortal.TotalAmount',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'paidAmount',
        sort: 'paidAmount',
        translation: 'businessPartnerPortal.PaidAmount',
    },
    {
        type: ColumnDataType.STRING,
        field: 'currencyCode',
        sort: 'currencyCode',
        translation: 'businessPartnerPortal.CurrencyCode',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'paymentTermDays',
        sort: 'paymentTermDays',
        translation: 'businessPartnerPortal.PaymentTermDays',
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
        field: 'approvalNotes',
        sort: 'approvalNotes',
        translation: 'businessPartnerPortal.ApprovalNotes',
        isUnaccent: true,
    },
];
