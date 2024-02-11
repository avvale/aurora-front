import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, switchMap, take, tap, of } from 'rxjs';
import { InboxService } from '../inbox';
import { GridData } from '@aurora';
import { MessageInbox } from '../message.types';

@Injectable({
    providedIn: 'root',
})
export class MessagesService
{
    private _messages: ReplaySubject<MessageInbox[]> = new ReplaySubject<MessageInbox[]>(1);
    private inboxService = inject(InboxService);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for messages
     */
    get messages$(): Observable<MessageInbox[]>
    {
        return this._messages.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all messages
     */
    getAll(): Observable<GridData<MessageInbox>>
    {
        return this.inboxService
            .checkMessagesInbox({
                query: {
                    limit : 10,
                    offset: 0,
                    order : [['sort', 'desc']],
                },
            })
            .pipe(
                tap(data =>
                {
                    this._messages.next(data.rows);
                }),
            );

        /* return this.inboxService.pagination$
            .pipe(
                tap(pagination =>
                {
                    console.log('pagination', pagination);
                    //this._messages.next(messages);
                }),
            );


        return this._httpClient.get<Message[]>('api/common/messages').pipe(
            tap((messages) =>
            {
                this._messages.next(messages);
            }),
        ); */
    }

    /**
     * Create a message
     *
     * @param message
     */
    /// create(message: Message): Observable<Message>
    create(message: MessageInbox): Observable<boolean>
    {
        return of(true);
        /* return this.messages$.pipe(
            take(1),
            switchMap(messages => this._httpClient.post<Message>('api/common/messages', {message}).pipe(
                map((newMessage) =>
                {
                    // Update the messages with the new message
                    this._messages.next([...messages, newMessage]);

                    // Return the new message from observable
                    return newMessage;
                }),
            )),
        ); */
    }

    /**
     * Update the message
     *
     * @param id
     * @param message
     */
    // update(id: string, message: Message): Observable<Message>
    update(id: string, message: MessageInbox): Observable<boolean>
    {
        return of(true);
        /*  return this.messages$.pipe(
            take(1),
            switchMap(messages => this._httpClient.patch<Message>('api/common/messages', {
                id,
                message,
            }).pipe(
                map((updatedMessage: Message) =>
                {
                    // Find the index of the updated message
                    const index = messages.findIndex(item => item.id === id);

                    // Update the message
                    messages[index] = updatedMessage;

                    // Update the messages
                    this._messages.next(messages);

                    // Return the updated message
                    return updatedMessage;
                }),
            )),
        ); */
    }

    /**
     * Delete the message
     *
     * @param id
     */
    delete(id: string): Observable<boolean>
    {
        return of(true);
        /* return this.messages$.pipe(
            take(1),
            switchMap(messages => this._httpClient.delete<boolean>('api/common/messages', {params: {id}}).pipe(
                map((isDeleted: boolean) =>
                {
                    // Find the index of the deleted message
                    const index = messages.findIndex(item => item.id === id);

                    // Delete the message
                    messages.splice(index, 1);

                    // Update the messages
                    this._messages.next(messages);

                    // Return the deleted status
                    return isDeleted;
                }),
            )),
        ); */
    }

    /**
     * Mark all messages as read
     */
    markAllAsRead(): Observable<boolean>
    {
        return of(true);
        /* return this.messages$.pipe(
            take(1),
            switchMap(messages => this._httpClient.get<boolean>('api/common/messages/mark-all-as-read').pipe(
                map((isUpdated: boolean) =>
                {
                    // Go through all messages and set them as read
                    messages.forEach((message, index) =>
                    {
                        messages[index].isRead = true;
                    });

                    // Update the messages
                    this._messages.next(messages);

                    // Return the updated status
                    return isUpdated;
                }),
            )),
        ); */
    }
}
