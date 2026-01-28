---
name: aurora-development
description: >
    Expert Angular development for Aurora projects. Covers detail components,
    list components, forms, GraphQL services, action handling, grid
    configuration, and resolvers. Trigger: When implementing Angular components,
    forms, services, or custom logic in Aurora projects.
license: MIT
metadata:
    author: aurora
    version: '1.0'
    auto_invoke:
        'Implementing Angular/Aurora components, forms, services, actions, grids'
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## When to Use

**This is the PRIMARY skill for IMPLEMENTING code in Aurora/Angular projects.**

Use this skill when:

- **Writing detail components** (forms, validations, CRUD operations)
- **Writing list components** (grids, pagination, filters)
- **Implementing custom form logic** (validators, transformations)
- **Creating GraphQL services** (queries, mutations)
- **Handling actions** (new, edit, create, update, delete)
- **Configuring grid columns** (filters, sorting, search)
- **Creating route resolvers** (data initialization)

**Always combine with:**

- `prettier` skill for code formatting (MANDATORY after every edit)
- `typescript` skill for strict type patterns
- `angular-19` skill for Angular 19 patterns (signals, inject())
- `angular-material-19` skill for Material components
- `tailwind-3` skill for styling

---

## Critical Patterns

### ⚠️ Code Formatting (CRITICAL!)

**MANDATORY: Use `prettier` skill after EVERY file modification**

After editing/creating ANY file:

1. ✅ **IMMEDIATELY** invoke `prettier` skill
2. ✅ Format the modified file(s)
3. ✅ Verify formatting succeeded

```bash
npx prettier --write <file-path>
```

**❌ NEVER skip formatting or leave unformatted code**

---

### ⚠️ Component Inheritance (CRITICAL!)

**Detail Components** MUST extend `ViewDetailComponent`:

```typescript
export class CountryDetailComponent extends ViewDetailComponent {
    // ✅ CORRECT: Extends ViewDetailComponent
}
```

**List Components** MUST extend `ViewBaseComponent`:

```typescript
export class CountryListComponent extends ViewBaseComponent {
    // ✅ CORRECT: Extends ViewBaseComponent
}
```

---

### ⚠️ Action Handling (CRITICAL!)

**ALL business logic goes in `handleAction()` method:**

```typescript
async handleAction(action: Action): Promise<void>
{
    switch (action?.id)
    {
        case 'common::country.detail.new':
            // ✅ CORRECT: Logic here
            this.fg.get('id').setValue(Utils.uuid());
            break;

        case 'common::country.detail.edit':
            // ✅ CORRECT: Subscribe to data
            this.countryService.country$
                .pipe(takeUntil(this.unsubscribeAll$))
                .subscribe(country => {
                    this.managedObject.set(country);
                    this.fg.patchValue(country);
                });
            break;
    }
}
```

**❌ NEVER put business logic in constructor or ngOnInit**

---

## Base Classes

### ViewBaseComponent

Base for ALL view components. Provides:

- `actionService`: Dispatch and subscribe to actions
- `router`: Angular router
- `activatedRoute`: Current route info
- `translocoService`: i18n translations
- `confirmationService`: Confirmation dialogs
- `snackBar`: Notifications
- `unsubscribeAll$`: Cleanup subject

**Key Methods:**

```typescript
// Override to handle actions
async handleAction(action: Action): Promise<void> {}

// Override for custom initialization
init(): void {}
```

### ViewDetailComponent (extends ViewFormComponent)

For detail/form components. Adds:

- `fg: FormGroup`: Reactive form group
- `fb: FormBuilder`: Form builder
- `validationMessagesService`: Form validation

**Key Methods:**

```typescript
// MUST override - Define form structure
createForm(): void {}
```

---

## Detail Component Pattern

### Complete Example

