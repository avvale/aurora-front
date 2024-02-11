import gql from 'graphql-tag';

export const fields = `
    tenantIds
    messageId
    sort
    accountId
    accountCode
    isImportant
    sentAt
    title
    description
    link
    isInternalLink
    image
    icon
    attachments
    isRead
    isReadAtLeastOnce
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query MessagePaginateInboxes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: messagePaginateInboxes (
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
    query MessageGetInboxes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: messageGetInboxes (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query MessageFindInboxById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: messageFindInboxById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query MessageFindInbox (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: messageFindInbox (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation MessageCreateInbox (
        $payload: MessageCreateInboxInput!
    ) {
        messageCreateInbox (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation MessageUpdateInboxById (
        $payload: MessageUpdateInboxByIdInput!
        $constraint: QueryStatement
    ) {
        messageUpdateInboxById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation MessageUpdateInboxes (
        $payload: MessageUpdateInboxesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        messageUpdateInboxes (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation MessageDeleteInboxById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        messageDeleteInboxById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation MessageDeleteInboxes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        messageDeleteInboxes (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

// Queries additionalApis
export const checkMessagesInboxQuery = gql`
    query MessageCheckMessagesInbox (
        $query: QueryStatement
    ) {
        messageCheckMessagesInbox (
            query: $query
        ) {
            total
            rows
            count
        }
    }
`;
