import { ColumnConfig, ColumnDataType } from '@aurora';

export const messageColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'tenantIds',
        sort       : 'tenantIds',
        translation: 'message.TenantIds',
    },
    {
        type       : ColumnDataType.ENUM,
        field      : 'status',
        sort       : 'status',
        translation: 'message.Status',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'accountRecipientIds',
        sort       : 'accountRecipientIds',
        translation: 'message.AccountRecipientIds',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'tenantRecipientIds',
        sort       : 'tenantRecipientIds',
        translation: 'message.TenantRecipientIds',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'scopeRecipients',
        sort       : 'scopeRecipients',
        translation: 'message.ScopeRecipients',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'tagRecipients',
        sort       : 'tagRecipients',
        translation: 'message.TagRecipients',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'sendAt',
        sort       : 'sendAt',
        translation: 'message.SendAt',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isImportant',
        sort       : 'isImportant',
        translation: 'message.IsImportant',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'subject',
        sort       : 'subject',
        translation: 'message.Subject',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'body',
        sort       : 'body',
        translation: 'message.Body',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'link',
        sort       : 'link',
        translation: 'message.Link',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isInternalLink',
        sort       : 'isInternalLink',
        translation: 'message.IsInternalLink',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'icon',
        sort       : 'icon',
        translation: 'message.Icon',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'totalRecipients',
        sort       : 'totalRecipients',
        translation: 'message.TotalRecipients',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'reads',
        sort       : 'reads',
        translation: 'message.Reads',
    },
];
