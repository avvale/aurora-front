/**
 * @aurora-generated
 * @source cliter/business-partner-portal/sales-invoice-position.aurora.yaml
 */
import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { BusinessPartnerPortalSalesInvoicePosition } from '@apps/business-partner-portal';
import {
    salesInvoicePositionColumnsConfig,
    SalesInvoicePositionService,
} from '@apps/business-partner-portal/sales-invoice-position';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    gridQueryHandler,
    GridStateService,
} from '@aurora';

export const salesInvoicePositionPaginationResolver: ResolveFn<
    GridData<BusinessPartnerPortalSalesInvoicePosition>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const salesInvoicePositionService = inject(SalesInvoicePositionService);

    actionService.action({
        id: 'businessPartnerPortal::salesInvoicePosition.list.view',
        isViewAction: true,
    });

    const gridId =
        'businessPartnerPortal::salesInvoicePosition.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'businessPartnerPortal::salesInvoicePosition.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'businessPartnerPortal::salesInvoicePosition.list.export',
    );

    return salesInvoicePositionService.pagination({
        query: gridQueryHandler({
            gridFiltersStorageService,
            gridStateService,
            gridId,
            columnsConfig: salesInvoicePositionColumnsConfig(),
        }),
    });
};

export const salesInvoicePositionNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'businessPartnerPortal::salesInvoicePosition.detail.new',
        isViewAction: true,
    });
};

export const salesInvoicePositionEditResolver: ResolveFn<{
    object: BusinessPartnerPortalSalesInvoicePosition;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const salesInvoicePositionService = inject(SalesInvoicePositionService);

    actionService.action({
        id: 'businessPartnerPortal::salesInvoicePosition.detail.edit',
        isViewAction: true,
    });

    return salesInvoicePositionService.findById({
        id: route.paramMap.get('id'),
    });
};
