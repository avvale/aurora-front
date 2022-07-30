import { FetchResult } from '@apollo/client/core';
import { UserDataStorage } from '@aurora/aurora.types';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class UserDataStorageService<T = UserDataStorage>
{
    dataSubject$: BehaviorSubject<T | null> = new BehaviorSubject(null);

    get data$(): Observable<T>
    {
        return this.dataSubject$.asObservable();
    }

    abstract getUserData(keyUserData: string): Observable<T>;

    abstract updateUserData<T>(keyUserData: string, keyUserDataValue: any): Observable<FetchResult<T>>;

    abstract saveUserData<T>(data: UserDataStorage): Observable<FetchResult<T>>;

    abstract clearUserData<T>(): Observable<FetchResult<T>>;
}