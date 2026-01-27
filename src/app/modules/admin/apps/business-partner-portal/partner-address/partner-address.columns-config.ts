/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-address.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const partnerAddressColumnsConfig: (properties?: {
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
        type: ColumnDataType.ENUM,
        field: 'type',
        sort: 'type',
        translation: 'businessPartnerPortal.Type',
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
        field: 'addressLine1',
        sort: 'addressLine1',
        translation: 'businessPartnerPortal.AddressLine1',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'addressLine2',
        sort: 'addressLine2',
        translation: 'businessPartnerPortal.AddressLine2',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'city',
        sort: 'city',
        translation: 'businessPartnerPortal.City',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'postalCode',
        sort: 'postalCode',
        translation: 'businessPartnerPortal.PostalCode',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'country.name',
        searchableField: '$country.name$',
        sort: 'country.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'administrativeAreaLevel1.name',
        searchableField: '$administrativeAreaLevel1.name$',
        sort: 'administrativeAreaLevel1.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'administrativeAreaLevel2.name',
        searchableField: '$administrativeAreaLevel2.name$',
        sort: 'administrativeAreaLevel2.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'administrativeAreaLevel3.name',
        searchableField: '$administrativeAreaLevel3.name$',
        sort: 'administrativeAreaLevel3.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'latitude',
        sort: 'latitude',
        translation: 'businessPartnerPortal.Latitude',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'longitude',
        sort: 'longitude',
        translation: 'businessPartnerPortal.Longitude',
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
];
