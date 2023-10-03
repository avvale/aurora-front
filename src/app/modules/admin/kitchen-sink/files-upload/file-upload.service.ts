import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { FileUploaded, GraphQLHeaders, GraphQLService } from '@aurora';
import { Observable } from 'rxjs';
import { uploadFileMutation, uploadFilesMutation } from './files-upload.graphql';

@Injectable({
    providedIn: 'root',
})
export class FileUploadService
{
    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    uploadFile<T>(
        {
            graphqlStatement = uploadFileMutation,
            file = null,
            headers = {
                'Apollo-Require-Preflight': 'true',
            },
        }: {
            graphqlStatement?: DocumentNode;
            file?: FileUploaded;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    file,
                },
                context: {
                    headers,
                },
            });
    }

    uploadFiles<T>(
        {
            graphqlStatement = uploadFilesMutation,
            files = [],
            headers = {
                'Apollo-Require-Preflight': 'true',
            },
        }: {
            graphqlStatement?: DocumentNode;
            files?: FileUploaded[];
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    files,
                },
                context: {
                    headers,
                },
            });
    }
}