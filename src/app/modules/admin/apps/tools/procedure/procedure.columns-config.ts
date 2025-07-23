import { ColumnConfig, ColumnDataType } from '@aurora';

export const procedureColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.STRING,
        field: 'name',
        sort: 'name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.ENUM,
        field: 'type',
        sort: 'type',
        translation: 'tools.Type',
    },
    {
        type: ColumnDataType.STRING,
        field: 'version',
        sort: 'version',
        translation: 'tools.Version',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort: 'isActive',
        translation: 'tools.IsActive',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isInstalled',
        sort: 'isInstalled',
        translation: 'tools.IsInstalled',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isUpdated',
        sort: 'isUpdated',
        translation: 'tools.IsUpdated',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'sort',
        sort: 'sort',
        translation: 'Sort',
    },
    {
        type: ColumnDataType.TIMESTAMP,
        field: 'executedAt',
        sort: 'executedAt',
        translation: 'tools.ExecutedAt',
        bodyClass: 'min-w-48',
    },
    {
        type: ColumnDataType.TIMESTAMP,
        field: 'checkedAt',
        sort: 'checkedAt',
        translation: 'tools.CheckedAt',
        bodyClass: 'min-w-48',
    },
];
