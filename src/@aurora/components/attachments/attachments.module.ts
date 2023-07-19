import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ImageInputModule } from '@horus/components/image-input/image-input.module';
import { PipesModule } from '@horus/pipes/pipes.module';
import { AttachmentItemComponent } from './attachment-item/attachment-item.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { AttachmentsService } from './attachments.service';
import { CropperDialogComponent } from './cropper-dialog.component';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

@NgModule({
    imports: [
        CommonModule,
        DragDropModule,
        FormsModule,
        ImageInputModule,
        MatButtonModule,
        MatDialogModule,
        PipesModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    declarations: [
        AttachmentItemComponent,
        AttachmentsComponent,
        CropperDialogComponent
    ],
    providers: [
        AttachmentsService
    ],
    exports: [
        AttachmentsComponent
    ],
    entryComponents: [
        CropperDialogComponent
    ]
})
export class AttachmentsModule
{ 
    constructor(
        private _translationLoader: FuseTranslationLoaderService
    ) 
    {
        this._translationLoader.loadTranslations(english, spanish);
    }
}
