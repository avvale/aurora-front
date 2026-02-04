/**
 * @aurora-generated
 * @source cliter/business-partner-portal
 */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const businessPartnerPortalNavigation: FuseNavigationItem = {
  id: 'businessPartnerPortal',
  title: 'BusinessPartnerPortal',
  type: 'collapsable',
  iconFontSet: 'material-symbols-outlined',
  icon: 'captive_portal',
  children: [
    {
      id: 'businessPartners',
      title: 'BusinessPartner',
      type: 'basic',
      icon: 'mat_outline:business',
      link: '/business-partner-portal/business-partner',
    },
    {
      id: 'partnerAddresses',
      title: 'PartnerAddress',
      type: 'basic',
      icon: 'mat_outline:location_on',
      link: '/business-partner-portal/partner-address',
    },
    {
      id: 'paymentModes',
      title: 'PaymentMode',
      type: 'basic',
      icon: 'mat_outline:payment',
      link: '/business-partner-portal/payment-mode',
    },
    {
      id: 'paymentCollectionModes',
      title: 'PaymentCollectionMode',
      type: 'basic',
      icon: 'mat_outline:account_balance',
      link: '/business-partner-portal/payment-collection-mode',
    },
    {
      id: 'salesInvoiceHeaders',
      title: 'SalesInvoiceHeader',
      type: 'basic',
      icon: 'mat_outline:receipt_long',
      link: '/business-partner-portal/sales-invoice-header',
    },
    {
      id: 'salesInvoicePositions',
      title: 'SalesInvoicePosition',
      type: 'basic',
      icon: 'mat_outline:format_list_numbered',
      link: '/business-partner-portal/sales-invoice-position',
    },
    {
      id: 'purchaseInvoiceHeaders',
      title: 'PurchaseInvoiceHeader',
      type: 'basic',
      icon: 'mat_outline:request_quote',
      link: '/business-partner-portal/purchase-invoice-header',
    },
    {
      id: 'purchaseInvoicePositions',
      title: 'PurchaseInvoicePosition',
      type: 'basic',
      icon: 'mat_outline:list_alt',
      link: '/business-partner-portal/purchase-invoice-position',
    },
    {
      id: 'supplierDocuments',
      title: 'SupplierDocument',
      type: 'basic',
      icon: 'mat_outline:cloud_upload',
      link: '/business-partner-portal/supplier-document',
    },
  ],
};
