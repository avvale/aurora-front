---
name: aurora-ux
description: >
    Evalúa y mejora la experiencia de usuario de formularios Aurora. Trigger:
    Cuando necesites evaluar UX, reordenar campos, o revisar el flujo de un
    formulario.
license: MIT
metadata:
    author: aurora
    version: '1.0'
    auto_invoke: 'UX review, field ordering, form flow, user experience'
allowed-tools: Read, Edit, Glob, Grep
---

# Aurora UX Skill

Reglas de experiencia de usuario para formularios Aurora. Este skill complementa
`aurora-layout` (estructura visual) con el enfoque en el FLUJO COGNITIVO del
usuario.

## Cuándo Usar

- Evaluar la experiencia de usuario de un formulario existente
- Mejorar el flujo de completado de un formulario
- Reordenar campos para optimizar la UX
- Revisar si un formulario sigue buenas prácticas de usabilidad

---

## Principios de Ordenación de Campos

### 1. Campos Requeridos Primero

Dentro de cada sección semántica, los campos `required` van ANTES que los
opcionales.

```
✅ CORRECTO                    ❌ INCORRECTO
┌─────────────────────┐        ┌─────────────────────┐
│ Name* (required)    │        │ Description         │
│ Code* (required)    │        │ Notes               │
│ Description         │        │ Name* (required)    │
│ Notes               │        │ Code* (required)    │
└─────────────────────┘        └─────────────────────┘
```

### 2. Flujo Natural de Información

Orden lógico para el usuario - lo que "ya sabe" antes de lo que "debe decidir":

```
1. Identificadores     → Código, ID externo (lo trae de otro sistema)
2. Datos básicos       → Nombre, descripción (lo sabe de antemano)
3. Clasificación       → Tipo, categoría (debe elegir)
4. Detalles            → Campos específicos del dominio
5. Contacto            → Email, teléfono (si aplica)
6. Configuración       → Flags, opciones (decisiones finales)
7. Estado              → isActive (usualmente al final)
```

### 3. Progressive Disclosure

Campos avanzados u opcionales en expansion panels:

```html
<!-- Campos principales visibles -->
<mat-form-field class="col-8">Nombre</mat-form-field>
<mat-form-field class="col-4">Código</mat-form-field>

<!-- Configuración avanzada colapsada -->
<mat-expansion-panel>
    <mat-expansion-panel-header>
        <mat-panel-title>Configuración avanzada</mat-panel-title>
    </mat-expansion-panel-header>
    <!-- Campos opcionales aquí -->
</mat-expansion-panel>
```

### 4. Dependencias de Campos

Campos dependientes DEBAJO o AL LADO de su "padre":

```html
<!-- País primero (padre) -->
<mat-form-field class="col-4">
    <mat-select formControlName="countryId">...</mat-select>
</mat-form-field>

<!-- Estado/Provincia después (dependiente) -->
<mat-form-field class="col-4">
    <mat-select
        [disabled]="!fg.get('countryId').value"
        formControlName="stateId"
    >
        ...
    </mat-select>
</mat-form-field>
```

---

## Matriz de Decisión: Orden de Campos

| Criterio                 | Peso | Ejemplo                                    |
| ------------------------ | ---- | ------------------------------------------ |
| Es requerido             | +3   | `name` (required) antes de `description`   |
| Es identificador         | +2   | `code` antes de `email`                    |
| Usuario ya lo sabe       | +2   | `type` (elige) antes de `calculatedField`  |
| Afecta otros campos      | +1   | `country` antes de `state` (dependencia)   |
| Es configuración/setting | -1   | `isActive` al final de su sección          |
| Es campo de auditoría    | -2   | `createdAt`, `updatedAt` readonly o hidden |

### Aplicando la Matriz

```
Campo: name        → required (+3) + identificador (+2) = 5  → PRIMERO
Campo: code        → required (+3) + identificador (+2) = 5  → PRIMERO
Campo: type        → required (+3) = 3                       → SEGUNDO
Campo: description → opcional = 0                            → TERCERO
Campo: isActive    → config (-1) = -1                        → CUARTO
Campo: createdAt   → auditoría (-2) = -2                     → ÚLTIMO/HIDDEN
```

---

## Reglas por Tipo de Formulario

### Formulario de Alta (Create)

- **Autofocus** en primer campo editable
- **Pre-llenar defaults** sensatos (isActive = true)
- **Campos calculados** ocultos o readonly
- **Validación en blur** para campos críticos

```typescript
// En ngOnInit o después de crear el form
this.fg.get('name')?.markAsTouched(); // O usar cdkFocusInitial en el input
```

### Formulario de Edición (Edit)

- Mostrar claramente qué campos son **editables vs readonly**
- **Preservar valores** originales hasta guardar
- Indicar **cambios no guardados** si hay modificaciones

### Formulario de Filtros

- Campos **más usados primero**
- Permitir **limpiar todos** los filtros con un botón
- Aplicar en **tiempo real** o con botón según cantidad de campos

---

## Feedback de Validación

### Cuándo Mostrar Errores

| Momento        | Usar para                               |
| -------------- | --------------------------------------- |
| On blur        | Campos críticos (email, código único)   |
| On submit      | Validaciones complejas, campos cruzados |
| En tiempo real | Contadores de caracteres, formatos      |

