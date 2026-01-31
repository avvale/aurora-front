# Material 3 Theming

## Basic Theme Setup

```scss
@use '@angular/material' as mat;

html {
    @include mat.theme((
        color: mat.$violet-palette,
        typography: Roboto,
        density: 0,
    ));
}
```

## Dark Mode with light-dark()

```scss
@use '@angular/material' as mat;

html {
    color-scheme: light dark;
    @include mat.theme((
        color: mat.$azure-palette,
        typography: Roboto,
        density: 0,
    ));
}

// OR: Force specific mode
html.light-mode { color-scheme: light; }
html.dark-mode { color-scheme: dark; }
```

## Custom Color Overrides

```scss
@use '@angular/material' as mat;

html {
    color-scheme: light dark;
    @include mat.theme((
        color: mat.$violet-palette,
        typography: Roboto,
        density: 0,
    ), $overrides: (
        surface: light-dark(#fefbff, #1c1b1f),
        on-surface: light-dark(#1c1b1f, #e6e1e5),
        surface-container: light-dark(#f3edf7, #211f26),
        primary: light-dark(#6750a4, #d0bcff),
        on-primary: light-dark(#ffffff, #381e72),
        error: light-dark(#b3261e, #f2b8b5),
        on-error: light-dark(#ffffff, #601410),
    ));
}
```

## Component Override Mixins

```scss
@use '@angular/material' as mat;

@include mat.button-overrides((
    filled-container-color: #6200ea,
    filled-label-text-color: white,
));

@include mat.form-field-overrides((
    filled-container-color: rgba(0, 0, 0, 0.04),
    outlined-outline-color: #79747e,
    focused-outline-color: #6200ea,
));

@include mat.card-overrides((
    container-color: light-dark(#ffffff, #2d2d2d),
    container-elevation: 2,
));

@include mat.dialog-overrides((
    container-color: light-dark(#fefbff, #1c1b1f),
    container-shape: 28px,
));
```

## Theme Service with Signals

```typescript
import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly STORAGE_KEY = 'theme-mode';
    currentTheme = signal<ThemeMode>(this.getStoredTheme());

    constructor() {
        effect(() => {
            const theme = this.currentTheme();
            this.applyTheme(theme);
            localStorage.setItem(this.STORAGE_KEY, theme);
        });
    }

    setTheme(mode: ThemeMode): void { this.currentTheme.set(mode); }
    toggleTheme(): void {
        this.currentTheme.set(this.currentTheme() === 'light' ? 'dark' : 'light');
    }

    private applyTheme(mode: ThemeMode): void {
        const html = document.documentElement;
        html.classList.remove('light-mode', 'dark-mode');
        if (mode === 'system') {
            html.style.colorScheme = 'light dark';
        } else {
            html.style.colorScheme = mode;
            html.classList.add(`${mode}-mode`);
        }
    }

    private getStoredTheme(): ThemeMode {
        return (localStorage.getItem(this.STORAGE_KEY) as ThemeMode) ?? 'system';
    }
}
```

## Theme Toggle Component

```typescript
@Component({
    selector: 'app-theme-toggle',
    imports: [MatButtonModule, MatIconModule, MatMenuModule],
    template: `
        <button [matMenuTriggerFor]="themeMenu" mat-icon-button>
            <mat-icon>{{ themeIcon() }}</mat-icon>
        </button>
        <mat-menu #themeMenu="matMenu">
            <button mat-menu-item (click)="setTheme('light')">
                <mat-icon>light_mode</mat-icon> Light
            </button>
            <button mat-menu-item (click)="setTheme('dark')">
                <mat-icon>dark_mode</mat-icon> Dark
            </button>
            <button mat-menu-item (click)="setTheme('system')">
                <mat-icon>settings_brightness</mat-icon> System
            </button>
        </mat-menu>
    `,
})
export class ThemeToggleComponent {
    private readonly themeService = inject(ThemeService);
    themeIcon = computed(() => {
        const theme = this.themeService.currentTheme();
        return theme === 'light' ? 'light_mode' : theme === 'dark' ? 'dark_mode' : 'settings_brightness';
    });
    setTheme(mode: ThemeMode): void { this.themeService.setTheme(mode); }
}
```
