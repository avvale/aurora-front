import { GraphQLError } from 'graphql';
import { GraphQLErrors } from '@apollo/client/errors';

export const extractGraphqlMessageErrors = (graphqlErrors: GraphQLErrors): string =>
{
    return graphqlErrors.map((graphqlError: GraphQLError) =>
    {
        const extensions = graphqlError.extensions as any;

        if (Array.isArray(extensions.exception?.errors))
        {
            return extensions
                .exception
                .errors
                .map(error => error.message);
        }

        if (extensions.response?.message)
        {
            return extensions.response.message;
        }

    }).join('<br>');
};