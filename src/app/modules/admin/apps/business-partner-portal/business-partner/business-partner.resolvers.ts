/**
 * @aurora-generated
 * @source cliter/business-partner-portal/business-partner.aurora.yaml
 */
import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { BusinessPartnerPortalBusinessPartner } from '@apps/business-partner-portal';
import {
    businessPartnerColumnsConfig,
    BusinessPartnerService,
} from '@apps/business-partner-portal/business-partner';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    gridQueryHandler,
    GridStateService,
} from '@aurora';

export const businessPartnerPaginationResolver: ResolveFn<
    GridData<BusinessPartnerPortalBusinessPartner>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const businessPartnerService = inject(BusinessPartnerService);

    actionService.action({
        id: 'businessPartnerPortal::businessPartner.list.view',
        isViewAction: true,
    });

    const gridId = 'businessPartnerPortal::businessPartner.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'businessPartnerPortal::businessPartner.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'businessPartnerPortal::businessPartner.list.export',
    );

    return businessPartnerService.pagination({
        query: gridQueryHandler({
            gridFiltersStorageService,
            gridStateService,
            gridId,
            columnsConfig: businessPartnerColumnsConfig(),
        }),
    });
};

export const businessPartnerNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'businessPartnerPortal::businessPartner.detail.new',
        isViewAction: true,
    });
};

export const businessPartnerEditResolver: ResolveFn<{
    object: BusinessPartnerPortalBusinessPartner;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const businessPartnerService = inject(BusinessPartnerService);

    actionService.action({
        id: 'businessPartnerPortal::businessPartner.detail.edit',
        isViewAction: true,
    });

    return businessPartnerService.findById({
        id: route.paramMap.get('id'),
    });
};
