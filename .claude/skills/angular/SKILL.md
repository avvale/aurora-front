---
name: angular
description: >
  Expert Angular patterns for decorators, pipes, DI, signals, standalone components, and Aurora framework integration.
  Trigger: When implementing Angular components, directives, pipes, services, or using dependency injection.
license: MIT
metadata:
  author: aurora
  version: "1.0"
  auto_invoke: "Angular components, decorators, pipes, dependency injection, signals, standalone, directives"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## When to Use

- Implementing Angular components (detail, list, dialog)
- Creating custom pipes or directives
- Setting up dependency injection
- Working with signals and reactive patterns
- Configuring change detection strategies
- Extending Aurora base components

---

## Component Patterns (Angular 19+)

### Standalone Components (REQUIRED)

```typescript
// ✅ ALWAYS: Standalone components with explicit imports
@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...defaultDetailImports,  // Aurora common imports
        MatSelectModule,
        NgForOf,
    ],
})
export class ExampleComponent extends ViewDetailComponent
{
    // Allman brace style
}

// ❌ NEVER: NgModule-based components (deprecated pattern)
```

### Change Detection

```typescript
// ✅ ALWAYS: OnPush for performance
changeDetection: ChangeDetectionStrategy.OnPush

// ❌ AVOID: Default change detection (unless required)
changeDetection: ChangeDetectionStrategy.Default
```

### View Encapsulation

```typescript
// ✅ Standard for Aurora components
encapsulation: ViewEncapsulation.None

// Other options when needed:
encapsulation: ViewEncapsulation.Emulated    // Default, scoped styles
encapsulation: ViewEncapsulation.ShadowDom   // True isolation
```

---

## Decorators Reference

### Class Decorators

| Decorator | Purpose | Example |
|-----------|---------|---------|
| `@Component` | Define a component | `@Component({ selector: 'app-x' })` |
| `@Directive` | Define a directive | `@Directive({ selector: '[auFocus]' })` |
| `@Pipe` | Define a pipe | `@Pipe({ name: 'dateFormat', pure: true })` |
| `@Injectable` | Define a service | `@Injectable({ providedIn: 'root' })` |

### Property Decorators

| Decorator | Purpose | Example |
|-----------|---------|---------|
| `@Input()` | Input binding | `@Input() data: string;` |
| `@Output()` | Event emitter | `@Output() change = new EventEmitter<T>();` |
| `@ViewChild()` | Query single element | `@ViewChild('ref') el: ElementRef;` |
| `@ViewChildren()` | Query multiple elements | `@ViewChildren(ItemComponent) items: QueryList<ItemComponent>;` |
| `@ContentChild()` | Query projected content | `@ContentChild(TemplateRef) template: TemplateRef<any>;` |
| `@HostBinding()` | Bind to host property | `@HostBinding('class.active') isActive = false;` |
| `@HostListener()` | Listen to host events | `@HostListener('click', ['$event'])` |

### Input Transforms (Angular 16+)

```typescript
// ✅ Transform input values
@Input({ transform: booleanAttribute }) disabled: boolean;
@Input({ transform: numberAttribute }) count: number;
@Input({ required: true }) id: string;

// Custom transform
@Input({ transform: (value: string) => value.toUpperCase() }) name: string;
```

---

## Signals (Angular 16+)

### Basic Signals

```typescript
import { signal, computed, effect, WritableSignal } from '@angular/core';

// Writable signal
managedObject: WritableSignal<IamPermission> = signal(null);

// Read/write
managedObject.set(newValue);      // Replace
managedObject.update(v => ...);   // Update based on current
const value = managedObject();    // Read

// Computed (derived, read-only)
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

// Effect (side effects)
constructor() {
    effect(() => {
        console.log('Value changed:', this.managedObject());
    });
}
```

### Signal Inputs (Angular 17.1+)

