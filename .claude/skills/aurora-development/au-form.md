# au-form — Form Layout & Validation

## Form Layout

Use `layout__container` with `col-*` classes for responsive form grids.

```html
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
```

### ⚠️ Layout rules

- Use `col-*` classes (col-4, col-6, col-12, etc.) — **NEVER** raw
  `grid-cols-*`
- Wrap fields in `layout__container`
- Use `appearance="outline"` on mat-form-field

## Standard Validators

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

## RxWeb Validators

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

## Async Validators

```typescript
// Set async validator for unique check
this.fg.get('email').setAsyncValidators(
    uniqueEmailValidator(this.accountService, [existingEmail]),
);
this.fg.get('email').updateValueAndValidity();
```
