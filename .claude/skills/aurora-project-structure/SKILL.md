---
name: aurora-project-structure
description: >
  Provides structured information about the Aurora/Angular project folder hierarchy, explaining the purpose and responsibility of each directory and key files.
  Trigger: When user asks about project structure, folder organization, "where is X", or navigating the codebase.
license: MIT
metadata:
  author: aurora
  version: "1.0"
  auto_invoke: "Navigating project structure, locating files, understanding folder organization"
---

## When to Use

- User asks "where is..." or "where should I put..."
- User needs to understand the project organization
- User asks about naming conventions
- User needs to navigate between layers (Aurora, Fuse, Apps)
- User is new to Aurora Angular architecture

---

## Critical Patterns

### Layer Responsibilities

| Layer | Path | Responsibility | Can Modify? |
|-------|------|----------------|-------------|
| **@fuse** | `src/@fuse/` | Fuse template library (animations, core components, services) | NO (template) |
| **@aurora** | `src/@aurora/` | Aurora framework (reusable components, modules, services) | Exceptionally |
| **Apps** | `src/app/modules/admin/apps/` | Business domain modules (generated + custom) | YES (handlers) |
| **Core** | `src/app/core/` | App core (auth, navigation, icons, transloco) | Exceptionally |
| **Layout** | `src/app/layout/` | Layout components (header, sidebar, settings) | Exceptionally |

### Module File Pattern

Each module in `apps/[bounded-context]/[module]/` follows this structure:
```
[module]-detail.component.ts      # Detail/Edit view (extends ViewDetailComponent)
[module]-detail.component.html    # Detail template
[module]-list.component.ts        # List view (extends ViewBaseComponent)
[module]-list.component.html      # List template with au-grid
[module].columns-config.ts        # Grid column definitions
[module].graphql.ts               # GraphQL queries and mutations
[module].resolvers.ts             # Route resolvers
[module].service.ts               # CRUD service with Apollo
index.ts                          # Barrel exports
public-api.ts                     # Public API exports
```

---

## Project Structure

