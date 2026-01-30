---
name: aurora-origin-merge
description: >
  Handles .origin.ts file merges after Aurora CLI regeneration in front-end
  projects. Provides step-by-step workflow to surgically merge new schema code
  into Angular files with custom modifications, preserving all business logic.
  Trigger: After aurora load front module creates .origin files, or when merging
  regenerated code with custom modifications.
license: MIT
metadata:
  author: aurora
  version: '1.0'
  auto_invoke: 'origin file merge, .origin.ts, merge after regeneration, load front module'
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, Task
---

## When to Use

Use this skill when:

- Aurora CLI creates `.origin.ts` files after front-end regeneration
- You need to merge new schema-generated code into Angular files with custom
  modifications
- The CLI prompts "Do you want to manage origin files? (Y/n)"
- You find `.origin.ts` files in the codebase after running
  `aurora load front module`

**Always combine with:**

- `aurora-cli` skill (triggers the regeneration that creates .origin files)
- `aurora-development` skill (understand component patterns and editable zones)
- `prettier` skill (format after merge)

---

## Critical Concept: Why .origin Files Exist

Aurora tracks every generated file via SHA1 hash in `*-lock.json` files. When
you regenerate a module (`aurora load front module -n=bc/module -ft`), Aurora
compares each file's current hash against the stored hash.

```
File hash matches lock?
    |
    YES -> Overwrite safely (no custom code)
    |
    NO  -> File has custom modifications
         |
         +-> Create filename.origin.ts (new generated version)
            Keep filename.ts intact (your custom code)
```

The `.origin.ts` file contains what Aurora WOULD have generated. Your job is to
**surgically extract** only the new schema-related code from `.origin` and merge
it into the existing file.

---

## Step-by-Step Merge Workflow

### Step 1: Find All .origin Files

```bash
fd ".origin.ts"
```

### Step 2: For EACH .origin File

Read BOTH files side by side:

1. **Existing file** (has custom code + old schema)
2. **Origin file** (has NO custom code + new schema)

```bash
bat path/to/file.ts
bat path/to/file.origin.ts
```

### Step 3: Identify the Delta

Compare to find ONLY what's NEW in `.origin` due to schema changes:

- **New imports** (new types, services, modules)
- **New form controls** in `createForm()` method
- **New fields** in GraphQL `fields` template literal
- **New relation queries** in `relationsFields`
- **New column definitions** in columns-config
- **New service injections** in constructor
- **New observable declarations** in class properties
- **New resolver data** in resolver return types
- **New query parameters** in `getRelations` or `findByIdWithRelations`

### Step 4: Merge Surgically

**GOLDEN RULE: Copy ONLY new schema code from .origin -> existing file. NEVER
overwrite custom logic.**

Apply changes in this order:

1. Add new imports (alphabetical order)
2. Add new fields/parameters in the correct position
3. Preserve ALL custom code untouched

### Step 5: Delete the .origin File

```bash
rm path/to/file.origin.ts
```

### Step 6: Verify No .origin Files Remain

```bash
fd ".origin.ts"
# Should return empty
```

---

## Merge Rules by File Type

### GraphQL Files (`*.graphql.origin.ts`)

**Most common merge scenario.** GraphQL files define fields, relation queries,
and mutations.

**Custom zones to PRESERVE:**

- Removed fields from `fields` template (intentionally excluded from queries)
- Removed relation queries from `relationsFields`
- Custom query parameters or constraints
- Modified query variable signatures

**Generated zones to UPDATE from .origin:**

- New fields added to `fields` template literal
- New relation queries in `relationsFields`
- New query variable parameters in `getRelations` or `findByIdWithRelations`
- New mutation input types

**Example — Adding `observations` field to GraphQL:**

```typescript
// .origin has new field in `fields`:
export const fields = `
    rowId
    productionCenterId
    productionCenter {
        id
        rowId
        name
    }
    code
    observations    // <-- NEW from schema
    status
    productId
    ...
