---
name: aurora-cli
description: >
    Run Aurora CLI commands to generate/regenerate frontend modules, add
    packages, or create projects. Trigger: When user asks to regenerate code,
    load module, add package, or create new Aurora frontend project.
license: MIT
metadata:
    author: aurora
    version: '1.0'
    scope: front
    auto_invoke:
        'Regenerating modules, adding packages, Aurora CLI operations, load
        front'
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, AskUserQuestion
---

## When to Use

- User asks to "regenerate", "load", or "generate" a frontend module
- User wants to add a package (oauth, iam, common, etc.)
- User needs to create a new Aurora frontend project
- After YAML schema changes that require code regeneration
- User mentions "aurora cli", "aurora load front", or "regenerate"

---

## Critical Patterns

### Command Structure

| Action               | Command                                        | When to Use         |
| -------------------- | ---------------------------------------------- | ------------------- |
| Regenerate module    | `aurora load front module -n=<bc>/<module>`    | After YAML changes  |
| Force regenerate     | `aurora load front module -n=<bc>/<module> -f` | Override protection |
| Overwrite interfaces | `aurora load front module -n=<bc>/<module> -w` | Update interfaces   |
| Add package          | `aurora add front <package>`                   | Install package     |
| New project          | `aurora new front <name>`                      | Create project      |

### Hash Protection System

Aurora tracks file modifications via hash. Files with custom changes are
**protected by default**:

- Without `-f`: Modified files are preserved
- With `-f`: All files are overwritten (use with caution)
- With `-w`: Only interfaces are overwritten

---

## Execution Flow

### 1. Identify Action

Ask the user what they want to do:

1. **Generate/Regenerate module** - Regenerate code from existing YAML
2. **Add package** - Install preconfigured package
3. **Create project** - Create new Aurora frontend project (rare)

### 2. Gather Information

**For Generate/Regenerate Module:**

1. Ask which bounded context and module to regenerate
2. ONLY if you can't identify them, list available YAMLs in `cliter/` using Glob
3. Ask about flags:
    - `--force` (overwrite existing files)
    - `--overwriteInterface` (overwrite TypeScript interfaces)
    - `--verbose` (detailed output)

**For Add Package:**

1. Show available packages (see list below)
2. Ask which package to install
3. Ask if `--force` is needed

**For Create Project:**

1. Ask for project name
2. Confirm before executing

### 3. Execute Command

```bash
# Regenerate module
aurora load front module -n=<bounded-context>/<module> [-f] [-w] [-v]

# Add package
aurora add front <package> [-f]

# Create project
aurora new front <app-name>
```

### 4. Report Results

```
Command executed successfully
aurora load front module -n=common/country -fw

Regenerated Files:
  - src/app/modules/admin/apps/common/country/...
  - src/app/modules/admin/apps/common/country/country.graphql.ts
  - src/app/modules/admin/apps/common/country/country.columns-config.ts

Preserved Files (modified hash):
  - src/app/modules/admin/apps/common/country/country-detail.component.ts
  (These files have custom modifications and were not overwritten)

Summary:
  - X files regenerated
  - Y files preserved
```

---

## Available Packages (Front)

| Package        | Description                         |
| -------------- | ----------------------------------- |
| `auditing`     | HTTP communication and side effects |
| `common`       | Countries, langs, attachments       |
| `environments` | Environment configurations          |
| `iam`          | Identity and Access Management      |
| `message`      | Inbox, outbox, messaging            |
| `msEntraId`    | Microsoft Entra ID authentication   |
| `oAuth`        | OAuth clients, tokens, scopes       |

---

## Available Bounded Contexts

Based on `cliter/` directory:

| Bounded Context           | Modules                                                       |
| ------------------------- | ------------------------------------------------------------- |
| `common`                  | lang, country, administrative-area-level-_, attachment-_      |
| `iam`                     | account, user, role, permission, tenant, tag, bounded-context |
| `o-auth`                  | client, application, scope, access-token, refresh-token       |
| `auditing`                | http-communication, side-effect                               |
| `message`                 | inbox, outbox, message, inbox-setting                         |
| `queue-manager`           | queue, job-registry                                           |
| `search-engine`           | collection, field                                             |
| `support`                 | issue, comment                                                |
| `tools`                   | key-value, migration, procedure, webhook, webhook-log         |
| `business-partner-portal` | business-partner, partner-_, sales-invoice-_, etc.            |

---

## Commands Reference

```bash
# Regenerate module from YAML
aurora load front module -n=common/country

# Regenerate with force (overwrite all)
aurora load front module -n=common/country -f

# Regenerate with interface overwrite
aurora load front module -n=common/country -w

# Regenerate with force + interface overwrite + verbose
aurora load front module -n=common/country -fwv

# Add package
aurora add front oAuth

# Show available packages (interactive)
aurora add front

# Create new frontend project
aurora new front my-admin-panel
```

---

## Flags

| Flag                   | Short | Description                            |
| ---------------------- | ----- | -------------------------------------- |
| `--force`              | `-f`  | Overwrite existing files (ignore hash) |
| `--overwriteInterface` | `-w`  | Overwrite TypeScript interfaces        |
| `--noGraphQLTypes`     | `-g`  | Avoid generating GraphQL types         |
| `--verbose`            | `-v`  | Show detailed CLI output               |
| `--help`               | `-h`  | Show CLI help                          |

---

## Generated File Structure

When regenerating a module, Aurora generates:

```
src/app/modules/admin/apps/<bounded-context>/<module>/
├── <module>.columns-config.ts     # Grid column configuration
├── <module>.graphql.ts            # GraphQL queries/mutations
├── <module>.routes.ts             # Angular routes
├── <module>.service.ts            # Service with GraphQL operations
├── <module>.types.ts              # TypeScript interfaces
├── <module>-detail.component.ts   # Detail/edit form component
├── <module>-detail.component.html # Detail template
├── <module>-list.component.ts     # List/grid component
└── <module>-list.component.html   # List template
```

---

## Error Handling

| Error            | Solution                                        |
| ---------------- | ----------------------------------------------- |
| CLI not found    | Install with `npm i -g @aurorajs.dev/cli`       |
| YAML not found   | Check `cliter/<bc>/<module>.aurora.yaml` exists |
| Permission error | Check file permissions                          |
| Module not found | Verify bounded-context/module name spelling     |

---

## Common Workflows

### After YAML Schema Changes

```bash
# 1. Edit the YAML file
# cliter/common/country.aurora.yaml

# 2. Regenerate the module
aurora load front module -n=common/country

# 3. If you need to update interfaces too
aurora load front module -n=common/country -w
```

### Adding New Package

```bash
# 1. Add the package
aurora add front iam

# 2. The CLI will generate all necessary files
# 3. Configure routes if needed
```

### Full Regeneration (Caution)

```bash
# Only use when you want to discard all customizations
aurora load front module -n=common/country -f
```

---

## Related Skills

| Skill                      | When to Use Together                 |
| -------------------------- | ------------------------------------ |
| `aurora-schema`            | Before regenerating, validate YAML   |
| `aurora-project-structure` | Understand where files are generated |
| `conventional-commits`     | Commit after successful regeneration |

---

## Resources

- **YAML Definitions**: `cliter/<bounded-context>/<module>.aurora.yaml`
- **Generated Code**: `src/app/modules/admin/apps/<bounded-context>/<module>/`
- **CLI Version**: `aurora --version`
- **CLI Help**: `aurora --help`
