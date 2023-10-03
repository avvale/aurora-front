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
            filename
            mimetype
            encoding
        }
    }
`;

export const uploadFilesMutation = gql`
    mutation CommonUploadAttachments (
        $files: [CoreFileUploaded!]!
    ) {
        commonUploadAttachment (
            files: $files
        )
        {
            id
            filename
            mimetype
            encoding
        }
    }
`;