# Detail Component Pattern

## Complete Example

```typescript
import {
    ChangeDetectionStrategy, Component, signal, ViewEncapsulation, WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, defaultDetailImports, log, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';
import { CountryService } from '../country.service';
import { CommonCountry } from '../country.types';

@Component({
    selector: 'common-country-detail',
    templateUrl: './country-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultDetailImports],
})
export class CountryDetailComponent extends ViewDetailComponent {
    managedObject: WritableSignal<CommonCountry> = signal(null);

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'common.Countries', routerLink: ['/common', 'country'] },
        { translation: 'common.Country' },
    ];

    private readonly countryService = inject(CountryService);

    createForm(): void {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            iso3166Alpha2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            iso3166Alpha3: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
            iso3166Numeric: ['', [Validators.required, Validators.maxLength(3)]],
            name: ['', [Validators.required, Validators.maxLength(127)]],
            isActive: [false],
        });
    }

    async handleAction(action: Action): Promise<void> {
        switch (action?.id) {
            case 'common::country.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'common::country.detail.edit':
                this.countryService.country$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((country) => {
                        this.managedObject.set(country);
                        this.fg.patchValue(country);
                    });
                break;

            case 'common::country.detail.create':
                try {
                    await lastValueFrom(
                        this.countryService.create<CommonCountry>({ object: this.fg.value }),
                    );
                    this.snackBar.open(
                        `${this.translocoService.translate('common.Country')} ${this.translocoService.translate('Created.M')}`,
                        undefined, { verticalPosition: 'top', duration: 3000 },
                    );
                    this.router.navigate(['common', 'country']);
                } catch (error) { log(`[DEBUG] Error: ${error}`); }
                break;

            case 'common::country.detail.update':
                try {
                    await lastValueFrom(
                        this.countryService.updateById<CommonCountry>({ object: this.fg.value }),
                    );
                    this.snackBar.open(
                        `${this.translocoService.translate('common.Country')} ${this.translocoService.translate('Saved.M')}`,
                        undefined, { verticalPosition: 'top', duration: 3000 },
                    );
                    this.router.navigate(['common', 'country']);
                } catch (error) { log(`[DEBUG] Error: ${error}`); }
                break;
        }
    }
}
```

## Template Pattern

```html
<div class="absolute inset-0 flex w-full flex-col overflow-hidden">
    <!-- Header -->
    <div class="bg-card flex flex-0 flex-col border-b p-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-4 dark:bg-transparent">
        <div class="min-w-0 flex-1">
            <au-breadcrumb [data]="breadcrumb"></au-breadcrumb>
            <au-title>
                <mat-icon class="mr-2 icon-size-8">flag</mat-icon>
                {{ 'common.Country' | transloco }}
            </au-title>
        </div>
        <div class="mt-6 flex flex-shrink-0 items-center sm:ml-4 sm:mt-0">
            <button type="submit" class="ml-3" [color]="'primary'"
                    mat-flat-button form="detailForm">
                @if (currentViewAction?.id === 'common::country.detail.new') {
                    {{ 'Create' | transloco }}
                }
                @if (currentViewAction?.id === 'common::country.detail.edit') {
                    {{ 'Save' | transloco }}
                }
            </button>
        </div>
    </div>

    <!-- Form -->
    <div class="flex-auto overflow-y-auto px-6 pt-6 sm:px-10 sm:pt-10">
        <form id="detailForm" class="form-card" [formGroup]="fg" (ngSubmit)="onSubmit($event)">
            <div class="layout__container">
                <mat-form-field appearance="outline" class="col-6">
                    <mat-label>{{ 'common.Iso3166Alpha2' | transloco }}</mat-label>
                    <input matInput formControlName="iso3166Alpha2" />
                    <mat-error>{{ formErrors?.iso3166Alpha2 | async }}</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="col-6">
                    <mat-label>{{ 'common.Name' | transloco }}</mat-label>
                    <input matInput formControlName="name" />
                    <mat-error>{{ formErrors?.name | async }}</mat-error>
                </mat-form-field>

                <mat-slide-toggle class="col-6" formControlName="isActive">
                    {{ 'IsActive' | transloco }}
                </mat-slide-toggle>
            </div>
        </form>
    </div>
</div>
```

## Form Validation Patterns

### Standard Validators

```typescript
createForm(): void {
    this.fg = this.fb.group({
        id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
        name: ['', [Validators.required, Validators.maxLength(255)]],
        age: ['', [Validators.min(0), Validators.max(120)]],
        isActive: [true],
    });
}
```

### RxWeb Validators

```typescript
import { RxwebValidators } from '@rxweb/reactive-form-validators';

createForm(): void {
    this.fg = this.fb.group({
        password: ['', [Validators.required, RxwebValidators.password({
            validation: { digit: true, specialCharacter: true, lowerCase: true, upperCase: true },
        })]],
        repeatPassword: ['', [Validators.required, RxwebValidators.compare({ fieldName: 'password' })]],
    });
}
```
