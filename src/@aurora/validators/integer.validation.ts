import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function integer(): ValidatorFn
{
    return (control: AbstractControl): ValidationErrors | null =>
    {
        // check if the value only contains numbers
        const regularExpression = new RegExp('^[0-9]*$');

        return regularExpression.test(control.value) ? null : {
            integer: {
                value: control.value,
            },
        };
    };
}
