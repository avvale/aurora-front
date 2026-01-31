# Timepicker (New in v19)

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
    selector: 'app-time-picker',
    providers: [provideNativeDateAdapter()],
    imports: [MatTimepickerModule, MatFormFieldModule, MatInputModule],
    template: `
        <mat-form-field appearance="outline">
            <mat-label>Select time</mat-label>
            <input [matTimepicker]="picker" matInput formControlName="time" />
            <mat-timepicker-toggle [for]="picker" matIconSuffix />
            <mat-timepicker #picker />
        </mat-form-field>
    `,
})
export class TimePickerComponent {}
```

## Interval-Based Options

```html
<mat-timepicker #picker interval="30m" />  <!-- 30-minute intervals -->
<mat-timepicker #picker interval="15m" />  <!-- 15-minute intervals -->
<mat-timepicker #picker interval="1h" />   <!-- 1-hour intervals -->
<mat-timepicker #picker interval="900" />  <!-- 15 min in seconds -->
```

## Min/Max Validation

```html
<input [matTimepicker]="picker"
       [matTimepickerMin]="minTime"
       [matTimepickerMax]="maxTime"
       matInput formControlName="appointmentTime" />
<mat-timepicker #picker />
```

```typescript
minTime = new Date();
maxTime = new Date();
constructor() {
    this.minTime.setHours(9, 0, 0);  // 9:00 AM
    this.maxTime.setHours(17, 0, 0); // 5:00 PM
}
```

## With Reactive Forms

```typescript
form = new FormGroup({
    date: new FormControl<Date | null>(null),
    time: new FormControl<Date | null>(null),
});

ngOnInit(): void {
    const initialTime = new Date();
    initialTime.setHours(14, 30, 0);
    this.form.get('time').setValue(initialTime);
}
```

## Validation Errors

```html
<mat-error *ngIf="form.get('time').hasError('matTimepickerParse')">Invalid time format</mat-error>
<mat-error *ngIf="form.get('time').hasError('matTimepickerMin')">Time must be after {{ minTime | date:'shortTime' }}</mat-error>
<mat-error *ngIf="form.get('time').hasError('matTimepickerMax')">Time must be before {{ maxTime | date:'shortTime' }}</mat-error>
```
