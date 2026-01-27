# Aurora Components Skill

Catálogo de componentes custom disponibles en `@aurora/components/` para usar en
formularios y vistas de Aurora.

## Trigger

Usar este skill cuando:

- Necesites saber qué componentes están disponibles para formularios
- Quieras usar un componente específico de Aurora (no Material estándar)
- Estés creando o mejorando formularios de detalle

---

## Componentes de Entrada de Datos

### au-file-upload

Componente drag-and-drop para carga de archivos.

```typescript
import { FileUploadComponent } from '@aurora/components/file-upload';
```

```html
<au-file-upload
    [label]="'Documentos'"
    [btnLabel]="'Subir archivo'"
    [dropLabel]="'Arrastra archivos aquí'"
    [acceptType]="'.pdf,.doc,.docx'"
    [isMultiple]="true"
    [files]="existingFiles"
    (onFileDrop)="onFilesDropped($event)"
    (onFileRemove)="onFileRemoved($event)"
></au-file-upload>
```

**Inputs:**

| Input        | Tipo    | Default           | Descripción                |
| ------------ | ------- | ----------------- | -------------------------- |
| `label`      | string  | -                 | Etiqueta del componente    |
| `btnLabel`   | string  | 'Upload'          | Texto del botón            |
| `dropLabel`  | string  | 'Drop files here' | Texto del área de drop     |
| `acceptType` | string  | -                 | Tipos MIME aceptados       |
| `isMultiple` | boolean | false             | Permite múltiples archivos |
| `isDisabled` | boolean | false             | Deshabilita el componente  |
| `files`      | any[]   | []                | Archivos existentes        |

**Outputs:** `onFileDrop`, `onFileOver`, `onFileLeave`, `onFileDownload`,
`onFileRemove`

---

### au-image-input

Input de imagen con preview. Implementa `ControlValueAccessor`.

```typescript
import { ImageInputComponent } from '@aurora/components/image-input';
```

```html
<au-image-input
    [imgClass]="'w-32 h-32 rounded-full'"
    formControlName="avatar"
></au-image-input>
```

---

### [auSlug]

Directiva que genera slugs automáticos desde otro campo.

```typescript
import { SlugDirective } from '@aurora/components/slug';
```

```html
<mat-form-field>
    <input
        matInput
        formControlName="name"
    />
</mat-form-field>

<mat-form-field>
    <input
        [auSlug]="fg.get('name')"
        [debounceTime]="300"
        matInput
        formControlName="slug"
    />
</mat-form-field>
```

---

### au-version-input

Input para versiones semánticas (major.minor.patch).

```typescript
import { VersionInputComponent } from '@aurora/components/version-input';
```

```html
<mat-form-field>
    <mat-label>Versión</mat-label>
    <au-version-input formControlName="version"></au-version-input>
</mat-form-field>
```

---

### au-datepicker

Datepicker con formato configurable.

```typescript
import { DatepickerComponent } from '@aurora/components/datepicker';
```

```html
<au-datepicker
    [label]="'Fecha de nacimiento'"
    [format]="'DD/MM/YYYY'"
    [required]="true"
    formControlName="birthDate"
></au-datepicker>
```

**Inputs:**

| Input        | Tipo    | Default      | Descripción         |
| ------------ | ------- | ------------ | ------------------- |
| `label`      | string  | -            | Etiqueta            |
| `format`     | string  | 'YYYY-MM-DD' | Formato de fecha    |
| `appearance` | string  | 'outline'    | Apariencia Material |
| `required`   | boolean | false        | Campo requerido     |
| `error`      | string  | -            | Mensaje de error    |

---

### phone-number-format

Componente para números telefónicos internacionales con validación.

```typescript
import { PhoneNumberFormatModule } from '@aurora/components/phone-number-format';
```

Incluye:

- Componente de input con prefijo de país
- Pipe `get-country-prefix`
- Validadores de formato

---

### mat-password-strength

Validador y medidor visual de fortaleza de contraseña.

```typescript
import { MatPasswordStrengthModule } from '@aurora/components/mat-password-strength';
```

```html
<mat-form-field>
    <input
        #password
        type="password"
        matInput
        formControlName="password"
    />
</mat-form-field>
<mat-password-strength [password]="password.value"></mat-password-strength>
```

---

## Componentes de Selección en Grilla

### au-grid-select-element

Seleccionar UN elemento de una grilla en un diálogo.

```typescript
import { GridSelectElementComponent } from '@aurora/components/grid-select-element';
```

```html
<au-grid-select-element
    [gridState]="gridState"
    [columnsConfig]="columnsConfig"
    [gridData]="gridData$ | async"
    [dialogTitle]="'Seleccionar cliente'"
    (action)="onAction($event)"
    (selectedCheckboxRowModelChange)="onSelected($event)"
></au-grid-select-element>
```

---

### au-grid-select-multiple-elements

Seleccionar MÚLTIPLES elementos con vista de seleccionados.

```typescript
import { GridSelectMultipleElementsComponent } from '@aurora/components/grid-select-multiple-elements';
```

```html
<au-grid-select-multiple-elements
    [gridState]="gridState"
    [columnsConfig]="columnsConfig"
    [gridData]="gridData$ | async"
    [selectedItemsColumnsConfig]="selectedColumnsConfig"
    [selectedItemsData]="selectedData"
    [hasDragAndDrop]="true"
    (action)="onAction($event)"
></au-grid-select-multiple-elements>
```

---

### au-grid-elements-manager

Gestor completo de elementos con CRUD en diálogo.

```typescript
import { GridElementsManagerComponent } from '@aurora/components/grid-elements-manager';
```

---

## Componentes de Archivos

### au-attachments

Gestor completo de adjuntos con drag-drop, crop y ordenamiento.