```typescript
// Signal-based inputs
name = input<string>();              // Optional
id = input.required<string>();       // Required
count = input(0);                    // With default

// In template: {{ name() }}
```

### Model Signals (Angular 17.2+)

```typescript
// Two-way binding with signals
value = model<string>('');           // Creates input + output
value = model.required<string>();    // Required model

// Template: [(value)]="parentValue"
```

---

## Pipes

### Creating Pure Pipes (PREFERRED)

```typescript
// ✅ Pure pipes - cached, performant
@Pipe({
    name: 'dateFormat',
    pure: true,  // Default, can omit
})
export class DateFormatPipe implements PipeTransform
{
    transform(timestamp: string, format: string): string
    {
        return dateFromFormat(timestamp, 'YYYY-MM-DD HH:mm:ss')
            .format(format);
    }
}
```

### Impure Pipes (Use Sparingly)

```typescript
// ⚠️ Impure pipes - runs on every change detection
@Pipe({
    name: 'filter',
    pure: false,  // Only when necessary
})
export class FilterPipe implements PipeTransform
{
    transform(items: any[], predicate: (item: any) => boolean): any[]
    {
        return items?.filter(predicate) ?? [];
    }
}
```

### Pipe Decision Tree

```
Does output depend ONLY on input args? → pure: true (default)
Does output depend on external state?  → pure: false
Is it called frequently in templates?  → Keep pure, refactor if needed
```

---

## Dependency Injection

### Service Registration

```typescript
// ✅ PREFERRED: Tree-shakable, singleton
@Injectable({
    providedIn: 'root',
})
export class ActionService { }

// ✅ Scoped to specific component tree
@Injectable({
    providedIn: SomeModule,
})
export class ScopedService { }

// ✅ Provided in component (new instance per component)
@Component({
    providers: [LocalService],
})
export class MyComponent { }
```

### Injection Methods

```typescript
// ✅ Modern: inject() function (Angular 14+)
export class MyComponent
{
    private readonly service = inject(MyService);
    private readonly elementRef = inject(ElementRef);
}

// ✅ Classic: Constructor injection
constructor(
    private readonly service: MyService,
    private readonly elementRef: ElementRef,
) { }
```

### Injection Tokens

```typescript
// Define token
export const API_URL = new InjectionToken<string>('API_URL');

// Provide
providers: [
    { provide: API_URL, useValue: 'https://api.example.com' },
]

// Inject
private readonly apiUrl = inject(API_URL);
```

### Optional & Self Decorators

```typescript
constructor(
    @Optional() private readonly logger?: LoggerService,        // May be null
    @Self() private readonly local: LocalService,              // Only from self
    @SkipSelf() private readonly parent: ParentService,        // Skip self
    @Host() private readonly host: HostService,                // Up to host
) { }
```

---

## Directives

### Attribute Directive

```typescript
@Directive({
    selector: '[auFocus]',
})
export class FocusDirective implements AfterViewInit
{
    private readonly elementRef = inject(ElementRef<HTMLElement>);

    @Input('auFocus')
    set auFocus(value: boolean | '' | 'true' | 'false' | undefined)
    {
        this.shouldFocus = value === '' || value === true || value === 'true';
    }

    ngAfterViewInit(): void
    {
        if (this.shouldFocus)
        {
            this.elementRef.nativeElement.focus();
        }
    }
}
```

### Structural Directive

```typescript
@Directive({
    selector: '[auIf]',
})
export class IfDirective
{
    private readonly templateRef = inject(TemplateRef<any>);
    private readonly viewContainer = inject(ViewContainerRef);

    @Input()
    set auIf(condition: boolean)
    {
        if (condition)
        {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else
        {
            this.viewContainer.clear();
        }
    }
}
```

---

## Lifecycle Hooks

