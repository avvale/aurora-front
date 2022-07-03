import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectionChange } from '@angular/cdk/collections';
import { Action } from '@aurora/aurora.types';
import { ColumnConfig, GridData, GridState } from '../grid';
import { SelectElementGridDialogComponent } from './select-element-grid-dialog.component';

@Component({
    selector       : 'au-select-element-grid',
    template       : '',
    styleUrls      : ['./select-element-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectElementGridComponent
{
    @Input() dialogTitle: string;
    @Input() columnsConfig: ColumnConfig[];
    @Input() selectedRows: any[] = [];
    @Input() set data(gridData: GridData)
    {
        this._data = gridData;
        if (this.dialogRef)
        {
            this.dialogRef.componentInstance.gridData = gridData;
            this.changeDetection.markForCheck();
        }
    }
    get data(): GridData
    {
        return this._data;
    }

    @Output() stateChange = new EventEmitter<GridState>();
    @Output() action = new EventEmitter<Action>();
    @Output() rowsSelectionChange = new EventEmitter<SelectionChange<any>>();

    private _data: GridData;
    dialogRef: MatDialogRef<SelectElementGridDialogComponent>;

    constructor(
        private changeDetection: ChangeDetectorRef,
        private matDialog: MatDialog,
    ) { }

    openDialog(): void
    {
        this.dialogRef = this.matDialog.open(SelectElementGridDialogComponent,
            {
                width    : '90vw',
                maxWidth : '1024px',
                minWidth : '240px',
                autoFocus: false,
                data     : {
                    columnsConfig: this.columnsConfig,
                    selectedRows : this.selectedRows,
                    gridData     : this.data,           // pass data when create dialog, after, will be passed by @Input() set data property
                    title        : this.dialogTitle,
                },
            });

        // pass change state event to parent component
        this.dialogRef
            .componentInstance
            .stateChange
            .subscribe((state: GridState) => this.stateChange.next(state));

        this.dialogRef
            .componentInstance
            .action
            .subscribe((action: Action) => this.action.next(action));

        this.dialogRef
            .componentInstance
            .rowsSelectionChange
            .subscribe((action: Action) => this.action.next(action));

        /* dialogRef
            .afterOpened()
            .subscribe(() => this.dialogOpen.next());

        dialogRef
            .afterClosed()
            .subscribe(() => this.dialogClose.next()); */
    }

    closeDialog(): void
    {
        this.dialogRef.close();
    }
}