```typescript
import { AttachmentsComponent } from '@aurora/components/attachments';
```

```html
<au-attachments
    [formArrayName]="'attachments'"
    [families]="attachmentFamilies"
    [attachments]="existingAttachments"
    (droppedFiles)="onFilesDropped($event)"
></au-attachments>
```

**Características:**

- Drag-and-drop de archivos
- Reordenamiento con CDK drag
- Crop de imágenes en diálogo
- Soporte para múltiples "familias" de archivos

---

### au-file-preview-overlay

Preview de documentos (PDF, Word, Excel, PowerPoint).

```typescript
import { FilePreviewOverlayComponent } from '@aurora/components/file-preview-overlay';
```

```html
<au-file-preview-overlay
    [file]="{ mimetype: 'application/pdf', url: fileUrl, originFilename: 'doc.pdf' }"
></au-file-preview-overlay>
```

---

### au-image-preview-overlay

Preview de imágenes en overlay con animaciones.

```typescript
import { ImagePreviewOverlayComponent } from '@aurora/components/image-preview-overlay';
```

```html
<au-image-preview-overlay
    [image]="{ url: imageUrl, originFilename: 'foto.jpg' }"
></au-image-preview-overlay>
```

---

## Componentes de Diálogo

### au-dialog

Diálogo genérico para hospedar componentes o templates.

```typescript
import { DialogComponent } from '@aurora/components/dialog';
```

```typescript
this.dialog.open(DialogComponent, {
    data: {
        title: 'Título del diálogo',
        icon: 'info',
        component: MyComponent,
        componentInputs: { data: myData },
    },
});
```

---

### au-template-dialog

Diálogo que renderiza un TemplateRef.

```typescript
import { TemplateDialogComponent } from '@aurora/components/template-dialog';
```

---

### date-range-selector-dialog

Diálogo para seleccionar rangos de fechas.

```typescript
import { DateRangeSelectorDialogComponent } from '@aurora/components/date-range-selector-dialog';
```

---

## Componentes Visuales

### au-breadcrumb

Navegación de migas de pan.

```typescript
import { BreadcrumbComponent } from '@aurora/components/breadcrumb';
```

```html
<au-breadcrumb [data]="breadcrumbs"></au-breadcrumb>
```

---

### au-chip

Etiqueta/tag personalizable.

```typescript
import { ChipComponent } from '@aurora/components/chip';
```

```html
<au-chip
    [size]="'small'"
    [color]="'primary'"
>
    Activo
</au-chip>
<au-chip
    [size]="'tiny'"
    [color]="'#FF5722'"
>
    Custom
</au-chip>
```

**Inputs:**

| Input   | Tipo                           | Default   | Descripción         |
| ------- | ------------------------------ | --------- | ------------------- |
| `size`  | 'tiny' \| 'small' \| 'regular' | 'regular' | Tamaño del chip     |
| `color` | string                         | -         | Color (palette/hex) |

---

### au-dot

Punto indicador de color.

```typescript
import { DotComponent } from '@aurora/components/dot';
```

```html
<au-dot [color]="'#4CAF50'"></au-dot>
<au-dot [matColor]="'warn'"></au-dot>
```

---

### au-kpi-card

Card para mostrar KPIs/métricas.

```typescript
import { KPICardComponent } from '@aurora/components/kpi-card';
```

```html
<au-kpi-card
    [count]="1234"
    [title]="'Ventas'"
    [text]="'Este mes'"
    [color]="'primary'"
    (onClickKpi)="navigateToSales()"
></au-kpi-card>
```

---

### au-split-button

Botón con acción principal + menú desplegable.

```typescript
import { SplitButtonComponent } from '@aurora/components/split-button';
```

```html
<au-split-button
    [color]="'primary'"
    [hasMenu]="true"
    (mainButtonClick)="save()"
>
    <ng-template auSplitButtonMainButton>
        <mat-icon>save</mat-icon>
        Guardar
    </ng-template>
    <ng-template auSplitButtonMenu>
        <button
            mat-menu-item
            (click)="saveAndNew()"
        >
            Guardar y nuevo
        </button>
        <button
            mat-menu-item
            (click)="saveAndClose()"
        >
            Guardar y cerrar
        </button>
    </ng-template>
</au-split-button>
```

---

### au-chat-timeline

Timeline de chat con efecto typewriter.

```typescript
import { ChatTimelineComponent } from '@aurora/components/chat-timeline';
```

```html
<au-chat-timeline
    [chatMessages]="messages"
    [currentAccount]="currentUser"
    [speedTyped]="50"
    (sendMessage)="onSend($event)"
></au-chat-timeline>
```

---

## Utilidades

### ValidationMessagesService

Servicio para mensajes de validación i18n.

```typescript
import { ValidationMessagesService } from '@aurora/components/validation-messages';
```

---

### SnackBarInvalidFormComponent

SnackBar para notificar formularios inválidos.

```typescript
import { SnackBarInvalidFormComponent } from '@aurora/components/snack-bar-invalid-form';
```

```typescript
this.snackBar.openFromComponent(SnackBarInvalidFormComponent, {
    data: { message: 'El formulario tiene errores' },
});
```

---

## Resumen por Categoría

| Categoría      | Componentes                                                  |
| -------------- | ------------------------------------------------------------ |
| **Inputs**     | file-upload, image-input, slug, version, datepicker, phone   |
| **Grillas**    | grid-select-element, grid-select-multiple, grid-manager      |
| **Archivos**   | attachments, file-preview, image-preview                     |
| **Diálogos**   | dialog, template-dialog, date-range-selector                 |
| **Visual**     | breadcrumb, chip, dot, kpi-card, split-button, chat-timeline |
| **Utilidades** | validation-messages, snack-bar-invalid-form                  |
