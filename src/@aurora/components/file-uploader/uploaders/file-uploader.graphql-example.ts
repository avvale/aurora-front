import gql from 'graphql-tag';

export const uploadFileMutation = gql`
    mutation YourBoundedContextUploadFile (
        $file: CoreFileUploaded!
    ) {
        yourBoundedContextUploadFile (
            file: $file
        )
        {
            id
            filename
            mimetype
            extension
            relativePathSegments
            width
            height
            size
            url
            isCropable
            library {
                id
                url
                relativePathSegments
            }
            meta
        }
    }
`;

export const uploadFilesMutation = gql`
    mutation YourBoundedContextUploadFiles (
        $files: [CoreFileUploaded!]!
    ) {
        yourBoundedContextUploadFiles (
            files: $files
        )
        {
            id
            filename
            mimetype
            extension
            relativePathSegments
            width
            height
            size
            url
            isCropable
            library {
                id
                url
                relativePathSegments
            }
            meta
        }
    }
`;
