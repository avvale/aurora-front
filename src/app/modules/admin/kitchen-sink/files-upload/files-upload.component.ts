
import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, DecimalDirective, FileUploadComponent, Utils, ViewDetailComponent, defaultDetailImports, log } from '@aurora';
import { FileUploadService } from './file-upload.service';
import { lastValueFrom } from 'rxjs';

@Component({
    selector       : 'kitchen-sink-file-upload',
    templateUrl    : './files-upload.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        DecimalDirective, FileUploadComponent, NgIf, NgForOf,
    ],
})
export class FilesUploadComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: any;
    uploadFileResponse: any;
    stagingOneFile: { id: string; file: File; }[] = [];
    stagingMultipleFiles: { id: string; file: File; } [] = [];
    enableSubmitButton: boolean = false;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'kitchenSink.FileUpload' },
    ];

    constructor(
        protected injector: Injector,
        private readonly fileUploadService: FileUploadService,
    )
    {
        super(injector);
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
            example1: ['', [Validators.required]],
            example2: ['', [Validators.required]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'kitchenSink::fileUpload.detail.stagingOneFile':
                if (action.meta.files.length === 0) return;

                this.stagingOneFile = [];
                for (const file of action.meta.files)
                {
                    const fileEntry = file.file.fileEntry as FileSystemFileEntry;
                    fileEntry.file((file: File) =>
                    {
                        this.stagingOneFile.push({
                            id: Utils.uuid(),
                            file,
                        });
                    });
                }

                this.enableSubmitButton = true;
                break;

            case 'kitchenSink::fileUpload.detail.stagingMultipleFiles':
                if (action.meta.files.length === 0) return;

                this.stagingMultipleFiles = [];
                for (const file of action.meta.files)
                {
                    const fileEntry = file.file.fileEntry as FileSystemFileEntry;
                    fileEntry.file((file: File) =>
                    {
                        this.stagingMultipleFiles.push({
                            id: Utils.uuid(),
                            file,
                        });
                    });
                }

                this.enableSubmitButton = true;
                break;


            case 'kitchenSink::fileUpload.detail.submitFiles':
                try
                {
                    this.uploadFileResponse = await lastValueFrom(
                        this.fileUploadService
                            .uploadFiles({
                                files: [
                                    ...this.stagingMultipleFiles,
                                    ...this.stagingOneFile,
                                ],
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('common.Lang')} ${this.translocoService.translate('Created.M')}`,
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
                break;

            default:
                log(`[DEBUG] Action not found: ${action?.id}`);
                break;
        }
    }
}
