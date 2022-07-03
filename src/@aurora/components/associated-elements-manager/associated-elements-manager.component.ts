import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action } from '@aurora/aurora.types';
import { ColumnConfig, GridData, GridState } from '../grid/grid.types';
import { ElementDetailDialogComponent } from './element-detail-dialog.component';
import { FormElementDetailDialogTemplateDirective } from './form-element-detail-dialog-template.directive';

@Component({
    selector       : 'au-associated-elements-manager',
    templateUrl    : './associated-elements-manager.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssociatedElementsManagerComponent
{
    // component label
    @Input() label: string;
    // title of dialog
    @Input() dialogTitle: string;
    // grid columns config
    @Input() columnsConfig: ColumnConfig[];
    // inputs
    @Input() data: GridData;
    // add class to wrapper grid
    @Input('class') klass: string;

    // outputs
    @Output() stateChange = new EventEmitter<GridState>();
    @Output() action = new EventEmitter<Action>();
    @Output() dialogOpen = new EventEmitter<void>();
    @Output() dialogClose = new EventEmitter<void>();

    // directive to set form item detail
    @ContentChild(FormElementDetailDialogTemplateDirective) formElementDetailDialogTemplate?: FormElementDetailDialogTemplateDirective;

    constructor(
        private dialog: MatDialog,
    ) {}

    handleElementDetailDialog(actionId: string): void
    {
        const elementDetailDialogRef = this.dialog.open(ElementDetailDialogComponent,
            {
                width    : '90vw',
                maxWidth : '1024px',
                minWidth : '240px',
                autoFocus: false,
                data     : {
                    title                          : this.dialogTitle,
                    currentActionId                : actionId,
                    formElementDetailDialogTemplate: this.formElementDetailDialogTemplate,
                },
            });

        elementDetailDialogRef
            .afterOpened()
            .subscribe(() => this.dialogOpen.next());

        elementDetailDialogRef
            .afterClosed()
            .subscribe(() => this.dialogClose.next());
    }
}
