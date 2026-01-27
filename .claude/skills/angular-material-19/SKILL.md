---
name: angular-material-19
description: >
    Angular Material 19 components, Material 3 theming, CDK with 2D drag-drop,
    timepicker, custom form controls, and dark mode. Trigger: When using
    Material components, creating custom controls, working with CDK, or theming.
license: MIT
metadata:
    author: aurora
    version: '2.0'
    material_version: '19.x'
    auto_invoke:
        'Material components, CDK, ControlValueAccessor, MatFormFieldControl,
        dialogs, tables, theming, timepicker'
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## When to Use

- Using Angular Material 19 components
- Creating custom form controls with signal-based patterns
- Implementing Material 3 theming with CSS variables
- Setting up dark/light mode switching
- Using CDK features (2D Drag & Drop, Overlay, A11y)
- Working with the new timepicker component
- Customizing component styles with override mixins

---

## Angular Material 19 Key Changes

### Material 3 (M3) is Stable

Material 3 is now the default design system. Key features:

- **Design tokens as CSS variables** - All styling via `--mat-*` variables
- **`light-dark()` function** - Native CSS for theme switching
- **Component override mixins** - Granular customization without specificity
  wars
- **New "Styling" tab** - Each component's docs now shows override API

### New Components in v19

- **Timepicker** (`mat-timepicker`) - Native time selection
- **2D Drag & Drop** - Mixed orientation support in CDK
- **Tab reordering** - Draggable tabs with CDK

---

## Timepicker (New in v19)

### Basic Usage

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
            <input
                [matTimepicker]="picker"
                matInput
                formControlName="time"
            />
            <mat-timepicker-toggle
                [for]="picker"
                matIconSuffix
            />
            <mat-timepicker #picker />
        </mat-form-field>
    `,
})
export class TimePickerComponent {}
```

### Interval-Based Options

```html
<!-- 30-minute intervals -->
<mat-timepicker
    #picker
    interval="30m"
/>

<!-- 15-minute intervals -->
<mat-timepicker
    #picker
    interval="15m"
/>

<!-- 1-hour intervals -->
<mat-timepicker
    #picker
    interval="1h"
/>

<!-- Custom seconds -->
<mat-timepicker
    #picker
    interval="900"
/>
<!-- 15 min in seconds -->
```

### Min/Max Validation

```html
<input
    [matTimepicker]="picker"
    [matTimepickerMin]="minTime"
    [matTimepickerMax]="maxTime"
    matInput
    formControlName="appointmentTime"
/>
<mat-timepicker #picker />
```

```typescript
// In component
minTime = new Date(); // Set hours/minutes as needed
maxTime = new Date();

constructor();
{
    this.minTime.setHours(9, 0, 0); // 9:00 AM
    this.maxTime.setHours(17, 0, 0); // 5:00 PM
}
```

### With Reactive Forms

```typescript
@Component({
    // ... imports
})
export class AppointmentComponent {
    form = new FormGroup({
        date: new FormControl<Date | null>(null),
        time: new FormControl<Date | null>(null),
    });

    ngOnInit(): void {
        // Set initial time
        const initialTime = new Date();
        initialTime.setHours(14, 30, 0);
        this.form.get('time').setValue(initialTime);
    }
}
```

### Validation Errors

```html
<mat-form-field appearance="outline">
    <mat-label>Time</mat-label>
    <input
        [matTimepicker]="picker"
        matInput
        formControlName="time"
    />
    <mat-timepicker-toggle
        [for]="picker"
        matIconSuffix
    />
    <mat-timepicker #picker />
    <mat-error *ngIf="form.get('time').hasError('matTimepickerParse')">
        Invalid time format
    </mat-error>
    <mat-error *ngIf="form.get('time').hasError('matTimepickerMin')">
        Time must be after {{ minTime | date:'shortTime' }}
    </mat-error>
    <mat-error *ngIf="form.get('time').hasError('matTimepickerMax')">
        Time must be before {{ maxTime | date:'shortTime' }}
    </mat-error>
</mat-form-field>
```

---

## Material 3 Theming

### Basic Theme Setup

```scss
// styles.scss
@use '@angular/material' as mat;

html {
    // Define theme with M3 palette
    @include mat.theme(
        (
            color: mat.$violet-palette,
            typography: Roboto,
            density: 0,
        )
    );
}
```

### Dark Mode with light-dark()

Angular Material 19 uses the CSS `light-dark()` function for automatic theme
switching:

