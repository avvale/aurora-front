
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Action, Crumb, FileUploadComponent, FileUploaderService, ViewDetailComponent, commonUploadAttachments, defaultDetailImports, log, uuid } from '@aurora';
import { lastValueFrom } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialFileInputModule } from 'ngx-custom-material-file-input';

@Component({
    selector       : 'kitchen-sink-file-upload',
    templateUrl    : './files-upload.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        FileUploadComponent, MatDividerModule, MatToolbarModule, NgIf,
        MaterialFileInputModule,
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
    stagingExample1: { id: string; file: File; relativePathSegments: string[]; }[] = [];
    stagingExample2: { id: string; file: File; relativePathSegments: string[]; } [] = [];
    stagingExample3: { id: string; file: File; relativePathSegments: string[]; } [] = [];
    stagingExample4: { id: string; file: File; relativePathSegments: string[]; } [] = [];
    enableSubmitButton: boolean = false;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'kitchenSink.FileUpload' },
    ];

    constructor(
        protected injector: Injector,
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
            example1: ['', [Validators.required]],
            example2: ['', [Validators.required]],
            example3: ['', [Validators.required]],
            example4: ['', [Validators.required]],
            example5: ['', [Validators.required]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'kitchenSink::fileUpload.detail.stagingExample1':
                if (action.meta.files.length === 0) return;

                this.stagingExample1 = [];
                for (const file of action.meta.files)
                {
                    const fileEntry = file.file.fileEntry as FileSystemFileEntry;
                    fileEntry.file((file: File) =>
                    {
                        this.stagingExample1.push({
                            id: uuid(),
                            file,
                            relativePathSegments: ['test'],
                        });
                    });
                }

                this.enableSubmitButton = true;
                break;

            case 'kitchenSink::fileUpload.detail.stagingExample2':
                if (action.meta.files.length === 0) return;

                this.stagingExample2 = [];
                for (const file of action.meta.files)
                {
                    const fileEntry = file.file.fileEntry as FileSystemFileEntry;
                    fileEntry.file((file: File) =>
                    {
                        this.stagingExample2.push({
                            id: uuid(),
                            file,
                            relativePathSegments: ['test'],
                        });
                    });
                }

                this.enableSubmitButton = true;
                break;

            case 'kitchenSink::fileUpload.detail.stagingExample3':
                if (action.meta.files.length === 0) return;

                this.stagingExample3 = [];
                for (const file of action.meta.files)
                {
                    this.stagingExample3.push({
                        id: uuid(),
                        file,
                        relativePathSegments: ['test'],
                    });
                }

                this.enableSubmitButton = true;
                break;

            case 'kitchenSink::fileUpload.detail.stagingExample4':
                if (action.meta.files.length === 0) return;

                const inputElement = action.meta.files.target as HTMLInputElement;
                this.stagingExample4 = [];
                for (const file of Array.from(inputElement.files))
                {
                    this.stagingExample4.push({
                        id: uuid(),
                        file,
                        relativePathSegments: ['test'],
                    });
                }

                this.enableSubmitButton = true;
                break;

            case 'kitchenSink::fileUpload.detail.submitFiles':
                try
                {
                    await lastValueFrom(
                        this.fileUploaderService
                            .uploadFiles({
                                graphqlStatement: commonUploadAttachments,
                                files           : [
                                    ...this.stagingExample1,
                                    ...this.stagingExample2,
                                    ...this.stagingExample3,
                                    ...this.stagingExample4,
                                ],
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
                break;

            default:
                log(`[DEBUG] Action not found: ${action?.id}`);
                break;
        }
    }
}
