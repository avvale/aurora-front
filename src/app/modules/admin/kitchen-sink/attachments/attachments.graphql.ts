import gql from 'graphql-tag';

export const uploadFileMutation = gql`
    mutation CommonUploadAttachment (
        $file: CoreFileUploaded!
    ) {
        commonUploadAttachment (
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
    mutation CommonUploadAttachments (
        $files: [CoreFileUploaded!]!
    ) {
        commonUploadAttachments (
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