```scss
@use '@angular/material' as mat;

html {
    // Enable automatic light/dark switching
    color-scheme: light dark;

    @include mat.theme(
        (
            color: mat.$azure-palette,
            typography: Roboto,
            density: 0,
        )
    );
}

// OR: Force specific mode
html.light-mode {
    color-scheme: light;
}

html.dark-mode {
    color-scheme: dark;
}
```

### Custom Color Overrides

```scss
@use '@angular/material' as mat;

html {
    color-scheme: light dark;

    @include mat.theme(
        (
            color: mat.$violet-palette,
            typography: Roboto,
            density: 0,
        ),
        $overrides: (
            // Surface colors
            surface: light-dark(#fefbff, #1c1b1f),
            on-surface: light-dark(#1c1b1f, #e6e1e5),
            surface-container: light-dark(#f3edf7, #211f26),
            // Primary colors
            primary: light-dark(#6750a4, #d0bcff),
            on-primary: light-dark(#ffffff, #381e72),
            // Error colors
            error: light-dark(#b3261e, #f2b8b5),
            on-error: light-dark(#ffffff, #601410)
        )
    );
}
```

### Component Override Mixins

Each component has an override mixin for granular customization:

```scss
@use '@angular/material' as mat;

// Button overrides
@include mat.button-overrides(
    (
        filled-container-color: #6200ea,
        filled-label-text-color: white,
        outlined-outline-color: #6200ea,
    )
);

// Form field overrides
@include mat.form-field-overrides(
    (
        filled-container-color: rgba(0, 0, 0, 0.04),
        outlined-outline-color: #79747e,
        focused-outline-color: #6200ea,
    )
);

// Card overrides
@include mat.card-overrides(
    (
        container-color: light-dark(#ffffff, #2d2d2d),
        container-elevation: 2,
    )
);

// Dialog overrides
@include mat.dialog-overrides(
    (
        container-color: light-dark(#fefbff, #1c1b1f),
        container-shape: 28px,
    )
);
```

### Theme Service with Signals

```typescript
import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly STORAGE_KEY = 'theme-mode';
    currentTheme = signal<ThemeMode>(this.getStoredTheme());

    constructor() {
        effect(() => {
            const theme = this.currentTheme();
            this.applyTheme(theme);
            localStorage.setItem(this.STORAGE_KEY, theme);
        });
    }

    setTheme(mode: ThemeMode): void {
        this.currentTheme.set(mode);
    }

    toggleTheme(): void {
        const current = this.currentTheme();
        const next = current === 'light' ? 'dark' : 'light';
        this.currentTheme.set(next);
    }

    private applyTheme(mode: ThemeMode): void {
        const html = document.documentElement;
        html.classList.remove('light-mode', 'dark-mode');

        if (mode === 'system') {
            html.style.colorScheme = 'light dark';
        } else {
            html.style.colorScheme = mode;
            html.classList.add(`${mode}-mode`);
        }
    }

    private getStoredTheme(): ThemeMode {
        return (
            (localStorage.getItem(this.STORAGE_KEY) as ThemeMode) ?? 'system'
        );
    }
}
```

### Theme Toggle Component

```typescript
@Component({
    selector: 'app-theme-toggle',
    imports: [MatButtonModule, MatIconModule, MatMenuModule],
    template: `
        <button
            [matMenuTriggerFor]="themeMenu"
            mat-icon-button
        >
            <mat-icon>{{ themeIcon() }}</mat-icon>
        </button>
        <mat-menu #themeMenu="matMenu">
            <button
                mat-menu-item
                (click)="setTheme('light')"
            >
                <mat-icon>light_mode</mat-icon>
                <span>Light</span>
            </button>
            <button
                mat-menu-item
                (click)="setTheme('dark')"
            >
                <mat-icon>dark_mode</mat-icon>
                <span>Dark</span>
            </button>
            <button
                mat-menu-item
                (click)="setTheme('system')"
            >
                <mat-icon>settings_brightness</mat-icon>
                <span>System</span>
            </button>
        </mat-menu>
    `,
})
export class ThemeToggleComponent {
    private readonly themeService = inject(ThemeService);

    themeIcon = computed(() => {
        const theme = this.themeService.currentTheme();
        return theme === 'light'
            ? 'light_mode'
            : theme === 'dark'
              ? 'dark_mode'
              : 'settings_brightness';
    });

    setTheme(mode: ThemeMode): void {
        this.themeService.setTheme(mode);
    }
}
```

---

## CDK 2D Drag & Drop (New in v19)

### Mixed Orientation (Grid Layout)

