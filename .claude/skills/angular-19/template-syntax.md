# Template Syntax (Angular 19)

## @let — Template Variables (Stable in v19)

```html
@let userName = user().name;
@let isAdmin = user().role === 'admin';
@let total = price() * quantity();

<h1>Welcome, {{ userName }}</h1>
@if (isAdmin) { <admin-panel /> }
<p>Total: {{ total | currency }}</p>

@let userData = userResource.value();
@if (userData) { <user-profile [user]="userData" /> }
```

## Control Flow (Stable since v17)

```html
@if (isLoading()) { <spinner /> }
@else if (error()) { <error-message [error]="error()" /> }
@else { <content [data]="data()" /> }

@for (item of items(); track item.id) {
    <item-card [item]="item" />
} @empty { <p>No items found</p> }

@switch (status()) {
    @case ('pending') { <pending-badge /> }
    @case ('active') { <active-badge /> }
    @default { <unknown-badge /> }
}
```

## @defer — Lazy Loading

```html
@defer (on viewport) {
    <chart-component />
} @loading (minimum 200ms) {
    <skeleton-loader />
} @error {
    <p>Failed to load chart</p>
}

<!-- Triggers -->
@defer (on idle) { }
@defer (on viewport) { }
@defer (on interaction) { }
@defer (on hover) { }
@defer (on timer(5s)) { }
@defer (when condition()) { }
@defer (prefetch on idle) { }
```

## Incremental Hydration (Experimental, SSR)

```html
@defer (hydrate on viewport) { <app-comments /> }
@defer (hydrate on interaction) { <app-interactive-widget /> }
```

## Router Enhancements

```typescript
// Parent template — pass data to routed children
<router-outlet [routerOutletData]="{ theme: currentTheme() }" />

// Child component
outletData = inject(ROUTER_OUTLET_DATA) as Signal<{ theme: string }>;
theme = computed(() => this.outletData().theme);
```

## Testing (Angular 19)

```typescript
// Auto-flush in fakeAsync
it('should update', fakeAsync(() => {
    component.loadData();
    expect(component.data()).toBeDefined();
}));

// Testing signals
it('should compute', () => {
    const count = signal(5);
    const doubled = computed(() => count() * 2);
    expect(doubled()).toBe(10);
    count.set(10);
    expect(doubled()).toBe(20);
});
```
