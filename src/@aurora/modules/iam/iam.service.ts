import { Injectable } from '@angular/core';
import { first, map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { GraphQLService, UserDataStorageService } from '@aurora';
import { iamMeAccount } from './iam.graphql';
import { Account } from './iam.types';

@Injectable({
    providedIn: 'root',
})
export class IamService
{
    private _account: ReplaySubject<Account> = new ReplaySubject<Account>(1);
    private currentAccount: Account;

    /**
     * Constructor
     */
    constructor(
        private graphqlService: GraphQLService,
        private userDataStorageService: UserDataStorageService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for account
     *
     * @param value
     */
    set account(value: Account)
    {
        // Store the value
        this._account.next(value);
        this.currentAccount = value;
    }

    get account$(): Observable<Account>
    {
        return this._account.asObservable();
    }

    get me(): Account
    {
        return this.currentAccount;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in account data
     */
    get(): Observable<{ me: Account; }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{ account: Account; }>({
                query: iamMeAccount,
            })
            .valueChanges
            .pipe(
                first(),
                map<{ data: { iamMeAccount: Account; };}, { me: Account; }>(result => ({ me: result.data.iamMeAccount })),
                tap(data => this.account = data.me),
                tap(data => this.userDataStorageService.dataSubject$.next(data.me.user.data)),
            );
    }

    /**
     * Update the user
     *
     * @param account
     */
    update(account: Account): Observable<any>
    {
        /* return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map(response =>
            {
                this._user.next(response);
            }),
        ); */
        return of(false);
    }
}
