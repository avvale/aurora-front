import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InboxService } from '@apps/notification/inbox';
import { NotificationInbox } from '@apps/notification/notification.types';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector       : 'notification-inbox-detail',
    templateUrl    : './inbox-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatCheckboxModule, NgForOf,
    ],
})
export class InboxDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: NotificationInbox;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'notification.Inboxes', routerLink: ['/notification/inbox']},
        { translation: 'notification.Inbox' },
    ];

    constructor(
        private readonly inboxService: InboxService,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        /**/
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
                    'notification::inbox.detail.new' : 'notification::inbox.detail.create',
                    'notification::inbox.detail.edit': 'notification::inbox.detail.update',
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
            tenantId: ['', [Validators.minLength(36), Validators.maxLength(36)]],
            notificationId: [null, [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            sort: [null, [Validators.required]],
            accountId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            accountCode: ['', [Validators.minLength(127), Validators.maxLength(127)]],
            isImportant: [false, [Validators.required]],
            subject: ['', [Validators.required, Validators.maxLength(255)]],
            body: ['', [Validators.required]],
            attachments: null,
            isRead: [false, [Validators.required]],
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'notification::inbox.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'notification::inbox.detail.edit':
                this.inboxService
                    .inbox$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'notification::inbox.detail.create':
                try
                {
                    await lastValueFrom(
                        this.inboxService
                            .create<NotificationInbox>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('notification.Inbox')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['notification/inbox']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'notification::inbox.detail.update':
                try
                {
                    await lastValueFrom(
                        this.inboxService
                            .updateById<NotificationInbox>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('notification.Inbox')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['notification/inbox']);
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
