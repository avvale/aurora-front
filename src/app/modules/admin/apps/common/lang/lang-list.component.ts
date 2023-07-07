import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Action, BreadcrumbComponent, ColumnConfig, ColumnDataType, Crumb, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, QueryStatementHandler, TitleComponent, ViewBaseComponent, exportRows, log } from '@aurora';
import { GridColumnTranslationComponent } from '@aurora/components/grid/grid-translations/grid-column-translation.component';
import { GridTranslationsComponent } from '@aurora/components/grid/grid-translations/grid-translations.component';
import { GridComponent } from '@aurora/components/grid/grid/grid.component';
import { TranslocoModule } from '@ngneat/transloco';
import { Observable, lastValueFrom, takeUntil } from 'rxjs';
import { CommonLang } from '../common.types';
import { langColumnsConfig } from './lang.columns-config';
import { LangService } from './lang.service';

@Component({
    selector       : 'common-lang-list',
    templateUrl    : './lang-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [AsyncPipe, BreadcrumbComponent, GridComponent, GridTranslationsComponent, GridColumnTranslationComponent, NgForOf, MatButtonModule, MatIconModule, MatSnackBarModule, TitleComponent, TranslocoModule],
})
export class LangListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'common.Langs' },
    ];
    gridId: string = 'common::lang.list.mainGridList';
    gridData$: Observable<GridData<CommonLang>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                return [
                    {
                        id         : 'common::lang.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'common::lang.list.delete',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                ];
            },
        },
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        ...langColumnsConfig,
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly langService: LangService,
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    { /**/ }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'common::lang.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.langService.pagination$;
                break;

            case 'common::lang.list.pagination':
                await lastValueFrom(
                    this.langService.pagination({
                        query: action.meta.query ?
                            action.meta.query :
                            QueryStatementHandler
                                .init({ columnsConfig: langColumnsConfig })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                    }),
                );
                break;

            case 'common::lang.list.edit':
                this.router.navigate(['common/lang/edit', action.meta.row.id]);
                break;

            case 'common::lang.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('common.Lang')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('common.Lang') }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show : true,
                            label: this.translocoService.translate('Remove'),
                            color: 'warn',
                        },
                        cancel: {
                            show : true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                deleteDialogRef.afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.langService
                                        .deleteById<CommonLang>(action.meta.row.id),
                                );
                                this.actionService.action({
                                    id          : 'common::lang.list.pagination',
                                    isViewAction: false,
                                });
                            }
                            catch(error)
                            {
                                log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                            }
                        }
                    });
                break;

            case 'common::lang.list.export':
                const rows = await lastValueFrom(
                    this.langService
                        .get({
                            query: action.meta.query,
                        }),
                );

                // format export rows
                (rows.objects as any[]).forEach(row =>
                {
                    // row.id = row.id;
                });

                const columns: string[] = langColumnsConfig.map(langColumnConfig => langColumnConfig.field);
                const headers: string[] = columns.map(column => this.translocoService.translate('common.' + column.toPascalCase()));

                exportRows(
                    rows.objects,
                    'langs.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
        }
    }
}
