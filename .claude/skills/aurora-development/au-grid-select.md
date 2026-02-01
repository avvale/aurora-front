# au-grid-select — Grid Select Components

Two components for selecting related entities via dialog grids:

- **`au-grid-select-element`** — single selection
- **`au-grid-select-multiple-elements`** — multiple selection (most common)

Both open a dialog with a full `au-grid` for picking items, and display the
selected items in a main grid.

---

## au-grid-select-multiple-elements (Multi-Select)

### Template Usage

```html
<au-grid-select-multiple-elements
    #permissionsGridSelectMultipleElements
    class="col-12 mt-5"
    [label]="t('iam.Permissions')"
    [gridId]="permissionRoleGridId"
    [originColumnsConfig]="originPermissionRoleColumnsConfig"
    [columnsConfig]="permissionRoleColumnsConfig$ | async"
    [gridData]="permissionRoleGridData$ | async"
    [gridState]="permissionRoleGridState"
    [dialogColumnsConfig]="permissionsColumnsConfig$ | async"
    [dialogGridData]="permissionsGridData$ | async"
    [dialogGridId]="permissionsGridId"
    [dialogOriginColumnsConfig]="originPermissionsColumnsConfig"
    [selectedCheckboxRowModel]="selectedCheckboxRowModel"
    (dialogSelectedCheckboxRowModelChange)="handleDialogPermissionsRowsSectionChange($event)"
    (selectedCheckboxRowModelChange)="handlePermissionsRowsSectionChange($event)"
>
    <!-- Translations for the MAIN grid (selected items) -->
    <au-grid-translations
        [for]="permissionRoleGridId"
        [actionsMenu]="{ unlink: t('Unlink') }"
    >
        @for (columnConfig of originPermissionRoleColumnsConfig; track columnConfig.field) {
            <au-grid-column-translation [field]="columnConfig.field">
                {{ t(columnConfig.translation
                    ? columnConfig.translation
                    : columnConfig.field.toPascalCase()) }}
            </au-grid-column-translation>
        }
    </au-grid-translations>

    <!-- Translations for the DIALOG grid (available items) -->
    <au-grid-translations [for]="permissionsGridId">
        @for (columnConfig of originPermissionsColumnsConfig; track columnConfig.field) {
            <au-grid-column-translation [field]="columnConfig.field">
                {{ t(columnConfig.translation
                    ? columnConfig.translation
                    : columnConfig.field.toPascalCase()) }}
            </au-grid-column-translation>
        }
    </au-grid-translations>

    <!-- Custom header for MAIN grid (add + remove buttons) -->
    <ng-template auGridSelectMultipleCustomHeaderTemplate position="left">
        <div class="flex items-center justify-start">
            <button class="mr-2" mat-icon-button
                    (click)="handleOpenPermissionsDialog()">
                <mat-icon svgIcon="mat_solid:add"></mat-icon>
            </button>
            <button [disabled]="permissionRoleSelectedRows.length === 0"
                    mat-flat-button
                    (click)="handleRemovePermissionsSelected()">
                <mat-icon class="mr-2" svgIcon="mat_solid:link_off"></mat-icon>
                {{ t('RemoveSelected') }}
            </button>
        </div>
    </ng-template>

    <!-- Custom header for DIALOG grid (add selected button) -->
    <ng-template auGridSelectMultipleCustomHeaderDialogTemplate position="left">
        <button [disabled]="permissionsSelectedRows.length === 0"
                mat-flat-button
                (click)="handleAddPermissionsSelected()">
            <mat-icon class="mr-2">add_link</mat-icon>
            {{ t('AddSelected') }}
        </button>
    </ng-template>
</au-grid-select-multiple-elements>
```

### TypeScript Setup

```typescript
@ViewChild('permissionsGridSelectMultipleElements')
permissionsComponent: GridSelectMultipleElementsComponent;

// Grid IDs
permissionRoleGridId = 'iam::role.detail.permissionRoleGrid';
permissionsGridId = 'iam::role.detail.permissionsGrid';

// Grid data
permissionRoleGridData$: Observable<GridData<IamPermissionRole>>;
permissionsGridData$: Observable<GridData<IamPermission>>;
permissionRoleGridState: GridState = {};

// Selected rows tracking
permissionRoleSelectedRows: IamPermissionRole[] = [];
permissionsSelectedRows: IamPermission[] = [];

// ⚠️ SelectionModel with custom equality — compare by relationship ID
selectedCheckboxRowModel = new SelectionModel<any>(
    true,       // multiple selection
    [],         // initial selection
    true,       // emit changes
    (a: IamPermissionRole, b: IamPermissionRole) =>
        a.permissionId === b.permissionId,  // equality comparator
);

// Column config for main grid (selected items) — with unlink action
originPermissionRoleColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.ACTIONS,
        field: 'actions',
        sticky: true,
        actions: (row) => [{
            id: 'iam::role.detail.removePermissionRole',
            isViewAction: false,
            translation: 'unlink',   // ← short key, mapped via [actionsMenu]
            icon: 'link_off',
        }],
    },
    {
        type: ColumnDataType.CHECKBOX,
        field: 'select',
        translation: 'Selects',
        sticky: true,
    },
    ...permissionRoleColumnsConfig({ translator: this.translocoService }),
];
```

### Event Handlers