### Patrón de Error

```html
<mat-form-field class="col-6">
    <mat-label>Email</mat-label>
    <input
        type="email"
        matInput
        formControlName="email"
    />
    <mat-error>
        @if (fg.get('email')?.hasError('required')) { {{
        t('validation.Required') }} } @if (fg.get('email')?.hasError('email')) {
        {{ t('validation.InvalidEmail') }} }
    </mat-error>
</mat-form-field>
```

---

## Checklist de Revisión UX

Antes de aprobar un formulario, verificar:

### Estructura y Orden

- [ ] ¿Los campos requeridos están primero en cada sección?
- [ ] ¿El flujo sigue un orden lógico para el usuario?
- [ ] ¿Los campos relacionados están agrupados?
- [ ] ¿Las dependencias están claras (padre → hijo)?

### Interacción

- [ ] ¿Hay feedback claro de errores de validación?
- [ ] ¿Los campos con dependencias se habilitan/deshabilitan correctamente?
- [ ] ¿El formulario es navegable con Tab?
- [ ] ¿El primer campo tiene autofocus en modo Create?

### Claridad

- [ ] ¿Los labels son claros y concisos?
- [ ] ¿Hay hints/placeholders donde ayudan?
- [ ] ¿Los campos required están marcados visualmente?
- [ ] ¿Los campos readonly se distinguen de los editables?

### Opcionales

- [ ] ¿Los campos avanzados están en expansion panel?
- [ ] ¿Hay defaults sensatos pre-llenados?

---

## Anti-patrones a Evitar

| Anti-patrón                 | Por qué es malo                            | Solución                               |
| --------------------------- | ------------------------------------------ | -------------------------------------- |
| Campos required al final    | Usuario completa todo y luego vuelve atrás | Requeridos primero en cada sección     |
| Todo en una sola columna    | Desperdicia espacio, scroll excesivo       | Usar grid de 12 columnas               |
| Campos sin relación juntos  | Confunde al usuario                        | Agrupar por dominio semántico          |
| Labels ambiguos             | El usuario no sabe qué poner               | Labels descriptivos + hints            |
| Validación solo al submit   | Frustración al final                       | Validar en blur para campos críticos   |
| Campos ocultos sin contexto | Usuario no sabe que existen                | Mostrar disabled o en panel colapsable |
| Dependencias sin feedback   | Usuario no entiende por qué está disabled  | Tooltip o texto explicativo            |
| Tabs order incorrecto       | Navegación por teclado confusa             | Revisar orden natural de campos        |

---

## Gestión de Foco

### Autofocus en Create

```html
<input
    matInput
    formControlName="name"
    cdkFocusInitial
/>
```

### Tab Order

El orden de Tab debe seguir el orden visual. Si usas CSS para reordenar
visualmente, asegúrate de que el HTML mantenga el orden lógico.

```html
<!-- ✅ CORRECTO: orden HTML = orden visual = orden Tab -->
<input formControlName="name" />
<!-- Tab 1 -->
<input formControlName="code" />
<!-- Tab 2 -->
<input formControlName="email" />
<!-- Tab 3 -->
```

---

## Estados de Campos

### Campo Deshabilitado por Dependencia

```html
<mat-form-field class="col-4">
    <mat-label>Estado/Provincia</mat-label>
    <mat-select formControlName="stateId">
        @for (state of filteredStates; track state.id) {
        <mat-option [value]="state.id">{{ state.name }}</mat-option>
        }
    </mat-select>
    @if (!fg.get('countryId')?.value) {
    <mat-hint>Seleccione un país primero</mat-hint>
    }
</mat-form-field>
```

### Campo Calculado

```html
<mat-form-field class="col-4">
    <mat-label>Total</mat-label>
    <input
        [value]="calculatedTotal"
        matInput
        readonly
    />
    <mat-hint>Calculado automáticamente</mat-hint>
</mat-form-field>
```

---

## Relación con Otros Skills

| Skill                | Qué cubre               | Cuándo usarlo con aurora-ux                         |
| -------------------- | ----------------------- | --------------------------------------------------- |
| `aurora-layout`      | Grid, anchos, secciones | SIEMPRE - UX define orden, layout define estructura |
| `aurora-components`  | Componentes específicos | Cuando elijas qué componente usar                   |
| `aurora-development` | Lógica de formularios   | Para implementar las reglas de UX                   |

---

## Ejemplo de Evaluación UX

### Formulario Original (problemas)

```
┌─────────────────────────────────────────────────────────┐
│ [Description: col-12]              ← Opcional primero   │
│ [isActive: col-4] [Notes: col-8]   ← Config mezclada    │
│ [Name*: col-8] [Code*: col-4]      ← Required al final  │
└─────────────────────────────────────────────────────────┘
```

### Formulario Corregido

```
┌─────────────────────────────────────────────────────────┐
│ [Code*: col-4] [Name*: col-8]      ← Required primero   │
│ [Description: col-12]              ← Opcional después   │
│ [Notes: col-12]                    ← Opcional después   │
│ [isActive: col-4]                  ← Config al final    │
└─────────────────────────────────────────────────────────┘
```

---

## Recursos

- **Layout**: Consultar `aurora-layout` para reglas de grid y secciones
- **Componentes**: Consultar `aurora-components` para inputs específicos
