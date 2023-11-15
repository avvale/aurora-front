import { Component, Input, Output, OnInit, EventEmitter, ViewChild, Renderer2, forwardRef, ChangeDetectionStrategy, Optional } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AttachmentFamily, CropType } from './../attachments.types';
import { SizeFormatPipe } from '../pipes/size-format.pipe';
import { NgForOf, NgIf } from '@angular/common';
import { ImageInputComponent } from '@aurora/components/image-input';
import { log } from '@aurora';
import { MatButtonModule } from '@angular/material/button';
import { first, merge } from 'rxjs';
// import { DownloadService } from '@horus/services/download.service';

@Component({
    selector       : 'au-attachment-item',
    templateUrl    : './attachment-item.component.html',
    styleUrls      : ['./attachment-item.component.scss'],
    standalone     : true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports        : [
        FormsModule, ImageInputComponent, NgIf, NgForOf, ReactiveFormsModule, SizeFormatPipe,
    ],
    providers: [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AttachmentItemComponent),
            multi      : true,
        },
    ],
})
export class AttachmentItemComponent implements OnInit, ControlValueAccessor
{
    @Input() formGroupName: string;
    @Input() families: AttachmentFamily[] = [];

    @Output() enableCrop: EventEmitter<{
        attachmentItemFormGroup: FormGroup;
        attachmentItemImage: ImageInputComponent;
    }> = new EventEmitter();
    @Output() removeItem: EventEmitter<{
        attachmentItemFormGroup: FormGroup;
    }> = new EventEmitter();

    @ViewChild('image', { static: false }) image: ImageInputComponent;
    @ViewChild('openOver', { static: true }) openOver;
    @ViewChild('closeOver', { static: true }) closeOver;

    attachment: FormGroup;
    familySelect: AttachmentFamily;
    showCropButton = false;

    // get attachment item form group
    get formGroup(): FormGroup
    {
        return this.controlContainer.control as FormGroup;
    }

    activeCropHandler(): void
    {
        // click to active cropper
        if (this.formGroup.get('familyId').value !== '')
        {
            this.enableCrop
                .emit({
                    attachmentItemFormGroup: this.formGroup,
                    attachmentItemImage    : this.image,
                });
        }
    }



    // OLD desde aqui comprobar si es válido
    //@Input() attachment: FormGroup;
    constructor(
        private _renderer: Renderer2,
        @Optional() private controlContainer: ControlContainer,
        // private _downloadService: DownloadService
    )
    {
        //this.createForm();

        /* this.attachment
            .valueChanges
            .subscribe(value => this.propagateChange(value)); */
    }


    private propagateChange: (value: any) => void;
    private onTouched: () => void;

    writeValue(attachment: FormGroup): void
    {
        log('[DEBUG] WriteValue AttachmentItemComponent: ', attachment);
        if (attachment) this.attachment = attachment;
    }

    // registers a callback function is called by the forms API on initialization
    registerOnChange(fn: (value: any) => void): void
    {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.onTouched = fn;
    }




    ngOnInit(): void
    {
        this._renderer.listen(this.openOver.nativeElement, 'click', $event =>
        {
            this._renderer.addClass($event.target.closest('.attachment-item'), 'covered');
        });

        this._renderer.listen(this.closeOver.nativeElement, 'click', $event =>
        {
            this._renderer.removeClass($event.target.closest('.attachment-item'), 'covered');
        });

        this.setShowCropButton();

        merge(
            this.formGroup.get('alt').valueChanges,
            this.formGroup.get('title').valueChanges,
        )
            .pipe(first())
            .subscribe(value => this.formGroup.get('isChanged').setValue(true));
    }

    handlerRemoveItem(): void
    {
        this.removeItem.emit({
            attachmentItemFormGroup: this.formGroup,
        });
    }

    handlerChangeFamily($event: { target: { value: number; }; }): void
    {
        // get $event.target.value with ngValue that return a object
        this.familySelect = <AttachmentFamily>this.families.find(family => family.id === $event.target.value);

        this.setShowCropButton();
    }

    setShowCropButton(): void
    {
        this.showCropButton = this.familySelect && (
            this.familySelect.fitType === CropType.FIT_CROP ||
            this.familySelect.fitType === CropType.FIT_WIDTH_FREE_CROP ||
            this.familySelect.fitType === CropType.FIT_HEIGHT_FREE_CROP
        ) ? true : false;
    }

    download(): void
    {
        /*const attachmentValue = this.attachment.value;

        const file = {
            url     : attachmentValue.url,
            filename: attachmentValue.file_name,
            pathname: attachmentValue.base_path.slice(attachmentValue.base_path.indexOf('app/public')) + '/' + attachmentValue.file_name,
            mime    : attachmentValue.mime,
            size    : attachmentValue.size,
        };*/

        // call download service
        // this._downloadService.download(<File>file);
    }
}