```
cliter/                                    # Aurora YAML Definitions
├── [bounded-context]/
│   ├── [module].aurora.yaml               # Module definition (source of truth)
│   └── [module]-lock.json                 # Generation lock file
│
src/
├── @fuse/                                 # Fuse Template Library (DO NOT MODIFY)
│   ├── animations/                        # Animation utilities
│   ├── components/                        # Core UI components
│   │   ├── alert/                         # Alert component
│   │   ├── card/                          # Card component
│   │   ├── confirmation/                  # Confirmation dialog
│   │   ├── drawer/                        # Drawer/sidebar component
│   │   ├── fullscreen/                    # Fullscreen toggle
│   │   ├── highlight/                     # Syntax highlighting
│   │   ├── loading-bar/                   # Loading indicator
│   │   ├── masonry/                       # Masonry grid layout
│   │   └── navigation/                    # Navigation components
│   │       ├── horizontal/                # Horizontal nav
│   │       └── vertical/                  # Vertical nav
│   ├── directives/                        # Custom directives
│   │   ├── scroll-reset/                  # Reset scroll position
│   │   └── scrollbar/                     # Custom scrollbar
│   ├── lib/                               # Libraries
│   │   └── mock-api/                      # Mock API utilities
│   ├── pipes/                             # Common pipes
│   ├── services/                          # Core services
│   │   ├── config/                        # App configuration
│   │   ├── confirmation/                  # Confirmation service
│   │   ├── loading/                       # Loading service
│   │   ├── media-watcher/                 # Responsive breakpoints
│   │   ├── platform/                      # Platform detection
│   │   ├── splash-screen/                 # Splash screen
│   │   └── utils/                         # Utility functions
│   ├── styles/                            # SCSS styles
│   │   ├── components/                    # Component styles
│   │   └── overrides/                     # Material overrides
│   ├── tailwind/                          # Tailwind plugins
│   │   ├── plugins/                       # Custom plugins (theming, utilities)
│   │   └── utils/                         # Tailwind utilities
│   └── validators/                        # Form validators
│
├── @aurora/                               # Aurora Framework Library
│   ├── components/                        # Reusable UI Components
│   │   ├── attachments/                   # File attachments
│   │   ├── breadcrumb/                    # Breadcrumb navigation
│   │   ├── chat-timeline/                 # Chat/timeline component
│   │   ├── datepicker/                    # Custom datepicker
│   │   ├── dialog/                        # Dialog wrapper
│   │   ├── file-upload/                   # File upload component
│   │   ├── flag-icon/                     # Country flag icons
│   │   ├── grid/                          # Main grid component
│   │   │   ├── grid/                      # Core grid
│   │   │   ├── grid-columns-config/       # Column configuration
│   │   │   ├── grid-filters-dialog/       # Filter dialog
│   │   │   ├── grid-search/               # Search component
│   │   │   ├── grid-translations/         # i18n support
│   │   │   ├── directives/                # Grid directives
│   │   │   └── pipes/                     # Grid pipes
│   │   ├── grid-dialog/                   # Grid in dialog
│   │   ├── grid-elements-manager/         # Element manager grid
│   │   ├── grid-select-element/           # Single selection grid
│   │   ├── grid-select-multiple/          # Multiple selection grid
│   │   ├── image-input/                   # Image input control
│   │   ├── image-preview-overlay/         # Image preview
│   │   ├── password-strength/             # Password strength indicator
│   │   ├── phone-number-format/           # Phone formatting
│   │   ├── slug/                          # URL slug generator
│   │   ├── split-button/                  # Split button
│   │   ├── title/                         # Page title
│   │   ├── validation-messages/           # Form validation messages
│   │   └── version-input/                 # Version input (x.y.z)
│   ├── decorators/                        # Custom decorators
│   ├── directives/                        # Custom directives
│   │   ├── decimal.directive.ts           # Decimal input
│   │   ├── focus.directive.ts             # Auto focus
│   │   └── scroll-end.directive.ts        # Infinite scroll
│   ├── foundations/                       # Base classes and interfaces
│   │   └── interfaces/                    # Common interfaces
│   ├── modules/                           # Feature modules
│   │   ├── authentication/                # Auth adapters
│   │   ├── authorization/                 # Permissions (can pipe)
│   │   ├── graphql/                       # Apollo GraphQL setup
│   │   ├── iam/                           # IAM adapters
│   │   ├── lang/                          # Language services
│   │   ├── ms-entra-id/                   # Azure AD integration
│   │   ├── routing/                       # Route services
│   │   ├── session/                       # Session management
│   │   └── action/                        # Action service
│   ├── pipes/                             # Common pipes
│   │   ├── date-format.pipe.ts            # Date formatting
│   │   ├── get.pipe.ts                    # Object property getter
│   │   ├── safe.pipe.ts                   # Sanitizer pipe
│   │   └── truncate-words.pipe.ts         # Text truncation
│   ├── providers/                         # Angular providers
│   ├── services/                          # Core services
│   │   ├── action.service.ts              # Action dispatcher
│   │   ├── download.service.ts            # File download
│   │   └── initializerService.service.ts  # App initializer
│   └── styles/                            # Aurora styles
│       ├── layout.scss                    # Grid layout system
│       ├── themes.scss                    # Theme configuration
│       └── overrides/                     # Style overrides
│
├── app/
│   ├── core/                              # Application Core
│   │   ├── auth/                          # Authentication
│   │   │   └── guards/                    # Route guards
│   │   ├── icons/                         # Icon registration
│   │   ├── navigation/                    # Navigation data
│   │   ├── transloco/                     # i18n configuration
│   │   └── user/                          # User service
│   │
│   ├── layout/                            # Layout Components
│   │   ├── common/                        # Common layout parts
│   │   │   ├── languages/                 # Language selector
│   │   │   ├── messages/                  # Messages dropdown
│   │   │   ├── notifications/             # Notifications
│   │   │   ├── quick-chat/                # Quick chat
│   │   │   ├── search/                    # Search bar
│   │   │   ├── settings/                  # Theme settings
│   │   │   ├── shortcuts/                 # Shortcuts menu
│   │   │   └── user/                      # User menu
│   │   └── layouts/                       # Layout variants
│   │       ├── empty/                     # Empty layout (login)
│   │       ├── horizontal/                # Horizontal navigation
│   │       │   ├── centered/              # Centered content
│   │       │   ├── enterprise/            # Enterprise layout
│   │       │   ├── material/              # Material style
│   │       │   └── modern/                # Modern style
│   │       └── vertical/                  # Vertical navigation
│   │           ├── classic/               # Classic sidebar
│   │           ├── classy/                # Classy style
│   │           ├── compact/               # Compact sidebar
│   │           ├── dense/                 # Dense sidebar
│   │           ├── futuristic/            # Futuristic style
│   │           └── thin/                  # Thin sidebar
│   │
│   ├── mock-api/                          # Mock API Data (development)
│   │   ├── apps/                          # App mock data
│   │   ├── common/                        # Common mock data
│   │   ├── dashboards/                    # Dashboard mock data
│   │   └── ui/                            # UI mock data
│   │
│   └── modules/                           # Feature Modules
│       ├── admin/                         # Admin section
│       │   ├── apps/                      # Business Domain Modules
│       │   │   ├── [bounded-context]/     # Bounded context folder
│       │   │   │   ├── [bounded-context].component.ts  # Container component
│       │   │   │   ├── [bounded-context].routes.ts     # Module routes
│       │   │   │   ├── [bounded-context].types.ts      # TypeScript types
│       │   │   │   ├── shared/            # Shared module resources
│       │   │   │   └── [module]/          # Entity module
│       │   │   │       ├── [module]-detail.component.ts
│       │   │   │       ├── [module]-detail.component.html
│       │   │   │       ├── [module]-list.component.ts
│       │   │   │       ├── [module]-list.component.html
│       │   │   │       ├── [module].columns-config.ts
│       │   │   │       ├── [module].graphql.ts
│       │   │   │       ├── [module].resolvers.ts
│       │   │   │       ├── [module].service.ts
│       │   │   │       ├── index.ts
│       │   │   │       └── public-api.ts
│       │   │   │
│       │   │   ├── auditing/              # Audit logs
│       │   │   ├── common/                # Common entities (country, lang)
│       │   │   ├── iam/                   # Identity & Access Management
│       │   │   ├── message/               # Messaging system
│       │   │   ├── o-auth/                # OAuth management
│       │   │   ├── queue-manager/         # Job queues
│       │   │   ├── search-engine/         # Search configuration
│       │   │   ├── settings/              # User settings
│       │   │   ├── support/               # Support/Issues
│       │   │   └── tools/                 # Admin tools
│       │   │
│       │   ├── example/                   # Example components
│       │   ├── kitchen-sink/              # Component showcase
│       │   └── pages/                     # Static pages
│       │
│       ├── auth/                          # Authentication pages
│       │   ├── confirmation-required/     # Email confirmation
│       │   ├── forgot-password/           # Password reset request
│       │   ├── reset-password/            # Password reset
│       │   ├── sign-in/                   # Login
│       │   ├── sign-out/                  # Logout
│       │   ├── sign-up/                   # Registration
│       │   └── unlock-session/            # Session unlock
│       │
│       └── landing/                       # Public landing pages
│           └── home/                      # Home page
│
├── assets/                                # Static assets
│   ├── fonts/                             # Custom fonts
│   ├── i18n/                              # Translation files
│   │   ├── en.json                        # English translations
│   │   └── es.json                        # Spanish translations
│   ├── icons/                             # SVG icons
│   └── images/                            # Images
│
├── environments/                          # Environment configurations
│   ├── environment.ts                     # Default environment
│   ├── environment.development.ts         # Development
│   ├── environment.localhost.ts           # Local development
│   ├── environment.production.ts          # Production
│   └── environment.quality.ts             # QA environment
│
├── index.html                             # Main HTML file
├── main.ts                                # Application bootstrap
└── styles.scss                            # Global styles
```

