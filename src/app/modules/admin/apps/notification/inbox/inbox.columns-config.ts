import { ColumnConfig, ColumnDataType } from '@aurora';

export const inboxColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.NUMBER,
        field      : 'sort',
        sort       : 'sort',
        translation: 'notification.Sort',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'accountCode',
        sort       : 'accountCode',
        translation: 'notification.AccountCode',
        isUnaccent : true,
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
        type       : ColumnDataType.BOOLEAN,
        field      : 'isRead',
        sort       : 'isRead',
        translation: 'notification.IsRead',
    },
];