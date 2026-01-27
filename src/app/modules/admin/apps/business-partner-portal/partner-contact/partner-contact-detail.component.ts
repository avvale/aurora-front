/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-contact.aurora.yaml
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
    BusinessPartnerPortalPartnerContact,
} from '@apps/business-partner-portal';
import { BusinessPartnerService } from '@apps/business-partner-portal/business-partner';
import { PartnerContactService } from '@apps/business-partner-portal/partner-contact';
import { IamUser } from '@apps/iam';
import { UserService } from '@apps/iam/user';
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
    selector: 'business-partner-portal-partner-contact-detail',
    templateUrl: './partner-contact-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultDetailImports, MatCheckboxModule, MatSelectModule],
})
@ActionScope('businessPartnerPortal::partnerContact.detail')
export class PartnerContactDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<BusinessPartnerPortalPartnerContact> =
        signal(null);

    // relationships
    businessPartners$: Observable<BusinessPartnerPortalBusinessPartner[]>;
    users$: Observable<IamUser[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        {
            translation: 'businessPartnerPortal.PartnerContacts',
            routerLink: ['/business-partner-portal/partner-contact'],
        },
        { translation: 'businessPartnerPortal.PartnerContact' },
    ];

    constructor(
        private readonly businessPartnerService: BusinessPartnerService,
        private readonly partnerContactService: PartnerContactService,
        private readonly userService: UserService,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
        this.businessPartners$ = this.businessPartnerService.businessPartners$;
        this.users$ = this.userService.users$;
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
                'businessPartnerPortal::partnerContact.detail.new':
                    'businessPartnerPortal::partnerContact.detail.create',
                'businessPartnerPortal::partnerContact.detail.edit':
                    'businessPartnerPortal::partnerContact.detail.update',
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
            firstName: ['', [Validators.required, Validators.maxLength(128)]],
            lastName: ['', [Validators.required, Validators.maxLength(128)]],
            position: ['', [Validators.maxLength(128)]],
            department: ['', [Validators.maxLength(128)]],
            email: ['', [Validators.required, Validators.maxLength(128)]],
            phone: ['', [Validators.maxLength(64)]],
            mobile: ['', [Validators.maxLength(64)]],
            isPrimary: [false, [Validators.required]],
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

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'businessPartnerPortal::partnerContact.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'businessPartnerPortal::partnerContact.detail.edit':
                this.partnerContactService.partnerContact$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'businessPartnerPortal::partnerContact.detail.create':
                try {
                    await lastValueFrom(
                        this.partnerContactService.create<BusinessPartnerPortalPartnerContact>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.PartnerContact')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/partner-contact',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'businessPartnerPortal::partnerContact.detail.update':
                try {
                    await lastValueFrom(
                        this.partnerContactService.updateById<BusinessPartnerPortalPartnerContact>(
                            {
                                object: this.fg.value,
                            },
                        ),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('businessPartnerPortal.PartnerContact')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate([
                        'business-partner-portal/partner-contact',
                    ]);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
