import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action } from '@aurora/aurora.types';
import { ColumnConfig, GridColumnFilter, GridData, GridState } from '../grid/grid.types';
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
    @Input() activatedColumnFilters: GridColumnFilter[];
    @Input() columnsConfig: ColumnConfig[];
    @Input() originColumnsConfig: ColumnConfig[];
    // inputs
    @Input() data: GridData;
    @Input() newActionId: string = 'new';
    @Input('dialogWidth') dialogWidth: string = '90vw';
    @Input('dialogMaxWidth') dialogMaxWidth: string = '2048px';
    @Input('dialogMinWidth') dialogMinWidth: string = '240px';
    @Input('dialogHeight') dialogHeight: string = 'auto';

    // outputs
    @Output() action = new EventEmitter<Action>();
    @Output() columnFiltersChange = new EventEmitter<GridState>();
    @Output() columnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() dialogClose = new EventEmitter<void>();
    @Output() dialogOpen = new EventEmitter<void>();
    @Output() stateChange = new EventEmitter<GridState>();

    // directive to set form item detail
    @ContentChild(FormElementDetailDialogTemplateDirective) formElementDetailDialogTemplate?: FormElementDetailDialogTemplateDirective;

    constructor(
        private dialog: MatDialog,
    ) {}

    handleElementDetailDialog(actionId: string): void
    {
        const elementDetailDialogRef = this.dialog.open(ElementDetailDialogComponent,
            {
                width    : this.dialogWidth,
                maxWidth : this.dialogMaxWidth,
                minWidth : this.dialogMinWidth,
                height   : this.dialogHeight,
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
