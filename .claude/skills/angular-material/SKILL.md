---
name: angular-material
description: >
  Angular Material components, CDK, custom form controls, theming, and advanced patterns.
  Trigger: When using Material components, creating custom form controls, working with CDK, or theming.
license: MIT
metadata:
  author: aurora
  version: "1.0"
  auto_invoke: "Material components, CDK, ControlValueAccessor, MatFormFieldControl, dialogs, tables, theming"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## When to Use

- Using Angular Material components (buttons, inputs, dialogs, tables, etc.)
- Creating custom form controls with `ControlValueAccessor`
- Implementing `MatFormFieldControl` for mat-form-field integration
- Using CDK features (Overlay, Drag & Drop, A11y, Portal, etc.)
- Customizing Material theming
- Working with Aurora grid component

---

## Custom Form Controls

### Pattern 1: Simple ControlValueAccessor

For standalone components that don't need mat-form-field integration.

```typescript
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'au-image-input',
    template: `<img [src]="taggedSrc" [class]="imgClass">`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageInputComponent),
            multi: true,
        },
    ],
})
export class ImageInputComponent implements ControlValueAccessor
{
    private _value: string;
    private propagateChange: (value: any) => void = () => {};
    private onTouched: () => void = () => {};

    // Called when form writes value to component
    writeValue(value: string): void
    {
        if (value !== undefined)
        {
            this._value = value;
        }
    }

    // Register callback for value changes
    registerOnChange(fn: (value: any) => void): void
    {
        this.propagateChange = fn;
    }

    // Register callback for touched state
    registerOnTouched(fn: () => void): void
    {
        this.onTouched = fn;
    }

    // Optional: Handle disabled state
    setDisabledState?(isDisabled: boolean): void
    {
        // Handle disabled state
    }

    // Call when value changes internally
    private updateValue(newValue: string): void
    {
        this._value = newValue;
        this.propagateChange(newValue);
        this.onTouched();
    }
}
```

### Pattern 2: MatFormFieldControl (Full Integration)

For components that work inside `<mat-form-field>`.

```typescript
import { Component, forwardRef, ViewChild, ElementRef, OnDestroy, HostBinding, Optional, Self, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'au-version-input',
    templateUrl: './version-input.component.html',
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: forwardRef(() => VersionInputComponent),
        },
    ],
})
export class VersionInputComponent implements MatFormFieldControl<string>, ControlValueAccessor, OnDestroy
{
    static nextId = 0;

    // MatFormFieldControl required properties
    @HostBinding() id = `version-input-${VersionInputComponent.nextId++}`;
    @HostBinding('attr.aria-describedby') describedBy = '';
    @HostBinding('class.floating') shouldLabelFloat = true;

    stateChanges = new Subject<void>();
    focused = false;
    touched = false;
    controlType = 'version-input';  // Used for styling
    errorState = false;

    private _value: string = '';
    private _placeholder: string = '';
    private _required = false;
    private _disabled = false;

    constructor(
        private fm: FocusMonitor,
        private elRef: ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl: NgControl,
    )
    {
        // Set this component as the value accessor
        if (this.ngControl != null)
        {
            this.ngControl.valueAccessor = this;
        }

        // Monitor focus state
        this.fm.monitor(elRef.nativeElement, true).subscribe(origin =>
        {
            this.focused = !!origin;
            this.stateChanges.next();
        });
    }

    // Required: Is the control empty?
    get empty(): boolean
    {
        return !this._value;
    }

    // Value getter/setter
    get value(): string { return this._value; }
    set value(val: string)
    {
        this._value = val;
        this.stateChanges.next();
    }

    // Placeholder getter/setter
    get placeholder(): string { return this._placeholder; }
    @Input()
    set placeholder(plh: string)
    {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    // Required getter/setter
    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean)
    {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    // Disabled getter/setter
    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean)
    {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    // Required: Set aria-describedby
    setDescribedByIds(ids: string[]): void
    {
        this.describedBy = ids.join(' ');
    }

    // Required: Handle click on mat-form-field container
    onContainerClick(): void
    {
        // Focus your input element
    }

    // ControlValueAccessor implementation
    writeValue(value: string): void { this.value = value; }
    registerOnChange(fn: (val: string) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

    onChange: (val: string) => void = () => {};
    onTouched: () => void = () => {};

    ngOnDestroy(): void
    {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }
}
```

