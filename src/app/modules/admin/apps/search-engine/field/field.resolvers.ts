import { SearchEngineField } from '../search-engine.types';
import { fieldColumnsConfig } from './field.columns-config';
import { FieldService } from './field.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FieldPaginationResolver implements Resolve<GridData<SearchEngineField>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly fieldService: FieldService,
    ) {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<GridData<SearchEngineField>>
    {
        this.actionService.action({
            id          : 'searchEngine::field.list.view',
            isViewAction: true,
        });

        const gridId = 'searchEngine::field.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'searchEngine::field.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'searchEngine::field.list.export');

        return this.fieldService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: fieldColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(gridId))
                .setSort(this.gridStateService.getSort(gridId))
                .setPage(this.gridStateService.getPage(gridId))
                .setSearch(this.gridStateService.getSearchState(gridId))
                .getQueryStatement(),
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class FieldNewResolver implements Resolve<Action>
{
    constructor(
		private readonly actionService: ActionService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Action
    {
        return this.actionService.action({
            id          : 'searchEngine::field.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class FieldEditResolver implements Resolve<{
	object: SearchEngineField;
}>
{
    constructor(
		private readonly actionService: ActionService,
		private readonly fieldService: FieldService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<{
		object: SearchEngineField;
    }>
    {
        this.actionService.action({
            id          : 'searchEngine::field.detail.edit',
            isViewAction: true,
        });

        return this.fieldService
            .findById({
                id: route.paramMap.get('id'),
            });
    }
}
