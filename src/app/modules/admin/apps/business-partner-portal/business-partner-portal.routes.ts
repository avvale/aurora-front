/**
 * @aurora-generated
 * @source cliter/business-partner-portal
 */
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { BusinessPartnerPortalComponent } from './business-partner-portal.component';
import { BusinessPartnerListComponent } from './business-partner/business-partner-list.component';
import { BusinessPartnerDetailComponent } from './business-partner/business-partner-detail.component';
import { businessPartnerEditResolver, businessPartnerNewResolver, businessPartnerPaginationResolver } from './business-partner/business-partner.resolvers';
import { PartnerAddressListComponent } from './partner-address/partner-address-list.component';
import { PartnerAddressDetailComponent } from './partner-address/partner-address-detail.component';
import { partnerAddressEditResolver, partnerAddressNewResolver, partnerAddressPaginationResolver } from './partner-address/partner-address.resolvers';
import { PartnerContactListComponent } from './partner-contact/partner-contact-list.component';
import { PartnerContactDetailComponent } from './partner-contact/partner-contact-detail.component';
import { partnerContactEditResolver, partnerContactNewResolver, partnerContactPaginationResolver } from './partner-contact/partner-contact.resolvers';
import { PaymentModeListComponent } from './payment-mode/payment-mode-list.component';
import { PaymentModeDetailComponent } from './payment-mode/payment-mode-detail.component';
import { paymentModeEditResolver, paymentModeNewResolver, paymentModePaginationResolver } from './payment-mode/payment-mode.resolvers';
import { PaymentCollectionModeListComponent } from './payment-collection-mode/payment-collection-mode-list.component';
import { PaymentCollectionModeDetailComponent } from './payment-collection-mode/payment-collection-mode-detail.component';
import { paymentCollectionModeEditResolver, paymentCollectionModeNewResolver, paymentCollectionModePaginationResolver } from './payment-collection-mode/payment-collection-mode.resolvers';
import { SalesInvoiceHeaderListComponent } from './sales-invoice-header/sales-invoice-header-list.component';
import { SalesInvoiceHeaderDetailComponent } from './sales-invoice-header/sales-invoice-header-detail.component';
import { salesInvoiceHeaderEditResolver, salesInvoiceHeaderNewResolver, salesInvoiceHeaderPaginationResolver } from './sales-invoice-header/sales-invoice-header.resolvers';
import { SalesInvoicePositionListComponent } from './sales-invoice-position/sales-invoice-position-list.component';
import { SalesInvoicePositionDetailComponent } from './sales-invoice-position/sales-invoice-position-detail.component';
import { salesInvoicePositionEditResolver, salesInvoicePositionNewResolver, salesInvoicePositionPaginationResolver } from './sales-invoice-position/sales-invoice-position.resolvers';
import { PurchaseInvoiceHeaderListComponent } from './purchase-invoice-header/purchase-invoice-header-list.component';
import { PurchaseInvoiceHeaderDetailComponent } from './purchase-invoice-header/purchase-invoice-header-detail.component';
import { purchaseInvoiceHeaderEditResolver, purchaseInvoiceHeaderNewResolver, purchaseInvoiceHeaderPaginationResolver } from './purchase-invoice-header/purchase-invoice-header.resolvers';
import { PurchaseInvoicePositionListComponent } from './purchase-invoice-position/purchase-invoice-position-list.component';
import { PurchaseInvoicePositionDetailComponent } from './purchase-invoice-position/purchase-invoice-position-detail.component';
import { purchaseInvoicePositionEditResolver, purchaseInvoicePositionNewResolver, purchaseInvoicePositionPaginationResolver } from './purchase-invoice-position/purchase-invoice-position.resolvers';
import { SupplierDocumentListComponent } from './supplier-document/supplier-document-list.component';
import { SupplierDocumentDetailComponent } from './supplier-document/supplier-document-detail.component';
import { supplierDocumentEditResolver, supplierDocumentNewResolver, supplierDocumentPaginationResolver } from './supplier-document/supplier-document.resolvers';

