
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, ViewBaseComponent, defaultListImports } from '@aurora';
import { Observable, of, takeUntil } from 'rxjs';
import { gridData } from './grid-data';
import { JsonPipe } from '@angular/common';

@Component({
    selector       : 'kitchen-sink-grid',
    templateUrl    : './grid.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultListImports,
        JsonPipe,
    ],
})
export class GridComponent extends ViewBaseComponent
{
    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'kitchenSink.Grid' },
    ];
    gridId: string = 'kitchenSinh::grid.detail.mainGridList';
    gridData$: Observable<GridData<any>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [
        {
            type       : ColumnDataType.ACTIONS,
            field      : 'Actions',
            headerClass: 'w-32',
            sticky     : true,
            actions    : () =>
            {
                return [
                    {
                        id         : 'edit',
                        icon       : 'mode_edit',
                        translation: 'Edit',
                    },
                    {
                        id         : 'delete',
                        icon       : 'delete',
                        translation: 'Delete',
                    },
                ];
            },
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'code',
            sort       : 'code',
            translation: '',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'customCode',
            sort       : 'customCode',
            translation: 'CustomCode',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'latitude',
            sort       : 'latitude',
            translation: 'Latitude',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'longitude',
            sort       : 'longitude',
            translation: 'Longitude',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'zoom',
            sort       : 'zoom',
            translation: 'Zoom',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'name',
            sort       : 'name',
            translation: 'Name',
        },
        {
            type       : ColumnDataType.STRING,
            field      : 'slug',
            sort       : 'slug',
            translation: 'Slug',
        },
    ];

    dataEvent: any = undefined;

    constructor(
        protected injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    { /**/ }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action.id)
        {
            case 'kitchenSinh::grid.detail.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = of(gridData);
                break;

            case 'pagination':
                this.dataEvent = { ...this.dataEvent, ...action.meta.query };
                break;

            case 'edit':
                break;

            case 'delete':
                break;
        }
    }
}
