import { ColumnConfig, ColumnDataType } from '@aurora';

export const outBoxNotificationColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.NUMBER,
        field      : 'sort',
        sort       : 'sort',
        translation: 'notification.Sort',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'accountIds',
        sort       : 'accountIds',
        translation: 'notification.AccountIds',
    },
    {
        type       : ColumnDataType.ENUM,
        field      : 'accountTenantOperator',
        sort       : 'accountTenantOperator',
        translation: 'notification.AccountTenantOperator',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'tenantIds',
        sort       : 'tenantIds',
        translation: 'notification.TenantIds',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'scopes',
        sort       : 'scopes',
        translation: 'notification.Scopes',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isImportant',
        sort       : 'isImportant',
        translation: 'notification.IsImportant',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'subject',
        sort       : 'subject',
        translation: 'notification.Subject',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'body',
        sort       : 'body',
        translation: 'notification.Body',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'attachments',
        sort       : 'attachments',
        translation: 'notification.Attachments',
        isUnaccent : true,
    },
];