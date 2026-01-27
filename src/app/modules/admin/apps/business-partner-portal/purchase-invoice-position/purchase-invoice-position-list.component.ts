/**
 * @aurora-generated
 * @source cliter/business-partner-portal/purchase-invoice-position.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { BusinessPartnerPortalPurchaseInvoicePosition } from '@apps/business-partner-portal';
import {
    purchaseInvoicePositionColumnsConfig,
    PurchaseInvoicePositionService,
} from '@apps/business-partner-portal/purchase-invoice-position';
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

export const purchaseInvoicePositionMainGridListId =
    'businessPartnerPortal::purchaseInvoicePosition.list.mainGridList';

@Component({
    selector: 'business-partner-portal-purchase-invoice-position-list',
    templateUrl: './purchase-invoice-position-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
@ActionScope('businessPartnerPortal::purchaseInvoicePosition.list')
export class PurchaseInvoicePositionListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'businessPartnerPortal.PurchaseInvoicePositions' },
    ];
    gridId: string = purchaseInvoicePositionMainGridListId;
    gridData$: Observable<
        GridData<BusinessPartnerPortalPurchaseInvoicePosition>
    >;
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
                        id: 'businessPartnerPortal::purchaseInvoicePosition.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'businessPartnerPortal::purchaseInvoicePosition.list.delete',
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
        ...purchaseInvoicePositionColumnsConfig({
            translator: this.translocoService,
        }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly purchaseInvoicePositionService: PurchaseInvoicePositionService,
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
            case 'businessPartnerPortal::purchaseInvoicePosition.list.view':
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

                this.gridData$ =
                    this.purchaseInvoicePositionService.pagination$;
                break;

            case 'businessPartnerPortal::purchaseInvoicePosition.list.pagination':
                await lastValueFrom(
                    this.purchaseInvoicePositionService.pagination({
                        query: gridQueryHandler({
                            gridFiltersStorageService:
                                this.gridFiltersStorageService,
                            gridStateService: this.gridStateService,
                            gridId: this.gridId,
                            columnsConfig:
                                purchaseInvoicePositionColumnsConfig(),
                            query: action.meta.query,
                        }),
                    }),
                );
                break;

            case 'businessPartnerPortal::purchaseInvoicePosition.list.edit':
                this.router.navigate([
                    'business-partner-portal/purchase-invoice-position/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'businessPartnerPortal::purchaseInvoicePosition.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('businessPartnerPortal.PurchaseInvoicePosition')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'businessPartnerPortal.PurchaseInvoicePosition',
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
                                this.purchaseInvoicePositionService.deleteById<BusinessPartnerPortalPurchaseInvoicePosition>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'businessPartnerPortal::purchaseInvoicePosition.list.pagination',
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

            case 'businessPartnerPortal::purchaseInvoicePosition.list.export':
                const rows = await lastValueFrom(
                    this.purchaseInvoicePositionService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] =
                    purchaseInvoicePositionColumnsConfig().map(
                        (purchaseInvoicePositionColumnConfig) =>
                            purchaseInvoicePositionColumnConfig.field,
                    );
                const headers: string[] =
                    purchaseInvoicePositionColumnsConfig().map(
                        (purchaseInvoicePositionColumnConfig) =>
                            this.translocoService.translate(
                                purchaseInvoicePositionColumnConfig.translation,
                            ),
                    );

                exportRows(
                    rows.objects,
                    'purchaseInvoicePositions.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