```typescript
// Main grid: track selected rows
handlePermissionsRowsSectionChange(
    $event: SelectionChange<IamPermissionRole>,
): void {
    this.permissionRoleSelectedRows = $event.source.selected;
}

// Dialog: track selected rows
handleDialogPermissionsRowsSectionChange(
    $event: SelectionChange<IamPermission>,
): void {
    this.permissionsSelectedRows = $event.source.selected;
}

// Open dialog — load available items first, then open
handleOpenPermissionsDialog(): void {
    this.actionService.action({
        id: 'iam::role.detail.permissionsPagination',
        isViewAction: false,
        meta: { query: /* pagination query */ },
        afterRunAction: () => {
            this.permissionsComponent.handleElementsDialog();
        },
    });
}

// Add selected items from dialog
handleAddPermissionsSelected(): void {
    if (this.permissionsSelectedRows.length > 0) {
        this.actionService.action({
            id: 'iam::role.detail.addPermissionsRoles',
            isViewAction: false,
            meta: { rows: this.permissionsSelectedRows },
        });
        this.permissionsComponent.elementsDialogRef.close();
    }
}

// Remove selected items from main grid
handleRemovePermissionsSelected(): void {
    if (this.permissionRoleSelectedRows.length > 0) {
        this.actionService.action({
            id: 'iam::role.detail.removePermissionsRoles',
            isViewAction: false,
            meta: { rows: this.permissionRoleSelectedRows },
        });
    }
}
```

### Data Initialization (in handleAction)

```typescript
case 'iam::role.detail.edit':
    // Set grid data observables
    this.permissionRoleGridData$ = this.permissionRoleService.pagination$;
    this.permissionsGridData$ = this.permissionService.pagination$;

    // Set grid state
    this.permissionRoleGridState = {
        columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.permissionRoleGridId),
        page: this.gridStateService.getPage(this.permissionRoleGridId),
        sort: this.gridStateService.getSort(this.permissionRoleGridId),
        search: this.gridStateService.getSearchState(this.permissionRoleGridId),
    };
    break;
```

---

## Key Inputs

### Main Grid (selected items)

| Input                        | Type                 | Description                          |
| ---------------------------- | -------------------- | ------------------------------------ |
| `label`                      | `string`             | Label displayed above the grid       |
| `gridId`                     | `string`             | Unique grid identifier               |
| `originColumnsConfig`        | `ColumnConfig[]`     | Original column configuration        |
| `columnsConfig`              | `ColumnConfig[]`     | Current column configuration         |
| `gridData`                   | `GridData`           | Data source for selected items       |
| `gridState`                  | `GridState`          | Grid state (filters, sort, page)     |
| `selectedCheckboxRowModel`   | `SelectionModel`     | Row selection model                  |
| `hasPagination`              | `boolean`            | Enable pagination (default: `true`)  |
| `hasDragAndDrop`             | `boolean`            | Enable drag-drop reorder (`false`)   |

### Dialog Grid (available items)

| Input                        | Type                 | Description                          |
| ---------------------------- | -------------------- | ------------------------------------ |
| `dialogTitle`                | `string`             | Dialog title                         |
| `dialogGridId`               | `string`             | Dialog grid identifier               |
| `dialogOriginColumnsConfig`  | `ColumnConfig[]`     | Dialog column configuration          |
| `dialogColumnsConfig`        | `ColumnConfig[]`     | Dialog current column config         |
| `dialogGridData`             | `GridData`           | Data source for available items      |
| `dialogSelectedRows`         | `any[]`              | Pre-selected rows in dialog          |

---

## Template Directives

| Directive                                          | Applies to   | Purpose               |
| -------------------------------------------------- | ------------ | --------------------- |
| `auGridSelectMultipleCustomHeaderTemplate`          | Main grid    | Custom header buttons  |
| `auGridSelectMultipleCustomHeaderDialogTemplate`    | Dialog grid  | Custom dialog buttons  |
| `auGridSelectMultipleCellValueTemplate`             | Main grid    | Custom cell rendering  |
| `auGridSelectMultipleCellValueDialogTemplate`       | Dialog grid  | Custom cell rendering  |

All accept `position` input: `'left'` or `'right'`.

---

## ⚠️ Common Mistakes

1. **Forgetting the equality comparator** in `SelectionModel` — without it, row
   identity uses reference equality and selections won't match after data
   refreshes
2. **Not loading dialog data before opening** — call the pagination action
   FIRST, then open the dialog in `afterRunAction`
3. **Missing `au-grid-translations`** — you need TWO: one for the main grid
   (`[for]="gridId"`) and one for the dialog (`[for]="dialogGridId"`)
4. **Using full i18n paths in action translations** — use short keys +
   `[actionsMenu]` mapping (same rule as `au-grid.md`)

---

## au-grid-select-element (Single Select)

Simpler version with fewer inputs. Same dialog pattern but selects one item.

```typescript
@Input() id: string = 'grid';
@Input() dialogTitle: string;
@Input() gridState: GridState;
@Input() columnsConfig: ColumnConfig[];
@Input() originColumnsConfig: ColumnConfig[];
@Input() selectedRows: any[] = [];
@Input() gridData: GridData;
```

Opens dialog via `openDialog()` method. Emits `dialogClose` and
`selectedCheckboxRowModelChange` for handling selection.
