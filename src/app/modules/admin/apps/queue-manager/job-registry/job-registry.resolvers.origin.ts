import { QueueManagerJobRegistry } from '../queue-manager.types';
import { jobRegistryColumnsConfig } from './job-registry.columns-config';
import { JobRegistryService } from './job-registry.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const jobRegistryPaginationResolver: ResolveFn<GridData<QueueManagerJobRegistry>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const jobRegistryService = inject(JobRegistryService);

    actionService.action({
        id          : 'queueManager::jobRegistry.list.view',
        isViewAction: true,
    });

    const gridId = 'queueManager::jobRegistry.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'queueManager::jobRegistry.list.pagination');
    gridStateService.setExportActionId(gridId, 'queueManager::jobRegistry.list.export');

    return jobRegistryService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: jobRegistryColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const jobRegistryNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);

    return actionService.action({
        id          : 'queueManager::jobRegistry.detail.new',
        isViewAction: true,
    });
};

export const jobRegistryEditResolver: ResolveFn<{
	object: QueueManagerJobRegistry;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);
	const jobRegistryService = inject(JobRegistryService);

    actionService.action({
        id          : 'queueManager::jobRegistry.detail.edit',
        isViewAction: true,
    });

    return jobRegistryService
        .findById({
            id: route.paramMap.get('id'),
        });
};
