import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Action } from '@aurora/aurora.types';
import { GridDialogComponent } from '../grid-dialog/grid-dialog.component';
import { ColumnConfig, GridColumnFilter, GridData, GridState } from '../grid/grid.types';
import { GridCustomButtonsHeaderTemplateDirective } from './grid-custom-buttons-header-template.directive';

@Component({
    selector       : 'au-select-multiple-elements-grid',
    templateUrl    : './select-multiple-elements-grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMultipleElementsGridComponent
{
    elementsDialogRef: MatDialogRef<GridDialogComponent>;

    // component label
    @Input() label: string;

    // grid dialog
    @Input() dialogGridId: string = 'grid';
    @Input() dialogTitle: string;
    @Input() dialogColumnsConfig: ColumnConfig[];
    @Input() dialogOriginColumnsConfig: ColumnConfig[];
    @Input() dialogActivatedColumnFilters: GridColumnFilter[];
    @Input() dialogSelectedRows: any[] = [];
    private _dialogGridData: GridData;
    @Input() set dialogGridData(gridData: GridData)
    {
        this._dialogGridData = gridData;
        if (this.elementsDialogRef)
        {
            this.elementsDialogRef.componentInstance.gridData = gridData;
            this.changeDetection.markForCheck();
        }
    }
    get dialogGridData(): GridData
    {
        return this._dialogGridData;
    }

    // grid
    @Input() data: GridData;
    @Input() gridId: string = 'grid';
    @Input() columnsConfig: ColumnConfig[];
    @Input() originColumnsConfig: ColumnConfig[];
    @Input() hasPagination: boolean = true;
    @Input() hasDragAndDrop: boolean = false;
    @Input() hasFilterButton: boolean = true;

    // selected items grid inputs
    @Input() selectedItemsColumnsConfig: ColumnConfig[];
    @Input() selectedItemsData: GridData;

    // add custom buttons header
    @ContentChild(GridCustomButtonsHeaderTemplateDirective) gridCustomButtonsHeaderTemplate?: GridCustomButtonsHeaderTemplateDirective;

    // outputs
    @Output() action = new EventEmitter<Action>();
    @Output() columnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() rowDrop = new EventEmitter<CdkDragDrop<any>>();
    @Output() stateChange = new EventEmitter<GridState>();

    // outputs grid dialog
    @Output() dialogAction = new EventEmitter<Action>();
    @Output() dialogClose = new EventEmitter<void>();
    @Output() dialogColumnFiltersChange = new EventEmitter<GridState>();
    @Output() dialogColumnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() dialogOpen = new EventEmitter<void>();
    @Output() dialogStateChange = new EventEmitter<GridState>();

    constructor(
        private changeDetection: ChangeDetectorRef,
        private dialog: MatDialog,
    ) {}

    handleElementsDialog(dialogConfig?: MatDialogConfig): void
    {
        this.elementsDialogRef = this.dialog.open(GridDialogComponent,
            {
                width    : '90vw',
                maxWidth : '1024px',
                minWidth : '240px',
                autoFocus: false,
                ...dialogConfig,
                ...{
                    data: {
                        activatedColumnFilters: this.dialogActivatedColumnFilters,
                        columnsConfig         : this.dialogColumnsConfig,
                        gridData              : this.dialogGridData,
                        gridId                : this.dialogGridId,
                        originColumnsConfig   : this.dialogOriginColumnsConfig,
                        selectedRows          : this.dialogSelectedRows,
                        title                 : this.dialogTitle,
                        ...dialogConfig?.data,
                    },
                },
            });

        this.elementsDialogRef
            .afterOpened()
            .subscribe(() => this.dialogOpen.next());

        this.elementsDialogRef
            .afterClosed()
            .subscribe(() => this.dialogClose.next());

        // pass change state event to parent component
        this.elementsDialogRef
            .componentInstance
            .stateChange
            .subscribe((state: GridState) => this.dialogStateChange.next(state));

        // pass on columns config change event to parent component
        this.elementsDialogRef
            .componentInstance
            .columnsConfigChange
            .subscribe((columnConfig: ColumnConfig[]) => this.dialogColumnsConfigChange.next(columnConfig));

        // pass on columns filters change event to parent component
        this.elementsDialogRef
            .componentInstance
            .columnFiltersChange
            .subscribe((state: GridState) => this.dialogColumnFiltersChange.next(state));

        // pass action click event to parent component
        this.elementsDialogRef
            .componentInstance
            .action
            .subscribe((action: Action) => this.dialogAction.next(action));

        // pass on selection row event to parent component
        this.elementsDialogRef
            .componentInstance
            .rowsSelectionChange
            .subscribe((action: Action) => this.dialogAction.next(action));
    }
}
