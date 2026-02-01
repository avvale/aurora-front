---
name: aurora-development
description: >
  Expert Angular development for Aurora projects. Covers detail components, list
  components, forms, GraphQL services, action handling, grid configuration, and
  resolvers. Trigger: When implementing Angular components, forms, services, or
  custom logic in Aurora projects.
license: MIT
metadata:
  author: aurora
  version: '3.0'
  auto_invoke:
    'Implementing Angular/Aurora components, forms, services, actions, grids'
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## ⛔ PRE-FLIGHT CHECKLIST — MANDATORY BEFORE WRITING ANY CODE

**STOP. Complete EVERY step before writing a single line of code.**

### 1. Read the reference files for what you're about to use

⛔ **BLOCKING RULE**: You MUST use the `Read` tool to open and read every
reference file listed below BEFORE writing or editing ANY code. If you have not
called `Read` on the required reference files, **STOP and read them now**. The
reference files contain CRITICAL patterns (translations, enums, template
bindings) that CANNOT be guessed — skipping them guarantees mistakes.

#### 1a. Mandatory references by file type

Match EACH file you plan to edit against this table. Call `Read` on ALL its
references. Do NOT skip any file — each has its own rules.

| Target file pattern       | ⛔ Read BEFORE editing                                                      |
| ------------------------- | -------------------------------------------------------------------------- |
| `*-list.component.ts`     | [au-grid.md](au-grid.md), [confirmation-dialog.md](confirmation-dialog.md) |
| `*-list.component.html`   | [au-grid.md](au-grid.md)                                                   |
| `*-detail.component.ts`   | [au-form.md](au-form.md), [confirmation-dialog.md](confirmation-dialog.md) |
| `*-detail.component.html` | [au-form.md](au-form.md)                                                   |
| `*.service.ts`            | [graphql-service.md](graphql-service.md)                                   |
| `*.graphql.ts`            | [graphql-service.md](graphql-service.md)                                   |

#### 1b. Additional references by feature

| Using...                                                                              | ⛔ Read BEFORE editing                            |
| ------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `au-grid` (columns, actions, row actions, custom actions, actionsMenu, column config) | [au-grid.md](au-grid.md)                         |
| Adding custom actions to `au-grid`                                                    | [au-grid.md](au-grid.md)                         |
| `au-grid-select` (single/multi)                                                       | [au-grid-select.md](au-grid-select.md)           |
| Forms (layout, validation)                                                            | [au-form.md](au-form.md)                         |
| Confirmation dialogs                                                                  | [confirmation-dialog.md](confirmation-dialog.md) |
| GraphQL service, resolvers                                                            | [graphql-service.md](graphql-service.md)         |

**Example**: List component with a custom action + delete confirmation →
`Read au-grid.md` + `Read confirmation-dialog.md` BEFORE any `Edit` or `Write`.

### 2. Enum check — NEVER use raw strings for enum values

Before comparing or assigning ANY enum value:

1. Open
   `src/app/modules/admin/apps/{bounded-context}/{bounded-context}.types.ts`
2. Search for the enum `{BoundedContext}{ModuleName}{FieldName}`
3. **If it does NOT exist → CREATE IT** with all values from the `.aurora.yaml`
4. Import and use the enum constant

```typescript
// ✅ CORRECT
import { ProductionPlanningProductionOrderHeaderStatus } from '@apps/production-planning';
if (row.status === ProductionPlanningProductionOrderHeaderStatus.PENDING) { ... }

// ❌ WRONG — will be rejected
if (row.status === 'PENDING') { ... }
```

### 3. Run Prettier after EVERY file modification

```bash
npx prettier --write <file-path>
```

---

## When to Use

**This is the PRIMARY skill for IMPLEMENTING code in Aurora/Angular projects.**

**Always combine with:** `prettier`, `typescript`, `angular-19`,
`angular-material-19`, `tailwind-3`

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