```typescript
import { Component } from '@angular/core';
import {
    CdkDragDrop,
    DragDropModule,
    moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-grid-drag',
    imports: [DragDropModule],
    template: `
        <div
            class="grid-container"
            cdkDropList
            cdkDropListOrientation="mixed"
            (cdkDropListDropped)="drop($event)"
        >
            @for (item of items; track item.id) {
                <div
                    class="grid-item"
                    cdkDrag
                >
                    {{ item.name }}
                </div>
            }
        </div>
    `,
    styles: `
        .grid-container {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            padding: 16px;
            max-width: 600px;
        }
        .grid-item {
            width: 120px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--mat-sys-surface-container);
            border-radius: 8px;
            cursor: move;
        }
        .cdk-drag-preview {
            box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2);
        }
        .cdk-drag-placeholder {
            opacity: 0.3;
        }
    `,
})
export class GridDragComponent {
    items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
        { id: 5, name: 'Item 5' },
        { id: 6, name: 'Item 6' },
    ];

    drop(event: CdkDragDrop<typeof this.items>): void {
        moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    }
}
```

### Tab Reordering

```typescript
import { Component } from '@angular/core';
import {
    CdkDragDrop,
    DragDropModule,
    moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-draggable-tabs',
    imports: [MatTabsModule, DragDropModule],
    template: `
        <mat-tab-group>
            <div
                class="tab-header-container"
                cdkDropList
                cdkDropListOrientation="horizontal"
                (cdkDropListDropped)="dropTab($event)"
            >
                @for (tab of tabs; track tab.id) {
                    <mat-tab cdkDrag>
                        <ng-template mat-tab-label>
                            <span cdkDragHandle>{{ tab.label }}</span>
                        </ng-template>
                        <p>{{ tab.content }}</p>
                    </mat-tab>
                }
            </div>
        </mat-tab-group>
    `,
})
export class DraggableTabsComponent {
    tabs = [
        { id: 1, label: 'Tab 1', content: 'Content 1' },
        { id: 2, label: 'Tab 2', content: 'Content 2' },
        { id: 3, label: 'Tab 3', content: 'Content 3' },
    ];

    dropTab(event: CdkDragDrop<typeof this.tabs>): void {
        moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    }
}
```

---

## Custom Form Controls (Signal-Based)

### Pattern 1: Simple ControlValueAccessor with Signals

```typescript
import { Component, forwardRef, signal, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'au-rating-input',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RatingInputComponent),
            multi: true,
        },
    ],
    template: `
        @for (star of stars(); track $index) {
            <button
                type="button"
                [class.filled]="$index < value()"
                [disabled]="disabled()"
                (click)="setValue($index + 1)"
            >
                ★
            </button>
        }
    `,
})
export class RatingInputComponent implements ControlValueAccessor {
    value = signal(0);
    disabled = signal(false);
    stars = computed(() => Array(5).fill(0));

    private onChange: (value: number) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(value: number): void {
        this.value.set(value ?? 0);
    }

    registerOnChange(fn: (value: number) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    setValue(rating: number): void {
        if (this.disabled()) return;
        this.value.set(rating);
        this.onChange(rating);
        this.onTouched();
    }
}
```

### Pattern 2: MatFormFieldControl with Signals

