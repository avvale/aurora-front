/**
 * @aurora-generated
 * @source cliter/business-partner-portal/supplier-document.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { BusinessPartnerPortalSupplierDocument } from '@apps/business-partner-portal';
import {
    supplierDocumentColumnsConfig,
    SupplierDocumentService,
} from '@apps/business-partner-portal/supplier-document';
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

export const supplierDocumentMainGridListId =
    'businessPartnerPortal::supplierDocument.list.mainGridList';

@Component({
    selector: 'business-partner-portal-supplier-document-list',
    templateUrl: './supplier-document-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
@ActionScope('businessPartnerPortal::supplierDocument.list')
export class SupplierDocumentListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'businessPartnerPortal.SupplierDocuments' },
    ];
    gridId: string = supplierDocumentMainGridListId;
    gridData$: Observable<GridData<BusinessPartnerPortalSupplierDocument>>;
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
                        id: 'businessPartnerPortal::supplierDocument.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'businessPartnerPortal::supplierDocument.list.delete',
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
        ...supplierDocumentColumnsConfig({ translator: this.translocoService }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly supplierDocumentService: SupplierDocumentService,
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
            case 'businessPartnerPortal::supplierDocument.list.view':
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

                this.gridData$ = this.supplierDocumentService.pagination$;
                break;

            case 'businessPartnerPortal::supplierDocument.list.pagination':
                await lastValueFrom(
                    this.supplierDocumentService.pagination({
                        query: gridQueryHandler({
                            gridFiltersStorageService:
                                this.gridFiltersStorageService,
                            gridStateService: this.gridStateService,
                            gridId: this.gridId,
                            columnsConfig: supplierDocumentColumnsConfig(),
                            query: action.meta.query,
                        }),
                    }),
                );
                break;

            case 'businessPartnerPortal::supplierDocument.list.edit':
                this.router.navigate([
                    'business-partner-portal/supplier-document/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'businessPartnerPortal::supplierDocument.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('businessPartnerPortal.SupplierDocument')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'businessPartnerPortal.SupplierDocument',
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
                                this.supplierDocumentService.deleteById<BusinessPartnerPortalSupplierDocument>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'businessPartnerPortal::supplierDocument.list.pagination',
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

            case 'businessPartnerPortal::supplierDocument.list.export':
                const rows = await lastValueFrom(
                    this.supplierDocumentService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] = supplierDocumentColumnsConfig().map(
                    (supplierDocumentColumnConfig) =>
                        supplierDocumentColumnConfig.field,
                );
                const headers: string[] = supplierDocumentColumnsConfig().map(
                    (supplierDocumentColumnConfig) =>
                        this.translocoService.translate(
                            supplierDocumentColumnConfig.translation,
                        ),
                );

                exportRows(
                    rows.objects,
                    'supplierDocuments.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