```typescript
import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import {
    Action,
    Crumb,
    defaultDetailImports,
    log,
    mapActions,
    Utils,
    ViewDetailComponent,
} from '@aurora';
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
    // Typed managed object with signal
    managedObject: WritableSignal<CommonCountry> = signal(null);

    // Breadcrumb navigation
    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'common.Countries', routerLink: ['/common', 'country'] },
        { translation: 'common.Country' },
    ];

    // Inject services
    private readonly countryService = inject(CountryService);

    // Define form structure
    createForm(): void {
        this.fg = this.fb.group({
            id: [
                '',
                [
                    Validators.required,
                    Validators.minLength(36),
                    Validators.maxLength(36),
                ],
            ],
            iso3166Alpha2: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(2),
                ],
            ],
            iso3166Alpha3: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(3),
                ],
            ],
            iso3166Numeric: [
                '',
                [Validators.required, Validators.maxLength(3)],
            ],
            name: ['', [Validators.required, Validators.maxLength(127)]],
            isActive: [false],
        });
    }

    // Handle all actions
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
                        this.countryService.create<CommonCountry>({
                            object: this.fg.value,
                        }),
                    );
                    this.snackBar.open(
                        `${this.translocoService.translate('common.Country')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        { verticalPosition: 'top', duration: 3000 },
                    );
                    this.router.navigate(['common', 'country']);
                } catch (error) {
                    log(`[DEBUG] Error: ${error}`);
                }
                break;

            case 'common::country.detail.update':
                try {
                    await lastValueFrom(
                        this.countryService.updateById<CommonCountry>({
                            object: this.fg.value,
                        }),
                    );
                    this.snackBar.open(
                        `${this.translocoService.translate('common.Country')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        { verticalPosition: 'top', duration: 3000 },
                    );
                    this.router.navigate(['common', 'country']);
                } catch (error) {
                    log(`[DEBUG] Error: ${error}`);
                }
                break;
        }
    }
}
```

### Template Pattern

```html
<div class="absolute inset-0 flex w-full flex-col overflow-hidden">
    <!-- Header -->
    <div
        class="bg-card flex flex-0 flex-col border-b p-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-4 dark:bg-transparent"
    >
        <div class="min-w-0 flex-1">
            <au-breadcrumb [data]="breadcrumb"></au-breadcrumb>
            <au-title>
                <mat-icon class="mr-2 icon-size-8">flag</mat-icon>
                {{ 'common.Country' | transloco }}
            </au-title>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex flex-shrink-0 items-center sm:ml-4 sm:mt-0">
            <button
                type="submit"
                class="ml-3"
                [color]="'primary'"
                mat-flat-button
                form="detailForm"
            >
                @if (currentViewAction?.id === 'common::country.detail.new') {
                {{ 'Create' | transloco }} } @if (currentViewAction?.id ===
                'common::country.detail.edit') { {{ 'Save' | transloco }} }
            </button>
        </div>
    </div>

    <!-- Form -->
    <div class="flex-auto overflow-y-auto px-6 pt-6 sm:px-10 sm:pt-10">
        <form
            id="detailForm"
            class="form-card"
            [formGroup]="fg"
            (ngSubmit)="onSubmit($event)"
        >
            <div class="layout__container">
                <mat-form-field
                    appearance="outline"
                    class="col-6"
                >
                    <mat-label>
                        {{ 'common.Iso3166Alpha2' | transloco }}
                    </mat-label>
                    <input
                        matInput
                        formControlName="iso3166Alpha2"
                    />
                    <mat-error>
                        {{ formErrors?.iso3166Alpha2 | async }}
                    </mat-error>
                </mat-form-field>

                <mat-form-field
                    appearance="outline"
                    class="col-6"
                >
                    <mat-label>{{ 'common.Name' | transloco }}</mat-label>
                    <input
                        matInput
                        formControlName="name"
                    />
                    <mat-error>{{ formErrors?.name | async }}</mat-error>
                </mat-form-field>

                <mat-slide-toggle
                    class="col-6"
                    formControlName="isActive"
                >
                    {{ 'IsActive' | transloco }}
                </mat-slide-toggle>
            </div>
        </form>
    </div>
</div>
```

---

## List Component Pattern

### Complete Example

```typescript
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import {
    Action,
    ColumnConfig,
    Crumb,
    defaultListImports,
    exportRows,
    GridData,
    GridState,
    log,
    ViewBaseComponent,
} from '@aurora';
import { Observable, lastValueFrom, takeUntil } from 'rxjs';
import {
    countryColumnsConfig,
    countryMainGridListId,
} from '../country.columns-config';
import { CountryService } from '../country.service';
import { CommonCountry } from '../country.types';

@Component({
    selector: 'common-country-list',
    templateUrl: './country-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultListImports],
})
export class CountryListComponent extends ViewBaseComponent {
    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/'] },
        { translation: 'common.Countries' },
    ];

    // Grid configuration
    gridId: string = countryMainGridListId;
    gridData$: Observable<GridData<CommonCountry>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = countryColumnsConfig();

    // Inject services
    private readonly countryService = inject(CountryService);
    private readonly gridColumnsConfigStorageService = inject(
        GridColumnsConfigStorageService,
    );
    private readonly gridFiltersStorageService = inject(
        GridFiltersStorageService,
    );
    private readonly gridStateService = inject(GridStateService);

    async handleAction(action: Action): Promise<void> {
        switch (action?.id) {
            case 'common::country.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters:
                        this.gridFiltersStorageService.getColumnFilterState(
                            this.gridId,
                        ),
                    page: this.gridStateService.getPage(this.gridId),
                    sort: this.gridStateService.getSort(this.gridId),
                    search: this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.countryService.pagination$;
                break;

            case 'common::country.list.pagination':
                await lastValueFrom(
                    this.countryService.pagination({
                        query: action.meta.query,
                    }),
                );
                break;

            case 'common::country.list.edit':
                this.router.navigate([
                    'common',
                    'country',
                    'edit',
                    action.meta.row.id,
                ]);
                break;

            case 'common::country.list.delete':
                const deleteDialog = this.confirmationService.open({
                    title: this.translocoService.translate('common.Country'),
                    message: this.translocoService.translate(
                        'DeletionQuestion',
                        {
                            entity: this.translocoService.translate(
                                'common.Country',
                            ),
                        },
                    ),
                    icon: {
                        show: true,
                        name: 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show: true,
                            label: this.translocoService.translate('Remove'),
                            color: 'warn',
                        },
                        cancel: {
                            show: true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                });

                deleteDialog.afterClosed().subscribe(async (result) => {
                    if (result === 'confirmed') {
                        try {
                            await lastValueFrom(
                                this.countryService.deleteById<CommonCountry>({
                                    id: action.meta.row.id,
                                }),
                            );
                            this.actionService.action({
                                id: 'common::country.list.pagination',
                                isViewAction: false,
                            });
                        } catch (error) {
                            log(`[DEBUG] Error: ${error}`);
                        }
                    }
                });
                break;

            case 'common::country.list.export':
                const rows = await lastValueFrom(
                    this.countryService.get({ query: action.meta.query }),
                );
                exportRows(
                    rows.objects,
                    'countries.' + action.meta.format,
                    ['iso3166Alpha2', 'iso3166Alpha3', 'name'],
                    ['ISO Alpha2', 'ISO Alpha3', 'Name'],
                    action.meta.format,
                );
                break;
        }
    }
}
```

### List Template Pattern

```html
<div class="absolute inset-0 flex w-full flex-col overflow-hidden">
    <!-- Header -->
    <div
        class="bg-card flex flex-0 flex-col border-b p-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-4 dark:bg-transparent"
    >
        <div class="min-w-0 flex-1">
            <au-breadcrumb [data]="breadcrumb"></au-breadcrumb>
            <au-title>
                <mat-icon class="mr-2 icon-size-8">flag</mat-icon>
                {{ 'common.Countries' | transloco }}
            </au-title>
        </div>

        <div class="mt-6 flex flex-shrink-0 items-center sm:ml-4 sm:mt-0">
            <button
                class="ml-3"
                [color]="'primary'"
                [routerLink]="['new']"
                mat-flat-button
            >
                <mat-icon class="mr-2 icon-size-5">add</mat-icon>
                {{ 'common.Country' | transloco }}
            </button>
        </div>
    </div>

    <!-- Grid -->
    <au-grid
        [id]="gridId"
        [columnsConfig$]="columnsConfig$"
        [gridData$]="gridData$"
        [gridState]="gridState"
        [originColumnsConfig]="originColumnsConfig"
    ></au-grid>
</div>
```

---

## Column Configuration Pattern

```typescript
import { ColumnConfig, ColumnDataType } from '@aurora';

export const countryMainGridListId = 'common::country.list.mainGridList';

export const countryColumnsConfig: () => ColumnConfig[] = () => [
    {
        type: ColumnDataType.ACTIONS,
        field: 'Actions',
        sticky: true,
        actions: (row) => [
            {
                id: 'common::country.list.edit',
                translation: 'edit',
                icon: 'mode_edit',
            },
            {
                id: 'common::country.list.delete',
                translation: 'delete',
                icon: 'delete',
            },
        ],
    },
    {
        type: ColumnDataType.CHECKBOX,
        field: 'select',
        translation: 'Selects',
        sticky: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'iso3166Alpha2',
        sort: 'iso3166Alpha2',
        translation: 'common.Iso3166Alpha2',
    },
    {
        type: ColumnDataType.STRING,
        field: 'name',
        sort: 'name',
        translation: 'common.Name',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort: 'isActive',
        translation: 'IsActive',
    },
];
```

### Column Data Types

| Type        | Use For               |
| ----------- | --------------------- |
| `ACTIONS`   | Row action buttons    |
| `CHECKBOX`  | Row selection         |
| `STRING`    | Text fields           |
| `NUMBER`    | Numeric fields        |
| `BOOLEAN`   | Boolean/toggle fields |
| `DATE`      | Date fields           |
| `TIMESTAMP` | DateTime fields       |
| `ARRAY`     | Array/relation fields |
| `ENUM`      | Enum values           |
| `UUID`      | UUID fields           |

---

## GraphQL Service Pattern

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, first, map, tap } from 'rxjs';
import { GraphQLService, GridData, QueryStatement } from '@aurora';
import {
    paginationQuery,
    findByIdQuery,
    createMutation,
    updateByIdMutation,
    deleteByIdMutation,
} from './country.graphql';
import { CommonCountry } from './country.types';

@Injectable({ providedIn: 'root' })
export class CountryService {
    paginationSubject$: BehaviorSubject<GridData<CommonCountry> | null> =
        new BehaviorSubject(null);
    countrySubject$: BehaviorSubject<CommonCountry | null> =
        new BehaviorSubject(null);

    private readonly graphqlService = inject(GraphQLService);

    get pagination$(): Observable<GridData<CommonCountry>> {
        return this.paginationSubject$.asObservable();
    }

    get country$(): Observable<CommonCountry> {
        return this.countrySubject$.asObservable();
    }

    pagination({
        query = {},
        constraint = {},
    }: {
        query?: QueryStatement;
        constraint?: QueryStatement;
    } = {}): Observable<GridData<CommonCountry>> {
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<CommonCountry> }>({
                query: paginationQuery,
                variables: { query, constraint },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data.pagination),
                tap((pagination) => this.paginationSubject$.next(pagination)),
            );
    }

    findById({
        id = null,
        constraint = {},
    }: {
        id?: string;
        constraint?: QueryStatement;
    } = {}): Observable<CommonCountry> {
        return this.graphqlService
            .client()
            .watchQuery<{ object: CommonCountry }>({
                query: findByIdQuery,
                variables: { id, constraint },
            })
            .valueChanges.pipe(
                first(),
                map((result) => result.data.object),
                tap((country) => this.countrySubject$.next(country)),
            );
    }

    create<T>({
        object = null,
    }: {
        object?: CommonCountry;
    } = {}): Observable<T> {
        return this.graphqlService.client().mutate({
            mutation: createMutation,
            variables: { payload: object },
        });
    }

    updateById<T>({
        object = null,
    }: {
        object?: CommonCountry;
    } = {}): Observable<T> {
        return this.graphqlService.client().mutate({
            mutation: updateByIdMutation,
            variables: { payload: object },
        });
    }

    deleteById<T>({
        id = null,
    }: {
        id?: string;
    } = {}): Observable<T> {
        return this.graphqlService.client().mutate({
            mutation: deleteByIdMutation,
            variables: { id },
        });
    }
}
```

---

## Action ID Naming Convention

```
[bounded-context]::[module].[view].[action]

