/**
 * @aurora-generated
 * @source cliter/business-partner-portal/sales-invoice-position.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { BusinessPartnerPortalSalesInvoicePosition } from '@apps/business-partner-portal';
import { SalesInvoicePositionService } from '@apps/business-partner-portal/sales-invoice-position';
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
    selector: 'business-partner-portal-sales-invoice-position-detail',
    templateUrl: './sales-invoice-position-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultDetailImports],
})
@ActionScope('businessPartnerPortal::salesInvoicePosition.detail')
export class SalesInvoicePositionDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<BusinessPartnerPortalSalesInvoicePosition> =
        signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        {
            translation: 'businessPartnerPortal.SalesInvoicePositions',
            routerLink: ['/business-partner-portal/sales-invoice-position'],
        },
        { translation: 'businessPartnerPortal.SalesInvoicePosition' },
    ];

    constructor(
        private readonly salesInvoicePositionService: SalesInvoicePositionService,
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
                'businessPartnerPortal::salesInvoicePosition.detail.new':
                    'businessPartnerPortal::salesInvoicePosition.detail.create',
                'businessPartnerPortal::salesInvoicePosition.detail.edit':
                    'businessPartnerPortal::salesInvoicePosition.detail.update',
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
            salesInvoiceHeaderId: [
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
            notes: '',
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'businessPartnerPortal::salesInvoicePosition.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'businessPartnerPortal::salesInvoicePosition.detail.edit':
                this.salesInvoicePositionService.salesInvoicePosition$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'businessPartnerPortal::salesInvoicePosition.detail.create':
                try {
                    await lastValueFrom(
                        this.salesInvoicePositionService.create<BusinessPartnerPortalSalesInvoicePosition>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.SalesInvoicePosition')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/sales-invoice-position',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'businessPartnerPortal::salesInvoicePosition.detail.update':
                try {
                    await lastValueFrom(
                        this.salesInvoicePositionService.updateById<BusinessPartnerPortalSalesInvoicePosition>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.SalesInvoicePosition')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/sales-invoice-position',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
