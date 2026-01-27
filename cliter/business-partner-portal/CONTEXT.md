# Business Partner Portal

## Purpose

Portal de autoservicio para socios comerciales (clientes y proveedores) que proporciona visibilidad sobre documentos comerciales sincronizados desde sistemas ERP externos. Permite a los partners consultar sus facturas de venta y compra, gestionar datos de contacto, direcciones y configuraciones de pago. Actua como una vista de lectura de datos maestros y transaccionales mantenidos en sistemas ERP origen (SAP, Oracle, Dynamics, etc.).

**Casos de uso principales:**
- Consulta de facturas emitidas (cuentas por cobrar del partner)
- Consulta de facturas recibidas (cuentas por pagar al partner)
- Gestion de datos de contacto y direcciones
- Configuracion de metodos de cobro/pago
- Trazabilidad bidireccional con sistemas ERP

## Modules

| Module | Aggregate | Responsibility |
|--------|-----------|----------------|
| `business-partner` | BusinessPartnerPortalBusinessPartner | Entidad central de socios comerciales. Datos maestros: identificacion, clasificacion (CUSTOMER/SUPPLIER/VENDOR/AFFILIATE/PARTNER), limite de credito, terminos de pago. Punto de integracion ERP via `externalId`. |
| `partner-contact` | BusinessPartnerPortalPartnerContact | Personas de contacto asociadas a cada partner. Nombre, cargo, departamento, email, telefono, idioma preferido. Soporta contacto primario por partner. Relacion 1:1 opcional con iam/user para acceso al portal (`isUser`, `userId`). |
| `partner-address` | BusinessPartnerPortalPartnerAddress | Direcciones fisicas de partners. Tipos: BILLING, SHIPPING, OFFICE, WAREHOUSE, HEADQUARTERS. Integracion con common/country y divisiones administrativas. Soporte geocodificacion. |
| `payment-mode` | BusinessPartnerPortalPaymentMode | Catalogo maestro de metodos de pago disponibles. Tipos: ELECTRONIC (push), CASH, CHECK, CARD, WIRE, DIRECT_DEBIT (pull, domiciliacion), DIGITAL_WALLET. Define requisitos (cuenta, routing) y capacidades (recurrente). |
| `payment-collection-mode` | BusinessPartnerPortalPaymentCollectionMode | Configuracion especifica de cobro por partner. Vincula partner con payment-mode y almacena credenciales: numero cuenta, IBAN, SWIFT, titular, banco. Soporte multi-moneda. |
| `sales-invoice` | BusinessPartnerPortalSalesInvoice | Facturas de venta emitidas a clientes. Cabecera con totales, impuestos, descuentos, estado, fechas. Integracion ERP via `externalId` y `externalSystemCode`. |
| `sales-invoice-line` | BusinessPartnerPortalSalesInvoiceLine | Lineas de detalle de facturas de venta. Producto, cantidad, precio unitario, descuentos, impuestos, subtotales. |
| `purchase-invoice` | BusinessPartnerPortalPurchaseInvoice | Facturas de compra recibidas de proveedores. Incluye numero factura proveedor (`supplierInvoiceNumber`). Integracion ERP via `externalId` y `externalSystemCode`. |
| `purchase-invoice-line` | BusinessPartnerPortalPurchaseInvoiceLine | Lineas de detalle de facturas de compra. Incluye categoria de gasto (`expenseCategory`) para clasificacion contable. |
| `supplier-document` | BusinessPartnerPortalSupplierDocument | Documentos de factura subidos por proveedores para procesamiento via SAP VIM. Trackea ciclo completo: subida, envio a SAP, OCR, vinculacion con purchase-invoice resultante. |

## Entity Relationships

