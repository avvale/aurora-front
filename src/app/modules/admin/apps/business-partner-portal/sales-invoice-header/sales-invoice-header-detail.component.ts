/**
 * @aurora-generated
 * @source cliter/business-partner-portal/sales-invoice-header.aurora.yaml
 */
import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { BusinessPartnerPortalSalesInvoiceHeader } from '@apps/business-partner-portal';
import { SalesInvoiceHeaderService } from '@apps/business-partner-portal/sales-invoice-header';
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
    selector: 'business-partner-portal-sales-invoice-header-detail',
    templateUrl: './sales-invoice-header-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultDetailImports, MatDatepickerModule, MatSelectModule],
})
@ActionScope('businessPartnerPortal::salesInvoiceHeader.detail')
export class SalesInvoiceHeaderDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<BusinessPartnerPortalSalesInvoiceHeader> =
        signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        {
            translation: 'businessPartnerPortal.SalesInvoiceHeaders',
            routerLink: ['/business-partner-portal/sales-invoice-header'],
        },
        { translation: 'businessPartnerPortal.SalesInvoiceHeader' },
    ];

    constructor(
        private readonly salesInvoiceHeaderService: SalesInvoiceHeaderService,
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
                'businessPartnerPortal::salesInvoiceHeader.detail.new':
                    'businessPartnerPortal::salesInvoiceHeader.detail.create',
                'businessPartnerPortal::salesInvoiceHeader.detail.edit':
                    'businessPartnerPortal::salesInvoiceHeader.detail.update',
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
            invoiceNumber: [
                '',
                [Validators.required, Validators.maxLength(64)],
            ],
            externalId: ['', [Validators.maxLength(64)]],
            externalSystemCode: ['', [Validators.maxLength(16)]],
            businessPartnerId: [
                null,
                [
                    Validators.required,
                    Validators.minLength(36),
                    Validators.maxLength(36),
                ],
            ],
            invoiceDate: [null, [Validators.required]],
            dueDate: null,
            status: [null, [Validators.required]],
            subtotal: [null, [Validators.required]],
            taxAmount: [null, [Validators.required]],
            discountAmount: [null, [Validators.required]],
            totalAmount: [null, [Validators.required]],
            paidAmount: [null, [Validators.required]],
            currencyCode: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(3),
                ],
            ],
            paymentTermDays: null,
            notes: '',
            customerNotes: '',
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'businessPartnerPortal::salesInvoiceHeader.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'businessPartnerPortal::salesInvoiceHeader.detail.edit':
                this.salesInvoiceHeaderService.salesInvoiceHeader$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'businessPartnerPortal::salesInvoiceHeader.detail.create':
                try {
                    await lastValueFrom(
                        this.salesInvoiceHeaderService.create<BusinessPartnerPortalSalesInvoiceHeader>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.SalesInvoiceHeader')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/sales-invoice-header',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'businessPartnerPortal::salesInvoiceHeader.detail.update':
                try {
                    await lastValueFrom(
                        this.salesInvoiceHeaderService.updateById<BusinessPartnerPortalSalesInvoiceHeader>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.SalesInvoiceHeader')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/sales-invoice-header',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
