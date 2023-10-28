import gql from 'graphql-tag';

export const commonUploadAttachment = gql`
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
            isUploaded
            meta
            library {
                id
                url
                relativePathSegments
            }
        }
    }
`;

export const commonUploadAttachments = gql`
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
            isUploaded
            meta
            library {
                id
                url
                relativePathSegments
            }
        }
    }
`;
