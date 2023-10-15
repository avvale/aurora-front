import { Component, ViewChildren, QueryList, Input, OnInit, OnChanges, ViewChild, Renderer2, Output, EventEmitter, Optional, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, ControlContainer, FormControl, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AttachmentsService } from './../attachments.service';
import { AttachmentItemComponent } from './../attachment-item/attachment-item.component';
import { CropperDialogComponent } from './../cropper-dialog.component';
// import { ConfigService } from '@horus/services/config.service';
import { environment } from 'environments/environment';
import * as _ from 'lodash';
import { Attachment, AttachmentFamily, DisplayedFile } from '../attachments.types';
import { FileUploaderService, log } from '@aurora';
import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogPipe } from '../../../pipes/log.pipe';

@Component({
    selector       : 'au-attachments',
    templateUrl    : './attachments.component.html',
    styleUrls      : ['./attachments.component.scss'],
    standalone     : true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports        : [
        NgForOf, ReactiveFormsModule,
        AsyncPipe, AttachmentItemComponent, DragDropModule,
    ],
})
export class AttachmentsComponent implements OnInit, OnChanges
{
    @Input() formArrayName: string;
    @Input() fg: FormGroup;
    @Input() set displayedFiles(attachments: Attachment[])
    {
        attachments.forEach(attachment => this.attachments.push(
            this.attachmentItemFormGroupFactory(attachment),
        ));
    }

    @Output('droppedFiles') droppedFiles = new EventEmitter<File[]>();
    attachments: FormArray = new FormArray([]);

    /* get form(): FormGroup
    {
        console.log('[DEBUG] form: ', this.controlContainer.control.parent);
        return this.controlContainer.control.parent as FormGroup;
    } */

    /* get control(): FormArray
    {
        return this.formArrayName.get(this.formArrayName) as FormArray;
    } */








    // OLD
    // Input elements
    @Input() placeholder: string;
    //@Input() form: FormGroup;
    @Input() name: string;                                 // name of input that contain attachments FormArray
    @Input() value: Attachment[];                          // array of attachments to init component
    @Input() attachmentFamilies: AttachmentFamily[] = [];  // families for AttachmentItemComponent

    // View elements
    @ViewChild('attachmentFrame', { static: true })  attachmentFrame;
    @ViewChild('attachmentMask', { static: false }) attachmentMask;
    @ViewChildren(AttachmentItemComponent) attachmentItems: QueryList<AttachmentItemComponent>;

    items: FormArray;
    attachment: FormGroup;                      // formGroup that contain attachment that will be crop
    attachmentFamily: AttachmentFamily;    // variable to contain attachment family where we take crop properties
    progress = 0;

    constructor(
        private readonly fb: FormBuilder,
        private readonly renderer: Renderer2,
        private readonly sanitizer: DomSanitizer,
        private _attachmentsService: AttachmentsService,
        private _dialog: MatDialog,
        @Optional() private controlContainer: ControlContainer,
    )
    {
        /* this.attachments
            .valueChanges
            .subscribe(value =>
            {
                this.propagateChange(value);
            }); */
    }

    /* private propagateChange: (attachments: Attachment[]) => void;
    private onTouched: () => void; */

    // initialize the value.
    /* writeValue(attachments: Attachment[]): void
    {
        //if (Array.isArray(attachments) && attachments.length > 0) this.attachments.setValue(attachments);
    }

    // registers a callback function is called by the forms API on initialization
    registerOnChange(fn: (attachments: Attachment[]) => void): void
    {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.onTouched = fn;
    } */












    ngOnInit(): void
    {
        this.renderer.listen(this.attachmentFrame.nativeElement, 'dragenter', $event =>
        {
            this.dragEnterHandler($event);
        });

        this.renderer.listen(this.attachmentFrame.nativeElement, 'dragover', $event =>
        {
            this._dragOverHandler($event);
        });

        this.renderer.listen(this.attachmentFrame.nativeElement, 'dragleave', $event =>
        {
            this._dragLeaveHandler($event);
        });

        this.renderer.listen(this.attachmentFrame.nativeElement, 'drop', $event =>
        {
            this.dropHandler($event);
        });
    }




    ngOnChanges(): void
    {
        //console.log('[DEBUG] ngOnChanges: ');
        // load values from input
        // set value from component, to init with values only
        // when the component is created or change value input
        //if (this.value) this._setValue(this.value);
    }

    /**
     * Function to manage drag and drop items, to sort attachments
     *
     * @param event
     */
    drop(event: CdkDragDrop<string[]>): void
    {
        moveItemInArray(this.attachments.controls, event.previousIndex, event.currentIndex);

        // set attachments sort
        for (let i = 0; this.attachments.controls.length > i; i++)
        {
            this.attachments.at(i).get('sort').setValue(i);
        }
        this._touchFormAttachments();

        log('[DEBUG] attachments: ', this.attachments.controls);
    }

    /*  get attachments(): FormArray
    {
        return this.form.get(this.name) as FormArray;
    } */

    /* private _setValue(attachments: Attachment[]): void
    {
        // create and set attachments FormGroup
        for (const attachment of attachments) this.attachmentItemFormGroupFactory(attachment);

        if (this.attachments.length > 0) this._disablePlaceholder();
    } */

