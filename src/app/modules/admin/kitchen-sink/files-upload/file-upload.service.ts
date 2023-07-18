import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService } from '@aurora';
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
            id = null,
            file = null,
            headers = {
                'Apollo-Require-Preflight': 'true',
            },
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            file?: File;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    id,
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
            files?: { id: string; file: File; }[];
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