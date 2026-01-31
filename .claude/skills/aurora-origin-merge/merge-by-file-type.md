# Merge Rules by File Type

## GraphQL Files (`*.graphql.origin.ts`)

**Custom zones to PRESERVE:**
- Removed fields from `fields` template (intentionally excluded)
- Removed relation queries from `relationsFields`
- Custom query parameters or constraints

**Generated zones to UPDATE from .origin:**
- New fields in `fields` template literal
- New relation queries in `relationsFields`
- New query variable parameters
- New mutation input types

**Example — Adding `observations` field:**

```typescript
// .origin has: observations in fields
// Custom file removed productionCenter intentionally

// MERGED: add observations, keep custom removals
export const fields = `
    rowId
    code
    observations    // <-- NEW from .origin
    year
    productId
`;
```

**CRITICAL: Only add genuinely NEW fields. Do NOT re-add intentionally removed ones.**

---

## Detail Component Files (`*-detail.component.origin.ts`)

**Custom zones to PRESERVE:**
- `createForm()` — custom validators, disabled fields, conditional logic
- `handleAction()` — custom action cases, business logic
- `init()` — custom subscriptions, reactive pipelines
- Custom class properties and methods

**Generated zones to UPDATE from .origin:**
- New imports, class properties, form controls, service injections
- New observable assignments in `init()`
- New action handler cases

**When adding new form controls, respect custom disabled states, validators, and field order.**

---

## Columns Config Files (`*.columns-config.origin.ts`)

**Custom zones to PRESERVE:**
- Column order (may differ from YAML for UX)
- Removed columns (intentionally hidden)
- Custom `headerClass`, `cellClass`, `searchableField` modifications

**Generated zones to UPDATE:**
- New column entries for new fields

---

## Resolver Files (`*.resolvers.origin.ts`)

**Custom zones to PRESERVE:**
- Custom `constraint` objects (includes, where clauses)
- Modified return type signatures (removed relations)
- Additional service injections

**Generated zones to UPDATE:**
- New service imports
- New relation types in `ResolveFn<{...}>` return type
- New query parameters in `findByIdWithRelations()` call

---

## List Component Files (`*-list.component.origin.ts`)

**Custom zones to PRESERVE:**
- Custom action handlers, toolbar buttons, grid settings

**Generated zones to UPDATE:**
- New service injections, column config imports, action IDs

---

## Service Files (`*.service.origin.ts`)

**Normally fully generated — should NOT have custom code.**

If custom methods exist, preserve them and merge:
- New GraphQL query/mutation imports
- New method definitions

---

## Handling Field Order

**CRITICAL:** Aurora generates fields in EXACT YAML order. When merging:

1. **GraphQL `fields`**: YAML position order
2. **Form controls in `createForm()`**: YAML order (respect custom disabled/validators)
3. **Column configs**: UX-appropriate order (may differ from YAML)
4. **Resolver return types**: Match .origin order

---

## Conflict Resolution

### .origin restructures code that custom code also modified

1. Identify NEW form controls in .origin (schema delta)
2. Insert into YOUR customized file
3. Keep disabled states and custom validators intact

### Field in .origin but NOT in existing file

Check YAML delta:
- **New in YAML** → Merge from .origin
- **Not new** → Intentionally removed → **DO NOT add**

### Multiple .origin files from one regeneration

Process ALL in this order:
1. GraphQL files → 2. Services → 3. Resolvers → 4. Components → 5. Column configs

### Unrecognized .origin file

If existing file has no meaningful custom code, replace entirely with .origin content.
