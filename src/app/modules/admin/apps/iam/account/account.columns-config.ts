import { ColumnConfig, ColumnDataType } from '@aurora';

export const accountColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.ENUM,
        field: 'type',
        sort: 'type',
        translation: 'Type',
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
