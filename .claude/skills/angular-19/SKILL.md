---
name: angular-19
description: >
    Angular 19 patterns: signals, standalone components, resource API, signal
    queries, dependency injection, and Aurora framework integration. Trigger:
    When implementing Angular components, directives, pipes, services, or using
    modern reactive patterns.
license: MIT
metadata:
    author: aurora
    version: '2.0'
    angular_version: '19.x'
    auto_invoke:
        'Angular components, signals, resource API, dependency injection,
        standalone, directives, pipes'
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## When to Use

- Implementing Angular components (detail, list, dialog)
- Working with signals, resources, and reactive patterns
- Creating custom pipes or directives
- Setting up dependency injection
- Configuring change detection strategies
- Extending Aurora base components

---

## Angular 19 Key Changes

### Standalone by Default (BREAKING)

In Angular 19, **all components, directives, and pipes are standalone by
default**. You no longer need `standalone: true`.

```typescript
// ✅ Angular 19: standalone is implicit
@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    imports: [CommonModule, MatButtonModule],
})
export class ExampleComponent {}

// ❌ Only if you NEED NgModule (legacy)
@Component({
    selector: 'app-legacy',
    standalone: false, // Explicit opt-out
})
export class LegacyComponent {}
```

### Compiler Flag: strictStandalone

Enable in `tsconfig.json` to enforce standalone-only:

```json
{
    "angularCompilerOptions": {
        "strictStandalone": true
    }
}
```

---

## Signals (Stable in v19)

### Basic Signals

```typescript
import { signal, computed, effect, WritableSignal } from '@angular/core';

// Writable signal
count = signal(0);
name = signal<string | null>(null);

// Read/write
this.count.set(5); // Replace value
this.count.update((n) => n + 1); // Update based on current
const value = this.count(); // Read (call as function)

// Computed (derived, read-only)
doubleCount = computed(() => this.count() * 2);
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

### Effect (Updated in v19)

**Angular 19 change**: Signals can now be set within `effect()` by default
(removed `allowSignalWrites` flag). Effects execute during change detection
cycle instead of as microtasks.

```typescript
constructor();
{
    // ✅ Angular 19: Can set signals directly in effect
    effect(() => {
        console.log('Count changed:', this.count());
        this.logCount.set(this.count()); // Now allowed by default
    });
}
```

### Signal Inputs (Stable in v19)

```typescript
import { input } from '@angular/core';

// Optional input
name = input<string>(); // Signal<string | undefined>

// Required input
id = input.required<string>(); // Signal<string>

// With default value
count = input(0); // Signal<number>

// With transform
disabled = input(false, { transform: booleanAttribute });

// In template: {{ name() }}
```

### Model Signals (Stable in v19)

Two-way binding with signals:

```typescript
import { model } from '@angular/core';

// Creates input + output automatically
value = model<string>(''); // ModelSignal<string>
value = model.required<string>(); // Required model

// Parent template: [(value)]="parentValue"
// Or: [value]="data" (valueChange)="onChanged($event)"
```

### Output (Stable in v19)

```typescript
import { output, outputFromObservable } from '@angular/core';

// Simple output
saved = output<User>(); // OutputEmitterRef<User>
closed = output<void>();

// Emit
this.saved.emit(user);
this.closed.emit();

// From Observable
@Injectable()
export class DataService {
    private data$ = new Subject<Data>();
    dataOutput = outputFromObservable(this.data$);
}
```

### linkedSignal (Experimental in v19)

Writable signal that resets when source changes:

```typescript
import { linkedSignal } from '@angular/core';

// Source signal
selectedUserId = signal<string | null>(null);

// Linked signal - resets when selectedUserId changes
userNotes = linkedSignal(() => {
    const userId = this.selectedUserId();
    return userId ? `Notes for ${userId}` : '';
});

// Can still be written manually
this.userNotes.set('Custom notes');

// But resets when source changes
this.selectedUserId.set('user-456'); // userNotes resets
```

**Use case**: Form fields that should reset when parent selection changes.

---

## Signal Queries (Stable in v19)

### viewChild / viewChildren

```typescript
import { viewChild, viewChildren, ElementRef } from '@angular/core';

// Single element (optional)
inputEl = viewChild<ElementRef>('inputRef');

// Single element (required) - throws if not found
inputEl = viewChild.required<ElementRef>('inputRef');

// By component type
dialog = viewChild(MatDialog);

// Multiple elements
items = viewChildren<ElementRef>('item');
buttons = viewChildren(MatButton);

// Usage in effect or computed
constructor();
{
    effect(() => {
        const el = this.inputEl();
        if (el) {
            el.nativeElement.focus();
        }
    });
}
```

### contentChild / contentChildren

```typescript
import { contentChild, contentChildren } from '@angular/core';

