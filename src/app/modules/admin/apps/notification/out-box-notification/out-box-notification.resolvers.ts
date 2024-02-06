import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IamTenant } from '@apps/iam/iam.types';
import { NotificationOutBoxNotification } from '@apps/notification/notification.types';
import { outBoxNotificationColumnsConfig, OutBoxNotificationService } from '@apps/notification/out-box-notification';
import { ClientService } from '@apps/o-auth/client';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, IamService, QueryStatementHandler } from '@aurora';

export const outBoxNotificationPaginationResolver: ResolveFn<GridData<NotificationOutBoxNotification>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const outBoxNotificationService = inject(OutBoxNotificationService);

    actionService.action({
        id          : 'notification::outBoxNotification.list.view',
        isViewAction: true,
    });

    const gridId = 'notification::outBoxNotification.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'notification::outBoxNotification.list.pagination');
    gridStateService.setExportActionId(gridId, 'notification::outBoxNotification.list.export');

    return outBoxNotificationService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: outBoxNotificationColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const outBoxNotificationNewResolver: ResolveFn<{
    iamGetTenants: IamTenant[];
    oAuthFindClientById: OAuthClient;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const outBoxNotificationService = inject(OutBoxNotificationService);
    const iamService = inject(IamService);

    actionService.action({
        id          : 'notification::outBoxNotification.detail.new',
        isViewAction: true,
    });

    console.log('iamService.me.clientId', iamService.me);

    return outBoxNotificationService.getRelations({
        clientId: iamService.me.clientId,
    });
};

export const outBoxNotificationEditResolver: ResolveFn<{
    object: NotificationOutBoxNotification;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const outBoxNotificationService = inject(OutBoxNotificationService);

    actionService.action({
        id          : 'notification::outBoxNotification.detail.edit',
        isViewAction: true,
    });

    return outBoxNotificationService
        .findById({
            id: route.paramMap.get('id'),
        });
};
