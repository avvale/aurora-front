/**
 * @aurora-generated
 * @source cliter/business-partner-portal/payment-collection-mode.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { BusinessPartnerPortalPaymentCollectionMode } from '@apps/business-partner-portal';
import {
    paymentCollectionModeColumnsConfig,
    PaymentCollectionModeService,
} from '@apps/business-partner-portal/payment-collection-mode';
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

export const paymentCollectionModeMainGridListId =
    'businessPartnerPortal::paymentCollectionMode.list.mainGridList';

@Component({
    selector: 'business-partner-portal-payment-collection-mode-list',
    templateUrl: './payment-collection-mode-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
@ActionScope('businessPartnerPortal::paymentCollectionMode.list')
export class PaymentCollectionModeListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'businessPartnerPortal.PaymentCollectionModes' },
    ];
    gridId: string = paymentCollectionModeMainGridListId;
    gridData$: Observable<GridData<BusinessPartnerPortalPaymentCollectionMode>>;
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
                        id: 'businessPartnerPortal::paymentCollectionMode.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'businessPartnerPortal::paymentCollectionMode.list.delete',
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
        ...paymentCollectionModeColumnsConfig({
            translator: this.translocoService,
        }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly paymentCollectionModeService: PaymentCollectionModeService,
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
            case 'businessPartnerPortal::paymentCollectionMode.list.view':
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

                this.gridData$ = this.paymentCollectionModeService.pagination$;
                break;

            case 'businessPartnerPortal::paymentCollectionMode.list.pagination':
                await lastValueFrom(
                    this.paymentCollectionModeService.pagination({
                        query: gridQueryHandler({
                            gridFiltersStorageService:
                                this.gridFiltersStorageService,
                            gridStateService: this.gridStateService,
                            gridId: this.gridId,
                            columnsConfig: paymentCollectionModeColumnsConfig(),
                            query: action.meta.query,
                        }),
                    }),
                );
                break;

            case 'businessPartnerPortal::paymentCollectionMode.list.edit':
                this.router.navigate([
                    'business-partner-portal/payment-collection-mode/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'businessPartnerPortal::paymentCollectionMode.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('businessPartnerPortal.PaymentCollectionMode')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'businessPartnerPortal.PaymentCollectionMode',
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
                                this.paymentCollectionModeService.deleteById<BusinessPartnerPortalPaymentCollectionMode>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'businessPartnerPortal::paymentCollectionMode.list.pagination',
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

            case 'businessPartnerPortal::paymentCollectionMode.list.export':
                const rows = await lastValueFrom(
                    this.paymentCollectionModeService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] =
                    paymentCollectionModeColumnsConfig().map(
                        (paymentCollectionModeColumnConfig) =>
                            paymentCollectionModeColumnConfig.field,
                    );
                const headers: string[] =
                    paymentCollectionModeColumnsConfig().map(
                        (paymentCollectionModeColumnConfig) =>
                            this.translocoService.translate(
                                paymentCollectionModeColumnConfig.translation,
                            ),
                    );

                exportRows(
                    rows.objects,
                    'paymentCollectionModes.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