---

## Module File Naming Convention

### Components
```
[module]-detail.component.ts       # Detail view (create/edit)
[module]-detail.component.html     # Detail template
[module]-list.component.ts         # List view with grid
[module]-list.component.html       # List template
[module]-dialog.component.ts       # Optional dialog component
```

### Services and Configuration
```
[module].service.ts                # CRUD service with Apollo GraphQL
[module].graphql.ts                # GraphQL queries and mutations
[module].resolvers.ts              # Route resolvers for data loading
[module].columns-config.ts         # Grid column configuration
```

### Exports
```
index.ts                           # Barrel exports for module
public-api.ts                      # Public API exports
```

---

## Decision Tree: Where to Put Code?

```
Need to add a new field/entity?
  → Modify cliter/[bounded-context]/[module].aurora.yaml
  → Run Aurora CLI to regenerate

Need custom business logic in component?
  → Add to handleAction() method in component
  → Or create a shared service in [bounded-context]/shared/

Need a reusable UI component?
  → Add to src/@aurora/components/

Need a custom pipe or directive?
  → src/@aurora/pipes/ or src/@aurora/directives/

Need to modify grid columns?
  → Edit [module].columns-config.ts

Need custom GraphQL query?
  → Add to [module].graphql.ts

Need new route?
  → Modify [bounded-context].routes.ts

Need to add translations?
  → Edit src/assets/i18n/[lang].json

Need to modify layout/theme?
  → Check src/app/layout/ and src/@fuse/styles/
```

