import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GridActionsMenuMessages, GridMessages, GridOperatorsMessages, GridPaginatorMessages } from '../grid.types';

@Injectable()
export class GridTranslationsService
{
    // custom messages
    columnMessages: { [key: string]: BehaviorSubject<string>; } = {};
    actionsMenuMessages: BehaviorSubject<{ [key: string]: string; }> = new BehaviorSubject<{ [key: string]: string; }>({});
    messages: GridMessages = {
        actions          : new BehaviorSubject<string>('Actions'),
        AND              : new BehaviorSubject<string>('AND'),
        clearFilters     : new BehaviorSubject<string>('Clear filters'),
        clickAndDragInfo : new BehaviorSubject<string>('Click on a column and drag it to change its position'),
        columns          : new BehaviorSubject<string>('Columns'),
        field            : new BehaviorSubject<string>('Field'),
        filter           : new BehaviorSubject<string>('Filter'),
        operator         : new BehaviorSubject<string>('Operator'),
        OR               : new BehaviorSubject<string>('OR'),
        pleaseSelectField: new BehaviorSubject<string>('Please select a field'),
        translations     : new BehaviorSubject<string>('Translations'),
        value            : new BehaviorSubject<string>('Value'),
    };
    defaultOperatorsMessages: GridOperatorsMessages = {
        contains        : 'Contains',
        endsWith        : 'Ends with',
        equals          : 'Equal to',
        greaterThan     : 'Greater than',
        greaterThanEqual: 'Greater than equal',
        lessThan        : 'Less than',
        lessThanEqual   : 'Less than equal',
        notEquals       : 'Not equal to',
        startsWith      : 'Starts with',
    };
    operatorsMessages: BehaviorSubject<GridOperatorsMessages> = new BehaviorSubject<GridOperatorsMessages>(this.defaultOperatorsMessages);
    defaultPaginatorMessages: GridPaginatorMessages = {
        firstPageLabel   : 'First page',
        itemsPerPageLabel: 'Items per page',
        lastPageLabel    : 'Last page',
        nextPageLabel    : 'Next page',
        ofLabel          : 'of',
        previousPageLabel: 'Previous page',
    };
    paginatorMessages: BehaviorSubject<GridPaginatorMessages> = new BehaviorSubject<GridPaginatorMessages>(this.defaultPaginatorMessages);

    setColumnMessage(key: string, message: string): void
    {
        if (this.columnMessages[key] instanceof BehaviorSubject)
        {
            this.columnMessages[key].next(message);
        }
        else
        {
            this.columnMessages[key] = new BehaviorSubject<string>(message);
        }
    }

    getColumnMessage(key: string): Observable<string>
    {
        // always must be create instance of before return
        if (this.columnMessages[key] instanceof BehaviorSubject)
        {
            return this.columnMessages[key];
        }
        else
        {
            // set kek like default value
            this.columnMessages[key] = new BehaviorSubject<string>(key);
            return this.columnMessages[key];
        }
    }

    getInstantColumnMessages(): { [key: string]: string; }
    {
        const instantMessages = {};
        for (const [key, value] of Object.entries(this.columnMessages))
        {
            instantMessages[key] = value.getValue();
        }
        return instantMessages;
    }

    setMessage(key: keyof GridMessages, message: string): void
    {
        this.messages[key].next(message);
    }

    getMessage(key: keyof GridMessages): Observable<string>
    {
        return this.messages[key]?.asObservable();
    }

    setPaginatorMessages(paginatorMessages: GridPaginatorMessages): void
    {
        this.paginatorMessages.next({ ...this.defaultPaginatorMessages, ...paginatorMessages });
    }

    getPaginatorMessages(): Observable<GridPaginatorMessages>
    {
        return this.paginatorMessages?.asObservable();
    }

    setOperatorsMessages(operatorMessages: GridOperatorsMessages): void
    {
        this.operatorsMessages.next({ ...this.defaultOperatorsMessages, ...operatorMessages });
    }

    getOperatorsMessages(): Observable<GridOperatorsMessages>
    {
        return this.operatorsMessages?.asObservable();
    }

    setActionsMenuMessages(actionsMenuMessage: GridActionsMenuMessages): void
    {
        this.actionsMenuMessages.next(actionsMenuMessage);
    }

    getActionsMenuMessages(): Observable<GridActionsMenuMessages>
    {
        return this.actionsMenuMessages?.asObservable();
    }
}