// Query projected content
header = contentChild<TemplateRef<any>>('header');
tabs = contentChildren(TabComponent);

// Required
header = contentChild.required<TemplateRef<any>>('header');
```

### Migration from Decorators

```bash
# Migrate @ViewChild/@ContentChild to signal queries
ng generate @angular/core:signal-queries-migration

# Migrate @Input to signal inputs
ng generate @angular/core:signal-input-migration

# Migrate @Output to output()
ng generate @angular/core:output-migration
```

---

## Resource API (Experimental in v19)

### resource() - Promise-based

```typescript
import { resource, signal } from '@angular/core';

// Signal for request params
userId = signal<string>('user-123');

// Resource automatically refetches when userId changes
userResource = resource({
    request: () => this.userId(),
    loader: async ({ request, abortSignal }) => {
        const response = await fetch(`/api/users/${request}`, {
            signal: abortSignal, // Automatic cancellation
        });
        return response.json() as Promise<User>;
    },
});

// Template usage
@if (userResource.isLoading()) {
    <app-spinner />
}
@if (userResource.error()) {
    <app-error [error]="userResource.error()" />
}
@if (userResource.value(); as user) {
    <app-user-card [user]="user" />
}
```

### rxResource() - Observable-based

```typescript
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

export class UsersComponent {
    private readonly http = inject(HttpClient);
    page = signal(1);

    // Uses HttpClient, auto-unsubscribes
    usersResource = rxResource({
        request: () => this.page(),
        loader: ({ request }) =>
            this.http.get<User[]>(`/api/users?page=${request}`),
    });

    nextPage(): void {
        this.page.update((p) => p + 1);
    }
}
```

### httpResource() (Angular 19.2+)

Simplified HTTP resource:

```typescript
import { httpResource } from '@angular/common/http';

userId = input.required<string>();

// Automatically reactive to userId changes
user = httpResource(() => `/api/users/${this.userId()}`);

// With options
users = httpResource(() => ({
    url: '/api/users',
    method: 'GET',
    params: { page: this.page().toString() },
}));
```

### Resource Properties

| Property      | Type                         | Description                    |
| ------------- | ---------------------------- | ------------------------------ |
| `value()`     | `Signal<T \| undefined>`     | Current value                  |
| `isLoading()` | `Signal<boolean>`            | Loading state                  |
| `error()`     | `Signal<Error \| undefined>` | Error if failed                |
| `status()`    | `Signal<ResourceStatus>`     | idle, loading, resolved, error |
| `reload()`    | `() => void`                 | Force refetch                  |
| `update()`    | `(value: T) => void`         | Manually update value          |

---

## Template Syntax (Angular 19)

### @let - Template Variables (Stable in v19)

```html
<!-- Define read-only variables -->
@let userName = user().name; @let isAdmin = user().role === 'admin'; @let total
= price() * quantity();

<h1>Welcome, {{ userName }}</h1>
@if (isAdmin) {
<admin-panel />
}
<p>Total: {{ total | currency }}</p>

<!-- With async data -->
@let userData = userResource.value(); @if (userData) {
<user-profile [user]="userData" />
}
```

### Control Flow (Stable since v17)

```html
<!-- @if -->
@if (isLoading()) {
<spinner />
} @else if (error()) {
<error-message [error]="error()" />
} @else {
<content [data]="data()" />
}

<!-- @for with track (REQUIRED) -->
@for (item of items(); track item.id) {
<item-card [item]="item" />
} @empty {
<p>No items found</p>
}

<!-- @switch -->
@switch (status()) { @case ('pending') {
<pending-badge />
} @case ('active') {
<active-badge />
} @case ('completed') {
<completed-badge />
} @default {
<unknown-badge />
} }
```

### @defer - Lazy Loading

```html
<!-- Basic defer -->
@defer {
<heavy-component />
}

<!-- With loading/error states -->
@defer (on viewport) {
<chart-component />
} @loading (minimum 200ms) {
<skeleton-loader />
} @error {
<p>Failed to load chart</p>
}

<!-- Triggers -->
@defer (on idle) { }
<!-- Browser idle -->
@defer (on viewport) { }
<!-- Enters viewport -->
@defer (on interaction) { }
<!-- User interacts -->
@defer (on hover) { }
<!-- Mouse hover -->
@defer (on timer(5s)) { }
<!-- After delay -->
@defer (when condition()) { }
<!-- Condition true -->
@defer (prefetch on idle) { }
<!-- Prefetch strategy -->
```

### Incremental Hydration (Experimental)

For SSR applications:

```html
@defer (hydrate on viewport) {
<app-comments />
} @defer (hydrate on interaction) {
<app-interactive-widget />
}
```

---

## Component Patterns

### Standard Component (Angular 19)

```typescript
@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
    ],
})
export class UserDetailComponent {
    // Inject dependencies
    private readonly userService = inject(UserService);
    private readonly route = inject(ActivatedRoute);

