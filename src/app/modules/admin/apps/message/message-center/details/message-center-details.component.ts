import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, inject, signal, WritableSignal } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InboxService } from '@apps/message/inbox';
import { MessageInbox } from '@apps/message/message.types';
import { FuseScrollResetDirective } from '@fuse/directives/scroll-reset';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { takeUntil } from 'rxjs';
import { MailboxService } from '../mailbox.service';
import { Mail } from '../mailbox.types';
import { MessageCenterService } from '../message-center.service';
import { messageCustomerCenterMessage } from '../list/message-center-list.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Action, ViewBaseComponent } from '@aurora';

@Component({
    selector     : 'message-center-details',
    templateUrl  : './message-center-details.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [
        NgIf, MatButtonModule, RouterLink, MatIconModule, MatMenuModule, NgFor, MatRippleModule,
        MatCheckboxModule, MatTooltipModule, NgClass, FuseScrollResetDirective, NgPlural, NgPluralCase,
        MatFormFieldModule, MatInputModule, FuseFindByKeyPipe, DecimalPipe, DatePipe, TranslocoModule,
    ],
})
export class MessageCenterDetailsComponent extends ViewBaseComponent
{
    message: WritableSignal<MessageInbox> = signal(null);
    inboxService = inject(InboxService);

    private changeDetectorRef = inject(ChangeDetectorRef);
    private messageCenterService = inject(MessageCenterService);


    // OLD
    @ViewChild('infoDetailsPanelOrigin') private _infoDetailsPanelOrigin: MatButton;
    @ViewChild('infoDetailsPanel') private _infoDetailsPanel: TemplateRef<any>;

    mail: Mail;
    replyFormActive: boolean = false;
    private _overlayRef: OverlayRef;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _elementRef: ElementRef,
        private _mailboxService: MailboxService,
        private _overlay: Overlay,
        private _router: Router,
        private _viewContainerRef: ViewContainerRef,
    )
    {
        super();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    init(): void
    {
        console.log('MessageCenterDetailsComponent ngOnInit');
        // Mail
        /* this._mailboxService.mail$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((mail: Mail) =>
            {
                this.mail = mail;
            }); */

        this.inboxService
            .getScopeInbox(messageCustomerCenterMessage)
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(message =>
            {
                this.message.set(message);

                // set selected message, this will be tagged in list component
                this.messageCenterService.selectedMessageSubject$.next(message);

                //this.changeDetectorRef.markForCheck();
            });

        // Selected mail changed
        this._mailboxService.selectedMailChanged
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(() =>
            {
                // De-activate the reply form
                this.replyFormActive = false;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle unread
     *
     * @param unread
     */
    toggleUnread(unread: boolean): void
    {
        // Update the mail object
        this.mail.unread = unread;

        // Update the mail on the server
        this._mailboxService.updateMail(this.mail.id, { unread: this.mail.unread }).subscribe();
    }

    /**
     * Reply
     */
    reply(): void
    {
    }

    /**
     * Reply all
     */
    replyAll(): void
    {
    }

    /**
     * Forward
     */
    forward(): void
    {
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'message::messageCenter.detail.show':
                /* // If the mail is not read...
                if (!action.meta.message.isRead)
                {
                    // Update the mail object
                    action.meta.message.isRead = true;

                    // Update the mail on the server
                    // this._mailboxService.updateMail(mail.id, { unread: false }).subscribe();
                }
                */
                //this.messageCenterService.selectedMessageSubject$.next(action.meta.message);
                break;
        }
    }
}
