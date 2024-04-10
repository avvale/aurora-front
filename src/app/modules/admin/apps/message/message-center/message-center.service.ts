
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MessageInbox } from '../message.types';

@Injectable({
    providedIn: 'root',
})
export class MessageCenterService
{
    selectedMessageSubject$: BehaviorSubject<MessageInbox> = new BehaviorSubject(null);
    toggleMessageAsReadSubject$: Subject<MessageInbox> = new Subject();
    currentTimeoutId: ReturnType<typeof setTimeout>;

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
