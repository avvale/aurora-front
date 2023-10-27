import gql from 'graphql-tag';

export const uploadFileMutation = gql`
    mutation KitchenSinkUploadFile (
        $file: CoreFileUploaded!
    ) {
        kitchenSinkUploadFile (
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
    mutation KitchenSinkUploadFiles (
        $files: [CoreFileUploaded!]!
    ) {
        kitchenSinkUploadFiles (
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
