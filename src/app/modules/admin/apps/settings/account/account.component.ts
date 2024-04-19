import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Account, CoreGetLangsService, CoreLang, IamService, ViewDetailComponent } from '@aurora';
import { TranslocoModule } from '@ngneat/transloco';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        AsyncPipe, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule,
        MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule,
        MatButtonModule, TranslocoModule,
    ],
})
export class SettingsAccountComponent extends ViewDetailComponent
{
    iamService = inject(IamService);
    coreGetLangsService = inject(CoreGetLangsService);
    account: Account;
    langs$: Observable<CoreLang[]>;

    get user(): FormGroup
    {
        return this.fg.get('user') as FormGroup;
    }

    createForm(): void
    {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            code: ['', [Validators.maxLength(64)]],
            email: ['', [Validators.maxLength(128), Validators.email]],
            username: ['', [Validators.required, Validators.maxLength(128)]],
            user    : this.fb.group({
                name: ['', [Validators.required, Validators.maxLength(255)]],
                surname: ['', [Validators.required, Validators.maxLength(255)]],
                langId: null,
            }),
        });
        /* eslint-enable key-spacing */
    }

    init(): void
    {
        this.langs$ = this.coreGetLangsService.langs$;

        this.iamService
            .account$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((account: Account) =>
            {
                this.account = account;
                this.fg.patchValue(account);
            });
    }
}
