import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IamTag, IamTenant } from '@apps/iam/iam.types';
import { messageColumnsConfig, MessageService } from '@apps/message/message';
import { MessageMessage } from '@apps/message/message.types';
import { OAuthClient } from '@apps/o-auth/o-auth.types';
import { ActionService, GridData, GridFiltersStorageService, GridStateService, IamService, QueryStatementHandler } from '@aurora';
import { accountsDialogGridId, messageAccountsGridId } from './message-detail.component';
import { Subject, first, map } from 'rxjs';

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
    iamGetTags: IamTag[];
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
    const gridStateService = inject(GridStateService);

    actionService.action({
        id          : 'message::message.detail.new',
        isViewAction: true,
    });

    gridStateService.setPaginationActionId(messageAccountsGridId, 'message::message.detail.messageAccountsPagination');
    gridStateService.setExportActionId(messageAccountsGridId, 'message::message.detail.exportMessageAccounts');

    gridStateService.setPaginationActionId(accountsDialogGridId, 'message::message.detail.accountsPagination');
    gridStateService.setExportActionId(accountsDialogGridId, 'message::message.detail.exportAccounts');

    return messageService.getRelations({
        clientId         : iamService.me.clientId,
        constraintTenants: {
            where: {
                id: iamService.me.dTenants,
            },
        },
        constraintPaginateAccounts: {
            where: {
                id: [],
            },
            include: [
                {
                    association: 'user',
                },
            ],
        },
    });
};

export const messageEditResolver: ResolveFn<{
    object: MessageMessage;
    iamGetTags: IamTag[];
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
        id          : 'message::message.detail.edit',
        isViewAction: true,
    });

    const messageResponse = new Subject<{
        object: MessageMessage;
        iamGetTags: IamTag[];
        iamGetTenants: IamTenant[];
        oAuthFindClientById: OAuthClient;
     }>();

    messageService
        .findById({
            id: route.paramMap.get('id'),
        })
        .pipe(
            map(response => response.object),
            first(),
        )
        .subscribe(message =>
        {
            messageService.getRelations({
                clientId         : iamService.me.clientId,
                constraintTenants: {
                    where: {
                        id: iamService.me.dTenants,
                    },
                },
                constraintPaginateAccounts: {
                    where: {
                        id: message.accountRecipientIds,
                    },
                    include: [
                        {
                            association: 'user',
                        },
                    ],
                },
            })
                .pipe(
                    first(),
                )
                .subscribe(relations =>
                {
                    messageResponse.next({
                        ...relations,
                        object: message,
                    });
                });

        });

    return messageResponse;
};
