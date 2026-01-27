/**
 * @aurora-generated
 * @source cliter/business-partner-portal/payment-mode.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { BusinessPartnerPortalPaymentMode } from '@apps/business-partner-portal';
import {
    paymentModeColumnsConfig,
    PaymentModeService,
} from '@apps/business-partner-portal/payment-mode';
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

export const paymentModeMainGridListId =
    'businessPartnerPortal::paymentMode.list.mainGridList';

@Component({
    selector: 'business-partner-portal-payment-mode-list',
    templateUrl: './payment-mode-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
@ActionScope('businessPartnerPortal::paymentMode.list')
export class PaymentModeListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'businessPartnerPortal.PaymentModes' },
    ];
    gridId: string = paymentModeMainGridListId;
    gridData$: Observable<GridData<BusinessPartnerPortalPaymentMode>>;
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
                        id: 'businessPartnerPortal::paymentMode.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'businessPartnerPortal::paymentMode.list.delete',
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
        ...paymentModeColumnsConfig({ translator: this.translocoService }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly paymentModeService: PaymentModeService,
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
            case 'businessPartnerPortal::paymentMode.list.view':
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

                this.gridData$ = this.paymentModeService.pagination$;
                break;

            case 'businessPartnerPortal::paymentMode.list.pagination':
                await lastValueFrom(
                    this.paymentModeService.pagination({
                        query: gridQueryHandler({
                            gridFiltersStorageService:
                                this.gridFiltersStorageService,
                            gridStateService: this.gridStateService,
                            gridId: this.gridId,
                            columnsConfig: paymentModeColumnsConfig(),
                            query: action.meta.query,
                        }),
                    }),
                );
                break;

            case 'businessPartnerPortal::paymentMode.list.edit':
                this.router.navigate([
                    'business-partner-portal/payment-mode/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'businessPartnerPortal::paymentMode.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('businessPartnerPortal.PaymentMode')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'businessPartnerPortal.PaymentMode',
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
                                this.paymentModeService.deleteById<BusinessPartnerPortalPaymentMode>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'businessPartnerPortal::paymentMode.list.pagination',
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

            case 'businessPartnerPortal::paymentMode.list.export':
                const rows = await lastValueFrom(
                    this.paymentModeService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] = paymentModeColumnsConfig().map(
                    (paymentModeColumnConfig) => paymentModeColumnConfig.field,
                );
                const headers: string[] = paymentModeColumnsConfig().map(
                    (paymentModeColumnConfig) =>
                        this.translocoService.translate(
                            paymentModeColumnConfig.translation,
                        ),
                );

                exportRows(
                    rows.objects,
                    'paymentModes.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