    // Signal inputs
    userId = input.required<string>();

    // Resources
    userResource = rxResource({
        request: () => this.userId(),
        loader: ({ request }) => this.userService.getById(request),
    });

    // Computed
    isLoading = computed(() => this.userResource.isLoading());
    user = computed(() => this.userResource.value());
}
```

### Aurora Detail Component

```typescript
@Component({
    selector: 'app-country-detail',
    templateUrl: './country-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultDetailImports],
})
export class CountryDetailComponent extends ViewDetailComponent {
    // Aurora pattern: typed managed object
    managedObject: WritableSignal<CommonCountry> = signal(null);

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        {
            translation: 'common.countries',
            routerLink: ['/common', 'countries'],
        },
    ];

    private readonly countryService = inject(CountryService);

    createForm(): void {
        this.fg = this.fb.group({
            id: ['', [Validators.required]],
            iso3166Alpha2: ['', [Validators.required, Validators.maxLength(2)]],
            name: ['', [Validators.required, Validators.maxLength(127)]],
        });
    }

    async handleAction(action: Action): Promise<void> {
        switch (action?.id) {
            case 'app::country.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'app::country.detail.edit':
                const country = await lastValueFrom(
                    this.countryService.findById({ id: this.currentId }),
                );
                this.managedObject.set(country);
                this.fg.patchValue(country);
                break;
        }
    }
}
```

---

## Dependency Injection

### Modern inject() Function (Preferred)

```typescript
export class MyComponent {
    // ✅ Preferred: inject() function
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly elementRef = inject(ElementRef);

    // Optional injection
    private readonly logger = inject(LoggerService, { optional: true });

    // Self/SkipSelf/Host
    private readonly config = inject(CONFIG_TOKEN, { self: true });
    private readonly parent = inject(ParentService, { skipSelf: true });
}
```

### Service Registration

```typescript
// ✅ Tree-shakable singleton (default)
@Injectable({
    providedIn: 'root',
})
export class UserService {}

// Scoped to component
@Component({
    providers: [LocalStateService],
})
export class MyComponent {}
```

### Injection Tokens

```typescript
// Define
export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

// Provide
providers: [
    { provide: API_CONFIG, useValue: { baseUrl: '/api' } },
]

// Inject
private readonly config = inject(API_CONFIG);
```

### New Initializers (Angular 19)

```typescript
// ✅ New: provideAppInitializer
export const appConfig: ApplicationConfig = {
    providers: [
        provideAppInitializer(() => {
            const configService = inject(ConfigService);
            return configService.load();
        }),
    ],
};

// ❌ Old: APP_INITIALIZER token
providers: [
    {
        provide: APP_INITIALIZER,
        useFactory: (config: ConfigService) => () => config.load(),
        deps: [ConfigService],
        multi: true,
    },
];
```

---

## Pipes

### Pure Pipe (Default)

```typescript
@Pipe({
    name: 'dateFormat',
    pure: true, // Default, can omit
})
export class DateFormatPipe implements PipeTransform {
    transform(timestamp: string, format: string): string {
        return dateFromFormat(timestamp, 'YYYY-MM-DD HH:mm:ss').format(format);
    }
}
```

### Impure Pipe (Use Sparingly)

```typescript
// ⚠️ Runs on every change detection
@Pipe({
    name: 'filterActive',
    pure: false,
})
export class FilterActivePipe implements PipeTransform {
    transform<T extends { isActive: boolean }>(items: T[]): T[] {
        return items?.filter((item) => item.isActive) ?? [];
    }
}
```

---

## Directives

### Attribute Directive

```typescript
@Directive({
    selector: '[auFocus]',
})
export class FocusDirective {
    private readonly elementRef = inject(ElementRef<HTMLElement>);

    focused = input(true, {
        alias: 'auFocus',
        transform: booleanAttribute,
    });

    constructor() {
        effect(() => {
            if (this.focused()) {
                this.elementRef.nativeElement.focus();
            }
        });
    }
}
```

### Structural Directive

```typescript
@Directive({
    selector: '[auPermission]',
})
export class PermissionDirective {
    private readonly templateRef = inject(TemplateRef<any>);
    private readonly viewContainer = inject(ViewContainerRef);
    private readonly authService = inject(AuthService);

    permission = input.required<string>({ alias: 'auPermission' });

    constructor() {
        effect(() => {
            const hasPermission = this.authService.hasPermission(
                this.permission(),
            );
            if (hasPermission) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        });
    }
}
```

---

## RxJS Interop

### toSignal with Custom Equality

```typescript
import { toSignal } from '@angular/core/rxjs-interop';

