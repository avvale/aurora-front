# Aurora Components Skill

Catálogo de componentes custom disponibles en `@aurora/components/` para usar en
formularios y vistas de Aurora.

## Trigger

Usar este skill cuando:

- Necesites saber qué componentes están disponibles para formularios
- Quieras usar un componente específico de Aurora (no Material estándar)
- Estés creando o mejorando formularios de detalle

**Reference files** (loaded on demand):

- [components-catalog.md](components-catalog.md) — Detailed component docs with all inputs/outputs and examples
- [examples/phone-field.md](examples/phone-field.md) — Phone field with country prefix pattern

---

## Patrones por Contexto YAML

| Patrón YAML                                          | Componente                 | Docs                                     |
| ---------------------------------------------------- | -------------------------- | ---------------------------------------- |
| `phone` + `phoneCountryPrefix` + `phoneSanitized`    | `au-select-country-prefix` | [phone-field.md](examples/phone-field.md) |
| `mobile` + `mobileCountryPrefix` + `mobileSanitized` | `au-select-country-prefix` | [phone-field.md](examples/phone-field.md) |

---

## Quick Reference by Category

| Categoría      | Componentes                                                                |
| -------------- | -------------------------------------------------------------------------- |
| **Inputs**     | `au-file-upload`, `au-image-input`, `[auSlug]`, `au-version-input`, `au-datepicker`, `au-select-country-prefix` |
| **Grillas**    | `au-grid-select-element`, `au-grid-select-multiple-elements`, `au-grid-elements-manager` |
| **Archivos**   | `au-attachments`, `au-file-preview-overlay`, `au-image-preview-overlay`    |
| **Diálogos**   | `au-dialog`, `au-template-dialog`, `date-range-selector-dialog`            |
| **Visual**     | `au-breadcrumb`, `au-chip`, `au-dot`, `au-kpi-card`, `au-split-button`, `au-chat-timeline` |
| **Utilidades** | `ValidationMessagesService`, `SnackBarInvalidFormComponent`                |

---

## Most Used Components — Quick Snippets

### au-file-upload

```html
<au-file-upload [label]="'Documentos'" [btnLabel]="'Subir archivo'"
    [acceptType]="'.pdf,.doc'" [isMultiple]="true"
    (onFileDrop)="onFilesDropped($event)"></au-file-upload>
```

### au-image-input

```html
<au-image-input [imgClass]="'w-32 h-32 rounded-full'" formControlName="avatar"></au-image-input>
```

### [auSlug]

```html
<input [auSlug]="fg.get('name')" [debounceTime]="300" matInput formControlName="slug" />
```

### au-chip

```html
<au-chip [size]="'small'" [color]="'primary'">Activo</au-chip>
```

### au-split-button

```html
<au-split-button [color]="'primary'" [hasMenu]="true" (mainButtonClick)="save()">
    <ng-template auSplitButtonMainButton><mat-icon>save</mat-icon> Guardar</ng-template>
    <ng-template auSplitButtonMenu>
        <button mat-menu-item (click)="saveAndNew()">Guardar y nuevo</button>
    </ng-template>
</au-split-button>
```

### SnackBarInvalidFormComponent

```typescript
this.snackBar.openFromComponent(SnackBarInvalidFormComponent, {
    data: { message: 'El formulario tiene errores' },
});
```

For full component documentation with all inputs/outputs → see [components-catalog.md](components-catalog.md)
