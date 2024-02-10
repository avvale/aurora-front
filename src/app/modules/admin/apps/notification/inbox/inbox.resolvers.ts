import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inboxColumnsConfig, InboxService } from '@apps/notification/inbox';
import { NotificationInbox } from '@apps/notification/notification.types';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const inboxPaginationResolver: ResolveFn<GridData<NotificationInbox>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const inboxService = inject(InboxService);

    actionService.action({
        id          : 'notification::inbox.list.view',
        isViewAction: true,
    });

    const gridId = 'notification::inbox.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'notification::inbox.list.pagination');
    gridStateService.setExportActionId(gridId, 'notification::inbox.list.export');

    return inboxService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: inboxColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const inboxNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'notification::inbox.detail.new',
        isViewAction: true,
    });
};

export const inboxEditResolver: ResolveFn<{
    object: NotificationInbox;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const inboxService = inject(InboxService);

    actionService.action({
        id          : 'notification::inbox.detail.edit',
        isViewAction: true,
    });

    return inboxService
        .findById({
            id: route.paramMap.get('id'),
        });
};
