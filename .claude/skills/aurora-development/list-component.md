# List Component Pattern

## Complete Example

```typescript
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {
    Action, ColumnConfig, Crumb, defaultListImports, exportRows,
    GridData, GridState, log, ViewBaseComponent,
} from '@aurora';
import { Observable, lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector: 'common-country-list',
    templateUrl: './country-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
export class CountryListComponent extends ViewBaseComponent {
    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'common.Countries' },
    ];

    gridId: string = countryMainGridListId;
    gridData$: Observable<GridData<CommonCountry>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = countryColumnsConfig();

    private readonly countryService = inject(CountryService);
    private readonly gridColumnsConfigStorageService = inject(GridColumnsConfigStorageService);
    private readonly gridFiltersStorageService = inject(GridFiltersStorageService);
    private readonly gridStateService = inject(GridStateService);

    async handleAction(action: Action): Promise<void> {
        switch (action?.id) {
            case 'common::country.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));
                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page: this.gridStateService.getPage(this.gridId),
                    sort: this.gridStateService.getSort(this.gridId),
                    search: this.gridStateService.getSearchState(this.gridId),
                };
                this.gridData$ = this.countryService.pagination$;
                break;

            case 'common::country.list.pagination':
                await lastValueFrom(this.countryService.pagination({ query: action.meta.query }));
                break;

            case 'common::country.list.edit':
                this.router.navigate(['common', 'country', 'edit', action.meta.row.id]);
                break;

            case 'common::country.list.delete':
                const deleteDialog = this.confirmationService.open({
                    title: this.translocoService.translate('common.Country'),
                    message: this.translocoService.translate('DeletionQuestion', {
                        entity: this.translocoService.translate('common.Country'),
                    }),
                    icon: { show: true, name: 'heroicons_outline:exclamation-triangle', color: 'warn' },
                    actions: {
                        confirm: { show: true, label: this.translocoService.translate('Remove'), color: 'warn' },
                        cancel: { show: true, label: this.translocoService.translate('Cancel') },
                    },
                });
                deleteDialog.afterClosed().subscribe(async (result) => {
                    if (result === 'confirmed') {
                        try {
                            await lastValueFrom(this.countryService.deleteById<CommonCountry>({ id: action.meta.row.id }));
                            this.actionService.action({ id: 'common::country.list.pagination', isViewAction: false });
                        } catch (error) { log(`[DEBUG] Error: ${error}`); }
                    }
                });
                break;

            case 'common::country.list.export':
                const rows = await lastValueFrom(this.countryService.get({ query: action.meta.query }));
                exportRows(rows.objects, 'countries.' + action.meta.format,
                    ['iso3166Alpha2', 'iso3166Alpha3', 'name'],
                    ['ISO Alpha2', 'ISO Alpha3', 'Name'],
                    action.meta.format);
                break;
        }
    }
}
```

## List Template Pattern

```html
<div class="absolute inset-0 flex w-full flex-col overflow-hidden">
    <div class="bg-card flex flex-0 flex-col border-b p-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-4 dark:bg-transparent">
        <div class="min-w-0 flex-1">
            <au-breadcrumb [data]="breadcrumb"></au-breadcrumb>
            <au-title>
                <mat-icon class="mr-2 icon-size-8">flag</mat-icon>
                {{ 'common.Countries' | transloco }}
            </au-title>
        </div>
        <div class="mt-6 flex flex-shrink-0 items-center sm:ml-4 sm:mt-0">
            <button class="ml-3" [color]="'primary'" [routerLink]="['new']" mat-flat-button>
                <mat-icon class="mr-2 icon-size-5">add</mat-icon>
                {{ 'common.Country' | transloco }}
            </button>
        </div>
    </div>

    <au-grid [id]="gridId" [columnsConfig$]="columnsConfig$" [gridData$]="gridData$"
             [gridState]="gridState" [originColumnsConfig]="originColumnsConfig"></au-grid>
</div>
```

## Column Configuration Pattern

```typescript
import { ColumnConfig, ColumnDataType } from '@aurora';

export const countryMainGridListId = 'common::country.list.mainGridList';

export const countryColumnsConfig: () => ColumnConfig[] = () => [
    {
        type: ColumnDataType.ACTIONS, field: 'Actions', sticky: true,
        actions: (row) => [
            { id: 'common::country.list.edit', translation: 'edit', icon: 'mode_edit' },
            { id: 'common::country.list.delete', translation: 'delete', icon: 'delete' },
        ],
    },
    { type: ColumnDataType.CHECKBOX, field: 'select', translation: 'Selects', sticky: true },
    { type: ColumnDataType.STRING, field: 'iso3166Alpha2', sort: 'iso3166Alpha2', translation: 'common.Iso3166Alpha2' },
    { type: ColumnDataType.STRING, field: 'name', sort: 'name', translation: 'common.Name' },
    { type: ColumnDataType.BOOLEAN, field: 'isActive', sort: 'isActive', translation: 'IsActive' },
];
```
