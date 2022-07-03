import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action } from '@aurora/aurora.types';
import { GridDialogComponent } from '../grid-dialog/grid-dialog.component';
import { ColumnConfig, GridData, GridState } from '../grid/grid.types';

@Component({
    selector       : 'au-select-multiple-elements-grid',
    templateUrl    : './select-multiple-elements-grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMultipleElementsGridComponent
{
    dialogRef: MatDialogRef<GridDialogComponent>;

    // component label
    @Input() label: string;

    // dialog grid inputs
    @Input() dialogTitle: string;
    @Input() dialogColumnsConfig: ColumnConfig[];
    @Input() dialogData: GridData;

    // selected items grid inputs
    @Input() selectedItemsColumnsConfig: ColumnConfig[];
    @Input() selectedItemsData: GridData;

    // add class to wrapper grid
    @Input('class') klass: string;

    // outputs
    @Output() stateChange = new EventEmitter<GridState>();
    @Output() action = new EventEmitter<Action>();
    @Output() dialogOpen = new EventEmitter<void>();
    @Output() dialogClose = new EventEmitter<void>();

    constructor(
        private matDialog: MatDialog,
    ) {}

    handleElementsDialog(): void
    {
        this.dialogRef = this.matDialog.open(GridDialogComponent,
            {
                width    : '90vw',
                maxWidth : '1024px',
                minWidth : '240px',
                autoFocus: false,
                data     : {
                    columnsConfig: this.dialogColumnsConfig,
                    // selectedRows : this.selectedRows,
                    gridData     : this.dialogData,           // pass data when create dialog, after, will be passed by @Input() set data property
                    // title        : this.dialogTitle,
                },
            });

        this.dialogRef
            .afterOpened()
            .subscribe(() => this.dialogOpen.next());

        this.dialogRef
            .afterClosed()
            .subscribe(() => this.dialogClose.next());
    }
}
