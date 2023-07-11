/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { OAuthComponent } from './o-auth.component';
import { AccessTokenListComponent } from './access-token/access-token-list.component';
import { AccessTokenDetailComponent } from './access-token/access-token-detail.component';
import { accessTokenEditResolver, accessTokenNewResolver, accessTokenPaginationResolver } from './access-token/access-token.resolvers';
import { RefreshTokenListComponent } from './refresh-token/refresh-token-list.component';
import { RefreshTokenDetailComponent } from './refresh-token/refresh-token-detail.component';
import { refreshTokenEditResolver, refreshTokenNewResolver, refreshTokenPaginationResolver } from './refresh-token/refresh-token.resolvers';

export default [
    {
        path     : '',
        component: OAuthComponent,
        children : [
            { path: 'access-token', component: AccessTokenListComponent, resolve: { data: accessTokenPaginationResolver }, data: { permission: 'oAuth.accessToken.get' }},
            { path: 'access-token/new', component: AccessTokenDetailComponent, resolve: { data: accessTokenNewResolver }, data: { permission: 'oAuth.accessToken.create' }},
            { path: 'access-token/edit/:id', component: AccessTokenDetailComponent, resolve: { data: accessTokenEditResolver }, data: { permission: 'oAuth.accessToken.get' }},
            { path: 'refresh-token', component: RefreshTokenListComponent, resolve: { data: refreshTokenPaginationResolver }, data: { permission: 'oAuth.refreshToken.get' }},
            { path: 'refresh-token/new', component: RefreshTokenDetailComponent, resolve: { data: refreshTokenNewResolver }, data: { permission: 'oAuth.refreshToken.create' }},
            { path: 'refresh-token/edit/:id', component: RefreshTokenDetailComponent, resolve: { data: refreshTokenEditResolver }, data: { permission: 'oAuth.refreshToken.get' }},
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
