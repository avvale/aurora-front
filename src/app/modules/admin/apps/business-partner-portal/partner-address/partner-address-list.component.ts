/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-address.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { BusinessPartnerPortalPartnerAddress } from '@apps/business-partner-portal';
import {
    partnerAddressColumnsConfig,
    PartnerAddressService,
} from '@apps/business-partner-portal/partner-address';
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

export const partnerAddressMainGridListId =
    'businessPartnerPortal::partnerAddress.list.mainGridList';

@Component({
    selector: 'business-partner-portal-partner-address-list',
    templateUrl: './partner-address-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
@ActionScope('businessPartnerPortal::partnerAddress.list')
export class PartnerAddressListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'businessPartnerPortal.PartnerAddresses' },
    ];
    gridId: string = partnerAddressMainGridListId;
    gridData$: Observable<GridData<BusinessPartnerPortalPartnerAddress>>;
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
                        id: 'businessPartnerPortal::partnerAddress.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'businessPartnerPortal::partnerAddress.list.delete',
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
        ...partnerAddressColumnsConfig({ translator: this.translocoService }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly partnerAddressService: PartnerAddressService,
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
            case 'businessPartnerPortal::partnerAddress.list.view':
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

                this.gridData$ = this.partnerAddressService.pagination$;
                break;

            case 'businessPartnerPortal::partnerAddress.list.pagination':
                await lastValueFrom(
                    this.partnerAddressService.pagination({
                        query: gridQueryHandler({
                            gridFiltersStorageService:
                                this.gridFiltersStorageService,
                            gridStateService: this.gridStateService,
                            gridId: this.gridId,
                            columnsConfig: partnerAddressColumnsConfig(),
                            query: action.meta.query,
                        }),
                    }),
                );
                break;

            case 'businessPartnerPortal::partnerAddress.list.edit':
                this.router.navigate([
                    'business-partner-portal/partner-address/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'businessPartnerPortal::partnerAddress.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('businessPartnerPortal.PartnerAddress')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'businessPartnerPortal.PartnerAddress',
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
                                this.partnerAddressService.deleteById<BusinessPartnerPortalPartnerAddress>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'businessPartnerPortal::partnerAddress.list.pagination',
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

            case 'businessPartnerPortal::partnerAddress.list.export':
                const rows = await lastValueFrom(
                    this.partnerAddressService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] = partnerAddressColumnsConfig().map(
                    (partnerAddressColumnConfig) =>
                        partnerAddressColumnConfig.field,
                );
                const headers: string[] = partnerAddressColumnsConfig().map(
                    (partnerAddressColumnConfig) =>
                        this.translocoService.translate(
                            partnerAddressColumnConfig.translation,
                        ),
                );

                exportRows(
                    rows.objects,
                    'partnerAddresses.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
