import { fieldColumnsConfig } from '../field/field.columns-config';
import { SearchEngineCollection, SearchEngineField } from '../search-engine.types';
import { collectionColumnsConfig } from './collection.columns-config';
import { CollectionService } from './collection.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CollectionPaginationResolver implements Resolve<GridData<SearchEngineCollection>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly collectionService: CollectionService,
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
    ): Observable<GridData<SearchEngineCollection>>
    {
        this.actionService.action({
            id          : 'searchEngine::collection.list.view',
            isViewAction: true,
        });

        const gridId = 'searchEngine::collection.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'searchEngine::collection.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'searchEngine::collection.list.export');

        return this.collectionService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: collectionColumnsConfig })
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
export class CollectionNewResolver implements Resolve<Action>
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
            id          : 'searchEngine::collection.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class CollectionEditResolver implements Resolve<{
	object: SearchEngineCollection;
	searchEnginePaginateFields: GridData<SearchEngineField>;
}>
{
    constructor(
		private readonly actionService: ActionService,
		private readonly collectionService: CollectionService,
		private readonly gridFiltersStorageService: GridFiltersStorageService,
		private readonly gridStateService: GridStateService,
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
		object: SearchEngineCollection;
		searchEnginePaginateFields: GridData<SearchEngineField>;
    }>
    {
        // paginate to manage fields grid-elements-manager
        const fieldsGridId = 'searchEngine::collection.detail.fieldsGridList';
        this.gridStateService.setPaginationActionId(fieldsGridId, 'searchEngine::collection.detail.fieldsPagination');
        this.gridStateService.setExportActionId(fieldsGridId, 'searchEngine::collection.detail.exportFields');

        this.actionService.action({
            id          : 'searchEngine::collection.detail.edit',
            isViewAction: true,
        });

        return this.collectionService
            .findByIdWithRelations({
                id: route.paramMap.get('id'),
                queryPaginateFields: QueryStatementHandler
                    .init({ columnsConfig: fieldColumnsConfig })
                    .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(fieldsGridId))
                    .setSort(this.gridStateService.getSort(fieldsGridId))
                    .setPage(this.gridStateService.getPage(fieldsGridId))
                    .setSearch(this.gridStateService.getSearchState(fieldsGridId))
                    .getQueryStatement(),
                constraintPaginateFields: {
                    where: {
                        collectionId: route.paramMap.get('id'),
                    },
                },
            });
    }
}
