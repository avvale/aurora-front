/**
 * @aurora-generated
 * @source cliter/business-partner-portal/payment-collection-mode.aurora.yaml
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
    BusinessPartnerPortalPaymentCollectionMode,
    BusinessPartnerPortalPaymentMode,
} from '@apps/business-partner-portal';
import { BusinessPartnerService } from '@apps/business-partner-portal/business-partner';
import { PaymentCollectionModeService } from '@apps/business-partner-portal/payment-collection-mode';
import { PaymentModeService } from '@apps/business-partner-portal/payment-mode';
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
    selector: 'business-partner-portal-payment-collection-mode-detail',
    templateUrl: './payment-collection-mode-detail.component.html',
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
@ActionScope('businessPartnerPortal::paymentCollectionMode.detail')
export class PaymentCollectionModeDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<BusinessPartnerPortalPaymentCollectionMode> =
        signal(null);

    // relationships
    businessPartners$: Observable<BusinessPartnerPortalBusinessPartner[]>;
    paymentModes$: Observable<BusinessPartnerPortalPaymentMode[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        {
            translation: 'businessPartnerPortal.PaymentCollectionModes',
            routerLink: ['/business-partner-portal/payment-collection-mode'],
        },
        { translation: 'businessPartnerPortal.PaymentCollectionMode' },
    ];

    constructor(
        private readonly businessPartnerService: BusinessPartnerService,
        private readonly paymentCollectionModeService: PaymentCollectionModeService,
        private readonly paymentModeService: PaymentModeService,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
        this.businessPartners$ = this.businessPartnerService.businessPartners$;
        this.paymentModes$ = this.paymentModeService.paymentModes$;
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
                'businessPartnerPortal::paymentCollectionMode.detail.new':
                    'businessPartnerPortal::paymentCollectionMode.detail.create',
                'businessPartnerPortal::paymentCollectionMode.detail.edit':
                    'businessPartnerPortal::paymentCollectionMode.detail.update',
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
            paymentModeId: [
                null,
                [
                    Validators.required,
                    Validators.minLength(36),
                    Validators.maxLength(36),
                ],
            ],
            label: ['', [Validators.maxLength(128)]],
            accountNumber: ['', [Validators.maxLength(128)]],
            accountHolderName: ['', [Validators.maxLength(128)]],
            bankName: ['', [Validators.maxLength(128)]],
            routingNumber: ['', [Validators.maxLength(64)]],
            iban: ['', [Validators.maxLength(34)]],
            swiftCode: ['', [Validators.maxLength(11)]],
            currencyCode: [
                '',
                [Validators.minLength(3), Validators.maxLength(3)],
            ],
            expirationDate: null,
            isPrimary: [false, [Validators.required]],
            isActive: [false, [Validators.required]],
            notes: '',
            lastUsedAt: '',
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'businessPartnerPortal::paymentCollectionMode.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'businessPartnerPortal::paymentCollectionMode.detail.edit':
                this.paymentCollectionModeService.paymentCollectionMode$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'businessPartnerPortal::paymentCollectionMode.detail.create':
                try {
                    await lastValueFrom(
                        this.paymentCollectionModeService.create<BusinessPartnerPortalPaymentCollectionMode>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.PaymentCollectionMode')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/payment-collection-mode',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'businessPartnerPortal::paymentCollectionMode.detail.update':
                try {
                    await lastValueFrom(
                        this.paymentCollectionModeService.updateById<BusinessPartnerPortalPaymentCollectionMode>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.PaymentCollectionMode')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/payment-collection-mode',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
