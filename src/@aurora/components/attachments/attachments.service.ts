import { Injectable } from '@angular/core';
import { GraphQLService, log } from '@aurora';
import { Observable, from, map } from 'rxjs';
import { cropAndCreateAttachmentMutation } from './attachments.graphql';

@Injectable({
    providedIn: 'root',
})
export class AttachmentsService
{
    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    setCropImage(parameters): Observable<any>
    {
        log('[DEBUG] - Crop image with parameters: ', parameters);

        return this
            .graphqlService
            .client()
            .mutate<string>({
                mutation : cropAndCreateAttachmentMutation,
                variables: {
                    payload: parameters,
                },
            })
            .pipe(
                map(({ data }) => data['commonCropAndCreateAttachment']),
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