```
                        BUSINESS PARTNER (Centro)
                                   |
     +------------+----------------+------------------+-------------+
     |            |                |                  |             |
     v            v                v                  v             v
+---------+ +-----------+  +---------------+  +-------------+ +----------+
|CONTACTS | | ADDRESSES |  | COLLECTION    |  |  SUPPLIER   | | INVOICES |
|  (1:N)  | |   (1:N)   |  |    MODES      |  |  DOCUMENTS  | |  (1:N)   |
+---------+ +-----------+  |    (1:N)      |  |    (1:N)    | +----+-----+
                  |        +-------+-------+  +------+------+      |
            +-----+-----+          |                 |             |
            v           v          v                 |     +-------+-------+
       +--------+  +--------+ +----------+           |     |               |
       |Country |  |AdmArea | | PAYMENT  |           |     v               v
       |(common)|  |(common)| |   MODE   |           | +--------+    +---------+
       +--------+  +--------+ |(Catalog) |           | | SALES  |    |PURCHASE |
                              +----------+           | |INVOICE |    | INVOICE |
                                                     | +---+----+    +----+----+
                                                     |     |              |
                                                     |     v              v
                                                     | +--------+   +---------+
                                                     | | LINES  |   |  LINES  |
                                                     | +--------+   +---------+
                                                     |              ^
                                                     |              |
                                                     +--------------+
                                                       (links to)

  SUPPLIER DOCUMENT FLOW (SAP VIM Integration)

  +----------+    +----------+    +---------+    +----------+    +----------+
  | SUPPLIER |    | UPLOAD   |    | SAP VIM |    | WEBHOOK  |    | PURCHASE |
  | (Portal) |--->| DOCUMENT |--->|   OCR   |--->| CALLBACK |--->| INVOICE  |
  +----------+    +----------+    +---------+    +----------+    +----------+
       |                                                              |
       +------------------------ Views -------------------------------+
```

## Key Business Rules

### Partner Management
- **Unicidad de codigo**: Cada partner tiene un `code` unico que no puede cambiar una vez asignado
- **Integracion ERP**: Campo `externalId` permite vincular con ID del partner en sistema origen
- **Contacto primario**: Solo un contacto por partner puede tener `isPrimary=true`
- **Direccion primaria**: Solo una direccion por partner puede tener `isPrimary=true`
- **Soft delete**: Todos los registros usan `deletedAt` para preservar historial

### Portal Access (Partner Contacts)
- **Acceso al portal**: Contactos con `isUser=true` pueden autenticarse en el portal
- **Relacion 1:1**: Cada contacto puede tener maximo un usuario (`userId` unique)
- **Consistencia**: Si `isUser=true`, debe existir `userId`; si `isUser=false`, `userId` debe ser NULL
- **Operaciones permitidas**: Usuarios de contacto pueden subir documentos, ver facturas, gestionar datos del partner
- **Roles por tipo de partner**: Proveedores pueden subir facturas (supplier-document), clientes pueden ver facturas de venta

### Collection Modes
- **Metodo primario**: Solo un payment-collection-mode por partner puede ser `isPrimary=true`
- **Validacion condicional**: Si `paymentMode.isAccountNumberRequired=true`, el `accountNumber` es requerido
- **Validacion routing**: Si `paymentMode.isRoutingInfoRequired=true`, el `routingNumber` o `swiftCode` es requerido
- **Datos bancarios internacionales**: Campos `iban` (34 chars, ISO 13616) y `swiftCode` (11 chars, ISO 9362)

### Invoice Workflow

#### Sales Invoice States
| Estado | Descripcion | Transiciones Permitidas |
|--------|-------------|------------------------|
| `DRAFT` | Borrador, no enviada | SENT, CANCELLED |
| `SENT` | Emitida al cliente | PAID, PARTIALLY_PAID, OVERDUE, CANCELLED |
| `PAID` | Pagada completamente | REFUNDED |
| `PARTIALLY_PAID` | Pago parcial recibido | PAID, OVERDUE |
| `OVERDUE` | Vencida sin pago total | PAID, PARTIALLY_PAID, CANCELLED |
| `CANCELLED` | Anulada | - (terminal) |
| `REFUNDED` | Reembolsada | - (terminal) |

