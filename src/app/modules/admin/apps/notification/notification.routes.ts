/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NotificationComponent } from './notification.component';
import { OutBoxNotificationListComponent } from './out-box-notification/out-box-notification-list.component';
import { OutBoxNotificationDetailComponent } from './out-box-notification/out-box-notification-detail.component';
import { outBoxNotificationEditResolver, outBoxNotificationNewResolver, outBoxNotificationPaginationResolver } from './out-box-notification/out-box-notification.resolvers';

export default [
    {
        path     : '',
        component: NotificationComponent,
        children : [
            { path: 'out-box-notification', component: OutBoxNotificationListComponent, resolve: { data: outBoxNotificationPaginationResolver }, data: { permission: 'notification.outBoxNotification.get' }},
            { path: 'out-box-notification/new', component: OutBoxNotificationDetailComponent, resolve: { data: outBoxNotificationNewResolver }, data: { permission: 'notification.outBoxNotification.create' }},
            { path: 'out-box-notification/edit/:id', component: OutBoxNotificationDetailComponent, resolve: { data: outBoxNotificationEditResolver }, data: { permission: 'notification.outBoxNotification.get' }},
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
