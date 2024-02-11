import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IamTenant } from '@apps/iam/iam.types';
import { notificationColumnsConfig, NotificationService } from '@apps/notification/notification';
import { NotificationNotification } from '@apps/notification/notification.types';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, IamService, QueryStatementHandler } from '@aurora';
import { MessageInbox } from '../message.types';
import { InboxService } from '../inbox';

export const messageCenterPaginationResolver: ResolveFn<GridData<MessageInbox>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const inboxService = inject(InboxService);

    actionService.action({
        id          : 'notification::notification.list.view',
        isViewAction: true,
    });

    const gridId = 'notification::notification.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'notification::notification.list.pagination');
    gridStateService.setExportActionId(gridId, 'notification::notification.list.export');

    return inboxService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: notificationColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const inboxShowResolver: ResolveFn<{
    object: NotificationNotification;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const notificationService = inject(NotificationService);

    actionService.action({
        id          : 'notification::notification.detail.edit',
        isViewAction: true,
    });

    return notificationService
        .findById({
            id: route.paramMap.get('id'),
        });
};