#### Purchase Invoice States
| Estado | Descripcion | Transiciones Permitidas |
|--------|-------------|------------------------|
| `DRAFT` | En preparacion | RECEIVED, CANCELLED |
| `RECEIVED` | Recibida, pendiente aprobacion | APPROVED, CANCELLED |
| `APPROVED` | Aprobada para pago | PAID, PARTIALLY_PAID |
| `PAID` | Pagada completamente | REFUNDED |
| `PARTIALLY_PAID` | Pago parcial realizado | PAID, OVERDUE |
| `OVERDUE` | Vencida sin pago total | PAID, PARTIALLY_PAID, CANCELLED |
| `CANCELLED` | Anulada/rechazada | - (terminal) |
| `REFUNDED` | Reembolsada por proveedor | - (terminal) |

### Invoice Calculations
- `subtotal` = SUM(lines.subtotal)
- `taxAmount` = SUM(lines.taxAmount)
- `discountAmount` = SUM(lines.discountAmount) + invoice-level discounts
- `totalAmount` = subtotal + taxAmount - discountAmount
- `outstandingBalance` = totalAmount - paidAmount
- Estado `PAID` cuando `paidAmount >= totalAmount`
- Estado `PARTIALLY_PAID` cuando `0 < paidAmount < totalAmount`

### Line Item Calculations
- `subtotal` = quantity * unitPrice
- `discountAmount` = subtotal * (discountPercent / 100)
- `netSubtotal` = subtotal - discountAmount
- `taxAmount` = netSubtotal * (taxPercent / 100)
- `lineTotal` = netSubtotal + taxAmount

### Supplier Document Workflow (SAP VIM)

#### Document States
| Estado | Descripcion | Transiciones Permitidas |
|--------|-------------|------------------------|
| `PENDING_UPLOAD` | Subida iniciada, archivo no recibido | UPLOADED, ERROR |
| `UPLOADED` | Archivo recibido y almacenado | VALIDATING, ERROR |
| `VALIDATING` | Validacion basica en progreso | SENT_TO_SAP, ERROR, REJECTED |
| `SENT_TO_SAP` | Documento transmitido a SAP VIM | PROCESSING, ERROR |
| `PROCESSING` | SAP VIM procesando (OCR activo) | PROCESSED, ERROR, REJECTED |
| `PROCESSED` | SAP completo, datos disponibles | LINKED, ERROR |
| `LINKED` | Purchase invoice creada y vinculada | - (terminal exitoso) |
| `ERROR` | Procesamiento fallido (reintentable) | SENT_TO_SAP (retry) |
| `REJECTED` | Documento rechazado (no reintentable) | - (terminal fallido) |

#### Flujo de Integracion SAP VIM

```
1. UPLOAD (Portal)
   - Proveedor sube documento (PDF/imagen)
   - Sistema valida formato, tamaño, virus
   - Genera documentNumber unico
   - Almacena en storage (S3/Azure/local)
   - Calcula fileHash para detectar duplicados

2. ENVIO A SAP
   - Sistema transmite documento a SAP VIM
   - Registra sapCompanyCode destino
   - Actualiza sentToSapAt timestamp

3. PROCESAMIENTO SAP VIM
   - SAP VIM ejecuta OCR sobre documento
   - Extrae: numero factura, fecha, lineas, importes, impuestos
   - Calcula ocrConfidenceScore
   - Almacena resultado en ocrData (jsonb)

4. WEBHOOK CALLBACK
   - SAP notifica completion via webhook
   - Sistema recibe sapDocumentId
   - Actualiza sapProcessingStatus
   - Registra processedAt timestamp

5. CREACION PURCHASE INVOICE
   - Sistema consulta datos procesados en SAP
   - Crea purchase-invoice con datos OCR
   - Crea purchase-invoice-lines
   - Vincula supplier-document via purchaseInvoiceId
   - Actualiza status a LINKED, registra linkedAt

6. VISTA PROVEEDOR
   - Proveedor ve documentos subidos con estado
   - Puede navegar a purchase-invoice vinculada
   - Ve relacion documento-enviado ↔ factura-registrada
```