export default [
    {
        path: '',
        component: BusinessPartnerPortalComponent,
        children: [
            { path: 'business-partner', component: BusinessPartnerListComponent, resolve: { data: businessPartnerPaginationResolver }, data: { permission: 'businessPartnerPortal.businessPartner.get' }},
            { path: 'business-partner/new', component: BusinessPartnerDetailComponent, resolve: { data: businessPartnerNewResolver }, data: { permission: 'businessPartnerPortal.businessPartner.create' }},
            { path: 'business-partner/edit/:id', component: BusinessPartnerDetailComponent, resolve: { data: businessPartnerEditResolver }, data: { permission: 'businessPartnerPortal.businessPartner.get' }},
            { path: 'partner-address', component: PartnerAddressListComponent, resolve: { data: partnerAddressPaginationResolver }, data: { permission: 'businessPartnerPortal.partnerAddress.get' }},
            { path: 'partner-address/new', component: PartnerAddressDetailComponent, resolve: { data: partnerAddressNewResolver }, data: { permission: 'businessPartnerPortal.partnerAddress.create' }},
            { path: 'partner-address/edit/:id', component: PartnerAddressDetailComponent, resolve: { data: partnerAddressEditResolver }, data: { permission: 'businessPartnerPortal.partnerAddress.get' }},
            { path: 'partner-contact', component: PartnerContactListComponent, resolve: { data: partnerContactPaginationResolver }, data: { permission: 'businessPartnerPortal.partnerContact.get' }},
            { path: 'partner-contact/new', component: PartnerContactDetailComponent, resolve: { data: partnerContactNewResolver }, data: { permission: 'businessPartnerPortal.partnerContact.create' }},
            { path: 'partner-contact/edit/:id', component: PartnerContactDetailComponent, resolve: { data: partnerContactEditResolver }, data: { permission: 'businessPartnerPortal.partnerContact.get' }},
            { path: 'payment-mode', component: PaymentModeListComponent, resolve: { data: paymentModePaginationResolver }, data: { permission: 'businessPartnerPortal.paymentMode.get' }},
            { path: 'payment-mode/new', component: PaymentModeDetailComponent, resolve: { data: paymentModeNewResolver }, data: { permission: 'businessPartnerPortal.paymentMode.create' }},
            { path: 'payment-mode/edit/:id', component: PaymentModeDetailComponent, resolve: { data: paymentModeEditResolver }, data: { permission: 'businessPartnerPortal.paymentMode.get' }},
            { path: 'payment-collection-mode', component: PaymentCollectionModeListComponent, resolve: { data: paymentCollectionModePaginationResolver }, data: { permission: 'businessPartnerPortal.paymentCollectionMode.get' }},
            { path: 'payment-collection-mode/new', component: PaymentCollectionModeDetailComponent, resolve: { data: paymentCollectionModeNewResolver }, data: { permission: 'businessPartnerPortal.paymentCollectionMode.create' }},
            { path: 'payment-collection-mode/edit/:id', component: PaymentCollectionModeDetailComponent, resolve: { data: paymentCollectionModeEditResolver }, data: { permission: 'businessPartnerPortal.paymentCollectionMode.get' }},
            { path: 'sales-invoice-header', component: SalesInvoiceHeaderListComponent, resolve: { data: salesInvoiceHeaderPaginationResolver }, data: { permission: 'businessPartnerPortal.salesInvoiceHeader.get' }},
            { path: 'sales-invoice-header/new', component: SalesInvoiceHeaderDetailComponent, resolve: { data: salesInvoiceHeaderNewResolver }, data: { permission: 'businessPartnerPortal.salesInvoiceHeader.create' }},
            { path: 'sales-invoice-header/edit/:id', component: SalesInvoiceHeaderDetailComponent, resolve: { data: salesInvoiceHeaderEditResolver }, data: { permission: 'businessPartnerPortal.salesInvoiceHeader.get' }},
            { path: 'sales-invoice-position', component: SalesInvoicePositionListComponent, resolve: { data: salesInvoicePositionPaginationResolver }, data: { permission: 'businessPartnerPortal.salesInvoicePosition.get' }},
            { path: 'sales-invoice-position/new', component: SalesInvoicePositionDetailComponent, resolve: { data: salesInvoicePositionNewResolver }, data: { permission: 'businessPartnerPortal.salesInvoicePosition.create' }},
            { path: 'sales-invoice-position/edit/:id', component: SalesInvoicePositionDetailComponent, resolve: { data: salesInvoicePositionEditResolver }, data: { permission: 'businessPartnerPortal.salesInvoicePosition.get' }},
            { path: 'purchase-invoice-header', component: PurchaseInvoiceHeaderListComponent, resolve: { data: purchaseInvoiceHeaderPaginationResolver }, data: { permission: 'businessPartnerPortal.purchaseInvoiceHeader.get' }},
            { path: 'purchase-invoice-header/new', component: PurchaseInvoiceHeaderDetailComponent, resolve: { data: purchaseInvoiceHeaderNewResolver }, data: { permission: 'businessPartnerPortal.purchaseInvoiceHeader.create' }},
            { path: 'purchase-invoice-header/edit/:id', component: PurchaseInvoiceHeaderDetailComponent, resolve: { data: purchaseInvoiceHeaderEditResolver }, data: { permission: 'businessPartnerPortal.purchaseInvoiceHeader.get' }},
            { path: 'purchase-invoice-position', component: PurchaseInvoicePositionListComponent, resolve: { data: purchaseInvoicePositionPaginationResolver }, data: { permission: 'businessPartnerPortal.purchaseInvoicePosition.get' }},
            { path: 'purchase-invoice-position/new', component: PurchaseInvoicePositionDetailComponent, resolve: { data: purchaseInvoicePositionNewResolver }, data: { permission: 'businessPartnerPortal.purchaseInvoicePosition.create' }},
            { path: 'purchase-invoice-position/edit/:id', component: PurchaseInvoicePositionDetailComponent, resolve: { data: purchaseInvoicePositionEditResolver }, data: { permission: 'businessPartnerPortal.purchaseInvoicePosition.get' }},
            { path: 'supplier-document', component: SupplierDocumentListComponent, resolve: { data: supplierDocumentPaginationResolver }, data: { permission: 'businessPartnerPortal.supplierDocument.get' }},
            { path: 'supplier-document/new', component: SupplierDocumentDetailComponent, resolve: { data: supplierDocumentNewResolver }, data: { permission: 'businessPartnerPortal.supplierDocument.create' }},
            { path: 'supplier-document/edit/:id', component: SupplierDocumentDetailComponent, resolve: { data: supplierDocumentEditResolver }, data: { permission: 'businessPartnerPortal.supplierDocument.get' }},
        ],
        providers: [
            {
                provide: TRANSLOCO_SCOPE,
                useValue: 'business-partner-portal',
                multi: true,
            },
        ],
    },
];
