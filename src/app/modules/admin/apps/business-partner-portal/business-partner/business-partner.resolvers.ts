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
import {
    BusinessPartnerPortalBusinessPartner,
    BusinessPartnerPortalPartnerContact,
} from '@apps/business-partner-portal';
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
import { partnerContactColumnsConfig } from '../partner-contact';

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
    businessPartnerPortalPaginatePartnerContacts: GridData<BusinessPartnerPortalPartnerContact>;
    object: BusinessPartnerPortalBusinessPartner;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const businessPartnerService = inject(BusinessPartnerService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);

    // paginate to manage partnerContacts grid-elements-manager
    const partnerContactsGridId =
        'businessPartnerPortal::businessPartner.detail.partnerContactsGridList';
    gridStateService.setPaginationActionId(
        partnerContactsGridId,
        'businessPartnerPortal::businessPartner.detail.partnerContactsPagination',
    );
    gridStateService.setExportActionId(
        partnerContactsGridId,
        'businessPartnerPortal::businessPartner.detail.exportPartnerContacts',
    );

    actionService.action({
        id: 'businessPartnerPortal::businessPartner.detail.edit',
        isViewAction: true,
    });

    return businessPartnerService.findByIdWithRelations({
        id: route.paramMap.get('id'),
        queryPaginatePartnerContacts: gridQueryHandler({
            gridFiltersStorageService,
            gridStateService,
            gridId: partnerContactsGridId,
            columnsConfig: partnerContactColumnsConfig(),
        }),
        constraintPaginatePartnerContacts: {
            where: {
                businessPartnerId: route.paramMap.get('id'),
            },
        },
    });
};
