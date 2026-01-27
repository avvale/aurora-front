---
name: tailwind-3
description: >
    Tailwind CSS 3 patterns for Aurora Angular projects with Fuse theming
    integration. Trigger: When styling components, writing HTML templates, using
    utility classes, or configuring themes in Aurora projects.
license: MIT
metadata:
    author: aurora
    version: '2.0'
    tailwind_version: '3.x'
    auto_invoke:
        'Tailwind classes, styling components, CSS utilities, themes, responsive
        design, Aurora layout'
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Styling Decision Tree

```
Aurora form layout?     → layout__container + col-* classes
Theme colors needed?    → bg-primary, text-on-primary, bg-card, etc.
Dark mode support?      → Use theme utilities (auto) OR dark:* variants
Responsive design?      → Mobile-first with sm:/md:/lg:/xl: prefixes
Custom component style? → @apply in SCSS for reusable patterns
One-off styling?        → Inline Tailwind classes
```

## Critical Rules

### Use Aurora Grid for Forms

```html
<!-- ✅ ALWAYS: Aurora layout system for forms -->
<div class="layout__container">
    <mat-form-field class="col-6">...</mat-form-field>
    <mat-form-field class="col-6">...</mat-form-field>
    <mat-form-field class="col-12">...</mat-form-field>
</div>

<!-- ❌ NEVER: Raw Tailwind grid in forms -->
<div class="grid grid-cols-12 gap-4">
    <mat-form-field class="col-span-6">...</mat-form-field>
</div>
```

### Use Theme-Aware Utilities

```html
<!-- ✅ ALWAYS: Theme utilities (auto dark mode) -->
<div class="text-default bg-card">Auto dark mode</div>
<div class="bg-primary text-on-primary">Theme colors</div>

<!-- ⚠️ CAUTION: Manual colors need dark variants -->
<div class="bg-white dark:bg-slate-800">Manual handling</div>
```

---

## Project Configuration

### Key Files

| File                                  | Purpose                |
| ------------------------------------- | ---------------------- |
| `tailwind.config.js`                  | Main Tailwind config   |
| `src/@fuse/styles/tailwind.scss`      | Base styles and layers |
| `src/@aurora/styles/layout.scss`      | Aurora grid system     |
| `src/@aurora/styles/overrides/*.scss` | Aurora utilities       |
| `src/@fuse/tailwind/plugins/`         | Custom Fuse plugins    |

### Important Settings

```javascript
// tailwind.config.js
{
    darkMode: ['selector', '.dark'],  // Dark mode via .dark class
    important: true,                   // All utilities are !important
    content: ['./src/**/*.{html,scss,ts}'],
}
```

---

## Aurora Grid Layout System

### Column Classes (Responsive)

| Class               | Desktop (md+) | Tablet (sm) | Mobile      |
| ------------------- | ------------- | ----------- | ----------- |
| `col-1` to `col-4`  | col-span-N    | col-span-3  | col-span-6  |
| `col-5` to `col-11` | col-span-N    | col-span-6  | col-span-12 |
| `col-12`            | col-span-12   | col-span-12 | col-span-12 |

### Form Layout Examples

```html
<!-- 2-column form -->
<div class="layout__container">
    <mat-form-field class="col-6">Name</mat-form-field>
    <mat-form-field class="col-6">Email</mat-form-field>
</div>

<!-- 3-column form -->
<div class="layout__container">
    <mat-form-field class="col-4">First Name</mat-form-field>
    <mat-form-field class="col-4">Last Name</mat-form-field>
    <mat-form-field class="col-4">Phone</mat-form-field>
</div>

<!-- Mixed columns -->
<div class="layout__container">
    <mat-form-field class="col-8">Address</mat-form-field>
    <mat-form-field class="col-4">ZIP Code</mat-form-field>
    <mat-form-field class="col-12">Notes</mat-form-field>
</div>
```

---

## Theme Colors

### Primary/Accent/Warn Palettes

```html
<!-- Primary (indigo by default) -->
<div class="bg-primary text-on-primary">Primary button</div>
<div class="bg-primary-500">Primary 500</div>
<div class="text-primary-600">Primary text</div>
<div class="border-primary">Primary border</div>

<!-- Accent (slate by default) -->
<div class="bg-accent text-on-accent">Accent</div>

<!-- Warn (red by default) -->
<div class="bg-warn text-on-warn">Warning</div>
```

