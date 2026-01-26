---
name: tailwind
description: >
  Tailwind CSS patterns for Aurora Angular projects with Fuse theming integration.
  Trigger: When styling components, writing HTML templates, using utility classes, or configuring themes.
license: MIT
metadata:
  author: aurora
  version: "1.0"
  auto_invoke: "Tailwind classes, styling components, CSS utilities, themes, responsive design"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## When to Use

- Styling Angular component templates
- Creating responsive layouts
- Using theme colors (primary, accent, warn)
- Working with dark mode
- Using Aurora's grid layout system
- Configuring Tailwind or custom utilities

---

## Project Configuration

### Key Files

| File | Purpose |
|------|---------|
| `tailwind.config.js` | Main Tailwind configuration |
| `src/@fuse/styles/tailwind.scss` | Base styles and layers |
| `src/@aurora/styles/layout.scss` | Aurora grid system |
| `src/@aurora/styles/overrides/tailwind.scss` | Aurora utilities |
| `src/@fuse/tailwind/plugins/` | Custom Fuse plugins |

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

## Aurora Grid Layout System (REQUIRED)

### Container Pattern

```html
<!-- ✅ ALWAYS: Use layout__container with col-* classes -->
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

### Column Classes (Responsive)

| Class | Desktop (md+) | Tablet (sm) | Mobile |
|-------|---------------|-------------|--------|
| `col-1` to `col-4` | col-span-N | col-span-3 | col-span-6 |
| `col-5` to `col-11` | col-span-N | col-span-6 | col-span-12 |
| `col-12` | col-span-12 | col-span-12 | col-span-12 |

```html
<!-- Example: 3-column form that stacks responsively -->
<div class="layout__container">
    <mat-form-field class="col-4">Name</mat-form-field>
    <mat-form-field class="col-4">Email</mat-form-field>
    <mat-form-field class="col-4">Phone</mat-form-field>
</div>
```

---

## Theme Colors

### Available Palettes

```html
<!-- Primary (indigo by default) -->
<div class="bg-primary text-on-primary">Primary</div>
<div class="bg-primary-500">Primary 500</div>
<div class="text-primary-600">Primary text</div>

<!-- Accent (slate by default) -->
<div class="bg-accent text-on-accent">Accent</div>

<!-- Warn (red by default) -->
<div class="bg-warn text-on-warn">Warning</div>
```

### Theme Switching

```html
<!-- Apply theme to container -->
<div class="theme-brand">Uses brand palette</div>
<div class="theme-teal">Uses teal palette</div>
<div class="theme-purple">Uses purple palette</div>
```

### Available Themes

| Theme | Primary Color |
|-------|---------------|
| `default` | Indigo |
| `brand` | Custom blue (#2196F3) |
| `teal` | Teal |
| `rose` | Rose |
| `purple` | Purple |
| `amber` | Amber |

---

## Fuse Utility Classes

### Text Colors

```html
<p class="text-default">Main text color</p>
<p class="text-secondary">Secondary/muted text</p>
<p class="text-hint">Hint/placeholder text</p>
<p class="text-disabled">Disabled state text</p>
```

### Background Colors

```html
<div class="bg-default">Page background</div>
<div class="bg-card">Card/surface background</div>
<div class="bg-dialog">Dialog background</div>
<div class="bg-hover">Hover state background</div>
```

### Icon Sizing

```html
<!-- Custom icon-size utility -->
<mat-icon class="icon-size-4">icon</mat-icon>   <!-- 1rem -->
<mat-icon class="icon-size-5">icon</mat-icon>   <!-- 1.25rem -->
<mat-icon class="icon-size-6">icon</mat-icon>   <!-- 1.5rem -->
<mat-icon class="icon-size-8">icon</mat-icon>   <!-- 2rem -->
<mat-icon class="icon-size-10">icon</mat-icon>  <!-- 2.5rem -->
<mat-icon class="icon-size-12">icon</mat-icon>  <!-- 3rem -->
```

---

## Dark Mode

### How It Works

Dark mode is controlled by the `.dark` class on body or parent element.

```html
<!-- Automatic dark mode handling -->
<div class="bg-card">
    <!-- Light: white background -->
    <!-- Dark: slate-800 background -->
</div>

<!-- Manual dark mode overrides -->
<div class="bg-white dark:bg-slate-800">
    <p class="text-gray-900 dark:text-white">Content</p>
</div>
```

### Dark Mode Patterns

```html
<!-- ✅ GOOD: Use theme-aware utilities -->
<div class="bg-card text-default border">Card</div>

<!-- ⚠️ CAUTION: Manual colors need dark variants -->
<div class="bg-white text-black dark:bg-gray-800 dark:text-white">
    Manual colors
</div>
```

---

## Component Page Layout Pattern

### Standard Page Structure

```html
<div class="absolute inset-0 flex w-full flex-col overflow-hidden">
    <!-- Header -->
    <div class="bg-card flex flex-0 flex-col border-b p-6
                sm:flex-row sm:items-center sm:justify-between
                sm:px-10 sm:py-4 dark:bg-transparent">
        <div class="min-w-0 flex-1">
            <au-breadcrumb [data]="breadcrumb"></au-breadcrumb>
            <au-title>
                <mat-icon class="mr-2 icon-size-8">icon</mat-icon>
                Title
            </au-title>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex flex-shrink-0 items-center sm:ml-4 sm:mt-0">
            <button mat-flat-button class="ml-3">Action</button>
        </div>
    </div>

    <!-- Main Content -->
    <div class="flex-auto overflow-y-auto px-6 pt-6 sm:px-10 sm:pt-10">
        <div class="form-card">
            <!-- Form content -->
        </div>
    </div>
