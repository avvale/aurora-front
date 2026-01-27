/**
 * @aurora-generated
 * @source cliter/business-partner-portal/payment-collection-mode.aurora.yaml
 */
import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import {
    BusinessPartnerPortalBusinessPartner,
    BusinessPartnerPortalPaymentCollectionMode,
    BusinessPartnerPortalPaymentMode,
} from '@apps/business-partner-portal';
import {
    paymentCollectionModeColumnsConfig,
    PaymentCollectionModeService,
} from '@apps/business-partner-portal/payment-collection-mode';
import {
    ActionService,
    GridData,
    GridFiltersStorageService,
    gridQueryHandler,
    GridStateService,
} from '@aurora';

export const paymentCollectionModePaginationResolver: ResolveFn<
    GridData<BusinessPartnerPortalPaymentCollectionMode>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const paymentCollectionModeService = inject(PaymentCollectionModeService);

    actionService.action({
        id: 'businessPartnerPortal::paymentCollectionMode.list.view',
        isViewAction: true,
    });

    const gridId =
        'businessPartnerPortal::paymentCollectionMode.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'businessPartnerPortal::paymentCollectionMode.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'businessPartnerPortal::paymentCollectionMode.list.export',
    );

    return paymentCollectionModeService.pagination({
        query: gridQueryHandler({
            gridFiltersStorageService,
            gridStateService,
            gridId,
            columnsConfig: paymentCollectionModeColumnsConfig(),
        }),
    });
};

export const paymentCollectionModeNewResolver: ResolveFn<{
    businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
    businessPartnerPortalGetPaymentModes: BusinessPartnerPortalPaymentMode[];
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const paymentCollectionModeService = inject(PaymentCollectionModeService);

    actionService.action({
        id: 'businessPartnerPortal::paymentCollectionMode.detail.new',
        isViewAction: true,
    });

    return paymentCollectionModeService.getRelations({});
};

export const paymentCollectionModeEditResolver: ResolveFn<{
    businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
    businessPartnerPortalGetPaymentModes: BusinessPartnerPortalPaymentMode[];
    object: BusinessPartnerPortalPaymentCollectionMode;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const paymentCollectionModeService = inject(PaymentCollectionModeService);

    actionService.action({
        id: 'businessPartnerPortal::paymentCollectionMode.detail.edit',
        isViewAction: true,
    });

    return paymentCollectionModeService.findByIdWithRelations({
        id: route.paramMap.get('id'),
    });
};
