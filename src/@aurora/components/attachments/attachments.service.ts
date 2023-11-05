import { Injectable } from '@angular/core';
import { CropProperties, GraphQLService, log } from '@aurora';
import { Observable, from, map } from 'rxjs';
import { commonCreateCropMutation } from './attachments.graphql';

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

    deleteAttachment(parameters): Observable<any>
    {
        log('[DEBUG] - Delete attachment: ', parameters);

        return from([true]);
        /* return this
            .graphQLClient()
            .client()
            .mutate({
                mutation: gql`
                    mutation AdminDeleteAttachment ($attachment:AdminAttachmentInput!) {
                        adminDeleteAttachment (attachment:$attachment)
                    }`,
                variables: {
                    attachment: attachment
                }
            }); */
    }
}