Examples:
- common::country.list.view        // List view initialized
- common::country.list.pagination  // Pagination requested
- common::country.list.edit        // Edit button clicked
- common::country.list.delete      // Delete button clicked
- common::country.list.export      // Export requested
- common::country.detail.new       // New form initialized
- common::country.detail.edit      // Edit form initialized
- common::country.detail.create    // Create mutation
- common::country.detail.update    // Update mutation
```

---

## Form Validation Patterns

### Standard Validators

```typescript
createForm(): void
{
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

createForm(): void
{
    this.fg = this.fb.group({
        password: ['', [
            Validators.required,
            RxwebValidators.password({
                validation: {
                    digit: true,
                    specialCharacter: true,
                    lowerCase: true,
                    upperCase: true,
                },
            }),
        ]],
        repeatPassword: ['', [
            Validators.required,
            RxwebValidators.compare({ fieldName: 'password' }),
        ]],
    });
}
```

### Async Validators

```typescript
// Set async validator for unique check
this.fg
    .get('email')
    .setAsyncValidators(
        uniqueEmailValidator(this.accountService, [existingEmail]),
    );
this.fg.get('email').updateValueAndValidity();
```

---

## Route Resolver Pattern

```typescript
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ActionService, GridData } from '@aurora';
import { CountryService } from './country.service';
import { CommonCountry } from './country.types';

