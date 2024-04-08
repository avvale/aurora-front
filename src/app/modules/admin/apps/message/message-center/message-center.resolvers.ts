import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { MessageInbox } from '../message.types';
import { InboxService, inboxColumnsConfig } from '../inbox';
import { messageCenterExportListAction, messageCenterMainListId, messageCenterPaginationListAction } from './list/message-center-list.component';

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
        id          : 'message::messageCenter.list.view',
        isViewAction: true,
    });

    gridStateService.setPaginationActionId(messageCenterMainListId, messageCenterPaginationListAction);
    gridStateService.setExportActionId(messageCenterMainListId, messageCenterExportListAction);

    return inboxService.paginateCustomerCenterMessagesInbox({
        query: QueryStatementHandler
            .init({ columnsConfig: inboxColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(messageCenterMainListId))
            .setSort(gridStateService.getSort(messageCenterMainListId, { active: 'sort', direction: 'desc' }))
            // .setPage(gridStateService.getPage(messageCenterMainListId))
            .setPage({
                pageIndex: 0,
                pageSize : 2,
            })
            .setSearch(gridStateService.getSearchState(messageCenterMainListId))
            .getQueryStatement(),
    });
};

export const messageCenterShowResolver: ResolveFn<{
    object: MessageInbox;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const inboxService = inject(InboxService);

    actionService.action({
        id          : 'message::messageCenter.list.show',
        isViewAction: true,
    });

    //messageCenterService.

    return inboxService
        .findCustomerMessageInbox({
            query: {
                where: {
                    id: route.paramMap.get('id'),
                },
            },
        });
};
