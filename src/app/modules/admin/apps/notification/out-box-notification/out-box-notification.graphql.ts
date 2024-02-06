import gql from 'graphql-tag';

export const fields = `
    sort
    tenantId
    accountIds
    accountTenantOperator
    tenantIds
    scopes
    isImportant
    subject
    body
    attachments
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
    iamGetTenants (
        query: $queryTenants
        constraint: $constraintTenants
    ) {
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
    query NotificationPaginateOutBoxNotifications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: notificationPaginateOutBoxNotifications (
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
    query NotificationGetOutBoxNotifications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: notificationGetOutBoxNotifications (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query IamGetNotificationsRelations(
        $queryTenants: QueryStatement
        $constraintTenants: QueryStatement
        $clientId: ID
        $constraintClient: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query NotificationFindOutBoxNotificationById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: notificationFindOutBoxNotificationById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query NotificationFindOutBoxNotification (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: notificationFindOutBoxNotification (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation NotificationCreateOutBoxNotification (
        $payload: NotificationCreateOutBoxNotificationInput!
    ) {
        notificationCreateOutBoxNotification (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation NotificationUpdateOutBoxNotificationById (
        $payload: NotificationUpdateOutBoxNotificationByIdInput!
        $constraint: QueryStatement
    ) {
        notificationUpdateOutBoxNotificationById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation NotificationUpdateOutBoxNotifications (
        $payload: NotificationUpdateOutBoxNotificationsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        notificationUpdateOutBoxNotifications (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation NotificationDeleteOutBoxNotificationById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        notificationDeleteOutBoxNotificationById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation NotificationDeleteOutBoxNotifications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        notificationDeleteOutBoxNotifications (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