### Theme-Aware Semantic Colors

```html
<!-- Text colors -->
<p class="text-default">Main text color</p>
<p class="text-secondary">Secondary/muted text</p>
<p class="text-hint">Hint/placeholder text</p>
<p class="text-disabled">Disabled state text</p>

<!-- Background colors -->
<div class="bg-default">Page background</div>
<div class="bg-card">Card/surface background</div>
<div class="bg-dialog">Dialog background</div>
<div class="bg-hover">Hover state background</div>
```

### Theme Switching

```html
<!-- Apply theme to container -->
<div class="theme-brand">Uses brand palette</div>
<div class="theme-teal">Uses teal palette</div>
<div class="theme-purple">Uses purple palette</div>
<div class="theme-rose">Uses rose palette</div>
<div class="theme-amber">Uses amber palette</div>
```

---

## Dark Mode

### How It Works

Dark mode is controlled by `.dark` class on body (Fuse handles this).

```html
<!-- Automatic: Theme utilities handle dark mode -->
<div class="bg-card">
    <!-- Light: white background -->
    <!-- Dark: slate-800 background -->
</div>

<!-- Manual: When using non-theme colors -->
<div class="bg-white dark:bg-slate-800">
    <p class="text-gray-900 dark:text-white">Content</p>
</div>
```

### Dark Mode Patterns

```html
<!-- ✅ PREFERRED: Theme-aware utilities -->
<div class="text-default bg-card border">Card</div>
<button class="bg-primary text-on-primary">Button</button>

<!-- ⚠️ WHEN NEEDED: Manual dark variants -->
<div class="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
    Custom colors with dark support
</div>
```

---

## Common Patterns

### Flexbox

```html
<!-- Center content -->
<div class="flex items-center justify-center">...</div>

<!-- Space between -->
<div class="flex items-center justify-between">...</div>

<!-- Flex with gap -->
<div class="flex items-center gap-4">...</div>

<!-- Flex column -->
<div class="flex flex-col gap-2">...</div>

<!-- Inline flex -->
<div class="inline-flex items-center gap-2">...</div>
```

### Grid (Non-Form Layouts)

```html
<!-- Basic grid -->
<div class="grid grid-cols-3 gap-4">...</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">...</div>
```

### Spacing

```html
<!-- Padding -->
<div class="p-4">All sides</div>
<div class="px-4 py-2">Horizontal, vertical</div>
<div class="pb-2 pt-4">Top, bottom</div>

<!-- Margin -->
<div class="m-4">All sides</div>
<div class="mx-auto">Center horizontally</div>
<div class="mb-4 mt-8">Top, bottom</div>

<!-- Gap (flexbox/grid) -->
<div class="flex gap-4">...</div>
```

### Typography

```html
<h1 class="text-2xl font-bold">Heading</h1>
<p class="text-secondary text-sm">Secondary text</p>
<span class="text-xs font-medium uppercase tracking-wide">Label</span>
```

### Cards

```html
<!-- Basic card -->
<div class="bg-card rounded-lg p-6 shadow">...</div>

<!-- Card with hover effect -->
<div class="bg-card rounded-lg p-6 shadow transition-shadow hover:shadow-lg">
    ...
</div>

<!-- Card with border -->
<div class="bg-card rounded-lg border p-6">...</div>
```

### Borders & Shadows

```html
<div class="rounded-lg border">Rounded border</div>
<div class="rounded-full shadow-lg">Circle with shadow</div>
<div class="ring-2 ring-primary ring-offset-2">Focus ring</div>
```

### States

```html
<button class="hover:bg-primary-600 focus:ring-2 active:scale-95">
    Interactive
</button>
<input class="focus:border-primary focus:outline-none" />
<div class="group-hover:opacity-100">Group hover</div>
```

---

## Responsive Design

### Breakpoints

| Prefix | Min Width | Usage           |
| ------ | --------- | --------------- |
| (none) | 0px       | Mobile first    |
| `sm:`  | 600px     | Small tablets   |
| `md:`  | 960px     | Tablets/laptops |
| `lg:`  | 1280px    | Desktops        |
| `xl:`  | 1440px    | Large screens   |

### Common Patterns

