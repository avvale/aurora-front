/**
 * @aurora-generated
 * @source cliter/business-partner-portal/business-partner.aurora.yaml
 */
import { KeyValuePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewChild,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {
    BusinessPartnerPortalBusinessPartner,
    BusinessPartnerPortalBusinessPartnerType,
    BusinessPartnerPortalPartnerContact,
} from '@apps/business-partner-portal';
import { BusinessPartnerService } from '@apps/business-partner-portal/business-partner';
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
    defaultDetailImports,
    exportRows,
    GridColumnsConfigStorageService,
    GridData,
    GridElementsManagerComponent,
    GridElementsManagerModule,
    GridFiltersStorageService,
    gridQueryHandler,
    GridState,
    GridStateService,
    log,
    mapActions,
    phoneNumberFormat,
    PhoneNumberFormatModule,
    SnackBarInvalidFormComponent,
    uuid,
    ViewDetailComponent,
} from '@aurora';
import { countryPrefixes } from '@public/data';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'business-partner-portal-business-partner-detail',
    templateUrl: './business-partner-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        GridElementsManagerModule,
        KeyValuePipe,
        MatCheckboxModule,
        MatSelectModule,
        MatTabsModule,
        PhoneNumberFormatModule,
    ],
})
@ActionScope('businessPartnerPortal::businessPartner.detail')
export class BusinessPartnerDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    businessPartnerPortalBusinessPartnerType =
        BusinessPartnerPortalBusinessPartnerType;
    countryPrefixes = countryPrefixes;

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<BusinessPartnerPortalBusinessPartner> =
        signal(null);

    // relationships
    /* #region variables to manage grid-elements-manager partnerContacts */
    @ViewChild('partnerContactsGridElementsManager')
    partnerContactsComponent: GridElementsManagerComponent;
    partnerContactDialogFg: FormGroup;
    partnerContactsGridId: string =
        'businessPartnerPortal::businessPartner.detail.partnerContactsGridList';
    partnerContactsGridData$: Observable<
        GridData<BusinessPartnerPortalPartnerContact>
    >;
    partnerContactsGridState: GridState = {};
    partnerContactsColumnsConfig$: Observable<ColumnConfig[]>;
    originPartnerContactsColumnsConfig: ColumnConfig[] = [
        {
            type: ColumnDataType.ACTIONS,
            field: 'Actions',
            sticky: true,
            actions: (row) => {
                const actions = [
                    {
                        id: 'businessPartnerPortal::businessPartner.detail.editPartnerContact',
                        isViewAction: false,
                        translation: 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id: 'businessPartnerPortal::businessPartner.detail.deletePartnerContact',
                        isViewAction: false,
                        translation: 'delete',
                        icon: 'delete',
                    },
                ];

                return actions;
            },
        },
        ...partnerContactColumnsConfig({ translator: this.translocoService }),
    ];
    /* #endregion variables to manage grid-elements-manager partnerContacts */

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        {
            translation: 'businessPartnerPortal.BusinessPartners',
            routerLink: ['/business-partner-portal/business-partner'],
        },
        { translation: 'businessPartnerPortal.BusinessPartner' },
    ];

    constructor(
        private readonly businessPartnerService: BusinessPartnerService,
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

    handlePhoneNumberSanitized(
        phoneNumber: string,
        targetFormControlName: string,
    ): void {
        this.fg.get(targetFormControlName).setValue(phoneNumber);
    }

    onSubmit($event): void {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if (
            $event.submitter.getAttribute('form') !==
            $event.submitter.form.getAttribute('id')
        ) {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

        // manage validations before execute actions
        if (this.fg.invalid) {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();

            this.snackBar.openFromComponent(SnackBarInvalidFormComponent, {
                data: {
                    message: `${this.translocoService.translate('InvalidForm')}`,
                    textButton: `${this.translocoService.translate('InvalidFormOk')}`,
                },
                panelClass: 'error-snackbar',
                verticalPosition: 'top',
                duration: 10000,
            });
            return;
        }

        this.actionService.action({
            id: mapActions(this.currentViewAction.id, {
                'businessPartnerPortal::businessPartner.detail.new':
                    'businessPartnerPortal::businessPartner.detail.create',
                'businessPartnerPortal::businessPartner.detail.edit':
                    'businessPartnerPortal::businessPartner.detail.update',
            }),
            isViewAction: false,
        });
    }

    createForm(): void {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: '',
            externalId: [{ value: '', disabled: true }],
            code: [{ value: '', disabled: true }],
            type: [[], [Validators.required]],
            name: ['', [Validators.required, Validators.maxLength(128)]],
            tin: ['', [Validators.maxLength(64)]],
            email: ['', [Validators.maxLength(128)]],
            website: ['', [Validators.maxLength(1022)]],
            phone: [
                '',
                [
                    Validators.maxLength(64),
                    phoneNumberFormat('phoneCountryPrefix'),
                ],
            ],
            phoneCountryPrefix: ['ES', [Validators.maxLength(4)]],
            phoneSanitized: ['', [Validators.maxLength(64)]],
            isActive: [false, [Validators.required]],
        });
        /* eslint-enable key-spacing */
    }

    /* #region methods to manage PartnerContacts */
    createPartnerContactDialogForm(): void {
        /* eslint-disable key-spacing */
        this.partnerContactDialogFg = this.fb.group({
            id: [
                '',
                [
                    Validators.required,
                    Validators.minLength(36),
                    Validators.maxLength(36),
                ],
            ],
            businessPartnerId: [
                null,
                [
                    Validators.required,
                    Validators.minLength(36),
                    Validators.maxLength(36),
                ],
            ],
            firstName: ['', [Validators.required, Validators.maxLength(128)]],
            lastName: ['', [Validators.required, Validators.maxLength(128)]],
            position: ['', [Validators.maxLength(128)]],
            department: ['', [Validators.maxLength(128)]],
            email: ['', [Validators.required, Validators.maxLength(128)]],
            phone: [
                '',
                [
                    Validators.maxLength(64),
                    phoneNumberFormat('phoneCountryPrefix'),
                ],
            ],
            phoneCountryPrefix: ['ES', [Validators.maxLength(4)]],
            phoneSanitized: ['', [Validators.maxLength(64)]],
            mobile: [
                '',
                [
                    Validators.maxLength(64),
                    phoneNumberFormat('mobileCountryPrefix'),
                ],
            ],
            mobileCountryPrefix: ['ES', [Validators.maxLength(4)]],
            mobileSanitized: ['', [Validators.maxLength(64)]],
            isPrincipal: [false, [Validators.required]],
            isActive: [false, [Validators.required]],
            isUser: [false, [Validators.required]],
            userId: ['', [Validators.minLength(36), Validators.maxLength(36)]],
            preferredLanguage: [
                '',
                [Validators.minLength(2), Validators.maxLength(2)],
            ],
            notes: '',
        });
        /* eslint-enable key-spacing */
    }

    handleSubmitPartnerContactForm($event, dialog): void {
        // manage validations before execute actions
        if (this.partnerContactDialogFg.invalid) {
            log(
                '[DEBUG] Error to validate form: ',
                this.partnerContactDialogFg,
            );
            this.validationMessagesService.validate();
            return;
        }

        // depending on the dialog action we invoke a createPartnerContact or updatePartnerContact action
        this.actionService.action({
            id: mapActions(dialog.componentInstance.data.options.action.id, {
                'businessPartnerPortal::businessPartner.detail.newPartnerContact':
                    'businessPartnerPortal::businessPartner.detail.createPartnerContact',
                'businessPartnerPortal::businessPartner.detail.editPartnerContact':
                    'businessPartnerPortal::businessPartner.detail.updatePartnerContact',
            }),
            isViewAction: false,
        });

        dialog.close();
    }

    handlePartnerContactPhoneNumberSanitized(
        phoneNumber: string,
        targetFormControlName: string,
    ): void {
        this.partnerContactDialogFg
            .get(targetFormControlName)
            .setValue(phoneNumber);
    }
    /* #endregion methods to manage PartnerContacts */

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'businessPartnerPortal::businessPartner.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'businessPartnerPortal::businessPartner.detail.edit':
                this.businessPartnerService.businessPartner$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });

                /* #region edit action to manage partnerContacts grid-elements-manager */
                this.partnerContactsColumnsConfig$ =
                    this.gridColumnsConfigStorageService
                        .getColumnsConfig(
                            this.partnerContactsGridId,
                            this.originPartnerContactsColumnsConfig,
                        )
                        .pipe(takeUntil(this.unsubscribeAll$));

                this.partnerContactsGridState = {
                    columnFilters:
                        this.gridFiltersStorageService.getColumnFilterState(
                            this.partnerContactsGridId,
                        ),
                    page: this.gridStateService.getPage(
                        this.partnerContactsGridId,
                    ),
                    sort: this.gridStateService.getSort(
                        this.partnerContactsGridId,
                    ),
                    search: this.gridStateService.getSearchState(
                        this.partnerContactsGridId,
                    ),
                };

                this.partnerContactsGridData$ =
                    this.partnerContactService.pagination$;

                // subscription to get partnerContact in edit businessPartner action
                this.partnerContactService.partnerContact$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(
                        (
                            partnerContact: BusinessPartnerPortalPartnerContact,
                        ) => {
                            if (
                                partnerContact &&
                                this.currentAction.id ===
                                    'businessPartnerPortal::businessPartner.detail.editPartnerContact'
                            ) {
                                this.partnerContactDialogFg.patchValue(
                                    partnerContact,
                                );
                            }
                        },
                    );
                /* #endregion edit action to manage partnerContacts grid-elements-manager */
                break;

            case 'businessPartnerPortal::businessPartner.detail.create':
                try {
                    await lastValueFrom(
                        this.businessPartnerService.create<BusinessPartnerPortalBusinessPartner>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.BusinessPartner')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/business-partner',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'businessPartnerPortal::businessPartner.detail.update':
                try {
                    await lastValueFrom(
                        this.businessPartnerService.updateById<BusinessPartnerPortalBusinessPartner>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.BusinessPartner')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/business-partner',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */

            /* #region actions to manage partnerContacts grid-elements-manager */
            case 'businessPartnerPortal::businessPartner.detail.partnerContactsPagination':
                await lastValueFrom(
                    this.partnerContactService.pagination({
                        query: gridQueryHandler({
                            gridFiltersStorageService:
                                this.gridFiltersStorageService,
                            gridStateService: this.gridStateService,
                            gridId: this.partnerContactsGridId,
                            columnsConfig: partnerContactColumnsConfig(),
                            query: action.meta.query,
                        }),
                        constraint: {
                            where: {
                                businessPartnerId: this.managedObject().id,
                            },
                        },
                    }),
                );
                break;

            case 'businessPartnerPortal::businessPartner.detail.newPartnerContact':
                this.createPartnerContactDialogForm();
                this.partnerContactsComponent.handleElementDetailDialog({
                    action,
                });
                this.partnerContactDialogFg.get('id').setValue(uuid());
                this.partnerContactDialogFg
                    .get('businessPartnerId')
                    .setValue(this.managedObject().id);
                break;

            case 'businessPartnerPortal::businessPartner.detail.createPartnerContact':
                await lastValueFrom(
                    this.partnerContactService.create<BusinessPartnerPortalPartnerContact>(
                        {
                            object: this.partnerContactDialogFg.value,
                        },
                    ),
                );

                this.actionService.action({
                    id: 'businessPartnerPortal::businessPartner.detail.partnerContactsPagination',
                    isViewAction: false,
                });
                break;

            case 'businessPartnerPortal::businessPartner.detail.editPartnerContact':
                this.createPartnerContactDialogForm();
                await lastValueFrom(
                    this.partnerContactService.findById({
                        id: action.meta.row.id,
                        constraint: {
                            where: {
                                businessPartnerId: this.managedObject().id,
                            },
                        },
                    }),
                );
                this.partnerContactsComponent.handleElementDetailDialog({
                    action,
                });
                break;

            case 'businessPartnerPortal::businessPartner.detail.updatePartnerContact':
                this.partnerContactDialogFg.removeControl('businessPartnerId');

                await lastValueFrom(
                    this.partnerContactService.updateById<BusinessPartnerPortalPartnerContact>(
                        {
                            object: this.partnerContactDialogFg.value,
                        },
                    ),
                );
                this.actionService.action({
                    id: 'businessPartnerPortal::businessPartner.detail.partnerContactsPagination',
                    isViewAction: false,
                });
                break;

            case 'businessPartnerPortal::businessPartner.detail.deletePartnerContact':
                const deletePartnerContactDialogRef =
                    this.confirmationService.open({
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
                                label: this.translocoService.translate(
                                    'Remove',
                                ),
                                color: 'warn',
                            },
                            cancel: {
                                show: true,
                                label: this.translocoService.translate(
                                    'Cancel',
                                ),
                            },
                        },
                        dismissible: true,
                    });

                deletePartnerContactDialogRef
                    .afterClosed()
                    .subscribe(async (result) => {
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
                                    id: 'businessPartnerPortal::businessPartner.detail.partnerContactsPagination',
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

            case 'businessPartnerPortal::businessPartner.detail.exportPartnerContacts':
                const partnerContactRows = await lastValueFrom(
                    this.partnerContactService.get({
                        query: action.meta.query,
                        constraint: {
                            where: {
                                businessPartnerId: this.managedObject().id,
                            },
                        },
                    }),
                );

                const partnerContactColumns: string[] =
                    partnerContactColumnsConfig().map(
                        (partnerContactColumnConfig) =>
                            partnerContactColumnConfig.field,
                    );
                const partnerContactHeaders: string[] =
                    partnerContactColumnsConfig().map(
                        (partnerContactColumnConfig) =>
                            this.translocoService.translate(
                                partnerContactColumnConfig.translation,
                            ),
                    );

                exportRows(
                    partnerContactRows.objects,
                    'partnerContacts.' + action.meta.format,
                    partnerContactColumns,
                    partnerContactHeaders,
                    action.meta.format,
                );
                break;
            /* #endregion actions to manage partnerContacts grid-elements-manager */
        }
    }
}
