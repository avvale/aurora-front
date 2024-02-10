import gql from 'graphql-tag';

export const fields = `
    tenantId
    notificationId
    sort
    accountId
    accountCode
    isImportant
    subject
    body
    attachments
    isRead
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query NotificationPaginateInboxes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: notificationPaginateInboxes (
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
    query NotificationGetInboxes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: notificationGetInboxes (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query NotificationFindInboxById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: notificationFindInboxById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query NotificationFindInbox (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: notificationFindInbox (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation NotificationCreateInbox (
        $payload: NotificationCreateInboxInput!
    ) {
        notificationCreateInbox (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation NotificationUpdateInboxById (
        $payload: NotificationUpdateInboxByIdInput!
        $constraint: QueryStatement
    ) {
        notificationUpdateInboxById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation NotificationUpdateInboxes (
        $payload: NotificationUpdateInboxesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        notificationUpdateInboxes (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation NotificationDeleteInboxById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        notificationDeleteInboxById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation NotificationDeleteInboxes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        notificationDeleteInboxes (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
