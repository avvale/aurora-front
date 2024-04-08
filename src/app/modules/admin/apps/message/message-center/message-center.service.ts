
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageInbox } from '../message.types';

@Injectable({
    providedIn: 'root',
})
export class MessageCenterService
{
    selectedMessageSubject$: BehaviorSubject<MessageInbox> = new BehaviorSubject(null);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for selectedMessage
     */
    get selectedMessage$(): Observable<MessageInbox>
    {
        return this.selectedMessageSubject$.asObservable();
    }

    // OLD
    private _mailsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);


    /**
     * Getter for mails loading
     */
    get mailsLoading$(): Observable<boolean>
    {
        return this._mailsLoading.asObservable();
    }

    resetSelectedMessage(): void
    {
        this.selectedMessageSubject$.next(null);
    }
}
