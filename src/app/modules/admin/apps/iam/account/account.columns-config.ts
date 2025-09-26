import { ColumnConfig, ColumnDataType, getFieldValuesFromEnum, SearchComponentType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';
import { IamAccountType } from '../iam.types';

export const accountColumnsConfig: (
     param?: {
        translocoService?: TranslocoService;
        tenantsAsyncMatSelectSearch?: unknown;
    }
) => ColumnConfig[] = (
    {
        translocoService = null,
        tenantsAsyncMatSelectSearch = null,
    }: {
        translocoService?: TranslocoService;
        tenantsAsyncMatSelectSearch?: unknown;
    } = {},
) => [
    {
        type: ColumnDataType.ENUM,
        field: 'type',
        sort: 'type',
        translation: 'Type',
        searchable: false,
        fieldValues: () => getFieldValuesFromEnum(IamAccountType, value => `${translocoService && translocoService.translate('AccountTypes.' + value)}`),
    },
    {
        type: ColumnDataType.STRING,
        field: 'code',
        sort: 'code',
        translation: 'Code',
    },
    {
        type: ColumnDataType.ARRAY,
        field: 'scopes',
        sort: 'scopes',
        translation: 'Scopes',
    },
    {
        type: ColumnDataType.ARRAY,
        field: 'tags',
        sort: 'tags',
        translation: 'Tags',
    },
    {
        type: ColumnDataType.STRING,
        searchComponent: SearchComponentType.ASYNC_MULTIPLE_SELECT,
        searchableField: 'dTenants',
        searchableFieldType: ColumnDataType.ARRAY,
        field: 'tenants',
        sort: 'dTenants',
        translation: 'Tenants',
        bodyClass: 'min-w-48',
        meta: {
            asyncMatSelectSearch: tenantsAsyncMatSelectSearch,
        },
    },
    {
        type: ColumnDataType.STRING,
        field: 'email',
        sort: 'email',
        translation: 'Email',
    },
    {
        type: ColumnDataType.STRING,
        field: 'username',
        sort: 'username',
        translation: 'Username',
    },
    {
        type: ColumnDataType.STRING,
        field: 'user.name',
        searchableField: '$user.name$',
        sort: 'user.name',
        translation: 'Name',
        bodyClass: 'min-w-48',
    },
    {
        type: ColumnDataType.STRING,
        field: 'user.surname',
        searchableField: '$user.surname$',
        sort: 'user.surname',
        translation: 'Surname',
        bodyClass: 'min-w-48',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort: 'isActive',
        translation: 'Active',
    },
];
