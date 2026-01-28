# Campos de Teléfono con Prefijo de País

## Cuándo Usar

Cuando el schema YAML tenga campos con este patrón:

```yaml
- name: phone
  type: varchar
  maxLength: 64
  nullable: true
- name: phoneCountryPrefix
  type: varchar
  maxLength: 4
  nullable: true
- name: phoneSanitized
  type: varchar
  maxLength: 64
  nullable: true
  isDetailHidden: true
```

O variantes como:

- `mobile`, `mobileCountryPrefix`, `mobileSanitized`
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
```

### Imports Necesarios

```typescript
import {
    // ... otros imports
    phoneNumberFormat,
    PhoneNumberFormatModule,
} from '@aurora';
import { countryPrefixes } from '@public/data';
```

En el decorator `@Component`:

```typescript
imports: [
    ...defaultDetailImports,
    PhoneNumberFormatModule,
],
```

### Propiedades del Componente

```typescript
// Lista de prefijos de país
countryPrefixes = countryPrefixes;

// Handler para el número sanitizado
handlePhoneNumberSanitized(
    phoneNumber: string,
    targetFormControlName: string,
): void {
    this.fg.get(targetFormControlName).setValue(phoneNumber);
}
```

### FormControl con Validador

```typescript
createForm(): void {
    this.fg = this.fb.group({
        // ... otros campos
        phone: [
            '',
            [Validators.maxLength(64), phoneNumberFormat('phoneCountryPrefix')],
        ],
        phoneCountryPrefix: ['ES', [Validators.maxLength(4)]], // Default: España
        phoneSanitized: ['', [Validators.maxLength(64)]],
    });
}
```

---

## Configuración de countryPrefixes

Los prefijos de país se definen en `public/data/country-prefixes.ts`:

```typescript
import { CountryPrefixOption } from '@aurora';

export const countryPrefixes: CountryPrefixOption[] = [
    {
        iso3166Alpha2: 'ES',
        content: 'Spain',
        prefix: '+34',
        active: true,
    },
    {
        iso3166Alpha2: 'PT',
        content: 'Portugal',
        prefix: '+351',
        active: true,
    },
    {
        iso3166Alpha2: 'AR',
        content: 'Argentina',
        prefix: '+54',
        active: true,
    },
    // ... más países
];
```

Y se exporta en `public/data/public-api.ts`:

```typescript
export * from './country-prefixes';
```

El path `@public/*` debe estar configurado en `tsconfig.json`:

```json
{
    "compilerOptions": {
        "paths": {
            "@public/*": ["./../public/*"]
        }
    }
}
```

---

## Notas de Implementación

1. **Campo `*Sanitized`**: Se actualiza automáticamente via el evento
   `phoneNumberSanitized`. Debe estar oculto en el formulario
   (`isDetailHidden: true` en YAML).

2. **Clase CSS `mobile-country-prefix-fix`**: Ajusta el ancho del prefijo en el
   input. Es necesaria para que el selector de país se vea correctamente.

3. **Template reference `#phoneInput`**: Necesario para que el componente de
   prefijo pueda leer/manipular el valor del input.

4. **Validador `phoneNumberFormat`**: Valida que el número tenga formato
   correcto según el país seleccionado. Recibe el nombre del campo de prefijo.

5. **Valor default del prefijo**: Usar código ISO 3166-1 alpha-2 (ej: `'ES'`),
   NO el prefijo numérico.

6. **Ancho recomendado**: `col-6` para el campo completo (incluye el selector de
   prefijo).

7. **mat-hint**: Opcional, útil para indicar que el número se usa para WhatsApp:
    ```html
    <mat-hint align="start">{{ t('module.MobileForWhatsapp') }}</mat-hint>
    ```

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

---

## Referencia: orion-front

Ejemplo de implementación completa en:
`/Users/carlos/Projects/orion/orion-front/src/app/modules/admin/apps/orion/contact/contact-detail-dialog.component.ts`
