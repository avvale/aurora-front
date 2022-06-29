import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnConfig, ColumnDataType, ColumnsConfigChange } from '../grid.types';

@Component({
    selector : 'au-grid-columns-config-properties-dialog',
    styleUrls: ['./grid-columns-config-properties-dialog.component.scss'],
    template : `
        <div mat-dialog-title class="dialog-header relative">
            <p class="title">
                <mat-icon class="inline">table_chart</mat-icon>
                <span>{{ 'columns' | gridTranslate }}</span>
            </p>

            <div class="helper text-base opacity-50">{{ 'clickAndDragInfo' | gridTranslate }}</div>
            <hr class="mt-2 mb-4">

            <button mat-icon-button [disableRipple]="true" mat-dialog-close class="absolute top-0 right-0">
                <mat-icon>close</mat-icon>
            </button>
        </div>

        <div mat-dialog-content class="max-h-80 overflow-y-scroll">
            <div
                cdkDropList
                class="columns-list"
                (cdkDropListDropped)="drop($event)"
            >
                <ng-container *ngFor="let columnConfig of columnsConfigToList">
                    <div
                        class="column"
                        cdkDrag
                        [ngClass]="{ 'cursor-move': !columnConfig.sticky }"
                        [cdkDragDisabled]="columnConfig.sticky"
                    >
                        <div class="flex">
                            <mat-checkbox
                                [(ngModel)]="!columnConfig.hidden"
                                [disabled]="columnConfig.sticky"
                                (change)="handleChangeActiveColumn($event, columnConfig)"
                            >
                            </mat-checkbox>

                            <span>
                            {{ columnConfig.field | gridTranslate:'column' }}
                            </span>
                        </div>

                        <mat-icon>drag_indicator</mat-icon>
                    </div>

                    <hr>
                </ng-container>
            </div>
        </div>
    `,
})
export class GridColumnsConfigPropertiesDialogComponent implements OnInit
{
    columnsConfig: ColumnConfig[];
    columnsConfigChange = new EventEmitter<ColumnsConfigChange>();

    // avoid change columns config of type ACTIONS and CHECKBOX
    get columnsConfigToList (): ColumnConfig[]
    {
        return this.columnsConfig.filter(column => column.type !== ColumnDataType.CHECKBOX && column.type !== ColumnDataType.ACTIONS);
    }

    get hasActionsColumn (): boolean
    {
        return !!this.columnsConfig.find(column => column.type === ColumnDataType.ACTIONS);
    }

    get hasCheckboxColumn (): boolean
    {
        return !!this.columnsConfig.find(column => column.type === ColumnDataType.CHECKBOX);
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<GridColumnsConfigPropertiesDialogComponent>,
    ) { }

    ngOnInit(): void
    {
        this.columnsConfig = this.data.columnsConfig;
    }

    drop($event: CdkDragDrop<string[]>): void
    {
        let previousIndex = $event.previousIndex;
        let currentIndex  = $event.currentIndex;

        if (this.hasActionsColumn)
        {
            previousIndex++; currentIndex++;
        }

        if (this.hasCheckboxColumn)
        {
            previousIndex++; currentIndex++;
        }

        moveItemInArray(
            this.columnsConfig,
            previousIndex,
            currentIndex,
        );

        this.columnsConfigChange.emit({
            columnsConfig: this.columnsConfig,
            event        : $event,
        });
    }

    handleChangeActiveColumn($event, column): void
    {
        const index = this.columnsConfig.map(c => c.sort).indexOf(column.sort);
        this.columnsConfig[index].hidden = !$event.checked;

        this.columnsConfigChange.emit({
            columnsConfig: this.columnsConfig,
            event        : $event,
        });
    }
}
