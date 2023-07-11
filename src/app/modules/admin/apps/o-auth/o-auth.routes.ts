/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { OAuthComponent } from './o-auth.component';
import { AccessTokenListComponent } from './access-token/access-token-list.component';
import { AccessTokenDetailComponent } from './access-token/access-token-detail.component';
import { accessTokenEditResolver, accessTokenNewResolver, accessTokenPaginationResolver } from './access-token/access-token.resolvers';

export default [
    {
        path     : '',
        component: OAuthComponent,
        children : [
            { path: 'access-token', component: AccessTokenListComponent, resolve: { data: accessTokenPaginationResolver }, data: { permission: 'oAuth.accessToken.get' }},
            { path: 'access-token/new', component: AccessTokenDetailComponent, resolve: { data: accessTokenNewResolver }, data: { permission: 'oAuth.accessToken.create' }},
            { path: 'access-token/edit/:id', component: AccessTokenDetailComponent, resolve: { data: accessTokenEditResolver }, data: { permission: 'oAuth.accessToken.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'o-auth',
                multi   : true,
            },
        ],
    },
];
