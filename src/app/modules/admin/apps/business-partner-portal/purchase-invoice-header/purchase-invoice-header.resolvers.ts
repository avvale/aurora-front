/**
 * @aurora-generated
 * @source cliter/business-partner-portal/purchase-invoice-header.aurora.yaml
 */
import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { BusinessPartnerPortalPurchaseInvoiceHeader } from '@apps/business-partner-portal';
import {
    purchaseInvoiceHeaderColumnsConfig,
    PurchaseInvoiceHeaderService,
} from '@apps/business-partner-portal/purchase-invoice-header';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    gridQueryHandler,
    GridStateService,
} from '@aurora';

export const purchaseInvoiceHeaderPaginationResolver: ResolveFn<
    GridData<BusinessPartnerPortalPurchaseInvoiceHeader>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const purchaseInvoiceHeaderService = inject(PurchaseInvoiceHeaderService);

    actionService.action({
        id: 'businessPartnerPortal::purchaseInvoiceHeader.list.view',
        isViewAction: true,
    });

    const gridId =
        'businessPartnerPortal::purchaseInvoiceHeader.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'businessPartnerPortal::purchaseInvoiceHeader.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'businessPartnerPortal::purchaseInvoiceHeader.list.export',
    );

    return purchaseInvoiceHeaderService.pagination({
        query: gridQueryHandler({
            gridFiltersStorageService,
            gridStateService,
            gridId,
            columnsConfig: purchaseInvoiceHeaderColumnsConfig(),
        }),
    });
};

export const purchaseInvoiceHeaderNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'businessPartnerPortal::purchaseInvoiceHeader.detail.new',
        isViewAction: true,
    });
};

export const purchaseInvoiceHeaderEditResolver: ResolveFn<{
    object: BusinessPartnerPortalPurchaseInvoiceHeader;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const purchaseInvoiceHeaderService = inject(PurchaseInvoiceHeaderService);

    actionService.action({
        id: 'businessPartnerPortal::purchaseInvoiceHeader.detail.edit',
        isViewAction: true,
    });

    return purchaseInvoiceHeaderService.findById({
        id: route.paramMap.get('id'),
    });
};
