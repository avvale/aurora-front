/**
 * @aurora-generated
 * @source cliter/business-partner-portal/payment-mode.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const paymentModeColumnsConfig: (properties?: {
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
        field: 'externalId',
        sort: 'externalId',
        translation: 'businessPartnerPortal.ExternalId',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'code',
        sort: 'code',
        translation: 'businessPartnerPortal.Code',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'name',
        sort: 'name',
        translation: 'businessPartnerPortal.Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'description',
        sort: 'description',
        translation: 'businessPartnerPortal.Description',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.ENUM,
        field: 'type',
        sort: 'type',
        translation: 'businessPartnerPortal.Type',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isAccountNumberRequired',
        sort: 'isAccountNumberRequired',
        translation: 'businessPartnerPortal.IsAccountNumberRequired',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isRoutingInfoRequired',
        sort: 'isRoutingInfoRequired',
        translation: 'businessPartnerPortal.IsRoutingInfoRequired',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isRecurringSupported',
        sort: 'isRecurringSupported',
        translation: 'businessPartnerPortal.IsRecurringSupported',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'sort',
        sort: 'sort',
        translation: 'businessPartnerPortal.Sort',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort: 'isActive',
        translation: 'businessPartnerPortal.IsActive',
    },
];