export const countryPaginationResolver: ResolveFn<GridData<CommonCountry>> = (
    route: ActivatedRouteSnapshot,
) => {
    const actionService = inject(ActionService);
    const countryService = inject(CountryService);

    actionService.action({
        id: 'common::country.list.view',
        isViewAction: true,
    });

    return countryService.pagination();
};

export const countryEditResolver: ResolveFn<CommonCountry> = (
    route: ActivatedRouteSnapshot,
) => {
    const actionService = inject(ActionService);
    const countryService = inject(CountryService);

    actionService.action({
        id: 'common::country.detail.edit',
        isViewAction: true,
    });

    return countryService.findById({
        id: route.paramMap.get('id'),
    });
};
```

---

## Best Practices

### ✅ DO

- Extend `ViewDetailComponent` for detail forms
- Extend `ViewBaseComponent` for list views
- Put ALL business logic in `handleAction()` method
- Use `takeUntil(this.unsubscribeAll$)` for subscriptions
- Use `lastValueFrom()` for mutations
- Use `inject()` function for dependency injection
- Use signals for managed objects: `managedObject = signal(null)`
- Follow action ID naming convention
- Use `layout__container` with `col-*` for form layouts

### ❌ DON'T

- Don't put logic in constructor or ngOnInit
- Don't forget to call `Utils.uuid()` for new entities
- Don't use `@ViewChild` decorators (use `viewChild()` signal)
- Don't subscribe without cleanup (use `takeUntil`)
- Don't use `subscribe()` in methods that can be called multiple times — use
  `lastValueFrom()` instead (memory leak: each call creates a subscription that
  lives until component destroy)
- Don't use raw `grid-cols-*` in forms (use `col-*`)
- Don't modify generated files (marked in lock files)

---

## Decision Tree

```
What am I implementing?
│
├─ Form for create/edit entity?
│  └─ ✅ Extend ViewDetailComponent
│      - Override createForm()
│      - Handle new/edit/create/update actions
│
├─ List with grid/table?
│  └─ ✅ Extend ViewBaseComponent
│      - Configure columnsConfig
│      - Handle view/pagination/delete/export actions
│
├─ GraphQL operations?
│  └─ ✅ Create/modify Service
│      - Use graphqlService.client()
│      - Update BehaviorSubjects
│
└─ Custom validation?
   └─ ✅ Add to createForm()
       - Use Validators / RxwebValidators
       - Set async validators in handleAction
```

---

## Related Skills

| Skill                 | When to Use Together                   |
| --------------------- | -------------------------------------- |
| `angular-19`          | Angular 19 patterns, signals, inject() |
| `angular-material-19` | Material components, forms, dialogs    |
| `tailwind-3`          | Styling with Tailwind                  |
| `typescript`          | Strict type patterns                   |
| `aurora-cli`          | Regenerate modules after YAML changes  |
| `aurora-schema`       | Understand entity fields and types     |
| `prettier`            | Format code after modifications        |

---

## Resources

- **Base Components**: `src/@aurora/foundations/`
- **Default Imports**: `src/@aurora/foundations/default-imports.ts`
- **Grid Component**: `src/@aurora/components/grid/`
- **Example Modules**: `src/app/modules/admin/apps/iam/`,
  `src/app/modules/admin/apps/common/`
