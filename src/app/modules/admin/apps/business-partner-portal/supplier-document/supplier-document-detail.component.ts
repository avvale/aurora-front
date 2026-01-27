/**
 * @aurora-generated
 * @source cliter/business-partner-portal/supplier-document.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
    BusinessPartnerPortalBusinessPartner,
    BusinessPartnerPortalPurchaseInvoiceHeader,
    BusinessPartnerPortalSupplierDocument,
} from '@apps/business-partner-portal';
import { BusinessPartnerService } from '@apps/business-partner-portal/business-partner';
import { PurchaseInvoiceHeaderService } from '@apps/business-partner-portal/purchase-invoice-header';
import { SupplierDocumentService } from '@apps/business-partner-portal/supplier-document';
import {
    Action,
    ActionScope,
    Crumb,
    defaultDetailImports,
    log,
    mapActions,
    SnackBarInvalidFormComponent,
    uuid,
    ViewDetailComponent,
} from '@aurora';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'business-partner-portal-supplier-document-detail',
    templateUrl: './supplier-document-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,
        MatCheckboxModule,
        MatDatepickerModule,
        MatSelectModule,
        MtxDatetimepickerModule,
    ],
})
@ActionScope('businessPartnerPortal::supplierDocument.detail')
export class SupplierDocumentDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<BusinessPartnerPortalSupplierDocument> =
        signal(null);

    // relationships
    businessPartners$: Observable<BusinessPartnerPortalBusinessPartner[]>;
    purchaseInvoiceHeaders$: Observable<
        BusinessPartnerPortalPurchaseInvoiceHeader[]
    >;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        {
            translation: 'businessPartnerPortal.SupplierDocuments',
            routerLink: ['/business-partner-portal/supplier-document'],
        },
        { translation: 'businessPartnerPortal.SupplierDocument' },
    ];

    constructor(
        private readonly businessPartnerService: BusinessPartnerService,
        private readonly purchaseInvoiceHeaderService: PurchaseInvoiceHeaderService,
        private readonly supplierDocumentService: SupplierDocumentService,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
        this.businessPartners$ = this.businessPartnerService.businessPartners$;
        this.purchaseInvoiceHeaders$ =
            this.purchaseInvoiceHeaderService.purchaseInvoiceHeaders$;
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
                'businessPartnerPortal::supplierDocument.detail.new':
                    'businessPartnerPortal::supplierDocument.detail.create',
                'businessPartnerPortal::supplierDocument.detail.edit':
                    'businessPartnerPortal::supplierDocument.detail.update',
            }),
            isViewAction: false,
        });
    }

    createForm(): void {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
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
            documentNumber: ['', [Validators.maxLength(64)]],
            documentType: null,
            status: [null, [Validators.required]],
            file: null,
            fileHash: ['', [Validators.maxLength(64)]],
            supplierInvoiceNumber: ['', [Validators.maxLength(64)]],
            supplierInvoiceDate: null,
            supplierInvoiceAmount: null,
            currencyCode: [
                '',
                [Validators.minLength(3), Validators.maxLength(3)],
            ],
            externalDocumentId: ['', [Validators.maxLength(64)]],
            externalCompanyCode: ['', [Validators.maxLength(16)]],
            externalProcessingStatus: ['', [Validators.maxLength(64)]],
            purchaseInvoiceHeaderId: [
                null,
                [Validators.minLength(36), Validators.maxLength(36)],
            ],
            ocrConfidenceScore: null,
            ocrData: null,
            sentForProcessingAt: '',
            processedAt: '',
            linkedAt: '',
            errorCode: ['', [Validators.maxLength(64)]],
            errorMessage: '',
            retryCount: [null, [Validators.required]],
            lastRetryAt: '',
            notes: '',
            supplierNotes: '',
            isArchived: [false, [Validators.required]],
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'businessPartnerPortal::supplierDocument.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'businessPartnerPortal::supplierDocument.detail.edit':
                this.supplierDocumentService.supplierDocument$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'businessPartnerPortal::supplierDocument.detail.create':
                try {
                    await lastValueFrom(
                        this.supplierDocumentService.create<BusinessPartnerPortalSupplierDocument>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.SupplierDocument')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/supplier-document',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'businessPartnerPortal::supplierDocument.detail.update':
                try {
                    await lastValueFrom(
                        this.supplierDocumentService.updateById<BusinessPartnerPortalSupplierDocument>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.SupplierDocument')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/supplier-document',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
