// angular
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { CommonLang } from '@aurora/modules';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// aurora
import { ActionEvent, ColumnConfig, ColumnConfigAction, ColumnDataType, GridData, GridColumnFilter, GridState } from '../grid.types';
import { CellValueTemplateDirective } from '../directives/cell-value-template.directive';
import { GridColumnsConfigPropertiesDialogComponent } from '../grid-columns-config-properties-dialog/grid-columns-config-properties-dialog.component';
import { GridFiltersDialogComponent } from '../grid-filters-dialog/grid-filters-dialog.component';
import { SelectionChange, SelectionModel } from '../selection-model/selection-model';

// third party libraries
import { merge, Subject, tap } from 'rxjs';
import cloneDeep from 'lodash-es/cloneDeep';

@Component({
    selector       : 'au-grid',
    templateUrl    : './grid.component.html',
    styleUrls      : ['./grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, AfterViewInit
{
    // inputs
    @Input() data: GridData;
    // langs to create TranslationMenuComponent form multi language objects
    @Input() langs: CommonLang[] = [];
    // set rows selection
    @Input() selectedRows: any[] = [];
    // selection checkbox column
    @Input() rowsSelection = new SelectionModel<any>(true, [], true, (a: any, b: any) => a.id === b.id);
    // column filters activated
    @Input() activatedColumnFilters: GridColumnFilter[] = [];

    // view children
    @ViewChild(MatPaginator) private paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // directive to ser custom values in cells
    @ContentChildren(CellValueTemplateDirective) cellValuesTemplate?: QueryList<CellValueTemplateDirective>;

    // outputs
    @Output() pageChange = new EventEmitter<GridState>();
    @Output() filtersChange = new EventEmitter<GridState>();
    @Output() stateChange = new EventEmitter<GridState>();
    @Output() action = new EventEmitter<ActionEvent>();
    @Output() closeColumnDialog = new EventEmitter<void>();
    @Output() columnsConfigChange = new EventEmitter<ColumnConfig[]>();
    @Output() rowsSelectionChange = new EventEmitter<SelectionChange<any>>();

    // set columns types for render each web component
    columnConfigType = ColumnDataType;
    columnsConfigPropertiesDialog = GridColumnsConfigPropertiesDialogComponent;     // dialog to sort columns
    gridFilterDialog = GridFiltersDialogComponent;   // dialog to filter columns
    changeColumnsConfig$: Subject<ColumnConfig[]> = new Subject();

    // clone columnsConfig to can reset columnsConfig to original status
    private _columnsConfig: ColumnConfig[] = [];
    private _originColumnsConfig: ColumnConfig[] = [];
    @Input() set columnsConfig(data: ColumnConfig[])
    {
        this._columnsConfig = cloneDeep(data);
        this._originColumnsConfig = cloneDeep(data);
    }
    get columnsConfig(): ColumnConfig[]
    {
        return this._columnsConfig;
    }

    get displayedColumns(): string[]
    {
        return this.columnsConfig
            .filter(item => !item.hidden)
            .map(item => item.field);
    }

    constructor(
        protected dialog: MatDialog,
        private changeDetection: ChangeDetectorRef,
    ) { }

    ngOnInit(): void
    {
        this.rowsSelection
            .changed
            .subscribe(selectionChange => this.rowsSelectionChange.emit(selectionChange));

        // if exist selectedRows items, set rows selection
        if (this.selectedRows.length > 0) this.rowsSelection.select(...this.selectedRows);
    }

    ngAfterViewInit(): void
    {
        if (this.paginator && this.sort)
        {
            // Reset back to the first page after sort
            this.sort
                .sortChange
                .subscribe(
                    () => (this.paginator.pageIndex = 0),
                );

            // subscribe to sort event and paginator event
            merge(this.paginator.page, this.sort.sortChange)
                .pipe(
                    tap(() =>
                    {
                        const gridState = {
                            filters: this.activatedColumnFilters,
                            count  : this.paginator.length,
                            offset :
                                this.paginator.pageIndex *
                                this.paginator.pageSize,
                            limit: this.paginator.pageSize,
                            sort : this.sort.active,
                            order: this.sort.direction,
                        };

                        this.stateChange.emit(gridState);
                        this.pageChange.emit(gridState);
                    }),
                )
                .subscribe();
        }
    }

    handleClickAction(
        action: ColumnConfigAction,
        row: any,
        event: PointerEvent,
    ): void
    {
        this.action.emit({ action, row, event });
    }

    /**
     * manage columns config properties in dialog
     */
    handleColumnsConfigPropertiesDialog(): void
    {
        const columnsConfigPropertiesDialogRef = this.dialog.open(this.columnsConfigPropertiesDialog,
            {
                width    : '90vw',
                maxWidth : '420px',
                minWidth : '240px',
                autoFocus: false,
                data     : {
                    columnsConfig: this.columnsConfig,
                },
            });

        // emit columnsConfigChange event
        columnsConfigPropertiesDialogRef
            .componentInstance
            .columnsConfigChange
            .subscribe($event => this.columnsConfigChange.emit($event.columnsConfig));

        //
        columnsConfigPropertiesDialogRef.afterClosed().subscribe(res => this.closeColumnDialog.emit());
    }

    /*
    * manage filters column grid
    */
    handleFiltersDialog(): void
    {
        const gridFilterDialogRef = this.dialog.open(this.gridFilterDialog,
            {
                width    : '90vw',
                maxWidth : '600px',
                minWidth : '240px',
                height   : '75vh',
                autoFocus: false,
                data     : {
                    columnsConfig         : this.columnsConfig,
                    activatedColumnFilters: this.activatedColumnFilters,
                },
            });

        gridFilterDialogRef
            .afterClosed()
            .subscribe(res =>
            {
                // dialog is closed without actions
                if (res === undefined) return;

                // this saves filters so they are kept after closing the dialog
                this.activatedColumnFilters = res.filters;

                const gridState = {
                    filters: this.activatedColumnFilters,
                    count  : this.paginator.length,
                    sort   : this.sort.active,
                    order  : this.sort.direction,
                    limit  : this.paginator.pageSize,
                    offset : 0,
                };

                // emit event
                this.stateChange.emit(gridState);
                this.filtersChange.emit(gridState);

                // refresh view to update number of filters activated
                this.changeDetection.markForCheck();
            });
    }

    /**
     * selection checkbox column methods
     */
    isAllSelected(): boolean
    {
        return this.rowsSelection.isAllSelected(this.data.rows);
    }

    isSomeSelected(): boolean
    {
        return this.rowsSelection.isSomeSelected(this.data.rows);
    }

    masterToggle(): void
    {
        if (this.isAllSelected())
        {
            this.rowsSelection.deselect(...this.data.rows);
            return;
        }
        this.rowsSelection.select(...this.data.rows);
    }

    checkboxLabel(row?: any): string
    {
        if (!row) return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        return `${this.rowsSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
}