`;

// YOUR custom file removed productionCenter intentionally:
export const fields = `
    rowId
    code
    year
    productId
    ...
`;

// MERGED RESULT: add `observations`, keep custom removals:
export const fields = `
    rowId
    code
    observations    // <-- NEW from .origin
    year
    productId
    ...
`;
```

**CRITICAL: When the custom file intentionally removed fields/relations, do NOT
re-add them. Only add genuinely NEW fields that didn't exist before.**

---

### Detail Component Files (`*-detail.component.origin.ts`)

**Heavily customized files.** Components extend `ViewDetailComponent` and
contain form logic, action handlers, and lifecycle hooks.

**Custom zones to PRESERVE:**

- `createForm()` — custom validators, disabled fields, conditional logic
- `handleAction()` — custom action cases, business logic in switch branches
- `init()` — custom subscriptions, data transformations, reactive pipelines
- Custom class properties and methods
- Custom template-related logic (BehaviorSubjects, filtered observables)
- Constructor injected services beyond what Aurora generates

**Generated zones to UPDATE from .origin:**

- New imports (types, services, modules)
- New class properties (observables for new relations)
- New form controls in `createForm()`
- New service injections in constructor
- New observable assignments in `init()`
- New action handler cases in `handleAction()`

**Example — Adding `observations` field to component:**

```typescript
// 1. ADD new import if needed (from .origin)
import {
  ProductionPlanningProduct,
  ProductionPlanningProductionOrderHeader,
  // ... existing imports
} from '@apps/production-planning';

// 2. ADD new form control in createForm() — match YAML field order
createForm(): void {
  this.fg = this.fb.group({
    id: [{ value: '', disabled: true }],
    code: [{ value: '', disabled: true }],  // CUSTOM: disabled
    observations: [''],                      // <-- NEW from .origin
    year: [''],                              // CUSTOM: added field
    productId: ['', Validators.required],
    // ...
  });
}

// 3. ADD new observable in init() if it's a relation
init(): void {
  super.init();
  this.products$ = this.productService.products$;
  this.rooms$ = this.roomService.rooms$;  // <-- NEW if new relation
}
```

**CRITICAL: When adding new form controls, respect the custom file's disabled
states, custom validators, and field order. Insert new fields in the logical
position matching the YAML schema.**

---

### Columns Config Files (`*.columns-config.origin.ts`)

**Custom zones to PRESERVE:**

- Column order (may differ from YAML order for UX reasons)
- Removed columns (intentionally hidden)
- Custom `headerClass`, `cellClass` additions
- Custom `translation` overrides
- Custom `searchableField` modifications
- Custom render functions or formatters

**Generated zones to UPDATE from .origin:**

- New column entries for new fields
- New column type changes

**Example — Adding `observations` column:**

```typescript
// .origin has new column:
{
  type: ColumnDataType.STRING,
  field: 'observations',
  sort: 'observations',
  translation: 'productionPlanning.Observations',
  isUnaccent: true,
},

// YOUR custom file has reordered columns + headerClass additions:
export const columnsConfig = (): ColumnConfig[] => [
  {
    type: ColumnDataType.STRING,
    field: 'code',
    sort: 'code',
    translation: 'Code',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'year',           // CUSTOM: added field
    sort: 'year',
    translation: 'productionPlanning.Year',
  },
  // ...
];

// MERGED: add observations in logical position, keep custom order:
export const columnsConfig = (): ColumnConfig[] => [
  {
    type: ColumnDataType.STRING,
    field: 'code',
    sort: 'code',
    translation: 'Code',
    isUnaccent: true,
  },
  {
    type: ColumnDataType.NUMBER,
    field: 'year',           // CUSTOM: preserved
    sort: 'year',
    translation: 'productionPlanning.Year',
  },
  {
    type: ColumnDataType.STRING,
    field: 'observations',   // <-- NEW from .origin
    sort: 'observations',
    translation: 'productionPlanning.Observations',
    isUnaccent: true,
  },
  // ...
];
```

