export interface NotificationNotification {
    id: string;
    tenantId?: string;
    status: string;
    accountIds?;
    tenantIds?;
    scopes?;
    sendAt?: string;
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    totalRecipients: number;
    reads: number;
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface NotificationCreateNotification {
    id: string;
    tenantId?: string;
    status: string;
    accountIds?: string[];
    tenantIds?: string[];
    scopes?: string[];
    sendAt?: string;
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    totalRecipients: number;
    reads: number;
    meta?: any;
}

export interface NotificationUpdateNotificationById {
    id: string;
    tenantId?: string;
    status?: string;
    accountIds?;
    tenantIds?;
    scopes?;
    sendAt?: string;
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    totalRecipients?: number;
    reads?: number;
    meta?: any;
}

export interface NotificationUpdateNotifications {
    id?: string;
    tenantId?: string;
    status?: string;
    accountIds?: string[];
    tenantIds?: string[];
    scopes?: string[];
    sendAt?: string;
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    totalRecipients?: number;
    reads?: number;
    meta?: any;
}

export interface NotificationInBox {
    id: string;
    tenantId?: string;
    notificationId: string;
    sort: number;
    accountId: string;
    accountCode?: string;
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    isRead: boolean;
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface NotificationCreateInBox {
    id: string;
    tenantId?: string;
    notificationId: string;
    sort: number;
    accountId: string;
    accountCode?: string;
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    isRead: boolean;
    meta?: any;
}

export interface NotificationUpdateInBoxById {
    id: string;
    tenantId?: string;
    notificationId?: string;
    sort?: number;
    accountId?: string;
    accountCode?: string;
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    isRead?: boolean;
    meta?: any;
}

export interface NotificationUpdateInBoxes {
    id?: string;
    tenantId?: string;
    notificationId?: string;
    sort?: number;
    accountId?: string;
    accountCode?: string;
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    isRead?: boolean;
    meta?: any;
}

export interface NotificationInbox {
    id: string;
    tenantId?: string;
    notificationId: string;
    sort: number;
    accountId: string;
    accountCode?: string;
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    isRead: boolean;
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface NotificationCreateInbox {
    id: string;
    tenantId?: string;
    notificationId: string;
    sort: number;
    accountId: string;
    accountCode?: string;
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    isRead: boolean;
    meta?: any;
}

export interface NotificationUpdateInboxById {
    id: string;
    tenantId?: string;
    notificationId?: string;
    sort?: number;
    accountId?: string;
    accountCode?: string;
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    isRead?: boolean;
    meta?: any;
}

export interface NotificationUpdateInboxes {
    id?: string;
    tenantId?: string;
    notificationId?: string;
    sort?: number;
    accountId?: string;
    accountCode?: string;
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    isRead?: boolean;
    meta?: any;
}
