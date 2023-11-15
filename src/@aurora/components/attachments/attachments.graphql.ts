import gql from 'graphql-tag';
import { commonAttachmentLibraryFields } from './attachments-library.graphql';

export const commonAttachmentFields = `
    id
    familyId
    attachableId
    sort
    alt
    title
    originFilename
    filename
    mimetype
    extension
    relativePathSegments
    width
    height
    size
    url
    isCropable
    libraryId
    libraryFilename
    sizes
    meta
`;

export const commonCreateCropMutation = gql`
    mutation CommonCreateCrop (
        $attachment: CommonCreateAttachmentInput!
        $crop: CommonCropPropertiesInput!
    )
    {
        commonCreateCrop (
            attachment:$attachment
            crop:$crop
        )
        {
            attachment {
                ${commonAttachmentFields}
                isUploaded
                isChanged
                library {
                    ${commonAttachmentLibraryFields}
                }
            }
            crop {
                x
                y
                width
                height
                rotate
                scaleX
                scaleY
            }
        }
    },
`;

export const commonDeleteAttachmentByIdMutation = gql`
    mutation CommonDeleteAttachmentById (
        $id: ID!
        $constraint: QueryStatement
    )
    {
        commonDeleteAttachmentById (
            id: $id
            constraint: $constraint
        )
        {
            ${commonAttachmentFields}
            library {
                ${commonAttachmentLibraryFields}
            }
        }
    },
`;
