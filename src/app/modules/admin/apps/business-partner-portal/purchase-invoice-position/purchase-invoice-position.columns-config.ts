/**
 * @aurora-generated
 * @source cliter/business-partner-portal/purchase-invoice-position.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const purchaseInvoicePositionColumnsConfig: (properties?: {
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
        field: 'purchaseInvoiceHeader.name',
        searchableField: '$purchaseInvoiceHeader.name$',
        sort: 'purchaseInvoiceHeader.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'positionNumber',
        sort: 'positionNumber',
        translation: 'businessPartnerPortal.PositionNumber',
    },
    {
        type: ColumnDataType.STRING,
        field: 'description',
        sort: 'description',
        translation: 'businessPartnerPortal.Description',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'productCode',
        sort: 'productCode',
        translation: 'businessPartnerPortal.ProductCode',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'quantity',
        sort: 'quantity',
        translation: 'businessPartnerPortal.Quantity',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'unitPrice',
        sort: 'unitPrice',
        translation: 'businessPartnerPortal.UnitPrice',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'discountPercent',
        sort: 'discountPercent',
        translation: 'businessPartnerPortal.DiscountPercent',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'discountAmount',
        sort: 'discountAmount',
        translation: 'businessPartnerPortal.DiscountAmount',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'taxPercent',
        sort: 'taxPercent',
        translation: 'businessPartnerPortal.TaxPercent',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'taxAmount',
        sort: 'taxAmount',
        translation: 'businessPartnerPortal.TaxAmount',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'subtotal',
        sort: 'subtotal',
        translation: 'businessPartnerPortal.Subtotal',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'positionTotal',
        sort: 'positionTotal',
        translation: 'businessPartnerPortal.PositionTotal',
    },
    {
        type: ColumnDataType.STRING,
        field: 'expenseCategory',
        sort: 'expenseCategory',
        translation: 'businessPartnerPortal.ExpenseCategory',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'notes',
        sort: 'notes',
        translation: 'businessPartnerPortal.Notes',
        isUnaccent: true,
    },
];
