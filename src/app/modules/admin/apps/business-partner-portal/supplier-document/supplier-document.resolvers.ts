/**
 * @aurora-generated
 * @source cliter/business-partner-portal/supplier-document.aurora.yaml
 */
import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import {
    BusinessPartnerPortalBusinessPartner,
    BusinessPartnerPortalPurchaseInvoiceHeader,
    BusinessPartnerPortalSupplierDocument,
} from '@apps/business-partner-portal';
import {
    supplierDocumentColumnsConfig,
    SupplierDocumentService,
} from '@apps/business-partner-portal/supplier-document';
import {
    ActionService,
    GridData,
    GridFiltersStorageService,
    gridQueryHandler,
    GridStateService,
} from '@aurora';

export const supplierDocumentPaginationResolver: ResolveFn<
    GridData<BusinessPartnerPortalSupplierDocument>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const supplierDocumentService = inject(SupplierDocumentService);

    actionService.action({
        id: 'businessPartnerPortal::supplierDocument.list.view',
        isViewAction: true,
    });

    const gridId = 'businessPartnerPortal::supplierDocument.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'businessPartnerPortal::supplierDocument.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'businessPartnerPortal::supplierDocument.list.export',
    );

    return supplierDocumentService.pagination({
        query: gridQueryHandler({
            gridFiltersStorageService,
            gridStateService,
            gridId,
            columnsConfig: supplierDocumentColumnsConfig(),
        }),
    });
};

export const supplierDocumentNewResolver: ResolveFn<{
    businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
    businessPartnerPortalGetPurchaseInvoiceHeaders: BusinessPartnerPortalPurchaseInvoiceHeader[];
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const supplierDocumentService = inject(SupplierDocumentService);

    actionService.action({
        id: 'businessPartnerPortal::supplierDocument.detail.new',
        isViewAction: true,
    });

    return supplierDocumentService.getRelations({});
};

export const supplierDocumentEditResolver: ResolveFn<{
    businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
    businessPartnerPortalGetPurchaseInvoiceHeaders: BusinessPartnerPortalPurchaseInvoiceHeader[];
    object: BusinessPartnerPortalSupplierDocument;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const supplierDocumentService = inject(SupplierDocumentService);

    actionService.action({
        id: 'businessPartnerPortal::supplierDocument.detail.edit',
        isViewAction: true,
    });

    return supplierDocumentService.findByIdWithRelations({
        id: route.paramMap.get('id'),
    });
};