---

## Key Base Components

| Component | Purpose | Extend When |
|-----------|---------|-------------|
| `ViewDetailComponent` | Detail/edit forms | Creating entity detail views |
| `ViewBaseComponent` | List views | Creating entity list views |
| `GridComponent` | Data grid | Displaying tabular data |

### ViewDetailComponent Pattern
```typescript
export class CountryDetailComponent extends ViewDetailComponent
{
    breadcrumb: Crumb[] = [...];
    managedObject: Country;

    constructor(private readonly countryService: CountryService) { super(); }

    init(): void { /* After ngOnInit */ }
    createForm(): void { this.fg = this.fb.group({...}); }
    async handleAction(action: Action): Promise<void> { /* Handle CRUD */ }
}
```

### ViewBaseComponent Pattern
```typescript
export class CountryListComponent extends ViewBaseComponent
{
    gridId: string = 'common::country.list.mainGridList';
    gridData$: Observable<GridData<Country>>;
    originColumnsConfig: ColumnConfig[] = [...];

    async handleAction(action: Action): Promise<void> { /* Handle actions */ }
}
```

---

## Quick Navigation Commands

```bash
# Find all files for a module
fd "country" src/app/modules/admin/apps/

# Find all components
fd ".component.ts$" src/app/modules/admin/apps/

# Find all services
fd ".service.ts$" src/

# Find YAML definitions
ls cliter/*/

# Find GraphQL files
fd ".graphql.ts$" src/

# Find column configurations
fd ".columns-config.ts$" src/
```

---

## Path Aliases

| Alias | Path | Usage |
|-------|------|-------|
| `@apps/*` | `src/app/modules/admin/apps/*` | Business modules |
| `@core/*` | `src/app/core/*` | Core functionality |
| `@aurora` | `src/@aurora/` | Aurora framework |
| `@fuse` | `src/@fuse/` | Fuse template |

```typescript
import { GridComponent, ActionService } from '@aurora';
import { CountryService } from '@apps/common/country';
import { AuthService } from '@core/auth';
```

---

## Resources

- **YAML Definitions**: See `cliter/[bounded-context]/[module].aurora.yaml`
- **Aurora Components**: See `src/@aurora/components/`
- **Fuse Template**: See `src/@fuse/`
- **Layouts**: See `src/app/layout/layouts/`
- **Translations**: See `src/assets/i18n/`
