# CDK Patterns

## 2D Drag & Drop (New in v19) — Mixed Orientation

```typescript
import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-grid-drag',
    imports: [DragDropModule],
    template: `
        <div class="grid-container" cdkDropList cdkDropListOrientation="mixed"
             (cdkDropListDropped)="drop($event)">
            @for (item of items; track item.id) {
                <div class="grid-item" cdkDrag>{{ item.name }}</div>
            }
        </div>
    `,
    styles: `
        .grid-container { display: flex; flex-wrap: wrap; gap: 16px; padding: 16px; }
        .grid-item { width: 120px; height: 120px; display: flex; align-items: center;
                     justify-content: center; background: var(--mat-sys-surface-container);
                     border-radius: 8px; cursor: move; }
        .cdk-drag-preview { box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2); }
        .cdk-drag-placeholder { opacity: 0.3; }
    `,
})
export class GridDragComponent {
    items = [
        { id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }, { id: 4, name: 'Item 4' },
    ];
    drop(event: CdkDragDrop<typeof this.items>): void {
        moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    }
}
```

## Tab Reordering

```typescript
@Component({
    selector: 'app-draggable-tabs',
    imports: [MatTabsModule, DragDropModule],
    template: `
        <mat-tab-group>
            <div cdkDropList cdkDropListOrientation="horizontal"
                 (cdkDropListDropped)="dropTab($event)">
                @for (tab of tabs; track tab.id) {
                    <mat-tab cdkDrag>
                        <ng-template mat-tab-label>
                            <span cdkDragHandle>{{ tab.label }}</span>
                        </ng-template>
                        <p>{{ tab.content }}</p>
                    </mat-tab>
                }
            </div>
        </mat-tab-group>
    `,
})
export class DraggableTabsComponent {
    tabs = [{ id: 1, label: 'Tab 1', content: 'Content 1' }, /* ... */];
    dropTab(event: CdkDragDrop<typeof this.tabs>): void {
        moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    }
}
```

## CDK Overlay (Signal-Based)

```typescript
@Injectable({ providedIn: 'root' })
export class PreviewOverlayService {
    private readonly overlay = inject(Overlay);
    private readonly injector = inject(Injector);

    open<T>(component: Type<T>, data: any): OverlayRef {
        const positionStrategy = this.overlay.position().global()
            .centerHorizontally().centerVertically();
        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-dark-backdrop',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy,
        });
        const overlayRef = this.overlay.create(overlayConfig);
        const injector = Injector.create({
            providers: [
                { provide: PREVIEW_DATA, useValue: data },
                { provide: OverlayRef, useValue: overlayRef },
            ],
            parent: this.injector,
        });
        overlayRef.attach(new ComponentPortal(component, null, injector));
        overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
        return overlayRef;
    }
}
```

## CDK SelectionModel with Signals

```typescript
@Component({...})
export class SelectableListComponent {
    items = signal<Item[]>([]);
    selection = new SelectionModel<Item>(true, [], true, (a, b) => a.id === b.id);
    selectedCount = computed(() => this.selection.selected.length);
    allSelected = computed(() =>
        this.items().length > 0 && this.selection.selected.length === this.items().length
    );

    toggleAll(): void {
        this.allSelected() ? this.selection.clear() : this.selection.select(...this.items());
    }
}
```
