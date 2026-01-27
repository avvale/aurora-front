/**
 * @aurora-generated
 * @source cliter/business-partner-portal/purchase-invoice-position.aurora.yaml
 */
import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { BusinessPartnerPortalPurchaseInvoicePosition } from '@apps/business-partner-portal';
import {
    purchaseInvoicePositionColumnsConfig,
    PurchaseInvoicePositionService,
} from '@apps/business-partner-portal/purchase-invoice-position';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    gridQueryHandler,
    GridStateService,
} from '@aurora';

export const purchaseInvoicePositionPaginationResolver: ResolveFn<
    GridData<BusinessPartnerPortalPurchaseInvoicePosition>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const purchaseInvoicePositionService = inject(
        PurchaseInvoicePositionService,
    );

    actionService.action({
        id: 'businessPartnerPortal::purchaseInvoicePosition.list.view',
        isViewAction: true,
    });

    const gridId =
        'businessPartnerPortal::purchaseInvoicePosition.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'businessPartnerPortal::purchaseInvoicePosition.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'businessPartnerPortal::purchaseInvoicePosition.list.export',
    );

    return purchaseInvoicePositionService.pagination({
        query: gridQueryHandler({
            gridFiltersStorageService,
            gridStateService,
            gridId,
            columnsConfig: purchaseInvoicePositionColumnsConfig(),
        }),
    });
};

export const purchaseInvoicePositionNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'businessPartnerPortal::purchaseInvoicePosition.detail.new',
        isViewAction: true,
    });
};

export const purchaseInvoicePositionEditResolver: ResolveFn<{
    object: BusinessPartnerPortalPurchaseInvoicePosition;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const purchaseInvoicePositionService = inject(
        PurchaseInvoicePositionService,
    );

    actionService.action({
        id: 'businessPartnerPortal::purchaseInvoicePosition.detail.edit',
        isViewAction: true,
    });

    return purchaseInvoicePositionService.findById({
        id: route.paramMap.get('id'),
    });
};
