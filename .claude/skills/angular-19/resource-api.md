# Resource API (Experimental in v19)

## resource() — Promise-based

```typescript
import { resource, signal } from '@angular/core';

userId = signal<string>('user-123');

userResource = resource({
    request: () => this.userId(),
    loader: async ({ request, abortSignal }) => {
        const response = await fetch(`/api/users/${request}`, { signal: abortSignal });
        return response.json() as Promise<User>;
    },
});

// Template
@if (userResource.isLoading()) { <app-spinner /> }
@if (userResource.error()) { <app-error [error]="userResource.error()" /> }
@if (userResource.value(); as user) { <app-user-card [user]="user" /> }
```

## rxResource() — Observable-based

```typescript
import { rxResource } from '@angular/core/rxjs-interop';

usersResource = rxResource({
    request: () => this.page(),
    loader: ({ request }) => this.http.get<User[]>(`/api/users?page=${request}`),
});
```

## httpResource() (Angular 19.2+)

```typescript
import { httpResource } from '@angular/common/http';

user = httpResource(() => `/api/users/${this.userId()}`);

users = httpResource(() => ({
    url: '/api/users',
    method: 'GET',
    params: { page: this.page().toString() },
}));
```

## Resource Properties

| Property      | Type                         | Description                    |
| ------------- | ---------------------------- | ------------------------------ |
| `value()`     | `Signal<T \| undefined>`     | Current value                  |
| `isLoading()` | `Signal<boolean>`            | Loading state                  |
| `error()`     | `Signal<Error \| undefined>` | Error if failed                |
| `status()`    | `Signal<ResourceStatus>`     | idle, loading, resolved, error |
| `reload()`    | `() => void`                 | Force refetch                  |
| `update()`    | `(value: T) => void`         | Manually update value          |
