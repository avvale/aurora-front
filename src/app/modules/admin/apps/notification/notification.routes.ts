/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NotificationComponent } from './notification.component';
import { NotificationListComponent } from './notification/notification-list.component';
import { NotificationDetailComponent } from './notification/notification-detail.component';
import { notificationEditResolver, notificationNewResolver, notificationPaginationResolver } from './notification/notification.resolvers';
import { inboxPaginationResolver } from './notification-manager/inbox.resolvers';
import { InboxComponent } from './notification-manager/inbox.component';
import { InboxEmptyDetailsComponent } from './notification-manager/empty-details/empty-details.component';
import { InboxListComponent } from './notification-manager/list/list.component';
import { InboxDetailsComponent } from './notification-manager/details/details.component';
import { InboxDetailComponent } from './inbox/inbox-detail.component';
import { inboxEditResolver, inboxNewResolver } from './inbox/inbox.resolvers';

export default [
    {
        path     : '',
        component: NotificationComponent,
        children : [
            { path: 'notification', component: NotificationListComponent, resolve: { data: notificationPaginationResolver }, data: { permission: 'notification.notification.get' }},
            { path: 'notification/new', component: NotificationDetailComponent, resolve: { data: notificationNewResolver }, data: { permission: 'notification.notification.create' }},
            { path: 'notification/edit/:id', component: NotificationDetailComponent, resolve: { data: notificationEditResolver }, data: { permission: 'notification.notification.get' }},

            {
                path     : 'inbox-client',
                component: InboxComponent,
                //resolve  : { data: inboxPaginationResolver },
                //data     : { permission: 'notification.inbox.get' },
                children : [
                    {
                        path     : '',
                        component: InboxListComponent,
                        resolve  : {
                            data: inboxPaginationResolver,
                        },
                        /* resolve  : {
                            mails: mailsResolver,
                        }, */
                        children: [
                            {
                                path     : '',
                                component: InboxEmptyDetailsComponent,
                            },
                            {
                                path     : ':id',
                                component: InboxDetailsComponent,
                                resolve  : {
                                    // mail: mailResolver,
                                },
                            },

                        ],
                    },
                ],
            },
            { path: 'inbox', component: InboxListComponent, resolve: { data: inboxPaginationResolver }, data: { permission: 'notification.inbox.get' }},
            { path: 'inbox/new', component: InboxDetailComponent, resolve: { data: inboxNewResolver }, data: { permission: 'notification.inbox.create' }},
            { path: 'inbox/edit/:id', component: InboxDetailComponent, resolve: { data: inboxEditResolver }, data: { permission: 'notification.inbox.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'notification',
                multi   : true,
            },
        ],
    },
];
