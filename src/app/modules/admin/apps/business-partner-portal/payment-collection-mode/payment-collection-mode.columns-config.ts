/**
 * @aurora-generated
 * @source cliter/business-partner-portal/payment-collection-mode.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const paymentCollectionModeColumnsConfig: (properties?: {
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
        field: 'paymentMode.name',
        searchableField: '$paymentMode.name$',
        sort: 'paymentMode.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'label',
        sort: 'label',
        translation: 'businessPartnerPortal.Label',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'accountNumber',
        sort: 'accountNumber',
        translation: 'businessPartnerPortal.AccountNumber',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'accountHolderName',
        sort: 'accountHolderName',
        translation: 'businessPartnerPortal.AccountHolderName',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'bankName',
        sort: 'bankName',
        translation: 'businessPartnerPortal.BankName',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'routingNumber',
        sort: 'routingNumber',
        translation: 'businessPartnerPortal.RoutingNumber',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'iban',
        sort: 'iban',
        translation: 'businessPartnerPortal.Iban',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'swiftCode',
        sort: 'swiftCode',
        translation: 'businessPartnerPortal.SwiftCode',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'currencyCode',
        sort: 'currencyCode',
        translation: 'businessPartnerPortal.CurrencyCode',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.DATE,
        field: 'expirationDate',
        sort: 'expirationDate',
        translation: 'businessPartnerPortal.ExpirationDate',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isPrimary',
        sort: 'isPrimary',
        translation: 'businessPartnerPortal.IsPrimary',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort: 'isActive',
        translation: 'businessPartnerPortal.IsActive',
    },
    {
        type: ColumnDataType.STRING,
        field: 'notes',
        sort: 'notes',
        translation: 'businessPartnerPortal.Notes',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.TIMESTAMP,
        field: 'lastUsedAt',
        sort: 'lastUsedAt',
        translation: 'businessPartnerPortal.LastUsedAt',
    },
];
