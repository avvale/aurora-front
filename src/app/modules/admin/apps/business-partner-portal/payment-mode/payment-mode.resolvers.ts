/**
 * @aurora-generated
 * @source cliter/business-partner-portal/payment-mode.aurora.yaml
 */
import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { BusinessPartnerPortalPaymentMode } from '@apps/business-partner-portal';
import {
    paymentModeColumnsConfig,
    PaymentModeService,
} from '@apps/business-partner-portal/payment-mode';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    gridQueryHandler,
    GridStateService,
} from '@aurora';

export const paymentModePaginationResolver: ResolveFn<
    GridData<BusinessPartnerPortalPaymentMode>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const paymentModeService = inject(PaymentModeService);

    actionService.action({
        id: 'businessPartnerPortal::paymentMode.list.view',
        isViewAction: true,
    });

    const gridId = 'businessPartnerPortal::paymentMode.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'businessPartnerPortal::paymentMode.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'businessPartnerPortal::paymentMode.list.export',
    );

    return paymentModeService.pagination({
        query: gridQueryHandler({
            gridFiltersStorageService,
            gridStateService,
            gridId,
            columnsConfig: paymentModeColumnsConfig(),
        }),
    });
};

export const paymentModeNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'businessPartnerPortal::paymentMode.detail.new',
        isViewAction: true,
    });
};

export const paymentModeEditResolver: ResolveFn<{
    object: BusinessPartnerPortalPaymentMode;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const paymentModeService = inject(PaymentModeService);

    actionService.action({
        id: 'businessPartnerPortal::paymentMode.detail.edit',
        isViewAction: true,
    });

    return paymentModeService.findById({
        id: route.paramMap.get('id'),
    });
};
