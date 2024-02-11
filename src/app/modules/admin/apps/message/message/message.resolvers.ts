import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IamTenant } from '@apps/iam/iam.types';
import { messageColumnsConfig, MessageService } from '@apps/message/message';
import { MessageMessage } from '@apps/message/message.types';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import { ActionService, GridData, GridFiltersStorageService, GridStateService, IamService, QueryStatementHandler } from '@aurora';

export const messagePaginationResolver: ResolveFn<GridData<MessageMessage>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const messageService = inject(MessageService);

    actionService.action({
        id          : 'message::message.list.view',
        isViewAction: true,
    });

    const gridId = 'message::message.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'message::message.list.pagination');
    gridStateService.setExportActionId(gridId, 'message::message.list.export');

    return messageService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: messageColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const messageNewResolver: ResolveFn<{
    iamGetTenants: IamTenant[];
    oAuthFindClientById: OAuthClient;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const messageService = inject(MessageService);
    const iamService = inject(IamService);

    actionService.action({
        id          : 'message::message.detail.new',
        isViewAction: true,
    });

    return messageService.getRelations({
        clientId         : iamService.me.clientId,
        constraintTenants: {
            where: {
                id: iamService.me.dTenants,
            },
        },
    });
};

export const messageEditResolver: ResolveFn<{
    object: MessageMessage;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const messageService = inject(MessageService);

    actionService.action({
        id          : 'message::message.detail.edit',
        isViewAction: true,
    });

    return messageService
        .findById({
            id: route.paramMap.get('id'),
        });
};
