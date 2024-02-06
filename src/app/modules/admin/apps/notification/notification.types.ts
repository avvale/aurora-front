export interface NotificationOutBoxNotification {
    id: string;
    sort: number;
    tenantId?: string;
    accountIds?;
    accountTenantOperator?: string;
    tenantIds?;
    scopes?;
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface NotificationCreateOutBoxNotification {
    id: string;
    sort: number;
    tenantId?: string;
    accountIds?: string[];
    accountTenantOperator?: string;
    tenantIds?: string[];
    scopes?: string[];
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    meta?: any;
}

export interface NotificationUpdateOutBoxNotificationById {
    id: string;
    sort?: number;
    tenantId?: string;
    accountIds?;
    accountTenantOperator?: string;
    tenantIds?;
    scopes?;
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    meta?: any;
}

export interface NotificationUpdateOutBoxNotifications {
    id?: string;
    sort?: number;
    tenantId?: string;
    accountIds?: string[];
    accountTenantOperator?: string;
    tenantIds?: string[];
    scopes?: string[];
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    meta?: any;
}