// ✅ Angular 19: Custom equality function
arraySignal = toSignal(this.array$, {
    initialValue: [],
    equal: (a, b) => a.length === b.length && a.every((v, i) => v === b[i]),
});

// With requireSync for synchronous observables
routeParams = toSignal(this.route.params, { requireSync: true });
```

### toObservable

```typescript
import { toObservable } from '@angular/core/rxjs-interop';

count = signal(0);
count$ = toObservable(this.count);

// Use in pipes
result$ = toObservable(this.searchQuery).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query) => this.searchService.search(query)),
);
```

### takeUntilDestroyed

```typescript
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class MyComponent {
    constructor() {
        // ✅ Auto-unsubscribes on destroy
        this.data$.pipe(takeUntilDestroyed()).subscribe((data) => {
            // handle data
        });
    }
}
```

---

## Lifecycle & Rendering

### afterRenderEffect (Angular 19)

Tracks dependencies and runs only when tracked values change:

```typescript
import { afterRenderEffect } from '@angular/core';

export class ChartComponent {
    data = input.required<number[]>();
    chartEl = viewChild.required<ElementRef>('chart');

    constructor() {
        // Only runs when data() changes
        afterRenderEffect(() => {
            const el = this.chartEl().nativeElement;
            const chartData = this.data();
            this.renderChart(el, chartData);
        });
    }
}
```

### afterRender / afterNextRender

```typescript
import { afterRender, afterNextRender } from '@angular/core';

// After every render cycle
afterRender(() => {
    this.updateScrollPosition();
});

// After next render only
afterNextRender(() => {
    this.initializeThirdPartyLib();
});
```

---

## Router Enhancements (Angular 19)

### routerOutletData

Pass data to routed children:

```typescript
// Parent template
<router-outlet [routerOutletData]="{ theme: currentTheme() }" />

// Child component
export class ChildComponent
{
    // Inject outlet data
    outletData = inject(ROUTER_OUTLET_DATA) as Signal<{ theme: string }>;

    theme = computed(() => this.outletData().theme);
}
```

### RouterLink with UrlTree

```typescript
// Create UrlTree
profileUrl = this.router.createUrlTree(['/profile', this.userId()], {
    queryParams: { tab: 'settings' },
});

// Use in template
<a [routerLink]="profileUrl">Profile</a>
```

---

## Testing (Angular 19)

### Auto-flush in fakeAsync

```typescript
// ✅ Angular 19: flush() runs automatically
it('should update value', fakeAsync(() => {
    component.loadData();
    // No need for explicit flush()
    expect(component.data()).toBeDefined();
}));
```

### Testing Signals

```typescript
it('should compute correctly', () => {
    const count = signal(5);
    const doubled = computed(() => count() * 2);

    expect(doubled()).toBe(10);

    count.set(10);
    expect(doubled()).toBe(20);
});
```

---

## Anti-Patterns

| Avoid                                 | Do Instead                             |
| ------------------------------------- | -------------------------------------- |
| `standalone: true` (redundant in v19) | Omit (standalone by default)           |
| `@Input()` decorator                  | `input()` / `input.required()`         |
| `@Output()` decorator                 | `output()`                             |
| `@ViewChild()` decorator              | `viewChild()` / `viewChild.required()` |
| `allowSignalWrites` in effect         | Not needed in v19                      |
| Manual subscription cleanup           | `takeUntilDestroyed()`                 |
| `ChangeDetectionStrategy.Default`     | Use `OnPush` with signals              |
| `ngOnInit` for async data             | `resource()` / `rxResource()`          |
| Constructor injection (verbose)       | `inject()` function                    |
| `APP_INITIALIZER` token               | `provideAppInitializer()`              |

---

## Migration Checklist

- [ ] Remove `standalone: true` from components (now default)
- [ ] Convert `@Input()` to `input()` / `input.required()`
- [ ] Convert `@Output()` to `output()`
- [ ] Convert `@ViewChild` to `viewChild()`
- [ ] Replace subscriptions with `resource()` / `rxResource()`
- [ ] Use `takeUntilDestroyed()` for remaining subscriptions
- [ ] Enable `strictStandalone` in tsconfig
- [ ] Replace `APP_INITIALIZER` with `provideAppInitializer()`

---

## Related Skills

| Skill              | When to Use Together                       |
| ------------------ | ------------------------------------------ |
| `angular-material` | Material components, CDK, theming          |
| `tailwind`         | Styling with Tailwind CSS                  |
| `typescript`       | TypeScript patterns, generics, type safety |
| `aurora-schema`    | When working with Aurora YAML schemas      |

---

## Resources

- [Angular 19 Official Blog](https://blog.angular.dev/meet-angular-v19-7b29dfd05b84)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Resource API Guide](https://angular.dev/guide/signals/resource)
- [Angular 19 Features - angular.love](https://angular.love/angular-19-whats-new/)
