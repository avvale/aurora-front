/**
 * @aurora-generated
 * @source cliter/business-partner-portal/purchase-invoice-header.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { BusinessPartnerPortalPurchaseInvoiceHeader } from '@apps/business-partner-portal';
import {
    purchaseInvoiceHeaderColumnsConfig,
    PurchaseInvoiceHeaderService,
} from '@apps/business-partner-portal/purchase-invoice-header';
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

export const purchaseInvoiceHeaderMainGridListId =
    'businessPartnerPortal::purchaseInvoiceHeader.list.mainGridList';

@Component({
    selector: 'business-partner-portal-purchase-invoice-header-list',
    templateUrl: './purchase-invoice-header-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
@ActionScope('businessPartnerPortal::purchaseInvoiceHeader.list')
export class PurchaseInvoiceHeaderListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'businessPartnerPortal.PurchaseInvoiceHeaders' },
    ];
    gridId: string = purchaseInvoiceHeaderMainGridListId;
    gridData$: Observable<GridData<BusinessPartnerPortalPurchaseInvoiceHeader>>;
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
                        id: 'businessPartnerPortal::purchaseInvoiceHeader.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'businessPartnerPortal::purchaseInvoiceHeader.list.delete',
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
        ...purchaseInvoiceHeaderColumnsConfig({
            translator: this.translocoService,
        }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly purchaseInvoiceHeaderService: PurchaseInvoiceHeaderService,
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
            case 'businessPartnerPortal::purchaseInvoiceHeader.list.view':
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

                this.gridData$ = this.purchaseInvoiceHeaderService.pagination$;
                break;

            case 'businessPartnerPortal::purchaseInvoiceHeader.list.pagination':
                await lastValueFrom(
                    this.purchaseInvoiceHeaderService.pagination({
                        query: gridQueryHandler({
                            gridFiltersStorageService:
                                this.gridFiltersStorageService,
                            gridStateService: this.gridStateService,
                            gridId: this.gridId,
                            columnsConfig: purchaseInvoiceHeaderColumnsConfig(),
                            query: action.meta.query,
                        }),
                    }),
                );
                break;

            case 'businessPartnerPortal::purchaseInvoiceHeader.list.edit':
                this.router.navigate([
                    'business-partner-portal/purchase-invoice-header/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'businessPartnerPortal::purchaseInvoiceHeader.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('businessPartnerPortal.PurchaseInvoiceHeader')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'businessPartnerPortal.PurchaseInvoiceHeader',
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
                                this.purchaseInvoiceHeaderService.deleteById<BusinessPartnerPortalPurchaseInvoiceHeader>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'businessPartnerPortal::purchaseInvoiceHeader.list.pagination',
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

            case 'businessPartnerPortal::purchaseInvoiceHeader.list.export':
                const rows = await lastValueFrom(
                    this.purchaseInvoiceHeaderService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] =
                    purchaseInvoiceHeaderColumnsConfig().map(
                        (purchaseInvoiceHeaderColumnConfig) =>
                            purchaseInvoiceHeaderColumnConfig.field,
                    );
                const headers: string[] =
                    purchaseInvoiceHeaderColumnsConfig().map(
                        (purchaseInvoiceHeaderColumnConfig) =>
                            this.translocoService.translate(
                                purchaseInvoiceHeaderColumnConfig.translation,
                            ),
                    );

                exportRows(
                    rows.objects,
                    'purchaseInvoiceHeaders.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
