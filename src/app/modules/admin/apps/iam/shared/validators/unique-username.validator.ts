import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { AccountService } from '@apps/iam/account';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UniqueUsernameValidator implements AsyncValidator
{
    accountService = inject(AccountService);

    validate(control: AbstractControl): Observable<ValidationErrors | null>
    {
        return this.accountService
            .checkUniqueUsernameAccount({
                username: control.value,
            })
            .pipe(
                map(isTaken => (isTaken ? null : { uniqueUsername: true })),
                catchError(() => of(null)),
            );
    }
}