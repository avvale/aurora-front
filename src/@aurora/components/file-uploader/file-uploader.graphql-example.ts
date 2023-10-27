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
            encoding
            filename
            mimetype
            extension
            encoding
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
            encoding
            filename
            mimetype
            extension
            encoding
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
