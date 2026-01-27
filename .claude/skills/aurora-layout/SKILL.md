# Aurora Layout Skill

Reglas de maquetación y patrones de diseño para formularios y vistas de Aurora.

## Trigger

Usar este skill cuando:

- Generes o modifiques formularios de detalle
- Necesites mejorar la maquetación de un componente existente
- Quieras reorganizar campos en un formulario

---

## Sistema de Grid

Aurora usa un sistema de grid de 12 columnas con clases `col-X`:

| Clase    | Ancho  | Uso típico                                  |
| -------- | ------ | ------------------------------------------- |
| `col-2`  | 16.66% | Prefijos (tel), códigos muy cortos          |
| `col-3`  | 25%    | Checkboxes, toggles, campos tiny            |
| `col-4`  | 33.33% | Códigos, tipos, estados, enums, fechas      |
| `col-6`  | 50%    | Email, teléfono, campos medios              |
| `col-8`  | 66.66% | Nombres, direcciones, campos largos         |
| `col-12` | 100%   | Textareas, descripciones, campos muy largos |

### Reglas de Ancho por Tipo de Campo

```
ID/UUID         → col-4 (usualmente readonly o hidden)
Código          → col-4
Nombre          → col-8 o col-6
Descripción     → col-12
Email           → col-6
Website/URL     → col-6
Teléfono        → col-4 (+ col-2 para prefijo)
Fecha           → col-4
Enum/Select     → col-4
Boolean/Check   → col-3 o col-4
Precio/Monto    → col-4
Textarea        → col-12
```

---

## Agrupación Semántica

Agrupar campos por dominio lógico, NO por tipo de dato.

### Orden de Secciones (de arriba a abajo)

1. **Identificación** - ID externo, código, tipo
2. **Datos principales** - Nombre, descripción, campos de negocio core
3. **Contacto** - Email, teléfono, website, redes
4. **Ubicación** - Dirección, ciudad, país, coordenadas
5. **Configuración** - Flags, opciones, settings
6. **Estado** - isActive, status, fechas de auditoría
7. **Relaciones** - Selects de entidades relacionadas

### Ejemplo de Agrupación

```
┌─────────────────────────────────────────────────────────────┐
│ IDENTIFICACIÓN                                              │
│ [External ID: col-4] [Code: col-4] [Type: col-4]           │
├─────────────────────────────────────────────────────────────┤
│ DATOS DEL PARTNER                                           │
│ [Name: col-8] [TIN: col-4]                                 │
├─────────────────────────────────────────────────────────────┤
│ CONTACTO                                                    │
│ [Email: col-6] [Website: col-6]                            │
│ [Prefix: col-2] [Phone: col-4] [☑ Active: col-3]          │
└─────────────────────────────────────────────────────────────┘
```

---

## Secciones con mat-toolbar

Usar `mat-toolbar` para separar secciones en formularios con 6+ campos.

### Patrón de Sección

```html
<!-- Sección con ícono -->
<mat-toolbar class="col-12 mb-2 mt-4 border-b p-0">
    <mat-icon
        class="mr-3"
        svgIcon="mat_solid:badge"
    ></mat-icon>
    <span>{{ t('module.SectionName') }}</span>
</mat-toolbar>

<!-- Campos de la sección -->
<mat-form-field
    appearance="outline"
    class="col-4"
>
    ...
</mat-form-field>
```

### Íconos Recomendados por Sección

| Sección        | Ícono SVG                  |
| -------------- | -------------------------- |
| Identificación | `mat_solid:badge`          |
| Datos          | `mat_solid:business`       |
| Contacto       | `mat_solid:contact_phone`  |
| Ubicación      | `mat_solid:location_on`    |
| Configuración  | `mat_solid:settings`       |
| Estado         | `mat_solid:toggle_on`      |
| Fechas         | `mat_solid:calendar_today` |
| Archivos       | `mat_solid:attach_file`    |
| Notas          | `mat_solid:notes`          |

---

## Cuándo Usar Secciones

### SÍ usar secciones cuando:

- El formulario tiene **6 o más campos**
- Los campos pertenecen a **dominios semánticos distintos**
- Quieres mejorar la **escaneabilidad** del formulario
- Hay campos de **contacto + datos + config** mezclados

### NO usar secciones cuando:

- El formulario tiene **menos de 6 campos**
- Todos los campos son del **mismo dominio**
- Es un formulario de **filtros rápidos**
- Es un **diálogo pequeño**

---

## Patrones de Formulario

