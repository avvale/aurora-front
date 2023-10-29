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
            filename
            mimetype
            extension
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
                filename
                mimetype
                extension
                relativePathSegments
                width
                height
                size
                url
                meta
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
            filename
            mimetype
            extension
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
                filename
                mimetype
                extension
                relativePathSegments
                width
                height
                size
                url
                meta
            }
        }
    }
`;
