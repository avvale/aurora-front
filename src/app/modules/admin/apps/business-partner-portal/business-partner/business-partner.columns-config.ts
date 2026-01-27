/**
 * @aurora-generated
 * @source cliter/business-partner-portal/business-partner.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const businessPartnerColumnsConfig: (properties?: {
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
        field: 'type',
        sort: 'type',
        translation: 'businessPartnerPortal.Type',
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
        field: 'tin',
        sort: 'tin',
        translation: 'businessPartnerPortal.Tin',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'email',
        sort: 'email',
        translation: 'businessPartnerPortal.Email',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'website',
        sort: 'website',
        translation: 'businessPartnerPortal.Website',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'phone',
        sort: 'phone',
        translation: 'businessPartnerPortal.Phone',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'phoneCountryPrefix',
        sort: 'phoneCountryPrefix',
        translation: 'businessPartnerPortal.PhoneCountryPrefix',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'phoneSanitized',
        sort: 'phoneSanitized',
        translation: 'businessPartnerPortal.PhoneSanitized',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort: 'isActive',
        translation: 'businessPartnerPortal.IsActive',
    },
];
