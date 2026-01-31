# Custom Form Controls (Signal-Based)

## Pattern 1: Simple ControlValueAccessor with Signals

```typescript
import { Component, forwardRef, signal, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'au-rating-input',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RatingInputComponent),
        multi: true,
    }],
    template: `
        @for (star of stars(); track $index) {
            <button type="button" [class.filled]="$index < value()"
                    [disabled]="disabled()" (click)="setValue($index + 1)">★</button>
        }
    `,
})
export class RatingInputComponent implements ControlValueAccessor {
    value = signal(0);
    disabled = signal(false);
    stars = computed(() => Array(5).fill(0));
    private onChange: (value: number) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(value: number): void { this.value.set(value ?? 0); }
    registerOnChange(fn: (value: number) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }

    setValue(rating: number): void {
        if (this.disabled()) return;
        this.value.set(rating);
        this.onChange(rating);
        this.onTouched();
    }
}
```

## Pattern 2: MatFormFieldControl with Signals

```typescript
import { Component, forwardRef, signal, computed, effect, inject, ElementRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';

@Component({
    selector: 'au-phone-input',
    templateUrl: './phone-input.component.html',
    providers: [{ provide: MatFormFieldControl, useExisting: forwardRef(() => PhoneInputComponent) }],
    host: { '[id]': 'id', '[attr.aria-describedby]': 'describedBy()' },
})
export class PhoneInputComponent implements MatFormFieldControl<string>, ControlValueAccessor, OnDestroy {
    static nextId = 0;
    private readonly fm = inject(FocusMonitor);
    private readonly elRef = inject(ElementRef<HTMLElement>);
    readonly ngControl = inject(NgControl, { optional: true, self: true });

    readonly id = `phone-input-${PhoneInputComponent.nextId++}`;
    readonly stateChanges = new Subject<void>();
    readonly controlType = 'phone-input';

    value = signal<string>('');
    placeholder = signal<string>('');
    required = signal(false);
    disabled = signal(false);
    focused = signal(false);
    describedBy = signal('');

    empty = computed(() => !this.value());
    shouldLabelFloat = computed(() => this.focused() || !this.empty());
    errorState = computed(() => {
        const control = this.ngControl?.control;
        return !!(control?.invalid && control?.touched);
    });

    private onChange: (val: string) => void = () => {};
    private onTouched: () => void = () => {};

    constructor() {
        if (this.ngControl) this.ngControl.valueAccessor = this;
        this.fm.monitor(this.elRef.nativeElement, true).subscribe(origin => {
            this.focused.set(!!origin);
            this.stateChanges.next();
        });
        effect(() => {
            this.value(); this.placeholder(); this.required();
            this.disabled(); this.focused();
            this.stateChanges.next();
        });
    }

    setDescribedByIds(ids: string[]): void { this.describedBy.set(ids.join(' ')); }
    onContainerClick(): void { /* Focus input */ }
    writeValue(value: string): void { this.value.set(value ?? ''); }
    registerOnChange(fn: (val: string) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }

    updateValue(newValue: string): void {
        this.value.set(newValue);
        this.onChange(newValue);
        this.onTouched();
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }
}
```
