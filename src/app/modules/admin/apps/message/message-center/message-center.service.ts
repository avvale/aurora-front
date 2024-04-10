
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageInbox } from '../message.types';

@Injectable({
    providedIn: 'root',
})
export class MessageCenterService
{
    selectedMessageSubject$: BehaviorSubject<MessageInbox> = new BehaviorSubject(null);
    toggleMessageAsReadSubject$: BehaviorSubject<MessageInbox> = new BehaviorSubject(null);

    get selectedMessage$(): Observable<MessageInbox>
    {
        return this.selectedMessageSubject$.asObservable();
    }

    get toggleMessageAsRead$(): Observable<MessageInbox>
    {
        return this.toggleMessageAsReadSubject$.asObservable();
    }

    resetSelectedMessage(): void
    {
        this.selectedMessageSubject$.next(null);
    }
}
