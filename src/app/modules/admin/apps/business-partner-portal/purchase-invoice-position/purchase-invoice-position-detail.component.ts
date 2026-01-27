/**
 * @aurora-generated
 * @source cliter/business-partner-portal/purchase-invoice-position.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { BusinessPartnerPortalPurchaseInvoicePosition } from '@apps/business-partner-portal';
import { PurchaseInvoicePositionService } from '@apps/business-partner-portal/purchase-invoice-position';
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
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector: 'business-partner-portal-purchase-invoice-position-detail',
    templateUrl: './purchase-invoice-position-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultDetailImports],
})
@ActionScope('businessPartnerPortal::purchaseInvoicePosition.detail')
export class PurchaseInvoicePositionDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<BusinessPartnerPortalPurchaseInvoicePosition> =
        signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        {
            translation: 'businessPartnerPortal.PurchaseInvoicePositions',
            routerLink: ['/business-partner-portal/purchase-invoice-position'],
        },
        { translation: 'businessPartnerPortal.PurchaseInvoicePosition' },
    ];

    constructor(
        private readonly purchaseInvoicePositionService: PurchaseInvoicePositionService,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
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
                'businessPartnerPortal::purchaseInvoicePosition.detail.new':
                    'businessPartnerPortal::purchaseInvoicePosition.detail.create',
                'businessPartnerPortal::purchaseInvoicePosition.detail.edit':
                    'businessPartnerPortal::purchaseInvoicePosition.detail.update',
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
            purchaseInvoiceHeaderId: [
                null,
                [
                    Validators.required,
                    Validators.minLength(36),
                    Validators.maxLength(36),
                ],
            ],
            positionNumber: [null, [Validators.required]],
            description: ['', [Validators.required, Validators.maxLength(510)]],
            productCode: ['', [Validators.maxLength(64)]],
            quantity: [null, [Validators.required]],
            unitPrice: [null, [Validators.required]],
            discountPercent: [null, [Validators.required]],
            discountAmount: [null, [Validators.required]],
            taxPercent: [null, [Validators.required]],
            taxAmount: [null, [Validators.required]],
            subtotal: [null, [Validators.required]],
            positionTotal: [null, [Validators.required]],
            expenseCategory: ['', [Validators.maxLength(128)]],
            notes: '',
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'businessPartnerPortal::purchaseInvoicePosition.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'businessPartnerPortal::purchaseInvoicePosition.detail.edit':
                this.purchaseInvoicePositionService.purchaseInvoicePosition$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'businessPartnerPortal::purchaseInvoicePosition.detail.create':
                try {
                    await lastValueFrom(
                        this.purchaseInvoicePositionService.create<BusinessPartnerPortalPurchaseInvoicePosition>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.PurchaseInvoicePosition')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/purchase-invoice-position',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'businessPartnerPortal::purchaseInvoicePosition.detail.update':
                try {
                    await lastValueFrom(
                        this.purchaseInvoicePositionService.updateById<BusinessPartnerPortalPurchaseInvoicePosition>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.PurchaseInvoicePosition')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/purchase-invoice-position',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