#### Validaciones de Upload
- **Formato**: Solo PDF, JPEG, PNG, TIFF permitidos
- **Tamaño**: Maximo 50 MB por archivo
- **Duplicados**: Hash SHA-256 detecta documentos identicos
- **Proveedor**: Solo SUPPLIER/VENDOR pueden subir documentos

#### Reintentos
- `retryCount` maximo: 3 intentos automaticos
- `lastRetryAt` controla backoff exponencial
- Errores transitorios (timeout, red) son reintentables
- Errores de validacion (formato invalido) no son reintentables

## ERP Integration Design

### External ID Pattern
Todos los modulos principales incluyen campos para trazabilidad ERP:

```yaml
# En business-partner, sales-invoice, purchase-invoice:
- name: externalId
  type: varchar
  maxLength: 64
  nullable: true
  index: index
  # ID del documento/registro en el ERP origen

- name: externalSystemCode  # Solo en invoices
  type: varchar
  maxLength: 16
  nullable: true
  # Codigo del sistema/empresa origen (multi-ERP)
```

### Mapeo de Estados ERP

| ERP Tipico | Sales Invoice Portal | Purchase Invoice Portal |
|------------|---------------------|------------------------|
| Draft/Parked | DRAFT | DRAFT |
| Posted/Released | SENT | RECEIVED |
| Approved | - | APPROVED |
| Cleared/Paid | PAID | PAID |
| Partial Payment | PARTIALLY_PAID | PARTIALLY_PAID |
| Overdue (calculated) | OVERDUE | OVERDUE |
| Cancelled/Reversed | CANCELLED | CANCELLED |
| Credit Memo Applied | REFUNDED | REFUNDED |

### Standalone vs Integrated Mode
- Campos `externalId` y `externalSystemCode` son `nullable: true`
- Portal funciona standalone sin integracion ERP
- Integracion es opcional y aditiva

## Dependencies

### Uses (imports from)
- **iam/user**: Credenciales de portal para contactos (avoidConstraint: true)
- **common/country**: Paises para direcciones (avoidConstraint: true)
- **common/administrative-area-level-1**: Estados/provincias (avoidConstraint: true)
- **common/administrative-area-level-2**: Condados/distritos (avoidConstraint: true)

### Used by (potential consumers)
- Sistemas ERP externos (via API sync)
- Modulos de reporting/analytics
- Notificaciones y comunicaciones

## Technical Notes

### Aggregate Roots
- `BusinessPartnerPortalBusinessPartner` - Root principal
- `BusinessPartnerPortalPaymentMode` - Catalogo independiente
- `BusinessPartnerPortalSalesInvoice` - Documento de venta
- `BusinessPartnerPortalPurchaseInvoice` - Documento de compra
- `BusinessPartnerPortalSupplierDocument` - Documento subido por proveedor

### Indices Importantes
| Modulo | Campo | Tipo | Proposito |
|--------|-------|------|-----------|
| business-partner | code | unique | Busqueda por codigo |
| business-partner | externalId | index | Sync ERP |
| business-partner | name | index | Busqueda por nombre |
| partner-contact | userId | unique | Relacion 1:1 con iam/user |
| partner-contact | email | index | Busqueda por email |
| partner-contact | lastName | index | Busqueda por apellido |
| sales-invoice | invoiceNumber | unique | Identificacion legal |
| sales-invoice | externalId | index | Sync ERP |
| sales-invoice | status | index | Filtros por estado |
| purchase-invoice | invoiceNumber | unique | Identificacion interna |
| purchase-invoice | supplierInvoiceNumber | index | Referencia proveedor |
| purchase-invoice | externalId | index | Sync ERP |
| supplier-document | documentNumber | unique | Referencia documento |
| supplier-document | status | index | Filtros por estado |
| supplier-document | sapDocumentId | index | Callback SAP VIM |
| supplier-document | fileHash | index | Deteccion duplicados |
| supplier-document | errorCode | index | Analisis errores |

