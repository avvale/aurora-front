import { ColumnConfig, ColumnDataType } from '@aurora';

export const permissionRoleColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.STRING,
        field: 'permission.name',
        searchableField: '$permission.name$',
        sort: 'permission.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'role.name',
        searchableField: '$role.name$',
        sort: 'role.name',
        translation: 'Name',
        isUnaccent: true,
    },
];
