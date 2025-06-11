/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { ToolsComponent } from './tools.component';
import { KeyValueListComponent } from './key-value/key-value-list.component';
import { KeyValueDetailComponent } from './key-value/key-value-detail.component';
import { keyValueEditResolver, keyValueNewResolver, keyValuePaginationResolver } from './key-value/key-value.resolvers';

export default [
    {
        path     : '',
        component: ToolsComponent,
        children : [
            { path: 'key-value', component: KeyValueListComponent, resolve: { data: keyValuePaginationResolver }, data: { permission: 'tools.keyValue.get' }},
            { path: 'key-value/new', component: KeyValueDetailComponent, resolve: { data: keyValueNewResolver }, data: { permission: 'tools.keyValue.create' }},
            { path: 'key-value/edit/:id', component: KeyValueDetailComponent, resolve: { data: keyValueEditResolver }, data: { permission: 'tools.keyValue.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'tools',
                multi   : true,
            },
        ],
    },
];