    /* private createAttachmentItems(files: File[]): void
    {
        files
            .forEach(file =>
                this.attachments
                    .push(
                        this.attachmentItemFormGroupFactory(file),
                    ),
            );
    } */

    private attachmentItemFormGroupFactory(file?): FormGroup
    {
        const attachmentItemFormGroup = this.fb.group({
            encoding            : '',
            filename            : ['', Validators.required],
            id                  : '',
            mimetype            : ['', Validators.required],
            relativePathSegments: '',
            size                : [0, Validators.required],
            url                 : '',
            sort                : -1,
        });

        if (file) attachmentItemFormGroup.patchValue(file);

        return attachmentItemFormGroup;

        // add attachment FormGroup to attachments FormArray
        // with function attachments get FormArray
        return this.fb.group({
            id             : '',
            langId         : '',
            attachableType : '',
            attachableUuid : '',
            familyUuid     : '',
            sort           : '',
            alt            : '',
            title          : '',
            path           : ['', Validators.required],
            filename       : ['', Validators.required],
            url            : ['', Validators.required],
            mime           : ['', Validators.required],
            extension      : ['', Validators.required],
            size           : ['', Validators.required],
            width          : '',
            height         : '',
            libraryUuid    : '',
            libraryFilename: '',
            meta           : '',

            // need implement attachment library fields to avoid send __typename field that is included in response from graphQL
            // this field contain AttachmentLibrary value, when we try send values GraphQL expect to obtain AttachmentLibraryInput
            library: this.fb.group({
                id       : '',
                uuid     : '',
                name     : '',
                pathname : '',
                filename : '',
                url      : '',
                mime     : '',
                extension: '',
                size     : '',
                width    : '',
                height   : '',
                data     : '',
            }),
            data      : '',
            isUploaded: false,
            isChanged : false,
        });

        /* if (attachment !== undefined) attachmentItemFormGroup.patchValue(attachment);

        this.attachments.push(attachmentItemFormGroup);

        return attachmentItemFormGroup; */
    }

    onEnableCrop($event): void
    {
        if (environment.debug) log('[DEBUG] Trigger enableCropHandler with this event: ', $event);

        // show dialog image
        const dialog = this._dialog.open(CropperDialogComponent, {
            data: {
                attachment      : $event.attachment,
                attachmentFamily: _.find(this.attachmentFamilies, { uuid: $event.familyUuid }),
                form            : this.fg,
            },
            height: '90%',
            width : '90%',
        });
    }

    onRemoveItem($event): void
    {
        const attachment = $event.attachment as FormGroup;

        this._attachmentsService.
            deleteAttachment(attachment.value)
            .subscribe(({ data }) =>
            {
                // file deleted
                for (let i = 0; this.attachments.length; i++)
                {
                    const formGroup = this.attachments.at(i) as FormGroup;

                    if (formGroup.get('filename').value === attachment.get('filename').value)
                    {
                        // delete attachment from FormArray
                        this.attachments.removeAt(i);

                        this._touchFormAttachments();

                        // break to not continue with for, because length attachments has changed
                        break;
                    }
                }

                // show placeholder if has not any item
                if (this.attachments.length === 0)
                {
                    this._enablePlaceholder();
                }
            });
    }

    private _touchFormAttachments(): void
    {
        this.fg.markAsDirty();
        this.fg.markAsTouched();
    }

    // methods to manage layers
    private dragEnterHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentFrame.nativeElement)
        {
            if (!this.attachmentMask.nativeElement.classList.contains('active-mask')) this._activateMask();
        }
    }

    private _dragOverHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentFrame.nativeElement)
        {
            if (! this.attachmentMask.nativeElement.classList.contains('active-mask')) this._activateMask();
        }
        else
        {
            if (this.attachmentMask.nativeElement.classList.contains('active-mask')) this._deactivateMask();
        }
    }

    private _dragLeaveHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentFrame.nativeElement)
        {
            if (this.attachmentMask.nativeElement.classList.contains('active-mask')) this._deactivateMask();
        }
    }

    private dropHandler($event): void
    {
        $event.preventDefault();
        if (this.attachmentMask.nativeElement.classList.contains('active-mask'))
        {
            this._deactivateMask();
            this._disablePlaceholder();
        }
        // get files after drop files on active area
        const filesObject = $event.dataTransfer ? $event.dataTransfer.files : $event.target.files;
        // convert associate files object to array
        const filesArray = [...filesObject];

        this.droppedFiles.emit(filesArray);
    }

    private _enablePlaceholder(): void
    {
        this.renderer.removeClass(this.attachmentFrame.nativeElement, 'has-attachment');
    }

    private _disablePlaceholder(): void
    {
        this.renderer.addClass(this.attachmentFrame.nativeElement, 'has-attachment');
    }

    private _activateMask(): void
    {
        this.renderer.addClass(this.attachmentMask.nativeElement, 'active-mask');
    }

    private _deactivateMask(): void
    {
        this.renderer.removeClass(this.attachmentMask.nativeElement, 'active-mask');
    }
}
