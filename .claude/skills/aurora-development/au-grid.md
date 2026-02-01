# au-grid — Grid Component

## Column Configuration

```typescript
import { ColumnConfig, ColumnDataType } from '@aurora';

export const countryMainGridListId = 'common::country.list.mainGridList';

export const countryColumnsConfig: () => ColumnConfig[] = () => [
    {
        type: ColumnDataType.ACTIONS, field: 'Actions', sticky: true,
        actions: (row) => [
            { id: 'common::country.list.edit', translation: 'edit', icon: 'mode_edit' },
            { id: 'common::country.list.delete', translation: 'delete', icon: 'delete' },
        ],
    },
    { type: ColumnDataType.CHECKBOX, field: 'select', translation: 'Selects', sticky: true },
    { type: ColumnDataType.STRING, field: 'iso3166Alpha2', sort: 'iso3166Alpha2', translation: 'common.Iso3166Alpha2' },
    { type: ColumnDataType.STRING, field: 'name', sort: 'name', translation: 'common.Name' },
    { type: ColumnDataType.BOOLEAN, field: 'isActive', sort: 'isActive', translation: 'IsActive' },
];
```

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

## Template Usage

```html
<au-grid
    [id]="gridId"
    [columnsConfig$]="columnsConfig$"
    [gridData$]="gridData$"
    [gridState]="gridState"
    [originColumnsConfig]="originColumnsConfig"
>
    <au-grid-translations [for]="gridId">
        @for (columnConfig of originColumnsConfig; track columnConfig.field) {
            <au-grid-column-translation [field]="columnConfig.field">
                {{ t(columnConfig.translation
                    ? columnConfig.translation
                    : columnConfig.field.toPascalCase()) }}
            </au-grid-column-translation>
        }
    </au-grid-translations>
</au-grid>
```

## ⚠️ Custom Grid Actions — Translation Pattern (CRITICAL!)

Custom grid actions use a **short key** for `translation`, NOT a full i18n path.
The `au-grid` resolves action labels via `<au-grid-translations [actionsMenu]>`.

### Step 1: Column config — use a short key

```typescript
actions: (row) => {
    const actions = [
        { id: 'module::entity.list.edit', translation: 'edit', icon: 'mode_edit' },
        { id: 'module::entity.list.delete', translation: 'delete', icon: 'delete' },
    ];

    // Conditional custom action
    if (row.status === SomeTypedEnum.PENDING) {
        actions.push({
            id: 'module::entity.list.provision',
            translation: 'provision',  // ← SHORT KEY, not 'module.Provision'
            icon: 'inventory_2',
        });
    }

    return actions;
},
```

### Step 2: Template — map the short key to the real translation

```html
<au-grid-translations
    [for]="gridId"
    [actionsMenu]="{
        provision: t('productionPlanning.Provision'),
    }"
>
    <!-- column translations... -->
</au-grid-translations>
```

### ⚠️ Common mistake

```typescript
// ❌ WRONG — au-grid won't resolve the full i18n path
{ translation: 'productionPlanning.Provision', icon: 'inventory_2' }

// ✅ CORRECT — short key mapped via au-grid-translations
{ translation: 'provision', icon: 'inventory_2' }
```

## Export Pattern

```typescript
case 'common::country.list.export':
    const rows = await lastValueFrom(this.countryService.get({ query: action.meta.query }));
    const columns = countryColumnsConfig().map(c => c.field);
    const headers = countryColumnsConfig().map(c =>
        this.translocoService.translate(c.translation));
    exportRows(rows.objects, 'countries.' + action.meta.format,
        columns, headers, action.meta.format);
    break;
```
