import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Attachment, GraphQLService, commonCreateBlobAttachmentMutation, log } from '@aurora';


const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512): Blob =>
{
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize)
    {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++)
        {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
};

@Injectable({
    providedIn: 'root',
})
export class DownloadService
{
    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly sanitizer: DomSanitizer,
    )
    {}

    public download(attachment: Attachment, callback: () => void = () => { /**/ }): void
    {
        this
            .graphqlService
            .client()
            .mutate<string>({
                mutation : commonCreateBlobAttachmentMutation,
                variables: {
                    payload: attachment,
                },
            })
            .subscribe(({ data }) =>
            {
                log('[DEBUG] - Download attachment: ', data);

                const blob =  b64toBlob(data['commonCreateBlobAttachment']);

                //const blob = new Blob([data['commonCreateBlobAttachment']], { type: attachment.mimetype });

                // IE doesn't allow using a blob object directly as link href
                // instead it is necessary to use msSaveOrOpenBlob
                const navigator = (window.navigator as any);
                if (navigator && navigator.msSaveOrOpenBlob)
                {
                    navigator.msSaveOrOpenBlob(blob);

                    // callback after finish download
                    callback();
                    return;
                }

                const fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                    window.URL.createObjectURL(blob),
                );

                log('[DEBUG] response file url to download: ', fileUrl);

                // create HTML link element
                const link = document.createElement('a');
                link.href = fileUrl['changingThisBreaksApplicationSecurity'];
                link.download = attachment.originFilename;

                // this is necessary as link.click() does not work on the latest firefox
                link.dispatchEvent(
                    new MouseEvent(
                        'click',
                        {
                            bubbles   : true,
                            cancelable: true,
                            view      : window,
                        },
                    ),
                );

                setTimeout(() =>
                {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(fileUrl['changingThisBreaksApplicationSecurity']);
                    link.remove();

                    // callback after finish download
                    callback();

                }, 100);
            });
    }
}
