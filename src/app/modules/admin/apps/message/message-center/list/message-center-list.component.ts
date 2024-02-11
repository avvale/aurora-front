import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MailboxService } from '../mailbox.service';
import { Mail, MailCategory } from '../mailbox.types';
import { Subject, takeUntil } from 'rxjs';
import { InboxService } from '@apps/message/inbox';
import { MessageInbox } from '@apps/message/message.types';
import { GridData } from '@aurora';

@Component({
    selector     : 'au-message-center-list',
    templateUrl  : './message-center-list.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf, MatButtonModule, MatIconModule, RouterLink, MatProgressBarModule, NgFor, NgClass, RouterOutlet, DatePipe],
})
export class MessageClientListComponent implements OnInit, OnDestroy
{
    messages: MessageInbox[];


    // OLD


    @ViewChild('mailList') mailList: ElementRef;

    category: MailCategory;
    
   /*  mails: Mail[] = [{
        id  : '1',
        type: 'sdf',
        from: {
            avatar : 'assets/images/avatars/alice.jpg',
            contact: 'asdfa',
        },
        content: 'hola mundo',
        to     : 'sdf',
        cc     : ['pepe', 'manolo', 'juan'],
        ccCount: 3,
        unread : true,
        important: true,
    }]; */
    mailsLoading: boolean = false;
    pagination: any;
    selectedMail: Mail;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    private inboxService = inject(InboxService);

    /**
     * Constructor
     */
    constructor(
        private _mailboxService: MailboxService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Category
        this._mailboxService.category$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((category: MailCategory) =>
            {
                this.category = category;
            });

        // Mails
        this.inboxService
            .checkMessagesInbox({
                query: {
                    limit : 10,
                    offset: 0,
                    order : [['sort', 'desc']],
                },
            })
            .subscribe((messageInboxPagination : GridData<MessageInbox>) =>
            {
                //this.messages.next(data.rows);
            });

        // Mails
        /* this._mailboxService.mails$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mails: Mail[]) =>
            {
                this.mails = mails;
            }); */

        // Mails loading
        this._mailboxService.mailsLoading$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mailsLoading: boolean) =>
            {
                this.mailsLoading = mailsLoading;

                // If the mail list element is available & the mails are loaded...
                if ( this.mailList && !mailsLoading )
                {
                    // Reset the mail list element scroll position to top
                    this.mailList.nativeElement.scrollTo(0, 0);
                }
            });

        // Pagination
        this._mailboxService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(pagination =>
            {
                this.pagination = pagination;
            });

        // Selected mail
        this._mailboxService.mail$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mail: Mail) =>
            {
                this.selectedMail = mail;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On mail selected
     *
     * @param mail
     */
    onMailSelected(mail: Mail): void
    {
        // If the mail is unread...
        if ( mail.unread )
        {
            // Update the mail object
            mail.unread = false;

            // Update the mail on the server
            this._mailboxService.updateMail(mail.id, { unread: false }).subscribe();
        }

        // Execute the mailSelected observable
        this._mailboxService.selectedMailChanged.next(mail);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
