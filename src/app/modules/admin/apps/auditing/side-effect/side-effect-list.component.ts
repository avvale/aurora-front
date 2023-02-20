import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, exportRows, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, log, QueryStatementHandler, ViewBaseComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { AuditingSideEffect } from '../auditing.types';
import { SideEffectService } from './side-effect.service';
import { sideEffectColumnsConfig } from './side-effect.columns-config';

@Component({
    selector       : 'auditing-side-effect-list',
    templateUrl    : './side-effect-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideEffectListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'auditing.SideEffects' },
    ];
    gridId: string = 'auditing::sideEffect.list.mainGridList';
    gridData$: Observable<GridData<AuditingSideEffect>>;
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
                        id         : 'auditing::sideEffect.list.edit',
                        translation: 'edit',
                        icon       : 'photo_camera',
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
        ...sideEffectColumnsConfig,
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly sideEffectService: SideEffectService,
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
            case 'auditing::sideEffect.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.sideEffectService.pagination$;
                break;

            case 'auditing::sideEffect.list.pagination':
                await lastValueFrom(
                    this.sideEffectService.pagination({
                        query: action.data.query ?
                            action.data.query :
                            QueryStatementHandler
                                .init({ columnsConfig: sideEffectColumnsConfig })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                    }),
                );
                break;

            case 'auditing::sideEffect.list.edit':
                this.router.navigate(['auditing/side-effect/edit', action.data.row.id]);
                break;

            case 'auditing::sideEffect.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('auditing.SideEffect')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('auditing.SideEffect') }),
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
                                    this.sideEffectService
                                        .deleteById<AuditingSideEffect>(action.data.row.id),
                                );
                                this.actionService.action({
                                    id          : 'auditing::sideEffect.list.pagination',
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

            case 'auditing::sideEffect.list.export':
                const rows = await lastValueFrom(
                    this.sideEffectService
                        .get({
                            query: action.data.query,
                        }),
                );

                const columns: string[] = sideEffectColumnsConfig.map(sideEffectColumnConfig => sideEffectColumnConfig.field);
                const headers = columns.map(column => this.translocoService.translate('auditing.' + column.toPascalCase()));

                exportRows(
                    rows.objects,
                    'sideEffects.' + action.data.format,
                    columns,
                    headers,
                    action.data.format,
                );
                break;
        }
    }
}
