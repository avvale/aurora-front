# Signals API (Stable in v19)

## Signal Inputs

```typescript
import { input } from '@angular/core';

name = input<string>();                              // Optional: Signal<string | undefined>
id = input.required<string>();                       // Required: Signal<string>
count = input(0);                                    // With default: Signal<number>
disabled = input(false, { transform: booleanAttribute }); // With transform
```

## Model Signals (Two-way binding)

```typescript
import { model } from '@angular/core';

value = model<string>('');           // ModelSignal<string>
value = model.required<string>();    // Required model

// Parent: [(value)]="parentValue"
// Or: [value]="data" (valueChange)="onChanged($event)"
```

## Output

```typescript
import { output, outputFromObservable } from '@angular/core';

saved = output<User>();     // OutputEmitterRef<User>
closed = output<void>();
this.saved.emit(user);

// From Observable
dataOutput = outputFromObservable(this.data$);
```

## linkedSignal (Experimental in v19)

Writable signal that resets when source changes:

```typescript
import { linkedSignal } from '@angular/core';

selectedUserId = signal<string | null>(null);

// Resets when selectedUserId changes
userNotes = linkedSignal(() => {
    const userId = this.selectedUserId();
    return userId ? `Notes for ${userId}` : '';
});

this.userNotes.set('Custom notes');          // Can still write manually
this.selectedUserId.set('user-456');         // userNotes resets
```

## Signal Queries

```typescript
import { viewChild, viewChildren, contentChild, contentChildren } from '@angular/core';

// viewChild
inputEl = viewChild<ElementRef>('inputRef');           // optional
inputEl = viewChild.required<ElementRef>('inputRef');  // required
dialog = viewChild(MatDialog);                         // by type
items = viewChildren<ElementRef>('item');               // multiple

// contentChild
header = contentChild<TemplateRef<any>>('header');
tabs = contentChildren(TabComponent);

// Usage in effect
effect(() => {
    const el = this.inputEl();
    if (el) el.nativeElement.focus();
});
```

## Migration Commands

```bash
ng generate @angular/core:signal-queries-migration
ng generate @angular/core:signal-input-migration
ng generate @angular/core:output-migration
```
