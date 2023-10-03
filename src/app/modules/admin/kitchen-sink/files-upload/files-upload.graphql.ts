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
            filename
            mimetype
            encoding
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
            filename
            mimetype
            encoding
        }
    }
`;
