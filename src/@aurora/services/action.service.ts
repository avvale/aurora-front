import { Injectable } from '@angular/core';
import { Action } from '@aurora';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ActionService
{
    private _action: BehaviorSubject<Action> = new BehaviorSubject(null);
    private cache = {};

    constructor() { /**/ }

    get action$(): Observable<Action>
    {
        return this._action.asObservable();
    }

    getCache(key: string): any
    {
        return this.cache[key] ? this.cache[key] : {};
    }

    setCache(key: string, data: any): void
    {
        this.cache[key] = { ...this.getCache(key), ...data };
    }

    action(action: Action): Action
    {
        this.setCache(action.id, action.data);
        this._action.next({ ...action, data: this.getCache(action.id) });

        return action;
    }
}
