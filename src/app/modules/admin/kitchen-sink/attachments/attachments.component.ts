
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, FileUploadComponent, Utils, ViewDetailComponent, defaultDetailImports, log } from '@aurora';
import { AttachmentsComponent as Attachments } from '@aurora';
import { FileUploaderService } from '@aurora/components/file-uploader/file-uploader.service';
import { lastValueFrom } from 'rxjs';
import { uploadFilesMutation } from './attachments.graphql';

@Component({
    selector       : 'kitchen-sink-attachments',
    templateUrl    : './attachments.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        Attachments, FileUploadComponent,
    ],
})
export class AttachmentsComponent extends ViewDetailComponent
{
    // ---- customizations ----
    filesContainer: { id: string; file: File; }[] = [];

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: any;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'kitchenSink.Attachments' },
    ];

    constructor(
        private readonly fileUploaderService: FileUploaderService,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        /**/
    }

    onSubmit(): void
    {
        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg.value);
            this.validationMessagesService.validate();
            return;
        }

        log('[DEBUG] Error to validate form: ', this.fg.value);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            attachments: [],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'kitchenSink::attachments.detail.file-upload':
                log('Files upload from au-file-upload: ', action);
                break;

            case 'kitchenSink::attachments.detail.attachment':
                if (action.meta.files.length === 0) return;

                this.filesContainer = [];
                for (const file of action.meta.files)
                {
                    this.filesContainer.push({
                        id: Utils.uuid(),
                        file,
                    });
                }

                try
                {
                    await lastValueFrom(
                        this.fileUploaderService
                            .uploadFiles({
                                graphqlStatement: uploadFilesMutation,
                                files           : this.filesContainer,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('kitchenSink.File')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }

                log('Files upload from au-attachments: ', this.filesContainer);

                break;

            default:
                log(`[DEBUG] Action not found: ${action?.id}`);
                break;
        }
    }
}
