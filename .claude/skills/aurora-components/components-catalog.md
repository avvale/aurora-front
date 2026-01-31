# Aurora Components — Full Catalog

## Componentes de Entrada de Datos

### au-file-upload

```typescript
import { FileUploadComponent } from '@aurora/components/file-upload';
```

| Input        | Tipo    | Default           | Descripción                |
| ------------ | ------- | ----------------- | -------------------------- |
| `label`      | string  | -                 | Etiqueta del componente    |
| `btnLabel`   | string  | 'Upload'          | Texto del botón            |
| `dropLabel`  | string  | 'Drop files here' | Texto del área de drop     |
| `acceptType` | string  | -                 | Tipos MIME aceptados       |
| `isMultiple` | boolean | false             | Permite múltiples archivos |
| `isDisabled` | boolean | false             | Deshabilita el componente  |
| `files`      | any[]   | []                | Archivos existentes        |

**Outputs:** `onFileDrop`, `onFileOver`, `onFileLeave`, `onFileDownload`, `onFileRemove`

### au-image-input

```typescript
import { ImageInputComponent } from '@aurora/components/image-input';
```

Implementa `ControlValueAccessor`. Use with `formControlName`.

### [auSlug]

```typescript
import { SlugDirective } from '@aurora/components/slug';
```

```html
<input [auSlug]="fg.get('name')" [debounceTime]="300" matInput formControlName="slug" />
```

### au-version-input

```typescript
import { VersionInputComponent } from '@aurora/components/version-input';
```

Input para versiones semánticas (major.minor.patch).

### au-datepicker

```typescript
import { DatepickerComponent } from '@aurora/components/datepicker';
```

| Input        | Tipo    | Default      | Descripción         |
| ------------ | ------- | ------------ | ------------------- |
| `label`      | string  | -            | Etiqueta            |
| `format`     | string  | 'YYYY-MM-DD' | Formato de fecha    |
| `appearance` | string  | 'outline'    | Apariencia Material |
| `required`   | boolean | false        | Campo requerido     |

### au-select-country-prefix

```typescript
import { SelectCountryPrefixComponent, OptionCountryPrefixComponent } from '@aurora/components/select-country-prefix';
```

See [examples/phone-field.md](examples/phone-field.md) for full pattern.

### mat-password-strength

```typescript
import { MatPasswordStrengthModule } from '@aurora/components/mat-password-strength';
```

```html
<mat-password-strength [password]="password.value"></mat-password-strength>
```

---

## Componentes de Selección en Grilla

### au-grid-select-element

```typescript
import { GridSelectElementComponent } from '@aurora/components/grid-select-element';
```

Seleccionar UN elemento de una grilla en un diálogo.

### au-grid-select-multiple-elements

```typescript
import { GridSelectMultipleElementsComponent } from '@aurora/components/grid-select-multiple-elements';
```

Seleccionar MÚLTIPLES elementos con vista de seleccionados. Supports `[hasDragAndDrop]="true"`.

### au-grid-elements-manager

```typescript
import { GridElementsManagerComponent } from '@aurora/components/grid-elements-manager';
```

Gestor completo de elementos con CRUD en diálogo.

---

## Componentes de Archivos

### au-attachments

```typescript
import { AttachmentsComponent } from '@aurora/components/attachments';
```

Gestor completo: drag-drop, crop de imágenes, reordenamiento CDK, múltiples familias.

### au-file-preview-overlay / au-image-preview-overlay

```typescript
import { FilePreviewOverlayComponent } from '@aurora/components/file-preview-overlay';
import { ImagePreviewOverlayComponent } from '@aurora/components/image-preview-overlay';
```

Preview de documentos (PDF, Word, Excel) e imágenes en overlay.

---

## Componentes de Diálogo

### au-dialog

```typescript
import { DialogComponent } from '@aurora/components/dialog';

this.dialog.open(DialogComponent, {
    data: { title: 'Título', icon: 'info', component: MyComponent, componentInputs: { data: myData } },
});
```

### au-template-dialog

```typescript
import { TemplateDialogComponent } from '@aurora/components/template-dialog';
```

### date-range-selector-dialog

```typescript
import { DateRangeSelectorDialogComponent } from '@aurora/components/date-range-selector-dialog';
```

---

## Componentes Visuales

### au-breadcrumb

```typescript
import { BreadcrumbComponent } from '@aurora/components/breadcrumb';
```

### au-chip

```typescript
import { ChipComponent } from '@aurora/components/chip';
```

| Input   | Tipo                           | Default   |
| ------- | ------------------------------ | --------- |
| `size`  | 'tiny' \| 'small' \| 'regular' | 'regular' |
| `color` | string                         | -         |

### au-dot

```typescript
import { DotComponent } from '@aurora/components/dot';
```

### au-kpi-card

```typescript
import { KPICardComponent } from '@aurora/components/kpi-card';
```

### au-split-button

```typescript
import { SplitButtonComponent } from '@aurora/components/split-button';
```

### au-chat-timeline

```typescript
import { ChatTimelineComponent } from '@aurora/components/chat-timeline';
```

---

## Utilidades

### ValidationMessagesService

```typescript
import { ValidationMessagesService } from '@aurora/components/validation-messages';
```

### SnackBarInvalidFormComponent

```typescript
import { SnackBarInvalidFormComponent } from '@aurora/components/snack-bar-invalid-form';
```
