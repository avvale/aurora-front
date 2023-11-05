import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { AttachmentsService } from './attachments.service';
import { MatButtonModule } from '@angular/material/button';
import Cropper from 'cropperjs/dist/cropper.esm.js';
import { FormGroup } from '@angular/forms';
import { AttachmentFamily, ImageInputComponent } from '@aurora';

@Component({
    selector: 'au-cropper-dialog',
    template: `
        <div mat-dialog-content>
            <div class="cropper-container">
                <img #cropperImage>
            </div>
        </div>
        <div mat-dialog-actions class="justify-end">
            <button
                mat-flat-button
                class="mat-accent mr-16"
                [mat-dialog-close]="false"
            >
                {{ cancel }} Cancelar
            </button>
            <button
                mat-flat-button
                cdkFocusInitial
                class="mat-primary"
                [mat-dialog-close]="true"
                (click)="handlerCrop()"
            >
                {{ crop }} Cortar
            </button>
        </div>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .mat-mdc-dialog-content {
            max-height: unset;
        }

        .cropper-container {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        ::ng-deep cropper-canvas {
            flex: 1 !important;
        }
    `],
    standalone     : true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports        : [
        MatDialogModule, MatButtonModule,
    ],
})
export class CropperDialogComponent implements OnInit, OnDestroy
{
    @ViewChild('cropperImage', { static: true }) cropperImage;
    @ViewChild('cropperPreview', { static: false }) cropperPreview;
    cropper: Cropper;
    title: string;
    crop: string;
    cancel: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            attachmentItemFormGroup: FormGroup;
            attachmentItemImage: ImageInputComponent;
            attachmentFamily: AttachmentFamily;
        },
        public readonly dialogRef: MatDialogRef<CropperDialogComponent>,
        private readonly renderer: Renderer2,
        private readonly attachmentsService: AttachmentsService,
        private _translocoService: TranslocoService,
    )
    { }

    ngOnInit(): void
    {
        this.renderer
            .setProperty(
                this.cropperImage.nativeElement,
                'src',
                this.data.attachmentItemFormGroup.get('library').get('url').value,
            );

        // load translations for component
        // this.title  = this.data.title ? this.data.title : this._translocoService.translate('TITLE');
        // this.crop   = this.data.crop ? this.data.crop : this._translocoService.translate('CROP');
        // this.cancel = this.data.cancel ? this.data.cancel : this._translocoService['CANCEL'];

        const cropperParameters = {
            aspectRatio      : this.data.attachmentFamily.width && this.data.attachmentFamily.height ? this.data.attachmentFamily.width / this.data.attachmentFamily.height : NaN,
            viewMode         : 2,
            minContainerWidth: 0,
        };

        this.cropper = new Cropper(
            this.cropperImage.nativeElement,
            cropperParameters,
        );
    }

    ngOnDestroy(): void
    {
        this.renderer
            .setProperty(
                this.cropperImage.nativeElement,
                'src',
                '',
            );
        this.cropper.destroy();
    }

    handlerCrop(): void
    {
        this.attachmentsService
            .setCropImage(
                this.data.attachmentItemFormGroup.value,    // get values from formGroup
                this.cropper.getData(true),                 // true to get data rounded
            )
            .subscribe(data =>
            {
                console.log(data);
                this.data.attachmentItemFormGroup.patchValue({
                    ...data.attachment,
                    // set attachment image like changed
                    isChanged: true,
                });

                // set form like dirty
                this.data.attachmentItemFormGroup.markAsDirty();
            });
    }
}
