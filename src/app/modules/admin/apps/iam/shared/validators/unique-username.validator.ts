import { Injectable } from '@angular/core';
import { AsyncValidator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UniqueRoleValidator implements AsyncValidator
{
    constructor(private actorsService: ActorsService) { }
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.actorsService.isRoleTaken(control.value).pipe(
            map((isTaken) => (isTaken ? { uniqueRole: true } : null)),
            catchError(() => of(null)),
        );
    }
}