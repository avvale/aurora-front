# Campos de Teléfono con Prefijo de País

## Cuándo Usar

Cuando el schema YAML tenga campos con este patrón:

```yaml
- name: mobile
  type: varchar
  maxLength: 64
  nullable: true
- name: mobileCountryPrefix
  type: varchar
  maxLength: 4
  nullable: true
- name: mobileSanitized
  type: varchar
  maxLength: 64
  nullable: true
```

O variantes como:

- `phone`, `phoneCountryPrefix`, `phoneSanitized`
- `mobile1`, `mobile1CountryPrefix`, `mobile1Sanitized`
- `whatsapp`, `whatsappCountryPrefix`, `whatsappSanitized`

---

## Componente a Usar

### Template HTML

```html
<mat-form-field
    appearance="outline"
    class="col-6 mobile-country-prefix-fix"
>
    <mat-label>{{ t('module.Mobile') }}</mat-label>
    <input
        #mobileInput
        matInput
        formControlName="mobile"
        maxlength="64"
    />
    <mat-hint align="start">{{ t('module.MobileForWhatsapp') }}</mat-hint>
    <au-select-country-prefix
        [phoneNumberInput]="mobileInput"
        matPrefix
        formControlName="mobileCountryPrefix"
        (phoneNumberSanitized)="
            handlePhoneNumberSanitized($event, 'mobileSanitized')
        "
    >
        @for (countryPrefix of countryPrefixes; track countryPrefix.prefix) {
        <au-option-country-prefix
            [iso3166Alpha2]="countryPrefix.iso3166Alpha2"
            [prefix]="countryPrefix.prefix"
        >
            ({{ countryPrefix.prefix }}) {{ t('CountryOptions.' +
            countryPrefix.content) }}
        </au-option-country-prefix>
        }
    </au-select-country-prefix>
    <mat-error>
        {{ (formErrors?.mobileCountryPrefix | async) || (formErrors?.mobile |
        async) }}
    </mat-error>
</mat-form-field>
```

### Imports Necesarios

```typescript
import {
    SelectCountryPrefixComponent,
    OptionCountryPrefixComponent,
} from '@aurora/components/select-country-prefix';
```

En el decorator `@Component`:

```typescript
imports: [
    ...defaultDetailImports,
    SelectCountryPrefixComponent,
    OptionCountryPrefixComponent,
],
```

### Propiedades del Componente

```typescript
// Lista de prefijos de país (cargar desde servicio o constante)
countryPrefixes: CountryPrefix[] = [];

// Handler para el número sanitizado
handlePhoneNumberSanitized(sanitizedNumber: string, fieldName: string): void {
    this.fg.get(fieldName)?.setValue(sanitizedNumber);
}
```

### Interfaz CountryPrefix

```typescript
interface CountryPrefix {
    iso3166Alpha2: string; // Ej: 'ES', 'US', 'AR'
    prefix: string; // Ej: '+34', '+1', '+54'
    content: string; // Key de traducción del país
}
```

---

## Notas de Implementación

1. **Campo `*Sanitized`**: Se actualiza automáticamente via el evento
   `phoneNumberSanitized`. Debe estar oculto en el formulario
   (`isDetailHidden: true` en YAML).

2. **Clase CSS `mobile-country-prefix-fix`**: Ajusta el ancho del prefijo en el
   input.

3. **Template reference `#mobileInput`**: Necesario para que el componente de
   prefijo pueda leer/manipular el valor del input.

4. **mat-hint**: Opcional, útil para indicar que el número se usa para WhatsApp
   u otro propósito.

5. **Ancho recomendado**: `col-6` para el campo completo (incluye el selector de
   prefijo).

---

## Ejemplo Completo con Múltiples Teléfonos

```html
<!-- Teléfono principal -->
<mat-form-field
    appearance="outline"
    class="col-6 mobile-country-prefix-fix"
>
    <mat-label>{{ t('module.Phone') }}</mat-label>
    <input
        #phoneInput
        matInput
        formControlName="phone"
        maxlength="64"
    />
    <au-select-country-prefix
        [phoneNumberInput]="phoneInput"
        matPrefix
        formControlName="phoneCountryPrefix"
        (phoneNumberSanitized)="
            handlePhoneNumberSanitized($event, 'phoneSanitized')
        "
    >
        @for (countryPrefix of countryPrefixes; track countryPrefix.prefix) {
        <au-option-country-prefix
            [iso3166Alpha2]="countryPrefix.iso3166Alpha2"
            [prefix]="countryPrefix.prefix"
        >
            ({{ countryPrefix.prefix }}) {{ t('CountryOptions.' +
            countryPrefix.content) }}
        </au-option-country-prefix>
        }
    </au-select-country-prefix>
    <mat-error>
        {{ (formErrors?.phoneCountryPrefix | async) || (formErrors?.phone |
        async) }}
    </mat-error>
</mat-form-field>

<!-- Móvil / WhatsApp -->
<mat-form-field
    appearance="outline"
    class="col-6 mobile-country-prefix-fix"
>
    <mat-label>{{ t('module.Mobile') }}</mat-label>
    <input
        #mobileInput
        matInput
        formControlName="mobile"
        maxlength="64"
    />
    <mat-hint align="start">{{ t('module.MobileForWhatsapp') }}</mat-hint>
    <au-select-country-prefix
        [phoneNumberInput]="mobileInput"
        matPrefix
        formControlName="mobileCountryPrefix"
        (phoneNumberSanitized)="
            handlePhoneNumberSanitized($event, 'mobileSanitized')
        "
    >
        @for (countryPrefix of countryPrefixes; track countryPrefix.prefix) {
        <au-option-country-prefix
            [iso3166Alpha2]="countryPrefix.iso3166Alpha2"
            [prefix]="countryPrefix.prefix"
        >
            ({{ countryPrefix.prefix }}) {{ t('CountryOptions.' +
            countryPrefix.content) }}
        </au-option-country-prefix>
        }
    </au-select-country-prefix>
    <mat-error>
        {{ (formErrors?.mobileCountryPrefix | async) || (formErrors?.mobile |
        async) }}
    </mat-error>
</mat-form-field>
```
