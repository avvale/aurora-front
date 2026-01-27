/**
 * @aurora-generated
 * @source cliter/business-partner-portal/sales-invoice-position.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { BusinessPartnerPortalSalesInvoicePosition } from '@apps/business-partner-portal';
import {
    salesInvoicePositionColumnsConfig,
    SalesInvoicePositionService,
} from '@apps/business-partner-portal/sales-invoice-position';
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

export const salesInvoicePositionMainGridListId =
    'businessPartnerPortal::salesInvoicePosition.list.mainGridList';

@Component({
    selector: 'business-partner-portal-sales-invoice-position-list',
    templateUrl: './sales-invoice-position-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
@ActionScope('businessPartnerPortal::salesInvoicePosition.list')
export class SalesInvoicePositionListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'businessPartnerPortal.SalesInvoicePositions' },
    ];
    gridId: string = salesInvoicePositionMainGridListId;
    gridData$: Observable<GridData<BusinessPartnerPortalSalesInvoicePosition>>;
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
                        id: 'businessPartnerPortal::salesInvoicePosition.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'businessPartnerPortal::salesInvoicePosition.list.delete',
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
        ...salesInvoicePositionColumnsConfig({
            translator: this.translocoService,
        }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly salesInvoicePositionService: SalesInvoicePositionService,
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
            case 'businessPartnerPortal::salesInvoicePosition.list.view':
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

                this.gridData$ = this.salesInvoicePositionService.pagination$;
                break;

            case 'businessPartnerPortal::salesInvoicePosition.list.pagination':
                await lastValueFrom(
                    this.salesInvoicePositionService.pagination({
                        query: gridQueryHandler({
                            gridFiltersStorageService:
                                this.gridFiltersStorageService,
                            gridStateService: this.gridStateService,
                            gridId: this.gridId,
                            columnsConfig: salesInvoicePositionColumnsConfig(),
                            query: action.meta.query,
                        }),
                    }),
                );
                break;

            case 'businessPartnerPortal::salesInvoicePosition.list.edit':
                this.router.navigate([
                    'business-partner-portal/sales-invoice-position/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'businessPartnerPortal::salesInvoicePosition.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('businessPartnerPortal.SalesInvoicePosition')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'businessPartnerPortal.SalesInvoicePosition',
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
                                this.salesInvoicePositionService.deleteById<BusinessPartnerPortalSalesInvoicePosition>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'businessPartnerPortal::salesInvoicePosition.list.pagination',
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

            case 'businessPartnerPortal::salesInvoicePosition.list.export':
                const rows = await lastValueFrom(
                    this.salesInvoicePositionService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] =
                    salesInvoicePositionColumnsConfig().map(
                        (salesInvoicePositionColumnConfig) =>
                            salesInvoicePositionColumnConfig.field,
                    );
                const headers: string[] =
                    salesInvoicePositionColumnsConfig().map(
                        (salesInvoicePositionColumnConfig) =>
                            this.translocoService.translate(
                                salesInvoicePositionColumnConfig.translation,
                            ),
                    );

                exportRows(
                    rows.objects,
                    'salesInvoicePositions.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
