/**
 * @aurora-generated
 * @source cliter/business-partner-portal/sales-invoice-header.aurora.yaml
 */
import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { BusinessPartnerPortalSalesInvoiceHeader } from '@apps/business-partner-portal';
import {
    salesInvoiceHeaderColumnsConfig,
    SalesInvoiceHeaderService,
} from '@apps/business-partner-portal/sales-invoice-header';
import {
    Action,
    ActionService,
    GridData,
    GridFiltersStorageService,
    gridQueryHandler,
    GridStateService,
} from '@aurora';

export const salesInvoiceHeaderPaginationResolver: ResolveFn<
    GridData<BusinessPartnerPortalSalesInvoiceHeader>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const salesInvoiceHeaderService = inject(SalesInvoiceHeaderService);

    actionService.action({
        id: 'businessPartnerPortal::salesInvoiceHeader.list.view',
        isViewAction: true,
    });

    const gridId =
        'businessPartnerPortal::salesInvoiceHeader.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'businessPartnerPortal::salesInvoiceHeader.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'businessPartnerPortal::salesInvoiceHeader.list.export',
    );

    return salesInvoiceHeaderService.pagination({
        query: gridQueryHandler({
            gridFiltersStorageService,
            gridStateService,
            gridId,
            columnsConfig: salesInvoiceHeaderColumnsConfig(),
        }),
    });
};

export const salesInvoiceHeaderNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const actionService = inject(ActionService);

    return actionService.action({
        id: 'businessPartnerPortal::salesInvoiceHeader.detail.new',
        isViewAction: true,
    });
};

export const salesInvoiceHeaderEditResolver: ResolveFn<{
    object: BusinessPartnerPortalSalesInvoiceHeader;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const salesInvoiceHeaderService = inject(SalesInvoiceHeaderService);

    actionService.action({
        id: 'businessPartnerPortal::salesInvoiceHeader.detail.edit',
        isViewAction: true,
    });

    return salesInvoiceHeaderService.findById({
        id: route.paramMap.get('id'),
    });
};
