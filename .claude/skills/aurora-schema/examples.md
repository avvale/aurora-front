# Aurora Schema Examples & Workflows

## Common Field Patterns

### Status Fields with Enum

```yaml
- name: status
  type: enum
  enumOptions: [PENDING, APPROVED, REJECTED, CANCELLED]
  defaultValue: PENDING
  description: >
      Workflow status. PENDING: Awaiting review. APPROVED: Accepted and active.
      REJECTED: Denied (see rejectionReason). CANCELLED: Withdrawn by user.
```

### Money Fields

```yaml
- name: amount
  type: decimal
  decimals: [12, 2]
  description: >
      Monetary amount with 2 decimal places. Currency determined by currencyCode field.

- name: currencyCode
  type: char
  length: 3
  description: ISO 4217 currency code (USD, EUR, GBP).
```

### Sort Order Fields

```yaml
- name: sort
  type: smallint
  unsigned: true
  nullable: true
  description: >
      Sort order for UI display. Lower numbers appear first. NULL = no preference.
```

### URL-Friendly Slugs

```yaml
- name: slug
  type: varchar
  maxLength: 2046
  index: unique
  description: >
      URL-friendly identifier. Lowercase, hyphenated. Auto-generated from name.
      Example: "my-awesome-product".
```

## Analysis Report Template

```markdown
## Analysis of [module].aurora.yaml

### Summary
- Total fields: X
- Fields without description: Y
- Naming improvements needed: Z
- Module has description: Yes/No

### Missing Mandatory Fields ❌
| Field     | Position          | Status  |
| --------- | ----------------- | ------- |
| rowId     | After id          | Missing |
| createdAt | End of properties | OK      |

### Fields Without Description ❌
| Field | Type | Suggested Description |
| ----- | ---- | --------------------- |

### Naming Improvements ⚠️
| Current | Suggested | Reason                 |
| ------- | --------- | ---------------------- |
| dt      | createdAt | Ambiguous abbreviation |
```

## Change Log Template

```markdown
## Schema Changes - YYYY-MM-DD

### tesla/model.aurora.yaml

#### Created
- `isActive` (boolean) - Flag to indicate if model is currently available

#### Modified
- `status`: Changed type from `varchar` to `enum` with options [ACTIVE, INACTIVE]

#### Deleted
- `legacyCode` (varchar) - Removed after confirming no dependencies

#### Fixed
- `id`: Removed `length: 36` property
```

## Editing Workflow

### Creating Fields Checklist
- [ ] Name follows camelCase convention
- [ ] Boolean names have is*/has*/can* prefix
- [ ] Type is appropriate for use case
- [ ] Description explains context and usage
- [ ] No `length` property on `id` type fields
- [ ] Consistent with similar fields in other modules

### Deleting Fields
Always check dependencies first:
```bash
rg "fieldName" cliter/ -g "*.aurora.yaml"
```
