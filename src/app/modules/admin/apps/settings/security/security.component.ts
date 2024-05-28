import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SnackBarInvalidFormComponent, ViewDetailComponent, log } from '@aurora';
import { TranslocoModule } from '@ngneat/transloco';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector       : 'settings-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        AsyncPipe, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule,
        MatInputModule, MatSlideToggleModule, MatButtonModule, TranslocoModule,
    ],
})
export class SettingsSecurityComponent extends ViewDetailComponent
{
    onSubmit($event): void
    {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if ($event.submitter.getAttribute('form') !== $event.submitter.form.getAttribute('id'))
        {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

        // force validate repeat password, usually only validated if the value of the input changes.
        // in this case depends on the change of the password field
        this.fg.get('user.repeatPassword')?.updateValueAndValidity();

        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();

            this.snackBar.openFromComponent(
                SnackBarInvalidFormComponent,
                {
                    data: {
                        message   : `${this.translocoService.translate('InvalidForm')}`,
                        textButton: `${this.translocoService.translate('InvalidFormOk')}`,
                    },
                    panelClass      : 'error-snackbar',
                    verticalPosition: 'top',
                    duration        : 10000,
                },
            );
            return;
        }

        /* // remove fields to update or create account
        this.user.removeControl('repeatPassword');

        this.actionService.action({
            id: mapActions(
                this.currentViewAction.id,
                {
                    'iam::account.detail.new' : 'iam::account.detail.create',
                    'iam::account.detail.edit': 'iam::account.detail.update',
                },
            ),
            isViewAction: false,
        }); */
    }

    createForm(): void
    {
        // Create the form
        this.fg = this.fb.group({
            currentPassword: ['', [Validators.required]],
            newPassword    : ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30),
                RxwebValidators.password({
                    validation: { digit: true, specialCharacter: true, lowerCase: true, upperCase: true },
                    message   : { digit: 'PasswordDigit', specialCharacter: 'PasswordSpecialCharacter', lowerCase: 'PasswordLowerCase', upperCase: 'PasswordUpperCase' },
                }),
            ]],
            twoStep          : [true],
            askPasswordChange: [false],
        });
    }
}
