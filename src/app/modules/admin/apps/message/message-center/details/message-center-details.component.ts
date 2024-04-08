import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, inject } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { MailboxService } from '../mailbox.service';
import { Mail } from '../mailbox.types';
import { MessageCenterService } from '../message-center.service';
import { messageCustomerCenterMessage } from '../list/message-center-list.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';

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
export class MessageCenterDetailsComponent implements OnInit, OnDestroy
{
    inboxService = inject(InboxService);
    message: MessageInbox;

    private changeDetectorRef = inject(ChangeDetectorRef);
    private messageCenterService = inject(MessageCenterService);
    private unsubscribeAll$: Subject<void> = new Subject<void>();


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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
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
                this.message = message;

                // set selected message, this will be tagged in list component
                // this.messageCenterService.selectedMessageSubject$.next(message);

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

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll$.next(null);
        this.unsubscribeAll$.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current folder
     */
    getCurrentFolder(): any
    {
        return this._activatedRoute.snapshot.paramMap.get('folder');
    }

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
        // Activate the reply form
        this.replyFormActive = true;

        // Scroll to the bottom of the details pane
        setTimeout(() =>
        {
            this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;
        });
    }

    /**
     * Reply all
     */
    replyAll(): void
    {
        // Activate the reply form
        this.replyFormActive = true;

        // Scroll to the bottom of the details pane
        setTimeout(() =>
        {
            this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;
        });
    }

    /**
     * Forward
     */
    forward(): void
    {
        // Activate the reply form
        this.replyFormActive = true;

        // Scroll to the bottom of the details pane
        setTimeout(() =>
        {
            this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;
        });
    }

    /**
     * Discard
     */
    discard(): void
    {
        // Deactivate the reply form
        this.replyFormActive = false;
    }

    /**
     * Send
     */
    send(): void
    {
        // Deactivate the reply form
        this.replyFormActive = false;
    }

    /**
     * Open info details panel
     */
    openInfoDetailsPanel(): void
    {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            backdropClass   : '',
            hasBackdrop     : true,
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._infoDetailsPanelOrigin._elementRef.nativeElement)
                .withFlexibleDimensions(true)
                .withViewportMargin(16)
                .withLockedPosition(true)
                .withPositions([
                    {
                        originX : 'start',
                        originY : 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX : 'start',
                        originY : 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX : 'end',
                        originY : 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX : 'end',
                        originY : 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        // Create a portal from the template
        const templatePortal = new TemplatePortal(this._infoDetailsPanel, this._viewContainerRef);

        // Attach the portal to the overlay
        this._overlayRef.attach(templatePortal);

        // Subscribe to the backdrop click
        this._overlayRef.backdropClick().subscribe(() =>
        {
            // If overlay exists and attached...
            if ( this._overlayRef && this._overlayRef.hasAttached() )
            {
                // Detach it
                this._overlayRef.detach();
            }

            // If template portal exists and attached...
            if ( templatePortal && templatePortal.isAttached )
            {
                // Detach it
                templatePortal.detach();
            }
        });
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
