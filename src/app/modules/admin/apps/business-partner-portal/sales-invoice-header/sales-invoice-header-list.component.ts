/**
 * @aurora-generated
 * @source cliter/business-partner-portal/sales-invoice-header.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { BusinessPartnerPortalSalesInvoiceHeader } from '@apps/business-partner-portal';
import {
    salesInvoiceHeaderColumnsConfig,
    SalesInvoiceHeaderService,
} from '@apps/business-partner-portal/sales-invoice-header';
import {
    Action,
    ActionScope,
    ColumnConfig,
    ColumnDataType,
    Crumb,
    defaultListImports,
    exportRows,
    GridColumnsConfigStorageService,
    GridData,
    GridFiltersStorageService,
    gridQueryHandler,
    GridState,
    GridStateService,
    log,
    ViewBaseComponent,
} from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

export const salesInvoiceHeaderMainGridListId =
    'businessPartnerPortal::salesInvoiceHeader.list.mainGridList';

@Component({
    selector: 'business-partner-portal-sales-invoice-header-list',
    templateUrl: './sales-invoice-header-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
@ActionScope('businessPartnerPortal::salesInvoiceHeader.list')
export class SalesInvoiceHeaderListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'businessPartnerPortal.SalesInvoiceHeaders' },
    ];
    gridId: string = salesInvoiceHeaderMainGridListId;
    gridData$: Observable<GridData<BusinessPartnerPortalSalesInvoiceHeader>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [
        {
            type: ColumnDataType.ACTIONS,
            field: 'Actions',
            sticky: true,
            actions: (row) => {
                return [
                    {
                        id: 'businessPartnerPortal::salesInvoiceHeader.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'businessPartnerPortal::salesInvoiceHeader.list.delete',
                        translation: 'delete',
                        icon: 'delete',
                    },
                ];
            },
        },
        {
            type: ColumnDataType.CHECKBOX,
            field: 'select',
            translation: 'Selects',
            sticky: true,
        },
        ...salesInvoiceHeaderColumnsConfig({
            translator: this.translocoService,
        }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly salesInvoiceHeaderService: SalesInvoiceHeaderService,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'businessPartnerPortal::salesInvoiceHeader.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters:
                        this.gridFiltersStorageService.getColumnFilterState(
                            this.gridId,
                        ),
                    page: this.gridStateService.getPage(this.gridId),
                    sort: this.gridStateService.getSort(this.gridId),
                    search: this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.salesInvoiceHeaderService.pagination$;
                break;

            case 'businessPartnerPortal::salesInvoiceHeader.list.pagination':
                await lastValueFrom(
                    this.salesInvoiceHeaderService.pagination({
                        query: gridQueryHandler({
                            gridFiltersStorageService:
                                this.gridFiltersStorageService,
                            gridStateService: this.gridStateService,
                            gridId: this.gridId,
                            columnsConfig: salesInvoiceHeaderColumnsConfig(),
                            query: action.meta.query,
                        }),
                    }),
                );
                break;

            case 'businessPartnerPortal::salesInvoiceHeader.list.edit':
                this.router.navigate([
                    'business-partner-portal/sales-invoice-header/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'businessPartnerPortal::salesInvoiceHeader.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('businessPartnerPortal.SalesInvoiceHeader')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'businessPartnerPortal.SalesInvoiceHeader',
                            ),
                        },
                    ),
                    icon: {
                        show: true,
                        name: 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show: true,
                            label: this.translocoService.translate('Remove'),
                            color: 'warn',
                        },
                        cancel: {
                            show: true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                deleteDialogRef.afterClosed().subscribe(async (result) => {
                    if (result === 'confirmed') {
                        try {
                            await lastValueFrom(
                                this.salesInvoiceHeaderService.deleteById<BusinessPartnerPortalSalesInvoiceHeader>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'businessPartnerPortal::salesInvoiceHeader.list.pagination',
                                isViewAction: false,
                            });
                        } catch (error) {
                            log(
                                `[DEBUG] Catch error in ${action.id} action: ${error}`,
                            );
                        }
                    }
                });
                break;

            case 'businessPartnerPortal::salesInvoiceHeader.list.export':
                const rows = await lastValueFrom(
                    this.salesInvoiceHeaderService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] = salesInvoiceHeaderColumnsConfig().map(
                    (salesInvoiceHeaderColumnConfig) =>
                        salesInvoiceHeaderColumnConfig.field,
                );
                const headers: string[] = salesInvoiceHeaderColumnsConfig().map(
                    (salesInvoiceHeaderColumnConfig) =>
                        this.translocoService.translate(
                            salesInvoiceHeaderColumnConfig.translation,
                        ),
                );

                exportRows(
                    rows.objects,
                    'salesInvoiceHeaders.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