---

### Resolver Files (`*.resolvers.origin.ts`)

**Custom zones to PRESERVE:**

- Custom `constraint` objects (includes, where clauses)
- Custom data transformations in resolver body
- Modified return type signatures (removed relations)
- Additional service injections
- Custom grid query configurations

**Generated zones to UPDATE from .origin:**

- New service imports
- New relation types in `ResolveFn<{...}>` return type
- New query parameters in `findByIdWithRelations()` call
- New relation data assignments

**Example — Adding new relation to resolver:**

```typescript
// .origin adds `rooms` relation:
export const editResolver: ResolveFn<{
  object: ProductionPlanningEquipment;
  productionPlanningGetProductionCenters: ProductionPlanningProductionCenter[];
  productionPlanningGetRooms: ProductionPlanningRoom[];  // <-- NEW
  productionPlanningGetProducts: ProductionPlanningProduct[];
}> = (route, state) => { ... };

// YOUR custom file has custom constraint:
export const editResolver: ResolveFn<{
  object: ProductionPlanningEquipment;
  productionPlanningGetProducts: ProductionPlanningProduct[];  // CUSTOM: removed centers
}> = (route, state) => {
  // ...
  return service.findByIdWithRelations({
    id: route.paramMap.get('id'),
    constraint: {                    // CUSTOM: added constraint
      include: [{ association: 'product' }],
    },
  });
};

// MERGED: add rooms relation, keep custom constraint and removals:
export const editResolver: ResolveFn<{
  object: ProductionPlanningEquipment;
  productionPlanningGetRooms: ProductionPlanningRoom[];      // <-- NEW from .origin
  productionPlanningGetProducts: ProductionPlanningProduct[];
}> = (route, state) => {
  // ...
  return service.findByIdWithRelations({
    id: route.paramMap.get('id'),
    constraint: {                    // CUSTOM: preserved
      include: [{ association: 'product' }],
    },
  });
};
```

---

### List Component Files (`*-list.component.origin.ts`)

**Custom zones to PRESERVE:**

- Custom action handlers
- Custom toolbar buttons or configurations
- Modified grid settings
- Custom column transformations

**Generated zones to UPDATE from .origin:**

- New service injections
- New column config imports
- New action IDs

---

### Service Files (`*.service.origin.ts`)

**Normally fully generated — should NOT have custom code.**

If custom methods were added, preserve them and merge:

- New GraphQL query/mutation imports
- New method definitions for CRUD operations
- Updated field references

---

## Handling Field Order

**CRITICAL:** Aurora generates fields in the EXACT order defined in
`.aurora.yaml`. When merging new fields:

1. **GraphQL `fields`**: Insert new field in YAML position order
2. **Form controls in `createForm()`**: Insert in YAML order (but respect custom
   disabled/validator modifications)
3. **Column configs**: Use UX-appropriate order (may differ from YAML)
4. **Resolver return types**: Match the order from `.origin`

**How to determine position:** Look at the `.origin` file — Aurora already
generated the correct order. Just match that order when inserting into the
existing file.

---

## Detecting Intentional Removals vs Missing Fields

When the custom file is MISSING something that the `.origin` has, determine:

```
Field exists in .origin but NOT in custom file?
    |
    Was it in the PREVIOUS .origin / generated version?
    |
    YES -> Developer INTENTIONALLY removed it. Do NOT re-add.
    |
    NO  -> It's a NEW field from schema change. ADD it.
```

**How to tell:** If the field name matches something in the YAML that was
recently added (check git log for `.aurora.yaml` changes), it's new. If it's an
existing field that the custom file deliberately omitted, don't re-add it.

**When in doubt:** Ask the developer before re-adding a field that exists in
`.origin` but not in the custom file.

---

## Conflict Resolution

