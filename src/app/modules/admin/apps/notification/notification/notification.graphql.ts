import gql from 'graphql-tag';

export const fields = `
    tenantIds
    status
    accountRecipientIds
    tenantRecipientIds
    scopeRecipients
    sendAt
    isImportant
    subject
    body
    attachments
    totalRecipients
    reads
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
    iamGetTenants (
        query: $queryTenants
        constraint: $constraintTenants
    ) {
        id
        parentId
        name
        code
        meta
    }
    oAuthFindClientById (
        id: $clientId
        constraint: $constraintClient
    ) {
        id
        scopeOptions
    }
`;

// default methods
export const paginationQuery = gql`
    query NotificationPaginateNotifications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: notificationPaginateNotifications (
            query: $query
            constraint: $constraint
        ) {
            total
            rows
            count
        }
    }
`;

export const getQuery = gql`
    query NotificationGetNotifications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: notificationGetNotifications (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query NotificationGetNotificationsRelations(
        $queryTenants: QueryStatement
        $constraintTenants: QueryStatement
        $clientId: ID
        $constraintClient: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query NotificationFindNotificationById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: notificationFindNotificationById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query NotificationFindNotification (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: notificationFindNotification (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation NotificationCreateNotification (
        $payload: NotificationCreateNotificationInput!
    ) {
        notificationCreateNotification (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation NotificationUpdateNotificationById (
        $payload: NotificationUpdateNotificationByIdInput!
        $constraint: QueryStatement
    ) {
        notificationUpdateNotificationById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation NotificationUpdateNotifications (
        $payload: NotificationUpdateNotificationsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        notificationUpdateNotifications (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation NotificationDeleteNotificationById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        notificationDeleteNotificationById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation NotificationDeleteNotifications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        notificationDeleteNotifications (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
