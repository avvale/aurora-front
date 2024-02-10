import { ColumnConfig, ColumnDataType } from '@aurora';

export const notificationColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'tenantIds',
        sort       : 'tenantIds',
        translation: 'notification.TenantIds',
    },
    {
        type       : ColumnDataType.ENUM,
        field      : 'status',
        sort       : 'status',
        translation: 'notification.Status',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'accountRecipientIds',
        sort       : 'accountRecipientIds',
        translation: 'notification.AccountRecipientIds',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'tenantRecipientIds',
        sort       : 'tenantRecipientIds',
        translation: 'notification.TenantRecipientIds',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'scopeRecipients',
        sort       : 'scopeRecipients',
        translation: 'notification.ScopeRecipients',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'sendAt',
        sort       : 'sendAt',
        translation: 'notification.SendAt',
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
    {
        type       : ColumnDataType.NUMBER,
        field      : 'totalRecipients',
        sort       : 'totalRecipients',
        translation: 'notification.TotalRecipients',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'reads',
        sort       : 'reads',
        translation: 'notification.Reads',
    },
];