```typescript
import {
    Component,
    forwardRef,
    signal,
    computed,
    effect,
    inject,
    ElementRef,
    OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';

@Component({
    selector: 'au-phone-input',
    templateUrl: './phone-input.component.html',
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: forwardRef(() => PhoneInputComponent),
        },
    ],
    host: {
        '[id]': 'id',
        '[attr.aria-describedby]': 'describedBy()',
    },
})
export class PhoneInputComponent
    implements MatFormFieldControl<string>, ControlValueAccessor, OnDestroy
{
    static nextId = 0;

    // Injections
    private readonly fm = inject(FocusMonitor);
    private readonly elRef = inject(ElementRef<HTMLElement>);
    readonly ngControl = inject(NgControl, { optional: true, self: true });

    // MatFormFieldControl required
    readonly id = `phone-input-${PhoneInputComponent.nextId++}`;
    readonly stateChanges = new Subject<void>();
    readonly controlType = 'phone-input';

    // Signal-based state
    value = signal<string>('');
    placeholder = signal<string>('');
    required = signal(false);
    disabled = signal(false);
    focused = signal(false);
    describedBy = signal('');

    // Computed properties
    empty = computed(() => !this.value());
    shouldLabelFloat = computed(() => this.focused() || !this.empty());
    errorState = computed(() => {
        const control = this.ngControl?.control;
        return !!(control?.invalid && control?.touched);
    });

    private onChange: (val: string) => void = () => {};
    private onTouched: () => void = () => {};

    constructor() {
        // Set this as value accessor
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

        // Monitor focus
        this.fm.monitor(this.elRef.nativeElement, true).subscribe((origin) => {
            this.focused.set(!!origin);
            this.stateChanges.next();
        });

        // Emit state changes when signals change
        effect(() => {
            // Touch all signals to track them
            this.value();
            this.placeholder();
            this.required();
            this.disabled();
            this.focused();
            this.stateChanges.next();
        });
    }

    // MatFormFieldControl methods
    setDescribedByIds(ids: string[]): void {
        this.describedBy.set(ids.join(' '));
    }

    onContainerClick(): void {
        // Focus your input element
    }

    // ControlValueAccessor methods
    writeValue(value: string): void {
        this.value.set(value ?? '');
    }

    registerOnChange(fn: (val: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    // Internal methods
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

---

## Material Dialogs

### Signal-Based Dialog Data

```typescript
import { Component, inject, signal } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Dialog component
@Component({
    selector: 'confirm-dialog',
    imports: [MatDialogModule, MatButtonModule],
    template: `
        <h2 mat-dialog-title>{{ data.title }}</h2>
        <mat-dialog-content>
            <p>{{ data.message }}</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Cancel</button>
            <button mat-flat-button color="warn" [mat-dialog-close]="true">
                {{ data.confirmText ?? 'Confirm' }}
            </button>
        </mat-dialog-actions>
    `,
})
export class ConfirmDialogComponent
{
    readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
}

interface ConfirmDialogData
{
    title: string;
    message: string;
    confirmText?: string;
}

// Usage in parent component
@Component({...})
export class ParentComponent
{
    private readonly dialog = inject(MatDialog);
    isDeleting = signal(false);

    async confirmDelete(item: Item): Promise<void>
    {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: 'Delete Item',
                message: `Are you sure you want to delete "${item.name}"?`,
                confirmText: 'Delete',
            },
        });

        const confirmed = await firstValueFrom(dialogRef.afterClosed());

        if (confirmed)
        {
            this.isDeleting.set(true);
            await this.deleteItem(item);
            this.isDeleting.set(false);
        }
    }
}
```

---

## Material Table with Signals

```typescript
import { Component, signal, computed, viewChild, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import {
    MatPaginatorModule,
    MatPaginator,
    PageEvent,
} from '@angular/material/paginator';

@Component({
    selector: 'app-users-table',
    imports: [MatTableModule, MatSortModule, MatPaginatorModule],
    template: `
        <table
            [dataSource]="dataSource()"
            mat-table
            matSort
            (matSortChange)="onSortChange($event)"
        >
            <ng-container matColumnDef="name">
                <th
                    *matHeaderCellDef
                    mat-header-cell
                    mat-sort-header
                >
                    Name
                </th>
                <td
                    *matCellDef="let row"
                    mat-cell
                >
                    {{ row.name }}
                </td>
            </ng-container>

            <ng-container matColumnDef="email">
                <th
                    *matHeaderCellDef
                    mat-header-cell
                    mat-sort-header
                >
                    Email
                </th>
                <td
                    *matCellDef="let row"
                    mat-cell
                >
                    {{ row.email }}
                </td>
            </ng-container>

            <ng-container matColumnDef="actions">
                <th
                    *matHeaderCellDef
                    mat-header-cell
                >
                    Actions
                </th>
                <td
                    *matCellDef="let row"
                    mat-cell
                >
                    <button
                        mat-icon-button
                        (click)="edit(row)"
                    >
                        <mat-icon>edit</mat-icon>
                    </button>
                </td>
            </ng-container>

            <tr
                *matHeaderRowDef="displayedColumns"
                mat-header-row
            ></tr>
            <tr
                *matRowDef="let row; columns: displayedColumns"
                mat-row
            ></tr>
        </table>

        <mat-paginator
            [length]="totalItems()"
            [pageSize]="pageSize()"
            [pageSizeOptions]="[10, 25, 50]"
            (page)="onPageChange($event)"
        ></mat-paginator>
    `,
})
export class UsersTableComponent {
    // Signal-based state
    users = signal<User[]>([]);
    totalItems = signal(0);
    pageSize = signal(10);
    pageIndex = signal(0);
    sortField = signal<string>('name');
    sortDirection = signal<'asc' | 'desc'>('asc');

    // Signal queries
    sort = viewChild(MatSort);
    paginator = viewChild(MatPaginator);

    displayedColumns = ['name', 'email', 'actions'];

    // Computed data source
    dataSource = computed(() => this.users());

    onSortChange(sort: Sort): void {
        this.sortField.set(sort.active);
        this.sortDirection.set(sort.direction as 'asc' | 'desc');
        this.loadData();
    }

    onPageChange(event: PageEvent): void {
        this.pageIndex.set(event.pageIndex);
        this.pageSize.set(event.pageSize);
        this.loadData();
    }

    private loadData(): void {
        // Fetch data based on current state
    }
}
```

---

## CDK Patterns

### CDK Overlay (Signal-Based)

```typescript
import { Injectable, inject, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({ providedIn: 'root' })
export class PreviewOverlayService {
    private readonly overlay = inject(Overlay);
    private readonly injector = inject(Injector);

    open<T>(component: Type<T>, data: any): OverlayRef {
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-dark-backdrop',
            panelClass: 'preview-panel',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy,
        });

        const overlayRef = this.overlay.create(overlayConfig);

        const injector = Injector.create({
            providers: [
                { provide: PREVIEW_DATA, useValue: data },
                { provide: OverlayRef, useValue: overlayRef },
            ],
            parent: this.injector,
        });

        const portal = new ComponentPortal(component, null, injector);
        overlayRef.attach(portal);

        // Close on backdrop click
        overlayRef.backdropClick().subscribe(() => overlayRef.dispose());

        return overlayRef;
    }
}
```

### CDK SelectionModel with Signals

```typescript
import { Component, signal, computed } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({...})
export class SelectableListComponent
{
    items = signal<Item[]>([]);