```html
<!-- Stack on mobile, row on desktop -->
<div class="flex flex-col sm:flex-row">...</div>

<!-- Responsive padding -->
<div class="p-4 sm:p-6 md:p-8">...</div>

<!-- Show/hide by breakpoint -->
<div class="hidden sm:block">Desktop only</div>
<div class="sm:hidden">Mobile only</div>

<!-- Responsive typography -->
<h1 class="text-2xl sm:text-3xl md:text-4xl">Title</h1>

<!-- Responsive width -->
<div class="w-full md:w-1/2 lg:w-1/3">...</div>
```

---

## Component Page Layout

### Standard Aurora Page Structure

```html
<div class="absolute inset-0 flex w-full flex-col overflow-hidden">
    <!-- Header -->
    <div
        class="bg-card flex flex-0 flex-col border-b p-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-4 dark:bg-transparent"
    >
        <div class="min-w-0 flex-1">
            <au-breadcrumb [data]="breadcrumb"></au-breadcrumb>
            <au-title>
                <mat-icon class="mr-2 icon-size-8">settings</mat-icon>
                Page Title
            </au-title>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex flex-shrink-0 items-center sm:ml-4 sm:mt-0">
            <button
                class="ml-3"
                [color]="'primary'"
                mat-flat-button
            >
                <mat-icon class="mr-2 icon-size-5">save</mat-icon>
                Save
            </button>
        </div>
    </div>

    <!-- Main Content -->
    <div class="flex-auto overflow-y-auto px-6 pt-6 sm:px-10 sm:pt-10">
        <div class="form-card">
            <div class="layout__container">
                <!-- Form fields here -->
            </div>
        </div>
    </div>
</div>
```

---

## Fuse Utility Classes

### Icon Sizing

```html
<mat-icon class="icon-size-4">icon</mat-icon>
<!-- 1rem -->
<mat-icon class="icon-size-5">icon</mat-icon>
<!-- 1.25rem -->
<mat-icon class="icon-size-6">icon</mat-icon>
<!-- 1.5rem -->
<mat-icon class="icon-size-8">icon</mat-icon>
<!-- 2rem -->
<mat-icon class="icon-size-10">icon</mat-icon>
<!-- 2.5rem -->
<mat-icon class="icon-size-12">icon</mat-icon>
<!-- 3rem -->
```

### Extended Spacing

```html
<div class="w-90">360px width</div>
<div class="h-120">480px height</div>
<div class="max-w-200">800px max width</div>
```

### Extended Z-Index

```html
<div class="z-60">Above most elements</div>
<div class="z-999">Above modals</div>
<div class="z-9999">Tooltips, dropdowns</div>
```

---

## Using @apply in SCSS

### Component Styles

```scss
// ✅ GOOD: Reusable component styles
.form-card {
    @apply bg-card rounded-lg p-6 shadow;
}

.button-primary {
    @apply rounded bg-primary px-4 py-2 text-on-primary;
}

// ✅ GOOD: Custom utilities layer
@layer utilities {
    .truncate-2-lines {
        @apply line-clamp-2;
    }
}

// ❌ AVOID: @apply for one-off styles
// Use inline classes instead
```

### Interpolation for !important

```scss
// When needed despite important: true in config
.text-forced {
    @apply text-default #{'!important'};
}
```

---

## Anti-Patterns

| Avoid                                  | Do Instead                                      |
| -------------------------------------- | ----------------------------------------------- |
| Raw `grid-cols-*` in forms             | Use `layout__container` + `col-*`               |
| Hard-coded colors without dark variant | Use theme utilities (`bg-card`, `text-default`) |
| `!important` in HTML classes           | Tailwind config has `important: true`           |
| Inline styles for spacing              | Use Tailwind spacing utilities                  |
| `@apply` for single-use styles         | Use inline utility classes                      |
| Hex colors in arbitrary values         | Use theme color classes                         |

---

## Related Skills

| Skill                 | When to Use Together         |
| --------------------- | ---------------------------- |
| `angular-19`          | Angular component patterns   |
| `angular-material-19` | Material components styling  |
| `tailwind-4`          | When migrating to Tailwind 4 |

---

## Resources

- **Tailwind Config**: `tailwind.config.js`
- **Fuse Plugins**: `src/@fuse/tailwind/plugins/`
- **Aurora Styles**: `src/@aurora/styles/`
- **Official Docs**: https://v3.tailwindcss.com/docs
