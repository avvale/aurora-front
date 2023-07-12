/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { IamComponent } from './iam.component';
import { TenantListComponent } from './tenant/tenant-list.component';
import { TenantDetailComponent } from './tenant/tenant-detail.component';
import { tenantEditResolver, tenantNewResolver, tenantPaginationResolver } from './tenant/tenant.resolvers';

export default [
    {
        path     : '',
        component: IamComponent,
        children : [
            { path: 'tenant', component: TenantListComponent, resolve: { data: tenantPaginationResolver }, data: { permission: 'iam.tenant.get' }},
            { path: 'tenant/new', component: TenantDetailComponent, resolve: { data: tenantNewResolver }, data: { permission: 'iam.tenant.create' }},
            { path: 'tenant/edit/:id', component: TenantDetailComponent, resolve: { data: tenantEditResolver }, data: { permission: 'iam.tenant.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'iam',
                multi   : true,
            },
        ],
    },
];
