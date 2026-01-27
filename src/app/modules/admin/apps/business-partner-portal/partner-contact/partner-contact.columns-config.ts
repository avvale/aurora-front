/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-contact.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const partnerContactColumnsConfig: (properties?: {
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
        field: 'firstName',
        sort: 'firstName',
        translation: 'businessPartnerPortal.FirstName',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'lastName',
        sort: 'lastName',
        translation: 'businessPartnerPortal.LastName',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'position',
        sort: 'position',
        translation: 'businessPartnerPortal.Position',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'department',
        sort: 'department',
        translation: 'businessPartnerPortal.Department',
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
        field: 'phone',
        sort: 'phone',
        translation: 'businessPartnerPortal.Phone',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'mobile',
        sort: 'mobile',
        translation: 'businessPartnerPortal.Mobile',
        isUnaccent: true,
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
        type: ColumnDataType.BOOLEAN,
        field: 'isUser',
        sort: 'isUser',
        translation: 'businessPartnerPortal.IsUser',
    },
    {
        type: ColumnDataType.STRING,
        field: 'preferredLanguage',
        sort: 'preferredLanguage',
        translation: 'businessPartnerPortal.PreferredLanguage',
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
