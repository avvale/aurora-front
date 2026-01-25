# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run start:local     # Serve with localhost config (http://localhost:4200)
npm run start:dev       # Serve with development config
npm run start           # Serve with default config

# Build
npm run build           # Production build

# Testing
npm run test            # Run Karma tests

# Code Quality
npx eslint .            # Lint TypeScript files
npm run commit          # Commitizen commit (conventional commits)
```

## Architecture

This is an Angular 19 admin panel application (Aurora Front) built on top of the Fuse template. It uses a modular architecture with standalone components, GraphQL (Apollo), and Tailwind CSS.

### Directory Structure

- **src/@fuse/**: Fuse template library (animations, components, services, directives)
- **src/@aurora/**: Aurora framework library - reusable components and services
  - `components/`: Grid, dialogs, form inputs (file-upload, image-input, slug, etc.)
  - `modules/`: Authentication, authorization, GraphQL, IAM, ORM utilities
  - `services/`: Action service, download service, initializer
- **src/app/modules/admin/apps/**: Business domain modules (IAM, OAuth, message, tools, etc.)
- **cliter/**: Aurora CLI definition files (`.aurora.yaml`) describing entity schemas

### Key Patterns

**Component Architecture**: Detail components extend `ViewDetailComponent`, list components use the `GridComponent` with column configurations. Actions flow through `ActionService`.

**GraphQL**: Apollo Client with typed queries/mutations. Each module has `.graphql.ts` files defining operations. Use `@aurora/modules/graphql/` utilities.

**Forms**: Reactive forms with RxwebValidators for complex validation. Form groups defined in `createForm()` method of detail components.

**Authentication**: Adapter pattern with `AuthenticationService` interface. Implementations: `AuthenticationAuroraAdapterService` (API auth), `AuthenticationMsEntraIdAdapterService` (Azure AD).

**Grid System**: Aurora grid component with column configs (`*.columns-config.ts`), filtering via Sequelize operators, and persistent grid state.

### Path Aliases

- `@apps/*` → `src/app/modules/admin/apps/*`
- `@core/*` → `src/app/core/*`
- `@aurora` → `src/@aurora/`
- `@fuse` → `src/@fuse/`

### Build Configurations

- `localhost`: Local development with source maps
- `development`: Dev environment
- `quality`: QA environment
- `production`: Production build with optimization

## Code Style

- 4-space indentation
- Allman brace style
- Single quotes
- Trailing commas in arrays/objects
- Explicit function return types required
- Max line length: 180 characters
- Commit messages follow conventional commits (commitlint)

## Aurora YAML Files

Files in `cliter/` define entity schemas for code generation. Key properties:
- `boundedContextName`, `moduleName`: Domain organization
- `aggregateProperties`: Field definitions with types, validations, relationships
- `hasOAuth`, `hasTenant`, `hasAuditing`: Feature flags
