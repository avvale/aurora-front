/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-contact.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { BusinessPartnerPortalPartnerContact } from '@apps/business-partner-portal';
import {
    partnerContactColumnsConfig,
    PartnerContactService,
} from '@apps/business-partner-portal/partner-contact';
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

export const partnerContactMainGridListId =
    'businessPartnerPortal::partnerContact.list.mainGridList';

@Component({
    selector: 'business-partner-portal-partner-contact-list',
    templateUrl: './partner-contact-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
@ActionScope('businessPartnerPortal::partnerContact.list')
export class PartnerContactListComponent extends ViewBaseComponent {
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'businessPartnerPortal.PartnerContacts' },
    ];
    gridId: string = partnerContactMainGridListId;
    gridData$: Observable<GridData<BusinessPartnerPortalPartnerContact>>;
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
                        id: 'businessPartnerPortal::partnerContact.list.edit',
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'businessPartnerPortal::partnerContact.list.delete',
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
        ...partnerContactColumnsConfig({ translator: this.translocoService }),
    ];

    constructor(
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly partnerContactService: PartnerContactService,
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
            case 'businessPartnerPortal::partnerContact.list.view':
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

                this.gridData$ = this.partnerContactService.pagination$;
                break;

            case 'businessPartnerPortal::partnerContact.list.pagination':
                await lastValueFrom(
                    this.partnerContactService.pagination({
                        query: gridQueryHandler({
                            gridFiltersStorageService:
                                this.gridFiltersStorageService,
                            gridStateService: this.gridStateService,
                            gridId: this.gridId,
                            columnsConfig: partnerContactColumnsConfig(),
                            query: action.meta.query,
                        }),
                    }),
                );
                break;

            case 'businessPartnerPortal::partnerContact.list.edit':
                this.router.navigate([
                    'business-partner-portal/partner-contact/edit',
                    action.meta.row.id,
                ]);
                break;

            case 'businessPartnerPortal::partnerContact.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title: `${this.translocoService.translate('Delete')} ${this.translocoService.translate('businessPartnerPortal.PartnerContact')}`,
                    message: this.translocoService.translate(
                        'DeletionWarning',
                        {
                            entity: this.translocoService.translate(
                                'businessPartnerPortal.PartnerContact',
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
                                this.partnerContactService.deleteById<BusinessPartnerPortalPartnerContact>(
                                    {
                                        id: action.meta.row.id,
                                    },
                                ),
                            );

                            this.actionService.action({
                                id: 'businessPartnerPortal::partnerContact.list.pagination',
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

            case 'businessPartnerPortal::partnerContact.list.export':
                const rows = await lastValueFrom(
                    this.partnerContactService.get({
                        query: action.meta.query,
                    }),
                );

                const columns: string[] = partnerContactColumnsConfig().map(
                    (partnerContactColumnConfig) =>
                        partnerContactColumnConfig.field,
                );
                const headers: string[] = partnerContactColumnsConfig().map(
                    (partnerContactColumnConfig) =>
                        this.translocoService.translate(
                            partnerContactColumnConfig.translation,
                        ),
                );

                exportRows(
                    rows.objects,
                    'partnerContacts.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
            /* #endregion common actions */
        }
    }
}