</div>
```

---

## Responsive Design

### Breakpoints

| Prefix | Min Width | Usage |
|--------|-----------|-------|
| (none) | 0px | Mobile first (default) |
| `sm:` | 600px | Small tablets |
| `md:` | 960px | Tablets/small laptops |
| `lg:` | 1280px | Desktops |
| `xl:` | 1440px | Large screens |

### Common Patterns

```html
<!-- Stack on mobile, row on desktop -->
<div class="flex flex-col sm:flex-row">...</div>

<!-- Padding: smaller on mobile, larger on desktop -->
<div class="p-4 sm:p-6 md:p-8">...</div>

<!-- Hide on mobile, show on desktop -->
<div class="hidden sm:block">Desktop only</div>
<div class="sm:hidden">Mobile only</div>

<!-- Font size responsive -->
<h1 class="text-2xl sm:text-3xl md:text-4xl">Title</h1>
```

---

## Extended Spacing

### Custom Spacing Values

```javascript
// Available in tailwind.config.js
spacing: {
    13: '3.25rem',   // 52px
    15: '3.75rem',   // 60px
    18: '4.5rem',    // 72px
    22: '5.5rem',    // 88px
    26: '6.5rem',    // 104px
    30: '7.5rem',    // 120px
    50: '12.5rem',   // 200px
    90: '22.5rem',   // 360px
    100: '25rem',    // 400px
    120: '30rem',    // 480px
    // ... up to 480: '120rem'
}
```

### Usage

```html
<div class="w-90">360px width</div>
<div class="h-120">480px height</div>
<div class="max-w-200">800px max width</div>
```

---

## Font Sizes

### Custom Scale

| Class | Size | Use Case |
|-------|------|----------|
| `text-xs` | 0.625rem | Very small labels |
| `text-sm` | 0.75rem | Small text, captions |
| `text-md` | 0.8125rem | Medium text |
| `text-base` | 0.875rem | Body text (default) |
| `text-lg` | 1rem | Slightly larger |
| `text-xl` | 1.125rem | Subheadings |
| `text-2xl` | 1.25rem | Headings |
| `text-3xl` | 1.5rem | Large headings |

---

## Z-Index Scale

### Extended Values

```javascript
zIndex: {
    '-1': -1,
    49: 49,
    60: 60,
    70: 70,
    80: 80,
    90: 90,
    99: 99,
    999: 999,
    9999: 9999,
    99999: 99999,
}
```

```html
<div class="z-60">Above most elements</div>
<div class="z-999">Above modals</div>
<div class="z-9999">Tooltips, dropdowns</div>
```

---

## Using @apply in SCSS

### Component Styles

```scss
// ✅ GOOD: Use @apply for reusable component styles
.form-card {
    @apply bg-card rounded-lg p-6 shadow;
}

.button-primary {
    @apply bg-primary text-on-primary px-4 py-2 rounded;
}

// ✅ GOOD: Layer for custom utilities
@layer utilities {
    .truncate-2-lines {
        @apply line-clamp-2;
    }
}

// ❌ AVOID: @apply for one-off styles (use inline classes instead)
```

### Interpolation for !important

```scss
// When using @apply with dynamic values
.text-forced {
    @apply text-default #{'!important'};
}
```

---

## Common Utility Combinations

### Card Patterns

```html
<!-- Basic card -->
<div class="bg-card rounded-lg p-6 shadow">...</div>

<!-- Card with hover -->
<div class="bg-card rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
    ...
</div>

<!-- Card with border -->
<div class="bg-card rounded-lg border p-6">...</div>
```

### Flex Patterns

```html
<!-- Center content -->
<div class="flex items-center justify-center">...</div>

<!-- Space between -->
<div class="flex items-center justify-between">...</div>

<!-- Flex with gap -->
<div class="flex items-center gap-4">...</div>

<!-- Flex column -->
<div class="flex flex-col gap-2">...</div>
```

### Button with Icon

```html
<button mat-flat-button class="ml-3">
    <mat-icon class="mr-2 icon-size-5">save</mat-icon>
    Save
</button>
```

---

## Anti-Patterns

| Avoid | Do Instead |
|-------|------------|
| Raw `grid-cols-*` in forms | Use `layout__container` + `col-*` |
| Hard-coded colors without dark variant | Use theme utilities (`bg-card`, `text-default`) |
| `!important` in HTML classes | Tailwind already uses `important: true` |
| Inline styles for spacing | Use Tailwind spacing utilities |
| Custom CSS for common patterns | Use Tailwind utilities |
| `@apply` for single-use styles | Use inline utility classes |

---

## Resources

- **Tailwind Config**: `tailwind.config.js`
- **Fuse Plugins**: `src/@fuse/tailwind/plugins/`
- **Aurora Styles**: `src/@aurora/styles/`
- **Official Docs**: https://tailwindcss.com/docs
