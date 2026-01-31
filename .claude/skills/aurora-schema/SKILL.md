---
name: aurora-schema
description: >
    Aurora YAML schema analysis and editing. Validates field names,
    descriptions, types, and module semantics following DDD best practices.
    Trigger: When analyzing or editing *.aurora.yaml files, improving field
    naming, adding descriptions, or validating schema semantics.
license: MIT
metadata:
    author: aurora
    version: '2.0'
    auto_invoke:
        'Analyzing or editing *.aurora.yaml files, schema validation, field
        semantics'
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## When to Use

- Analyzing `*.aurora.yaml` files for quality and consistency
- Editing YAML schemas (creating, updating, or deleting fields)
- Validating field naming conventions and descriptions
- Ensuring module descriptions explain purpose and context

**Reference files** (loaded on demand):

- [type-reference.md](type-reference.md) — Type selection guide, varchar lengths, relationship rules
- [examples.md](examples.md) — Common patterns, analysis workflow, change log template

**Always combine with:** `aurora-cli`, `aurora-project-structure`, `conventional-commits`

---

## Critical Patterns

### Module Description (REQUIRED)

Every `*.aurora.yaml` must have a `description` property **before** `aggregateProperties:`.

```yaml
# ✅ CORRECT
version: 0.0.1
boundedContextName: iam
moduleName: permission
description: >
    Module containing the permissions associated with each bounded context, to
    be used to manage access to each API.
aggregateProperties:
    - name: id
```

**Description should explain:** (1) What the module contains, (2) What it's used for, (3) How it relates to other modules.

---

### Mandatory Fields (REQUIRED in all modules)

**Order:** `id` → `rowId` → ... campos ... → `createdAt` → `updatedAt` → `deletedAt`

```yaml
- name: rowId
  type: bigint
  index: unique
  autoIncrement: true
  nullable: false
  description: >
      Auto-incrementing sequential identifier for internal ordering and legacy compatibility.

- name: createdAt
  type: timestamp
  nullable: true
  description: Timestamp when the record was created. Part of audit trail.

- name: updatedAt
  type: timestamp
  nullable: true
  description: Timestamp when the record was last modified. Part of audit trail.

- name: deletedAt
  type: timestamp
  nullable: true
  description: Soft delete timestamp. NULL = active record.
```

---

### Field Naming Conventions

| Pattern               | Use For             | Examples                                |
| --------------------- | ------------------- | --------------------------------------- |
| `camelCase`           | All field names     | `firstName`, `orderDate`, `totalAmount` |
| `is*`, `has*`, `can*` | Boolean flags       | `isActive`, `hasChildren`, `canEdit`    |
| `*At`                 | Timestamps          | `createdAt`, `updatedAt`, `publishedAt` |
| `*Date`               | Date-only fields    | `birthDate`, `startDate`, `endDate`     |
| `*Id`                 | Foreign keys        | `authorId`, `categoryId`, `parentId`    |
| `sort`                | Display/UI ordering | `sort` (NOT `displayOrder` or `order`)  |

**Anti-patterns:** `stat` → `status`, `dt` → `createdAt`, `qty` → `quantity`, `active` → `isActive`

---

### Field Descriptions (MANDATORY)

**Every field MUST have a description that explains WHY, not WHAT:**

```yaml
# ❌ BAD
- name: price
  type: decimal
  description: The price of the book

# ✅ GOOD
- name: price
  type: decimal
  decimals: [10, 2]
  description: >
      Retail price in the store's base currency. Does not include taxes or
      discounts. Used as base for price calculations.
```

---

### ID Fields (CRITICAL RULE)

**Fields of type `id` MUST NOT have a `length` property.**

```yaml
# ✅ CORRECT
- name: id
  type: id
  primaryKey: true

# ❌ INCORRECT
- name: id
  type: id
  length: 36  # ← DELETE THIS
  primaryKey: true
```

---

### Relationship Fields (CRITICAL RULE)

| Side                      | Has FK? | Use                                      |
| ------------------------- | ------- | ---------------------------------------- |
| Child/Many (invoice-line) | YES     | `type: id` + `relationship` block inside |
| Parent/One (invoice)      | NO      | `type: relationship` (navigation only)   |
| Many-to-many              | NO      | `type: relationship` + `pivot` config    |

**⚠️ NEVER define both `invoiceId` (type: id) AND `invoice` (type: relationship) in the SAME module.**

```yaml
# ✅ child.aurora.yaml - ONLY the FK field
- name: parentId
  type: id
  relationship:
      type: many-to-one
      field: parent
      aggregateName: MyParent
      modulePath: my-context/parent

# ✅ parent.aurora.yaml - ONLY the navigation property
- name: children
  type: relationship
  relationship:
      type: one-to-many
      aggregateName: MyChild
      modulePath: my-context/child
      key: parentId
```

---

### Cross-Module Consistency

Use the same field names across ALL modules:

```yaml
- name: id        # Not: ID, _id, uuid, identifier
- name: createdAt # Not: created, createdDate, createTime
- name: updatedAt # Not: updated, modifiedAt, updateTime
- name: deletedAt # Not: deleted, removedAt, deletionDate
- name: isActive  # Not: active, enabled, status
```

---

### Index Names (63-char limit)

PostgreSQL limits index names to **63 characters**. Use `indexName` with abbreviated name:

```yaml
- name: administrativeAreaLevel1Id
  type: id
  index: index
  indexName: bpp_partner_addr_admin_area_lvl1_id
```

---

## Analysis Checklist

- [ ] Module has `description` before `aggregateProperties`
- [ ] Has `rowId`, `createdAt`, `updatedAt`, `deletedAt`
- [ ] All fields have meaningful descriptions (WHY, not WHAT)
- [ ] Field names follow conventions (camelCase, boolean prefixes)
- [ ] No `id` type fields have `length` property
- [ ] Enum values are documented
- [ ] Types are appropriate for use case → see [type-reference.md](type-reference.md)
- [ ] No duplicate relationship definitions
- [ ] Consistency with similar modules

---

## Commands

```bash
fd -e yaml aurora                                     # Find all Aurora YAMLs
rg -L "^description:" cliter/ -g "*.aurora.yaml"      # Missing module descriptions
rg -L "name: rowId" cliter/ -g "*.aurora.yaml"        # Missing rowId
rg -A2 "type: id" cliter/ -g "*.aurora.yaml" | rg "length:"  # id fields with length (bad)
```

---

## Anti-Patterns

| ❌ Don't                                  | ✅ Do                                             |
| ----------------------------------------- | ------------------------------------------------- |
| Skip module description                   | Always add description before aggregateProperties |
| Skip mandatory fields                     | Always include rowId + timestamps                 |
| Use abbreviations (dt, qty)               | Full words (createdAt, quantity)                  |
| Name booleans without prefix              | Use is*/has*/can* prefix                          |
| Add `length` to `id` type fields          | Never specify length for id type                  |
| Write "The price" as description          | Explain context and usage                         |
| Use `float` for money                     | Use `decimal` with proper scale                   |
| Duplicate relationship definitions        | FK side: `type: id`, inverse: `type: relationship`|

---

## Related Skills

| Skill                      | When to Use Together                                          |
| -------------------------- | ------------------------------------------------------------- |
| `aurora-cli`               | After editing YAML, regenerate with `aurora load back module` |
| `aurora-project-structure` | To locate YAML files in correct directories                   |
| `conventional-commits`     | When committing schema changes                                |
