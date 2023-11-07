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
