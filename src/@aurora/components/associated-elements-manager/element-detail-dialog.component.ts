import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormElementDetailDialogTemplateDirective } from './form-element-detail-dialog-template.directive';

@Component({
    selector       : 'au-element-detail-dialog',
    templateUrl    : './element-detail-dialog.component.html',
    styleUrls      : ['element-detail-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementDetailDialogComponent
{
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { title: string; currentActionId: string; formElementDetailDialogTemplate?: FormElementDetailDialogTemplateDirective; },
        public dialogRef: MatDialogRef<ElementDetailDialogComponent>,
    ) { }
}
