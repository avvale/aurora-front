import { NgForOf, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { IamTenant } from '@apps/iam/iam.types';
import { TenantService } from '@apps/iam/tenant';
import { MessageService } from '@apps/message/message';
import { MessageMessage, MessageMessageStatus } from '@apps/message';
import { ClientService } from '@apps/o-auth/client';
import { OAuthScope } from '@apps/o-auth/o-auth.types';
import { Action, Crumb, defaultDetailImports, log, mapActions, SnackBarInvalidFormComponent, Utils, ViewDetailComponent } from '@aurora';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { Observable, lastValueFrom, map, takeUntil } from 'rxjs';

@Component({
    selector       : 'message-message-detail',
    templateUrl    : './message-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatCheckboxModule, MatSelectModule, MtxDatetimepickerModule, NgForOf,
        KeyValuePipe,
    ],
})
export class MessageDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    scopeRecipients$: Observable<OAuthScope[]>;
    tenants$: Observable<IamTenant[]>;
    messageMessageStatus = MessageMessageStatus;

    private clientService  = inject(ClientService);
    private tenantService = inject(TenantService);

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: MessageMessage;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'message.Messages', routerLink: ['/message/message']},
        { translation: 'message.Message' },
    ];

    constructor(
        private readonly messageService: MessageService,
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

            this.snackBar.openFromComponent(
                SnackBarInvalidFormComponent,
                {
                    data: {
                        message   : `${this.translocoService.translate('InvalidForm')}`,
                        textButton: `${this.translocoService.translate('InvalidFormOk')}`,
                    },
                    panelClass      : 'error-snackbar',
                    verticalPosition: 'top',
                    duration        : 10000,
                },
            );
            return;
        }

        this.actionService.action({
            id: mapActions(
                this.currentViewAction.id,
                {
                    'message::message.detail.new' : 'message::message.detail.create',
                    'message::message.detail.edit': 'message::message.detail.update',
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
            tagRecipients: [],
            sendAt: '',
            isImportant: [false, [Validators.required]],
            title: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.required]],
            link: ['', [Validators.maxLength(2046)]],
            isInternalLink: false,
            image: null,
            icon: ['', [Validators.maxLength(64)]],
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
            case 'message::message.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'message::message.detail.edit':
                this.messageService
                    .message$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'message::message.detail.create':
                try
                {
                    await lastValueFrom(
                        this.messageService
                            .create<MessageMessage>({
                                object: {
                                    ...this.fg.value,
                                    totalRecipients: undefined,
                                    reads          : undefined,
                                },
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('message.Message')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['message/message']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'message::message.detail.update':
                try
                {
                    await lastValueFrom(
                        this.messageService
                            .updateById<MessageMessage>({
                                object: {
                                    ...this.fg.value,
                                    totalRecipients: undefined,
                                    reads          : undefined,
                                },
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('message.Message')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['message/message']);
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
