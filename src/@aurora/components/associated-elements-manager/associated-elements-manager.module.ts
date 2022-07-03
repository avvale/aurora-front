import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AssociatedElementsManagerComponent } from './associated-elements-manager.component';
import { FormElementDetailDialogTemplateDirective } from './form-element-detail-dialog-template.directive';
import { ElementDetailDialogComponent } from './element-detail-dialog.component';

// @aurora components
import { GridModule } from '../grid';

@NgModule({
    entryComponents: [
        ElementDetailDialogComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,

        // @aurora
        GridModule,
    ],
    declarations: [
        AssociatedElementsManagerComponent,
        ElementDetailDialogComponent,
        FormElementDetailDialogTemplateDirective,
    ],
    exports: [
        AssociatedElementsManagerComponent,
        FormElementDetailDialogTemplateDirective,
    ],
})

export class AssociatedElementsManagerModule
{ }
