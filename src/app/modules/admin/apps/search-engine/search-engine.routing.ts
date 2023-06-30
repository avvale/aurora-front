/* eslint-disable max-len */
import { Route } from '@angular/router';
import { SearchEngineComponent } from './search-engine.component';
import { CollectionListComponent } from './collection/collection-list.component';
import { CollectionDetailComponent } from './collection/collection-detail.component';
import { CollectionEditResolver, CollectionNewResolver, CollectionPaginationResolver } from './collection/collection.resolvers';
import { FieldListComponent } from './field/field-list.component';
import { FieldDetailComponent } from './field/field-detail.component';
import { FieldEditResolver, FieldNewResolver, FieldPaginationResolver } from './field/field.resolvers';

export const searchEngineRoutes: Route[] = [
    {
        path     : '',
        component: SearchEngineComponent,
        children : [
            { path: 'collection', component: CollectionListComponent, resolve: { data: CollectionPaginationResolver }, data: { permission: 'searchEngine.collection.get' }},
            { path: 'collection/new', component: CollectionDetailComponent, resolve: { data: CollectionNewResolver }, data: { permission: 'searchEngine.collection.create' }},
            { path: 'collection/edit/:id', component: CollectionDetailComponent, resolve: { data: CollectionEditResolver }, data: { permission: 'searchEngine.collection.get' }},
            { path: 'field', component: FieldListComponent, resolve: { data: FieldPaginationResolver }, data: { permission: 'searchEngine.field.get' }},
            { path: 'field/new', component: FieldDetailComponent, resolve: { data: FieldNewResolver }, data: { permission: 'searchEngine.field.create' }},
            { path: 'field/edit/:id', component: FieldDetailComponent, resolve: { data: FieldEditResolver }, data: { permission: 'searchEngine.field.get' }},
        ],
    },
];
