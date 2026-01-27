/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-address.aurora.yaml
 */
import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import {
    BusinessPartnerPortalBusinessPartner,
    BusinessPartnerPortalPartnerAddress,
} from '@apps/business-partner-portal';
import {
    partnerAddressColumnsConfig,
    PartnerAddressService,
} from '@apps/business-partner-portal/partner-address';
import {
    CommonAdministrativeAreaLevel1,
    CommonAdministrativeAreaLevel2,
    CommonAdministrativeAreaLevel3,
    CommonCountry,
} from '@apps/common';
import {
    ActionService,
    GridData,
    GridFiltersStorageService,
    gridQueryHandler,
    GridStateService,
} from '@aurora';

export const partnerAddressPaginationResolver: ResolveFn<
    GridData<BusinessPartnerPortalPartnerAddress>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const partnerAddressService = inject(PartnerAddressService);

    actionService.action({
        id: 'businessPartnerPortal::partnerAddress.list.view',
        isViewAction: true,
    });

    const gridId = 'businessPartnerPortal::partnerAddress.list.mainGridList';
    gridStateService.setPaginationActionId(
        gridId,
        'businessPartnerPortal::partnerAddress.list.pagination',
    );
    gridStateService.setExportActionId(
        gridId,
        'businessPartnerPortal::partnerAddress.list.export',
    );

    return partnerAddressService.pagination({
        query: gridQueryHandler({
            gridFiltersStorageService,
            gridStateService,
            gridId,
            columnsConfig: partnerAddressColumnsConfig(),
        }),
    });
};

export const partnerAddressNewResolver: ResolveFn<{
    businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
    commonGetCountries: CommonCountry[];
    commonGetAdministrativeAreasLevel1: CommonAdministrativeAreaLevel1[];
    commonGetAdministrativeAreasLevel2: CommonAdministrativeAreaLevel2[];
    commonGetAdministrativeAreasLevel3: CommonAdministrativeAreaLevel3[];
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const partnerAddressService = inject(PartnerAddressService);

    actionService.action({
        id: 'businessPartnerPortal::partnerAddress.detail.new',
        isViewAction: true,
    });

    return partnerAddressService.getRelations({});
};

export const partnerAddressEditResolver: ResolveFn<{
    businessPartnerPortalGetBusinessPartners: BusinessPartnerPortalBusinessPartner[];
    commonGetAdministrativeAreasLevel1: CommonAdministrativeAreaLevel1[];
    commonGetAdministrativeAreasLevel2: CommonAdministrativeAreaLevel2[];
    commonGetAdministrativeAreasLevel3: CommonAdministrativeAreaLevel3[];
    commonGetCountries: CommonCountry[];
    object: BusinessPartnerPortalPartnerAddress;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const partnerAddressService = inject(PartnerAddressService);

    actionService.action({
        id: 'businessPartnerPortal::partnerAddress.detail.edit',
        isViewAction: true,
    });

    return partnerAddressService.findByIdWithRelations({
        id: route.paramMap.get('id'),
    });
};
