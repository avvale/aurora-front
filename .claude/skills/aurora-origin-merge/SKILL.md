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
  version: '2.0'
  auto_invoke: 'origin file merge, .origin.ts, merge after regeneration, load front module'
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, Task
---

## When to Use

- Aurora CLI creates `.origin.ts` files after front-end regeneration
- You need to merge new schema-generated code into Angular files with custom modifications
- You find `.origin.ts` files after running `aurora load front module`

**Reference files** (loaded on demand):

- [merge-by-file-type.md](merge-by-file-type.md) — Detailed merge rules per file type (GraphQL, detail, list, resolver, service, columns)

**Always combine with:** `aurora-cli`, `aurora-development`, `prettier`

---

## Critical Concept: Why .origin Files Exist

Aurora tracks generated files via SHA1 hash in `*-lock.json`. On regeneration:

```
File hash matches lock? → YES → Overwrite safely (no custom code)
                        → NO  → Create filename.origin.ts (new generated version)
                                 Keep filename.ts intact (your custom code)
```

---

## MANDATORY Step 0: Detect YAML Schema Delta via Git

**Before touching ANY `.origin` file, determine what changed in the YAML schema.**

```bash
# Check if YAML has uncommitted changes
git diff HEAD -- cliter/<bc>/<module>.aurora.yaml
```

- **Diff exists** → YAML not committed → `HEAD` has old version
- **No diff** → YAML already committed → get previous commit

```bash
# Get previous YAML version
# Flujo A (uncommitted):
git show HEAD:cliter/<bc>/<module>.aurora.yaml > /tmp/old-schema.yaml

# Flujo B (committed):
PREV_COMMIT=$(git log -2 --format="%H" -- cliter/<bc>/<module>.aurora.yaml | tail -1)
git show $PREV_COMMIT:cliter/<bc>/<module>.aurora.yaml > /tmp/old-schema.yaml

# Compare
diff /tmp/old-schema.yaml cliter/<bc>/<module>.aurora.yaml
```

**Build three lists:** NEW fields, MODIFIED fields, DELETED fields.

**WHY:** Without the delta, you can't distinguish between a NEW field (must merge) and an INTENTIONALLY REMOVED field (must NOT re-add).

---

## Step-by-Step Merge Workflow

### Step 1: Find All .origin Files

```bash
fd ".origin.ts"
```

### Step 2: For EACH .origin File

Read BOTH files: existing (custom code) and .origin (new generated).

### Step 3: Cross-reference with YAML Delta

- Field in .origin but NOT in custom → Check YAML diff:
    - **New in YAML** → ADD it
    - **Not new** → Developer intentionally removed → **SKIP**
- Field in custom but NOT in .origin → Custom addition → **PRESERVE**
- Field in both but different → Custom modification → **PRESERVE custom**

### Step 4: Merge Using .origin as Implementation Guide

**GOLDEN RULE: The .origin shows HOW Aurora implements each field. Copy that pattern, respecting all custom code.**

Apply in this order:
1. Add/remove imports
2. Add/remove service injections
3. Add/remove observable properties and `init()` assignments
4. Add/remove form controls in `createForm()`
5. Add/remove template elements in .html
6. Add/remove column entries in columns-config
7. Add/remove GraphQL fields and relation queries
8. Add/remove resolver return types
9. **Preserve ALL custom code untouched**

For file-type specific rules → see [merge-by-file-type.md](merge-by-file-type.md)

### Step 5: Delete the .origin File

```bash
rm path/to/file.origin.ts
```

### Step 6: Verify

```bash
fd ".origin.ts"  # Should return empty
```

---

## Propagation Checklists

### NEW field added to YAML

- [ ] GraphQL `fields` + `relationsFields` if relationship
- [ ] Resolvers (imports, `ResolveFn<{}>` return types)
- [ ] Component .ts (imports, service, observable, form control, `init()`)
- [ ] Component .html (mat-form-field)
- [ ] Columns config (new column entry)
- [ ] i18n (en.json and es.json)

**CRITICAL: Partial merge causes runtime errors.**

### DELETED field from YAML

- [ ] Remove from GraphQL `fields` and `relationsFields`
- [ ] Remove relation query params
- [ ] Remove import and return type from resolvers
- [ ] Remove from component .ts and .html
- [ ] Remove column entry
- [ ] Remove i18n keys (optional)

---

## Common Mistakes

| Mistake | Prevention |
| --- | --- |
| Skipping YAML delta (Step 0) | ALWAYS diff YAML via git before merging |
| Re-adding intentionally removed fields | Check YAML delta — if NOT new, don't add |
| Replacing file with .origin entirely | Always compare first |
| Forgetting imports for new fields | Check .origin imports section |
| Leaving .origin files in codebase | Always delete after merge |
| Missing GraphQL field but added in component | Update GraphQL FIRST |
| Not running Prettier after merge | `npx prettier --write <files>` |

---

## Post-Merge Checklist

- [ ] No `.origin.ts` files remain
- [ ] All new imports added
- [ ] Field order matches `.aurora.yaml`
- [ ] All custom logic preserved
- [ ] Intentionally removed fields NOT re-added
- [ ] New i18n keys added
- [ ] Prettier formatted
- [ ] TypeScript compiles (`npx tsc --noEmit`)

---

## Related Skills

| Skill | When to Use Together |
| --- | --- |
| `aurora-cli` | Triggers regeneration that creates .origin files |
| `aurora-development` | Understand component patterns |
| `aurora-schema` | Understanding YAML field order |
| `prettier` | Format files after merge |
