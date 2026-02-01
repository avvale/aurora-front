# GraphQL Service & Resolver Patterns

## Service Class

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, first, map, tap } from 'rxjs';
import { GraphQLService, GridData, QueryStatement } from '@aurora';

@Injectable({ providedIn: 'root' })
export class CountryService {
    paginationSubject$: BehaviorSubject<GridData<CommonCountry> | null> = new BehaviorSubject(null);
    countrySubject$: BehaviorSubject<CommonCountry | null> = new BehaviorSubject(null);
    private readonly graphqlService = inject(GraphQLService);

    get pagination$(): Observable<GridData<CommonCountry>> {
        return this.paginationSubject$.asObservable();
    }
    get country$(): Observable<CommonCountry> {
        return this.countrySubject$.asObservable();
    }

    pagination({ query = {}, constraint = {} } = {}): Observable<GridData<CommonCountry>> {
        return this.graphqlService.client()
            .watchQuery<{ pagination: GridData<CommonCountry> }>({
                query: paginationQuery, variables: { query, constraint },
            }).valueChanges.pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => this.paginationSubject$.next(pagination)),
            );
    }

    findById({ id = null, constraint = {} } = {}): Observable<CommonCountry> {
        return this.graphqlService.client()
            .watchQuery<{ object: CommonCountry }>({
                query: findByIdQuery, variables: { id, constraint },
            }).valueChanges.pipe(
                first(),
                map(result => result.data.object),
                tap(country => this.countrySubject$.next(country)),
            );
    }

    create<T>({ object = null } = {}): Observable<T> {
        return this.graphqlService.client().mutate({
            mutation: createMutation, variables: { payload: object },
        });
    }

    updateById<T>({ object = null } = {}): Observable<T> {
        return this.graphqlService.client().mutate({
            mutation: updateByIdMutation, variables: { payload: object },
        });
    }

    deleteById<T>({ id = null } = {}): Observable<T> {
        return this.graphqlService.client().mutate({
            mutation: deleteByIdMutation, variables: { id },
        });
    }
}
```

## Adding Custom Mutations

When the backend exposes additional APIs (e.g., `provision`, `approve`):

### 1. GraphQL file — add the mutation

```typescript
export const provisionMutation = gql`
    mutation ProductionPlanningProvisionProductionOrderHeader($id: ID!) {
        productionPlanningProvisionProductionOrderHeader(id: $id)
    }
`;
```

### 2. Service — add the method

```typescript
provision<T>({
    graphqlStatement = provisionMutation,
    id = null,
    headers = {},
}: {
    graphqlStatement?: DocumentNode;
    id?: string;
    headers?: GraphQLHeaders;
} = {}): Observable<FetchResult<T>> {
    return this.graphqlService.client().mutate({
        mutation: graphqlStatement,
        variables: { id },
        context: { headers },
    });
}
```

## Route Resolvers

```typescript
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ActionService, GridData } from '@aurora';

export const countryPaginationResolver: ResolveFn<GridData<CommonCountry>> = (route) => {
    const actionService = inject(ActionService);
    const countryService = inject(CountryService);
    actionService.action({ id: 'common::country.list.view', isViewAction: true });
    return countryService.pagination();
};

export const countryEditResolver: ResolveFn<CommonCountry> = (route) => {
    const actionService = inject(ActionService);
    const countryService = inject(CountryService);
    actionService.action({ id: 'common::country.detail.edit', isViewAction: true });
    return countryService.findById({ id: route.paramMap.get('id') });
};
```
