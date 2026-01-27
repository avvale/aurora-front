/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-contact.aurora.yaml
 */
import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { BusinessPartnerPortalPartnerContact } from '@apps/business-partner-portal';
import {
    partnerContactColumnsConfig,
    PartnerContactService,
} from '@apps/business-partner-portal/partner-contact';
import { IamUser } from '@apps/iam';
import {
    ActionService,
    GridData,
    GridFiltersStorageService,
    gridQueryHandler,
    GridStateService,
} from '@aurora';

export const partnerContactPaginationResolver: ResolveFn<
    GridData<BusinessPartnerPortalPartnerContact>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const partnerContactService = inject(PartnerContactService);

    actionService.action({
        id: 'businessPartnerPortal::partnerContact.list.view',
        isViewAction: true,
    });

    const gridId = 'businessPartnerPortal::partnerContact.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'businessPartnerPortal::partnerContact.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'businessPartnerPortal::partnerContact.list.export',
    );

    return partnerContactService.pagination({
        query: gridQueryHandler({
            gridFiltersStorageService,
            gridStateService,
            gridId,
            columnsConfig: partnerContactColumnsConfig(),
        }),
    });
};

export const partnerContactNewResolver: ResolveFn<{
    iamGetUsers: IamUser[];
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const partnerContactService = inject(PartnerContactService);

    actionService.action({
        id: 'businessPartnerPortal::partnerContact.detail.new',
        isViewAction: true,
    });

    return partnerContactService.getRelations({});
};

export const partnerContactEditResolver: ResolveFn<{
    iamGetUsers: IamUser[];
    object: BusinessPartnerPortalPartnerContact;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const partnerContactService = inject(PartnerContactService);

    actionService.action({
        id: 'businessPartnerPortal::partnerContact.detail.edit',
        isViewAction: true,
    });

    return partnerContactService.findByIdWithRelations({
        id: route.paramMap.get('id'),
    });
};