### Scenario: .origin restructures code that custom code also modified

**Example:** You customized `createForm()` to add disabled fields, and the
.origin has a new field in `createForm()`.

**Resolution:**

1. Identify the NEW form controls in .origin (the schema delta)
2. Insert those controls into YOUR customized `createForm()`
3. Keep your disabled states and custom validators intact

### Scenario: Multiple .origin files from one regeneration

Process them ALL. Order doesn't matter since each .origin corresponds to exactly
one existing file. Recommended processing order:

1. **GraphQL files** (defines fields used by all other files)
2. **Service files** (uses GraphQL definitions)
3. **Resolver files** (uses service methods)
4. **Component files** (uses resolvers and services)
5. **Column config files** (independent, can be last)

### Scenario: .origin file for a file you don't recognize

Read both files. If the existing file has no meaningful custom code (just a stale
hash), you can safely replace it entirely with the .origin content.

---

## Post-Merge Checklist

After merging ALL .origin files:

- [ ] No `.origin.ts` files remain (`fd ".origin.ts"` returns empty)
- [ ] All new imports are added (no missing types or services)
- [ ] Field order matches `.aurora.yaml` in GraphQL and form controls
- [ ] All custom logic is preserved (no overwrites)
- [ ] Intentionally removed fields are NOT re-added
- [ ] New i18n keys added to `public/i18n/{module}/en.json` and `es.json`
- [ ] Run Prettier to format (`npx prettier --write <files>`)
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)

---

## Common Mistakes

| Mistake | Consequence | Prevention |
| --- | --- | --- |
| Replacing existing file with .origin entirely | Custom code LOST | Always compare first |
| Re-adding intentionally removed fields/relations | Unnecessary data fetching, broken UX | Check if field was deliberately removed |
| Forgetting to add new import | TypeScript compilation error | Check .origin imports section |
| Wrong field order in `createForm()` | Form layout mismatch with template | Match YAML field order |
| Leaving .origin files in codebase | Confuses future regenerations | Always delete after merge |
| Missing field in GraphQL but added in component | Runtime null errors | Update GraphQL first, then component |
| Forgetting i18n keys for new fields | UI shows raw translation keys | Add to en.json and es.json |
| Not running Prettier after merge | Inconsistent formatting | Run prettier on modified files |
| Answering `n` to origin files prompt | .origin files not created, can't merge | Always answer `Y` |

---

## Commands

```bash
# Find all .origin files
fd ".origin.ts"

# Compare files side by side (VS Code)
code -d path/to/file.ts path/to/file.origin.ts

# Delete all .origin files after merge
fd ".origin.ts" -x rm {}

# Verify no .origin files remain
fd ".origin.ts"

# Check TypeScript compiles
npx tsc --noEmit

# Format merged files
npx prettier --write "src/app/modules/admin/apps/{module-name}/**/*.ts"
```

---

## Decision Tree: How Complex Is This Merge?

```
How many .origin files?
    |
    1 file ------------- Simple merge
    |
    2-5 files ---------- Medium merge (review each)
    |
    5+ files ----------- Complex merge (plan first)

Does the existing file have custom logic?
    |
    NO (just stale hash) -> Replace entirely with .origin content
    |
    YES, simple (one property, one-liner) -> Quick surgical merge
    |
    YES, complex (disabled fields, custom subscriptions) -> Careful merge
    |
    YES, very complex (BehaviorSubjects, reactive pipelines,
      custom action handlers) -> Read ENTIRE file, identify ONLY
      the schema delta, merge minimally
```

---

## Related Skills

| Skill | When to Use Together |
| --- | --- |
| `aurora-cli` | Triggers regeneration that creates .origin files |
| `aurora-development` | Understand component patterns and editable zones |
| `aurora-schema` | Understanding YAML field order for parameter positioning |
| `prettier` | Format files after merge |
| `conventional-commits` | Commit after successful merge |
