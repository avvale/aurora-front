import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { accountColumnsConfig, AccountService } from '@apps/iam/account';
import { IamAccount, IamTenant } from '@apps/iam/iam.types';
import { Action, AuthenticationService, AuthorizationService, ColumnConfig, ColumnDataType, Crumb, defaultListImports, exportRows, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, IamService, initAsyncMatSelectSearch, initAsyncMatSelectSearchState, JoinPipe, log, manageAsyncMatSelectSearch, MapPipe, Operator, queryStatementHandler, uuid, ViewBaseComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { TenantService } from '../tenant';

export const accountMainGridListId = 'iam::account.list.mainGridList';

@Component({
    selector       : 'iam-account-list',
    templateUrl    : './account-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports        : [
        ...defaultListImports,
        JoinPipe, MapPipe, MatBadgeModule, MatTooltipModule,
    ],
})
export class AccountListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    /* #region variables to manage async-search-multiple-select senders account dialog IamTenant[] */
    tenantAsyncMatSelectSearchState = initAsyncMatSelectSearchState<string, IamTenant>();
    tenantManageAsyncMatSelectSearch = manageAsyncMatSelectSearch({
        columnFilter: {
            id      : uuid(),
            field   : 'IamTenant.name::unaccent',
            type    : ColumnDataType.STRING,
            operator: Operator.iLike,
            value   : null,
        },
        paginationService   : this.tenantService,
        paginationConstraint: {
            where: {
                // constraint para buscar tenants dentro del scope del usuario
                // TODO, hacer esta validación en el servidor
                id: this.iamService.me.dTenants,
            },
        },
    });
    /* #endregion variables to manage async-search-multiple-select senders account dialog IamTenant[] */

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'iam.Accounts' },
    ];
    gridId: string = accountMainGridListId;
    gridData$: Observable<GridData<IamAccount>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                const actions = [];

                actions.push(
                    {
                        id         : 'iam::account.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'iam::account.list.delete',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                );

                if (this.authorizationService.can('oAuth.credential.impersonalize'))
                {
                    actions.push(
                        {
                            id          : 'iam::account.list.impersonalize',
                            isViewAction: false,
                            translation : 'impersonalize',
                            iconFontSet : 'material-symbols-outlined',
                            icon        : 'photo_auto_merge',
                        },
                    );
                }

                return actions;
            },
        },
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        ...accountColumnsConfig({
            translocoService: this.translocoService,
            tenantsAsyncMatSelectSearch: {
                asyncMatSelectSearchState : this.tenantAsyncMatSelectSearchState,
                manageAsyncMatSelectSearch: this.tenantManageAsyncMatSelectSearch,
            },
        }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly accountService: AccountService,
        private readonly authenticationService: AuthenticationService,
        private readonly authorizationService: AuthorizationService,
        private readonly tenantService: TenantService,
        private readonly iamService: IamService,
    )
    {
        super();

        /* #region variables to manage async-search-multiple-select IamTenant[] */
        initAsyncMatSelectSearch<string, IamTenant>({
            asyncMatSelectSearchState : this.tenantAsyncMatSelectSearchState,
            manageAsyncMatSelectSearch: this.tenantManageAsyncMatSelectSearch,
            itemPagination            : this.activatedRoute.snapshot.data.data.iamGetTenants,
            initSelectedItems         : [],
        });
        /* #endregion variables to manage async-search-multiple-select IamTenant[] */
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
            /* #region common actions */
            case 'iam::account.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.accountService.pagination$;
                break;

            case 'iam::account.list.pagination':
                await lastValueFrom(
                    this.accountService.pagination({
                        query: action.meta.query ?
                            action.meta.query :
                            queryStatementHandler({ columnsConfig: accountColumnsConfig() })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                        constraint: {
                            include: [
                                {
                                    association: 'user',
                                },
                                {
                                    association: 'tenants',
                                },
                            ],
                            subQuery: false,
                            distinct: true,
                        },
                    }),
                );
                break;

            case 'iam::account.list.edit':
                this.router
                    .navigate([
                        'iam/account/edit',
                        action.meta.row.id,
                    ]);
                break;

            case 'iam::account.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('iam.Account')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('iam.Account') }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation-triangle',
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
                                    this.accountService
                                        .deleteById<IamAccount>({
                                            id: action.meta.row.id,
                                        }),
                                );

                                this.actionService.action({
                                    id          : 'iam::account.list.pagination',
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

            case 'iam::account.list.export':
                const rows = await lastValueFrom(
                    this.accountService
                        .get({
                            query: action.meta.query,
                        }),
                );

                const columns: string[] = accountColumnsConfig().map(accountColumnConfig => accountColumnConfig.field);
                const headers: string[] = accountColumnsConfig().map(accountColumnConfig => this.translocoService.translate(accountColumnConfig.translation));

                exportRows(
                    rows.objects,
                    'accounts.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
                /* #endregion common actions */

            case 'iam::account.list.impersonalize':
                await lastValueFrom(
                    this.authenticationService
                        .impersonalize(action.meta.row.id)
                );
                await this.router.navigate(['/']);
                window.location.reload();
                break
        }
    }
}