### Usage in Template

```html
<!-- Simple ControlValueAccessor -->
<au-image-input formControlName="avatar" imgClass="w-24 h-24 rounded-full">
</au-image-input>

<!-- MatFormFieldControl -->
<mat-form-field appearance="outline" class="col-3">
    <mat-label>{{ t('tools.Version') }}</mat-label>
    <au-version-input formControlName="version"/>
    <mat-error>{{ formErrors?.version | async }}</mat-error>
</mat-form-field>
```

---

## Directive with ControlValueAccessor

For input behavior modifications (like decimal formatting).

```typescript
import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
    selector: '[auDecimal]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DecimalDirective),
            multi: true,
        },
    ],
})
export class DecimalDirective implements ControlValueAccessor
{
    @Input() integerNumberAmount: number = null;
    @Input() decimalNumberAmount: number = null;
    @Input() decimalSeparator = '.';
    @Input() allowNegatives = false;

    private propagateChange: (value: any) => void = () => {};
    private onTouched: () => void = () => {};

    constructor(public el: ElementRef) {}

    writeValue(value: any): void
    {
        this.el.nativeElement.value = value;
    }

    registerOnChange(fn: (value: any) => void): void
    {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.onTouched = fn;
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent): void
    {
        // Validate input and prevent invalid characters
        // Call this.propagateChange(newValue) when value changes
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent): void
    {
        // Handle paste validation
    }
}
```

---

## CDK Patterns

### CDK Overlay (Custom Dialogs/Popups)

```typescript
import { Injectable, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({ providedIn: 'root' })
export class ImagePreviewOverlayService
{
    constructor(
        private readonly overlay: Overlay,
        private readonly injector: Injector,
    ) {}

    open(config: DialogConfig): OverlayRef
    {
        // Create position strategy
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        // Create overlay config
        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'dark-backdrop',
            panelClass: 'preview-panel',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy,
        });

        // Create overlay
        const overlayRef = this.overlay.create(overlayConfig);

        // Create injector with custom data
        const injector = Injector.create({
            providers: [
                { provide: DIALOG_DATA, useValue: config.data },
                { provide: OverlayRef, useValue: overlayRef },
            ],
            parent: this.injector,
        });

        // Attach component
        const portal = new ComponentPortal(PreviewComponent, null, injector);
        const componentRef: ComponentRef<PreviewComponent> = overlayRef.attach(portal);

        // Handle backdrop click
        overlayRef.backdropClick().subscribe(() => overlayRef.dispose());

        return overlayRef;
    }
}
```

### CDK Drag & Drop

```typescript
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    imports: [DragDropModule],
    template: `
        <div cdkDropList (cdkDropListDropped)="drop($event)">
            <div *ngFor="let item of items" cdkDrag>
                {{ item.name }}
            </div>
        </div>
    `,
})
export class DragDropComponent
{
    items = [...];

    drop(event: CdkDragDrop<string[]>): void
    {
        moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    }
}
```

### CDK Focus Monitor

```typescript
import { FocusMonitor } from '@angular/cdk/a11y';

constructor(
    private fm: FocusMonitor,
    private elRef: ElementRef,
)
{
    this.fm.monitor(elRef.nativeElement, true).subscribe(origin =>
    {
        // origin: 'mouse' | 'keyboard' | 'touch' | 'program' | null
        this.focused = !!origin;
    });
}

ngOnDestroy(): void
{
    this.fm.stopMonitoring(this.elRef.nativeElement);
}
```

### CDK Coercion

```typescript
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';

@Input()
get disabled(): boolean { return this._disabled; }
set disabled(value: BooleanInput)
{
    this._disabled = coerceBooleanProperty(value);
}
private _disabled = false;
```

### CDK Collections (SelectionModel)

```typescript
import { SelectionModel } from '@angular/cdk/collections';

// Create selection model
// (allowMultiSelect, initialSelection, emitChanges, compareWith)
selectedModel = new SelectionModel<Item>(
    true,           // Multiple selection
    [],             // Initial selection
    true,           // Emit changes
    (a, b) => a.id === b.id  // Compare function
);

// Toggle selection
selectedModel.toggle(item);

// Check if selected
selectedModel.isSelected(item);

// Get selected items
selectedModel.selected;

// Listen to changes
selectedModel.changed.subscribe((change: SelectionChange<Item>) => {
    console.log('Added:', change.added);
    console.log('Removed:', change.removed);
});
```