    selection = new SelectionModel<Item>(
        true,                          // Multiple selection
        [],                            // Initial selection
        true,                          // Emit changes
        (a, b) => a.id === b.id        // Compare function
    );

    // Computed properties
    selectedCount = computed(() => this.selection.selected.length);
    allSelected = computed(() =>
        this.items().length > 0 &&
        this.selection.selected.length === this.items().length
    );

    toggleAll(): void
    {
        if (this.allSelected())
        {
            this.selection.clear();
        }
        else
        {
            this.selection.select(...this.items());
        }
    }

    toggle(item: Item): void
    {
        this.selection.toggle(item);
    }
}
```

---

## Common Imports (Angular Material 19)

```typescript
// Core
import { provideNativeDateAdapter } from '@angular/material/core';

// Buttons
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFabButton, MatMiniFabButton } from '@angular/material/button';

// Forms
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker'; // NEW in v19
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

// Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

// Data Display
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

// Feedback
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// CDK
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
```

---

## Anti-Patterns

| Avoid                                         | Do Instead                                    |
| --------------------------------------------- | --------------------------------------------- |
| `@ViewChild(MatSort)` decorator               | `viewChild(MatSort)` signal query             |
| Manual `stateChanges.next()` calls everywhere | Use `effect()` to auto-emit on signal changes |
| Importing entire Material module              | Import only needed component modules          |
| Using `any` for dialog data                   | Create typed interfaces                       |
| Hardcoded colors in components                | Use `--mat-sys-*` CSS variables               |
| `@media (prefers-color-scheme)` manually      | Use `light-dark()` function in theme          |
| Custom dark mode class logic                  | Set `color-scheme: light dark` on html        |
| Using third-party timepicker                  | Use native `mat-timepicker` (v19+)            |

---

## Migration Checklist

- [ ] Update to Material 19 package
- [ ] Replace third-party timepicker with `mat-timepicker`
- [ ] Convert `@ViewChild` queries to signal queries
- [ ] Update theming to use M3 `mat.theme()` mixin
- [ ] Implement dark mode with `light-dark()` function
- [ ] Replace custom drag-drop with `cdkDropListOrientation="mixed"`
- [ ] Use component override mixins instead of deep CSS selectors
- [ ] Convert custom controls to use signals internally

---

## Related Skills

| Skill        | When to Use Together                       |
| ------------ | ------------------------------------------ |
| `angular-19` | Angular 19 patterns, signals, resource API |
| `tailwind`   | Combined Tailwind + Material styling       |
| `typescript` | TypeScript patterns for typed components   |

---

## Resources

- [Angular Material Docs](https://material.angular.dev/)
- [Material 3 Theming Guide](https://material.angular.dev/guide/theming)
- [Timepicker Component](https://material.angular.dev/components/timepicker)
- [CDK Drag & Drop](https://material.angular.dev/cdk/drag-drop)
- [Custom Styling in Angular Material 19](https://blog.angulartraining.com/custom-styling-in-angular-material-19-9d15846af0b0)
