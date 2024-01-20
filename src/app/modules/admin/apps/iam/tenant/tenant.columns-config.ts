import { ColumnConfig, ColumnDataType } from '@aurora';

export const tenantColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'iam.Name',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'code',
        sort       : 'code',
        translation: 'iam.Code',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'logo',
        sort       : 'logo',
        translation: 'iam.Logo',
        searchable : false,
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isActive',
        sort       : 'isActive',
        translation: 'iam.IsActive',
        searchable : false,
    },
];