---

## Material Dialogs

### Opening a Dialog

```typescript
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({...})
export class ParentComponent
{
    constructor(private dialog: MatDialog) {}

    openDialog(): void
    {
        const dialogRef = this.dialog.open(MyDialogComponent, {
            width: '600px',
            maxHeight: '90vh',
            data: {
                title: 'Edit Item',
                item: this.selectedItem,
            },
            panelClass: 'custom-dialog',
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe(result =>
        {
            if (result === 'confirmed')
            {
                // Handle confirmation
            }
        });
    }
}
```

### Dialog Component

```typescript
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'my-dialog',
    imports: [MatDialogModule, MatButtonModule],
    template: `
        <h2 mat-dialog-title>{{ data.title }}</h2>
        <mat-dialog-content>
            <!-- Content -->
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Cancel</button>
            <button mat-flat-button color="primary" [mat-dialog-close]="'confirmed'">
                Confirm
            </button>
        </mat-dialog-actions>
    `,
})
export class MyDialogComponent
{
    constructor(
        public dialogRef: MatDialogRef<MyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string; item: any },
    ) {}
}
```

---

## Material Table with Sorting and Pagination

```typescript
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
    imports: [MatTableModule, MatSortModule, MatPaginatorModule],
    template: `
        <table mat-table [dataSource]="dataSource" matSort>
            <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
                <td mat-cell *matCellDef="let row">{{ row.name }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator
            [length]="totalItems"
            [pageSize]="10"
            [pageSizeOptions]="[10, 25, 50, 100]"
            (page)="onPageChange($event)">
        </mat-paginator>
    `,
})
export class TableComponent implements AfterViewInit
{
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['name', 'email', 'actions'];

    ngAfterViewInit(): void
    {
        // Combine sort and page events
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(tap(() => this.loadData()))
            .subscribe();
    }

    onSortChange(sort: Sort): void
    {
        // Handle sort
    }

    onPageChange(page: PageEvent): void
    {
        // Handle pagination
    }
}
```

---

## Form Field Appearances

```html
<!-- Outline (PREFERRED in Aurora) -->
<mat-form-field appearance="outline">
    <mat-label>Name</mat-label>
    <input matInput formControlName="name">
</mat-form-field>

<!-- Fill -->
<mat-form-field appearance="fill">
    <mat-label>Email</mat-label>
    <input matInput formControlName="email">
</mat-form-field>

<!-- With prefix/suffix -->
<mat-form-field appearance="outline">
    <mat-label>Amount</mat-label>
    <span matTextPrefix>$&nbsp;</span>
    <input matInput formControlName="amount" type="number">
    <span matTextSuffix>.00</span>
</mat-form-field>

<!-- With icon -->
<mat-form-field appearance="outline">
    <mat-label>Search</mat-label>
    <mat-icon matPrefix>search</mat-icon>
    <input matInput formControlName="search">
    <button mat-icon-button matSuffix>
        <mat-icon>clear</mat-icon>
    </button>
</mat-form-field>
```

---

## Common Material Imports

```typescript
// Buttons
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Forms
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

// Feedback
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
```

---

## Anti-Patterns

| Avoid | Do Instead |
|-------|------------|
| Accessing `ngControl.control` directly in constructor | Use `ngOnInit` or `@Optional() @Self()` pattern |
| Forgetting `stateChanges.complete()` in `ngOnDestroy` | Always complete the Subject |
| Not calling `stateChanges.next()` when state changes | Call it after every property change |
| Importing entire Material module | Import only needed modules |
| Using `any` for dialog data | Create typed interfaces |
| Not handling focus in custom controls | Use `FocusMonitor` from CDK |

---

## Resources

- **Aurora Custom Controls**: `src/@aurora/components/version-input/`, `src/@aurora/components/datepicker/`
- **CDK Overlay Examples**: `src/@aurora/components/image-preview-overlay/`
- **Grid Component**: `src/@aurora/components/grid/`
- **Official Docs**: https://material.angular.io/
- **CDK Docs**: https://material.angular.io/cdk/categories
