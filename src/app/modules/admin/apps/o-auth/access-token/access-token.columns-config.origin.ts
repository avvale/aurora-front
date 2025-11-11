import { ColumnConfig, ColumnDataType } from '@aurora';

export const accessTokenColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.NUMBER,
        field: 'rowId',
        sort: 'rowId',
        translation: 'oAuth.RowId',
    },
    {
        type: ColumnDataType.STRING,
        field: 'client.name',
        searchableField: '$client.name$',
        sort: 'client.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'token',
        sort: 'token',
        translation: 'oAuth.Token',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'name',
        sort: 'name',
        translation: 'oAuth.Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isRevoked',
        sort: 'isRevoked',
        translation: 'oAuth.IsRevoked',
    },
    {
        type: ColumnDataType.TIMESTAMP,
        field: 'expiresAt',
        sort: 'expiresAt',
        translation: 'oAuth.ExpiresAt',
    },
];
