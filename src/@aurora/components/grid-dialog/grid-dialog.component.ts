import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionChange } from '@angular/cdk/collections';
import { Action } from '@aurora/aurora.types';
import { ColumnConfig, GridData, GridState } from '../grid';

@Component({
    selector       : 'au-grid-dialog',
    templateUrl    : './grid-dialog.component.html',
    styleUrls      : ['grid-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDialogComponent
{
    set gridData(gridData: GridData)
    {
        this._gridData = gridData;
        this.changeDetection.markForCheck();
    }
    get gridData(): GridData
    {
        return this._gridData;
    }

    // outputs
    @Output() stateChange = new EventEmitter<GridState>();
    @Output() action = new EventEmitter<Action>();
    @Output() rowsSelectionChange = new EventEmitter<SelectionChange<any>>();
    @Output() dialogOpen = new EventEmitter<void>();
    @Output() dialogClose = new EventEmitter<void>();

    private _gridData: GridData;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            title: string;
            columnsConfig: ColumnConfig[];
            gridData: GridData;
            selectedRows: any[];
        },
        private changeDetection: ChangeDetectorRef,
        public dialogRef: MatDialogRef<GridDialogComponent>,
    )
    {
        // when create dialog set data from constructor
        this.gridData = data.gridData;
    }
}
