import { Injectable } from '@angular/core';
import { Attachment, CropProperties, GraphQLService, log } from '@aurora';
import { Observable, from, map } from 'rxjs';
import { commonCreateCropMutation, commonDeleteAttachmentByIdMutation } from './attachments.graphql';

@Injectable({
    providedIn: 'root',
})
export class AttachmentsService
{
    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    setCropImage(
        attachment,
        crop: CropProperties,
    ): Observable<any>
    {
        log('[DEBUG] - Crop image with parameters: ', {
            attachment,
            crop,
        });

        return this
            .graphqlService
            .client()
            .mutate<string>({
                mutation : commonCreateCropMutation,
                variables: {
                    attachment,
                    crop,
                },
            })
            .pipe(
                map(({ data }) => data['commonCreateCrop']),
            );
    }

    deleteAttachment(attachment: Attachment): Observable<any>
    {
        log('[DEBUG] - Delete attachment: ', attachment);

        return this
            .graphqlService
            .client()
            .mutate<string>({
                mutation : commonDeleteAttachmentByIdMutation,
                variables: {
                    id: attachment.id,
                },
            })
            .pipe(
                map(({ data }) => data['commonDeleteAttachmentById']),
            );
    }
}
