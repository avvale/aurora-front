import gql from 'graphql-tag';

export const uploadFileMutation = gql`
    mutation KitchenSinkUploadFile (
        $id: ID!
        $file: Upload!
    ) {
        kitchenSinkUploadFile (
            id: $id
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
        $files: [KitchenSinkFileUploaded!]!
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