### 1. Formulario Simple (< 6 campos)

Sin secciones, grid directo:

```html
<div class="layout__container">
    <mat-form-field class="col-4"><!-- código --></mat-form-field>
    <mat-form-field class="col-8"><!-- nombre --></mat-form-field>
    <mat-form-field class="col-12"><!-- descripción --></mat-form-field>
    <div class="col-4 pt-5">
        <mat-checkbox>Activo</mat-checkbox>
    </div>
</div>
```

### 2. Formulario con Secciones (6-15 campos)

Agrupar por dominio:

```html
<div class="layout__container">
    <!-- Sección 1 -->
    <mat-toolbar class="col-12 mb-2 border-b p-0">...</mat-toolbar>
    <!-- campos de sección 1 -->

    <!-- Sección 2 -->
    <mat-toolbar class="col-12 mb-2 mt-4 border-b p-0">...</mat-toolbar>
    <!-- campos de sección 2 -->
</div>
```

### 3. Formulario Master-Detail

Usar tabs o panels expandibles para relaciones:

```html
<mat-tab-group>
    <mat-tab label="Datos generales">
        <!-- formulario principal -->
    </mat-tab>
    <mat-tab label="Contactos">
        <!-- grilla de contactos -->
    </mat-tab>
    <mat-tab label="Direcciones">
        <!-- grilla de direcciones -->
    </mat-tab>
</mat-tab-group>
```

### 4. Formulario Wizard

Usar `mat-stepper` para procesos largos:

```html
<mat-stepper>
    <mat-step label="Datos básicos">...</mat-step>
    <mat-step label="Configuración">...</mat-step>
    <mat-step label="Confirmación">...</mat-step>
</mat-stepper>
```

---

## Alineación de Campos

### Checkboxes y Toggles

Alinear verticalmente con padding-top:

```html
<div class="col-4 flex items-center pt-2">
    <mat-checkbox formControlName="isActive">
        {{ t('module.IsActive') }}
    </mat-checkbox>
</div>
```

### Campos con Diferentes Alturas

Usar `flex items-center` para alinear:

```html
<mat-form-field class="col-4">...</mat-form-field>
<mat-form-field class="col-4">...</mat-form-field>
<div class="col-4 flex items-center">
    <mat-slide-toggle>Opción</mat-slide-toggle>
</div>
```

---

## Campos Especiales

### Teléfono con Prefijo

```html
<mat-form-field class="col-2">
    <mat-label>Prefijo</mat-label>
    <input
        matInput
        formControlName="phonePrefix"
        placeholder="+1"
    />
</mat-form-field>
<mat-form-field class="col-4">
    <mat-label>Teléfono</mat-label>
    <input
        type="tel"
        matInput
        formControlName="phone"
    />
</mat-form-field>
```

### Enum como Multi-Select

```html
<mat-form-field class="col-4">
    <mat-label>Tipo</mat-label>
    <mat-select
        formControlName="type"
        multiple
        required
    >
        @for (type of typeOptions | keyvalue; track type.key) {
        <mat-option [value]="type.key">
            {{ t('module.TypeEnum.' + type.value) }}
        </mat-option>
        }
    </mat-select>
</mat-form-field>
```

### Campos Calculados/Readonly

Ocultar del formulario o mostrar como texto:

```html
<!-- Opción 1: Ocultar (usar webComponent.isDetailHidden en YAML) -->

<!-- Opción 2: Mostrar como readonly -->
<mat-form-field class="col-4">
    <input
        [value]="calculatedValue"
        matInput
        readonly
    />
</mat-form-field>
```

---

## Responsividad

El sistema de grid es responsive. Para casos especiales:

```html
<!-- Mobile: full width, Desktop: col-4 -->
<mat-form-field class="col-12 sm:col-4">...</mat-form-field>
```

---

## Checklist de Maquetación

Antes de terminar un formulario, verificar:

- [ ] Campos agrupados por dominio semántico
- [ ] Anchos apropiados según tipo de dato
- [ ] Secciones si hay 6+ campos de distintos dominios
- [ ] Checkboxes alineados verticalmente
- [ ] Campos relacionados en la misma fila
- [ ] Campos calculados ocultos o readonly
- [ ] Enums como selects con traducciones
- [ ] Prefijos de teléfono separados

---

## Formularios de Referencia

Buenos ejemplos de maquetación en el proyecto:

- `iam/account/account-detail.component.html` - Secciones con toolbar
- `o-auth/client/client-detail.component.html` - Multi-select de scopes
