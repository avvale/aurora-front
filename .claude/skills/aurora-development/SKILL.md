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
    version: '2.0'
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

**Reference files** (loaded on demand):

- [detail-component.md](detail-component.md) — Full detail component, template, and form patterns
- [list-component.md](list-component.md) — Full list component, template, column config, and export
- [service-patterns.md](service-patterns.md) — GraphQL service, resolver, and validation patterns

**Always combine with:** `prettier`, `typescript`, `angular-19`, `angular-material-19`, `tailwind-3`

---

## Critical Patterns

### ⚠️ Code Formatting (CRITICAL!)

**MANDATORY: Run Prettier after EVERY file modification**

```bash
npx prettier --write <file-path>
```

---

### ⚠️ Component Inheritance (CRITICAL!)

**Detail Components** MUST extend `ViewDetailComponent`:

```typescript
export class CountryDetailComponent extends ViewDetailComponent { }
```

**List Components** MUST extend `ViewBaseComponent`:

```typescript
export class CountryListComponent extends ViewBaseComponent { }
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
            this.fg.get('id').setValue(Utils.uuid());
            break;

        case 'common::country.detail.edit':
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

- `actionService`, `router`, `activatedRoute`, `translocoService`
- `confirmationService`, `snackBar`, `unsubscribeAll$`

**Key Methods:** `handleAction(action)`, `init()`

### ViewDetailComponent (extends ViewFormComponent)

For detail/form components. Adds:

- `fg: FormGroup`, `fb: FormBuilder`, `validationMessagesService`

**Key Methods:** `createForm()`

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

## Column Data Types

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
- Don't use `subscribe()` in methods called multiple times — use `lastValueFrom()` (memory leak)
- Don't use raw `grid-cols-*` in forms (use `col-*`)
- Don't modify generated files (marked in lock files)

---

## Decision Tree

```
What am I implementing?
│
├─ Form for create/edit entity?
│  └─ ✅ Extend ViewDetailComponent → see detail-component.md
│
├─ List with grid/table?
│  └─ ✅ Extend ViewBaseComponent → see list-component.md
│
├─ GraphQL operations?
│  └─ ✅ Create/modify Service → see service-patterns.md
│
└─ Custom validation?
   └─ ✅ Add to createForm() → see service-patterns.md
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
- **Example Modules**: `src/app/modules/admin/apps/iam/`, `src/app/modules/admin/apps/common/`
