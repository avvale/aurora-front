/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { AuditingComponent } from './auditing.component';
import { SideEffectListComponent } from './side-effect/side-effect-list.component';
import { SideEffectDetailComponent } from './side-effect/side-effect-detail.component';
import { SideEffectEditResolver, SideEffectNewResolver, SideEffectPaginationResolver } from './side-effect/side-effect.resolvers';

export default [
    {
        path     : '',
        component: AuditingComponent,
        children : [
            { path: 'side-effect', component: SideEffectListComponent, resolve: { data: SideEffectPaginationResolver }, data: { permission: 'auditing.sideEffect.get' }},
            { path: 'side-effect/new', component: SideEffectDetailComponent, resolve: { data: SideEffectNewResolver }, data: { permission: 'auditing.sideEffect.create' }},
            { path: 'side-effect/edit/:id', component: SideEffectDetailComponent, resolve: { data: SideEffectEditResolver }, data: { permission: 'auditing.sideEffect.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'auditing',
                multi   : true,
            },
        ],
    },
];
