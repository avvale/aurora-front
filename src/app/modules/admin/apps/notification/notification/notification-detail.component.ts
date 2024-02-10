import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { IamTenant } from '@apps/iam/iam.types';
import { TenantService } from '@apps/iam/tenant';
import { NotificationService } from '@apps/notification/notification';
import { NotificationNotification } from '@apps/notification/notification.types';
import { ClientService } from '@apps/o-auth/client';
import { OAuthScope } from '@apps/o-auth/o-auth.types';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { BehaviorSubject, Observable, lastValueFrom, map, takeUntil } from 'rxjs';

@Component({
    selector       : 'notification-notification-detail',
    templateUrl    : './notification-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatCheckboxModule, MatSelectModule, MtxDatetimepickerModule, NgForOf,
    ],
})
export class NotificationDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    scopeRecipients$: Observable<OAuthScope[]>;
    tenants$: Observable<IamTenant[]>;

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: NotificationNotification;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'notification.Notifications', routerLink: ['/notification/notification']},
        { translation: 'notification.Notification' },
    ];

    constructor(
        private readonly notificationService: NotificationService,
        private readonly clientService: ClientService,
        private readonly tenantService: TenantService,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        this.scopeRecipients$ = this.clientService.client$.pipe(map(client => client?.scopeOptions as OAuthScope[]));
        this.tenants$ = this.tenantService.tenants$;
    }

    onSubmit($event): void
    {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if ($event.submitter.getAttribute('form') !== $event.submitter.form.getAttribute('id'))
        {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();
            return;
        }

        this.actionService.action({
            id: mapActions(
                this.currentViewAction.id,
                {
                    'notification::notification.detail.new' : 'notification::notification.detail.create',
                    'notification::notification.detail.edit': 'notification::notification.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            tenantIds: [],
            status: [null, [Validators.required]],
            accountRecipientIds: [],
            tenantRecipientIds: [],
            scopeRecipients: [],
            sendAt: '',
            isImportant: [false, [Validators.required]],
            subject: ['', [Validators.required, Validators.maxLength(255)]],
            body: ['', [Validators.required]],
            attachments: null,
            totalRecipients: null,
            reads: null,
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'notification::notification.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'notification::notification.detail.edit':
                this.notificationService
                    .notification$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'notification::notification.detail.create':
                try
                {
                    await lastValueFrom(
                        this.notificationService
                            .create<NotificationNotification>({
                                object: {
                                    ...this.fg.value,
                                    totalRecipients: undefined,
                                    reads          : undefined,
                                },
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('notification.Notification')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['notification/notification']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'notification::notification.detail.update':
                try
                {
                    await lastValueFrom(
                        this.notificationService
                            .updateById<NotificationNotification>({
                                object: {
                                    ...this.fg.value,
                                    totalRecipients: undefined,
                                    reads          : undefined,
                                },
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('notification.Notification')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['notification/notification']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion common actions */
        }
    }
}
