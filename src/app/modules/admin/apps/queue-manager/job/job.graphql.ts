import gql from 'graphql-tag';

export const fields = `
    prefix
    name
    waitingJobs
    activeJobs
    completedJobs
    failedJobs
    delayedJobs
    pausedJobs
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query QueueManagerPaginateJobs (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: queueManagerPaginateQueues (
            query: $query
            constraint: $constraint
        ) {
            total
            rows
            count
        }
    }
`;