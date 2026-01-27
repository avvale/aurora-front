/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-address.aurora.yaml
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
import { MatSelectModule } from '@angular/material/select';
import {
    BusinessPartnerPortalBusinessPartner,
    BusinessPartnerPortalPartnerAddress,
} from '@apps/business-partner-portal';
import { BusinessPartnerService } from '@apps/business-partner-portal/business-partner';
import { PartnerAddressService } from '@apps/business-partner-portal/partner-address';
import {
    CommonAdministrativeAreaLevel1,
    CommonAdministrativeAreaLevel2,
    CommonAdministrativeAreaLevel3,
    CommonCountry,
} from '@apps/common';
import { AdministrativeAreaLevel1Service } from '@apps/common/administrative-area-level-1';
import { AdministrativeAreaLevel2Service } from '@apps/common/administrative-area-level-2';
import { AdministrativeAreaLevel3Service } from '@apps/common/administrative-area-level-3';
import { CountryService } from '@apps/common/country';
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
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'business-partner-portal-partner-address-detail',
    templateUrl: './partner-address-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultDetailImports, MatCheckboxModule, MatSelectModule],
})
@ActionScope('businessPartnerPortal::partnerAddress.detail')
export class PartnerAddressDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<BusinessPartnerPortalPartnerAddress> =
        signal(null);

    // relationships
    businessPartners$: Observable<BusinessPartnerPortalBusinessPartner[]>;
    countries$: Observable<CommonCountry[]>;
    administrativeAreasLevel1$: Observable<CommonAdministrativeAreaLevel1[]>;
    administrativeAreasLevel2$: Observable<CommonAdministrativeAreaLevel2[]>;
    administrativeAreasLevel3$: Observable<CommonAdministrativeAreaLevel3[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        {
            translation: 'businessPartnerPortal.PartnerAddresses',
            routerLink: ['/business-partner-portal/partner-address'],
        },
        { translation: 'businessPartnerPortal.PartnerAddress' },
    ];

    constructor(
        private readonly administrativeAreaLevel1Service: AdministrativeAreaLevel1Service,
        private readonly administrativeAreaLevel2Service: AdministrativeAreaLevel2Service,
        private readonly administrativeAreaLevel3Service: AdministrativeAreaLevel3Service,
        private readonly businessPartnerService: BusinessPartnerService,
        private readonly countryService: CountryService,
        private readonly partnerAddressService: PartnerAddressService,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
        this.businessPartners$ = this.businessPartnerService.businessPartners$;
        this.countries$ = this.countryService.countries$;
        this.administrativeAreasLevel1$ =
            this.administrativeAreaLevel1Service.administrativeAreasLevel1$;
        this.administrativeAreasLevel2$ =
            this.administrativeAreaLevel2Service.administrativeAreasLevel2$;
        this.administrativeAreasLevel3$ =
            this.administrativeAreaLevel3Service.administrativeAreasLevel3$;
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
                'businessPartnerPortal::partnerAddress.detail.new':
                    'businessPartnerPortal::partnerAddress.detail.create',
                'businessPartnerPortal::partnerAddress.detail.edit':
                    'businessPartnerPortal::partnerAddress.detail.update',
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
            type: [null, [Validators.required]],
            label: ['', [Validators.maxLength(128)]],
            addressLine1: [
                '',
                [Validators.required, Validators.maxLength(255)],
            ],
            addressLine2: ['', [Validators.maxLength(255)]],
            city: ['', [Validators.required, Validators.maxLength(128)]],
            postalCode: ['', [Validators.maxLength(64)]],
            countryId: [
                null,
                [
                    Validators.required,
                    Validators.minLength(36),
                    Validators.maxLength(36),
                ],
            ],
            administrativeAreaLevel1Id: [
                null,
                [Validators.minLength(36), Validators.maxLength(36)],
            ],
            administrativeAreaLevel2Id: [
                null,
                [Validators.minLength(36), Validators.maxLength(36)],
            ],
            administrativeAreaLevel3Id: [
                null,
                [Validators.minLength(36), Validators.maxLength(36)],
            ],
            latitude: null,
            longitude: null,
            isPrimary: [false, [Validators.required]],
            isActive: [false, [Validators.required]],
            notes: '',
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'businessPartnerPortal::partnerAddress.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'businessPartnerPortal::partnerAddress.detail.edit':
                this.partnerAddressService.partnerAddress$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'businessPartnerPortal::partnerAddress.detail.create':
                try {
                    await lastValueFrom(
                        this.partnerAddressService.create<BusinessPartnerPortalPartnerAddress>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.PartnerAddress')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/partner-address',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'businessPartnerPortal::partnerAddress.detail.update':
                try {
                    await lastValueFrom(
                        this.partnerAddressService.updateById<BusinessPartnerPortalPartnerAddress>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.PartnerAddress')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/partner-address',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
