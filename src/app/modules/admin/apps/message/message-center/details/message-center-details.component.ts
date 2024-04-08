import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { Component, ViewEncapsulation, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { InboxService } from '@apps/message/inbox';
import { MessageInbox } from '@apps/message/message.types';
import { FuseScrollResetDirective } from '@fuse/directives/scroll-reset';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { takeUntil } from 'rxjs';
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
    messageCenterService = inject(MessageCenterService);

    /**
     * On init
     */
    init(): void
    {
        this.inboxService
            .getScopeInbox(messageCustomerCenterMessage)
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(message =>
            {
                this.message.set(message);

                // set selected message, this will be tagged in list component
                this.messageCenterService.selectedMessageSubject$.next(message);
            });
    }

    /**
     * Toggle unread
     *
     * @param unread
     */
    toggleUnread(unread: boolean): void
    {
        // Update the mail object
        //this.mail.unread = unread;

        // Update the mail on the server
        // this._mailboxService.updateMail(this.mail.id, { unread: this.mail.unread }).subscribe();
    }

    /**
     * Reply
     */
    reply(): void
    {
    }

    deleteMessage(): void
    {
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'message::messageCenter.detail.show':
                break;
        }
    }
}
