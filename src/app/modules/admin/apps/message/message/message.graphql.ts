import gql from 'graphql-tag';

export const fields = `
    tenantIds
    status
    accountRecipientIds
    tenantRecipientIds
    scopeRecipients
    tagRecipients
    sendAt
    isImportant
    subject
    body
    link
    isInternalLink
    image
    icon
    attachments
    totalRecipients
    reads
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
    iamGetTags (
        query: $queryTags
        constraint: $constraintTags
    ) {
        id
        name
    }
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
    iamPaginateAccounts (
        query: $queryPaginateAccounts
        constraint: $constraintPaginateAccounts
    ) {
        total
        rows
        count
    }
`;

// default methods
export const paginationQuery = gql`
    query MessagePaginateMessages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: messagePaginateMessages (
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
    query MessageGetMessages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: messageGetMessages (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query MessageGetMessagesRelations(
        $queryTags: QueryStatement
        $constraintTags: QueryStatement
        $queryTenants: QueryStatement
        $constraintTenants: QueryStatement
        $queryPaginateAccounts: QueryStatement
        $constraintPaginateAccounts: QueryStatement
        $clientId: ID
        $constraintClient: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query MessageFindMessageById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: messageFindMessageById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query MessageFindMessage (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: messageFindMessage (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation MessageCreateMessage (
        $payload: MessageCreateMessageInput!
    ) {
        messageCreateMessage (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation MessageUpdateMessageById (
        $payload: MessageUpdateMessageByIdInput!
        $constraint: QueryStatement
    ) {
        messageUpdateMessageById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation MessageUpdateMessages (
        $payload: MessageUpdateMessagesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        messageUpdateMessages (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation MessageDeleteMessageById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        messageDeleteMessageById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation MessageDeleteMessages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        messageDeleteMessages (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
