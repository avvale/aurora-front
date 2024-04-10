
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MessageInbox } from '../message.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoService } from '@ngneat/transloco';
import { log } from '@aurora';

@Injectable({
    providedIn: 'root',
})
export class MessageCenterService
{
    selectedMessageSubject$: Subject<MessageInbox> = new Subject();
    toggleMessageAsReadSubject$: Subject<MessageInbox> = new Subject();
    deletedMessageSubject$: Subject<MessageInbox> = new Subject();
    currentTimeoutId: ReturnType<typeof setTimeout>;
    confirmationService = inject(FuseConfirmationService);
    translocoService = inject(TranslocoService);

    get selectedMessage$(): Observable<MessageInbox>
    {
        return this.selectedMessageSubject$.asObservable();
    }

    get toggleMessageAsRead$(): Observable<MessageInbox>
    {
        return this.toggleMessageAsReadSubject$.asObservable();
    }

    get deletedMessage$(): Observable<MessageInbox>
    {
        return this.deletedMessageSubject$.asObservable();
    }

    resetSelectedMessage(): void
    {
        this.selectedMessageSubject$.next(null);
    }

    deleteMessage(message: MessageInbox): void
    {
        const deleteDialogRef = this.confirmationService.open({
            title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('message.Message')}`,
            message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('message.Message') }),
            icon   : {
                show : true,
                name : 'heroicons_outline:exclamation-triangle',
                color: 'warn',
            },
            actions: {
                confirm: {
                    show : true,
                    label: this.translocoService.translate('Remove'),
                    color: 'warn',
                },
                cancel: {
                    show : true,
                    label: this.translocoService.translate('Cancel'),
                },
            },
            dismissible: true,
        });

        deleteDialogRef
            .afterClosed()
            .subscribe(async result =>
            {
                if (result === 'confirmed')
                {
                    try
                    {
                        // TODO, create a deleteById method in InboxService only for user scope
                        /*  await lastValueFrom(
                            this.inboxService
                                .deleteById<MessageInbox>({
                                    id: action.meta.message.id,
                                }),
                        ); */

                        this.deletedMessageSubject$.next(message);

                       // this.router.navigate(['message', 'message-center']);
                    }
                    catch(error)
                    {
                        log(`[DEBUG] Catch error in delete message action: ${error}`);
                    }
                }
            });
    }
}
