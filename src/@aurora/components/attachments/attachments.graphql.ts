import gql from 'graphql-tag';

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
                id
                familyId
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
                isUploaded
                isChanged
                libraryId
                libraryFilename
                meta
                library {
                    id
                    originFilename
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
