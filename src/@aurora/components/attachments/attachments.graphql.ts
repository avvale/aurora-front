import gql from 'graphql-tag';

export const cropAndCreateAttachmentMutation = gql`
    mutation CommonCropAndCreateAttachment ($payload:CommonCropAndCreateAttachmentInput!)
    {
        commonCropAndCreateAttachment (payload:$payload)
        {
            attachment {
                id
                familyId
                sort
                alt
                title
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