### Excluded Operations
Todos los modulos excluyen operaciones avanzadas para mantener simplicidad:
- `count`, `getRaw`, `max`, `min`, `rawSql`, `sum`, `updateAndIncrement`, `upsert`

### Security
- OAuth habilitado en todos los modulos (`hasOAuth: true`)
- Auditing habilitado (`hasAuditing: true`)
- Sin multi-tenancy (`hasTenant: false`)

### Varchar Lengths (Byte-Optimized)
| Longitud | Uso en este contexto |
|----------|---------------------|
| 11 | swiftCode (ISO 9362) |
| 16 | externalSystemCode |
| 34 | iban (ISO 13616) |
| 64 | codes, externalId, phone, postalCode |
| 128 | names, email, labels, expenseCategory |
| 255 | addressLine1, addressLine2 |
| 510 | description (lineas factura) |
| 1022 | website |

### Decimal Precision
| Campo | Precision | Uso |
|-------|-----------|-----|
| Money amounts | [12, 2] | Importes monetarios estandar |
| Tax/Discount % | [5, 2] | Porcentajes (0.00 - 100.00) |
| Quantity | [10, 4] | Cantidades con fracciones |
| Coordinates | [16/17, 14] | Lat/Lng alta precision |

## API Patterns (Expected)

### GraphQL Resolvers
```graphql
# Queries esperadas
businessPartner(id: ID!): BusinessPartner
businessPartners(query: QueryStatement): [BusinessPartner]
salesInvoice(id: ID!): SalesInvoice
salesInvoices(query: QueryStatement): [SalesInvoice]
purchaseInvoice(id: ID!): PurchaseInvoice
purchaseInvoices(query: QueryStatement): [PurchaseInvoice]
supplierDocument(id: ID!): SupplierDocument
supplierDocuments(query: QueryStatement): [SupplierDocument]

# Mutations esperadas
createBusinessPartner(payload: BusinessPartnerInput!): BusinessPartner
updateBusinessPartner(payload: BusinessPartnerUpdateInput!): BusinessPartner
deleteBusinessPartner(id: ID!): BusinessPartner

# Supplier Document mutations
createSupplierDocument(payload: SupplierDocumentInput!): SupplierDocument
retrySupplierDocument(id: ID!): SupplierDocument  # Reintentar procesamiento
```

### Webhook Endpoints (SAP VIM Callback)
```
POST /business-partner-portal/webhooks/sap-vim/processing-complete
     Body: { sapDocumentId, status, ocrData, errorCode?, errorMessage? }
     Response: 200 OK | 400 Bad Request | 404 Not Found
```

### REST Endpoints (Expected)
```
GET    /business-partner-portal/business-partners
GET    /business-partner-portal/business-partners/:id
POST   /business-partner-portal/business-partners
PUT    /business-partner-portal/business-partners/:id
DELETE /business-partner-portal/business-partners/:id

GET    /business-partner-portal/sales-invoices
GET    /business-partner-portal/sales-invoices/:id

GET    /business-partner-portal/supplier-documents
GET    /business-partner-portal/supplier-documents/:id
POST   /business-partner-portal/supplier-documents           # Initiate upload
POST   /business-partner-portal/supplier-documents/:id/retry # Retry processing
GET    /business-partner-portal/supplier-documents/:id/download # Get signed URL
```

## Future Considerations

1. **Pagos**: Modulo de payment-transaction para registrar pagos individuales
2. **Notificaciones**: Alertas de vencimiento, recordatorios de pago, notificacion de procesamiento SAP
3. **Reporting**: Aging reports, balance statements, metricas de procesamiento OCR
4. **Multi-currency**: Exchange rates y conversion automatica
5. **Approval workflows**: Flujos de aprobacion para purchase invoices
6. **Document versioning**: Multiples versiones de un mismo documento si se rechaza y reenvía