| Hook | Purpose | Use Case |
|------|---------|----------|
| `ngOnChanges` | Input changed | React to @Input changes |
| `ngOnInit` | Component initialized | Fetch data, setup subscriptions |
| `ngDoCheck` | Custom change detection | Deep comparison logic |
| `ngAfterContentInit` | Content projected | Access @ContentChild |
| `ngAfterContentChecked` | Content checked | After content changes |
| `ngAfterViewInit` | View initialized | Access @ViewChild |
| `ngAfterViewChecked` | View checked | After view changes |
| `ngOnDestroy` | Component destroyed | Cleanup subscriptions |

### Aurora Pattern: Unsubscribe

```typescript
export class MyComponent extends ViewBaseComponent
{
    // inherited: protected unsubscribeAll$ = new Subject<void>();

    init(): void
    {
        this.service.data$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(data => { /* ... */ });
    }

    // ngOnDestroy handled by parent class
}
```

---

## Aurora Base Components

### ViewDetailComponent (for detail/edit views)

```typescript
@Component({ /* ... */ })
export class CountryDetailComponent extends ViewDetailComponent
{
    managedObject: CommonCountry;
    breadcrumb: Crumb[] = [/* ... */];

    constructor(private readonly countryService: CountryService)
    {
        super();
    }

    // Called after parent ngOnInit
    init(): void { }

    // Define reactive form
    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required]],
            name: ['', [Validators.required, Validators.maxLength(127)]],
        });
    }

    // Handle actions from ActionService
    async handleAction(action: Action): Promise<void>
    {
        switch (action?.id)
        {
            case 'app::entity.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;
            case 'app::entity.detail.edit':
                // Load and patch form
                break;
            case 'app::entity.detail.create':
                // Create via service
                break;
            case 'app::entity.detail.update':
                // Update via service
                break;
        }
    }
}
```

### ViewBaseComponent (for list views)

```typescript
@Component({ /* ... */ })
export class CountryListComponent extends ViewBaseComponent
{
    gridId: string = 'common::country.list.mainGridList';
    gridData$: Observable<GridData<CommonCountry>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [/* ... */];

    async handleAction(action: Action): Promise<void>
    {
        switch (action?.id)
        {
            case 'app::entity.list.view':
                // Setup grid
                break;
            case 'app::entity.list.pagination':
                // Fetch page
                break;
        }
    }
}
```

---

## Common Patterns

### Form Validation with RxwebValidators

```typescript
import { RxwebValidators } from '@rxweb/reactive-form-validators';

this.fg = this.fb.group({
    email: ['', [Validators.required, RxwebValidators.email()]],
    password: ['', [Validators.required, RxwebValidators.minLength({ value: 8 })]],
    confirmPassword: ['', [RxwebValidators.compare({ fieldName: 'password' })]],
});
```

### Action Pattern

```typescript
// Dispatch action
this.actionService.action({
    id: 'app::module.detail.create',
    isViewAction: false,
    meta: { extraData: 'value' },
});

// Handle in component
async handleAction(action: Action): Promise<void>
{
    switch (action?.id)
    {
        case 'app::module.detail.create':
            // Handle
            break;
    }
}
```

---

## Anti-Patterns

| Avoid | Do Instead |
|-------|------------|
| `ChangeDetectionStrategy.Default` | Use `OnPush` with immutable data |
| Impure pipes for simple transforms | Pure pipes with proper inputs |
| Manual subscriptions without cleanup | `takeUntil(this.unsubscribeAll$)` |
| `any` type in services | Proper generics and interfaces |
| Direct DOM manipulation | Use `Renderer2` or directives |
| `ngDoCheck` for simple changes | Use `ngOnChanges` or signals |
| Nested subscriptions | Use RxJS operators (`switchMap`, `mergeMap`) |

---

## Resources

- **Aurora Components**: See `src/@aurora/components/`
- **Base Classes**: See `src/@aurora/components/view-detail.component.ts`
- **Pipes**: See `src/@aurora/pipes/`
- **Directives**: See `src/@aurora/directives/`
