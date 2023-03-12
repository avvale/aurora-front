/* eslint-disable max-len */
import { Route } from '@angular/router';
import { QueueManagerComponent } from './queue-manager.component';
import { QueueListComponent } from './queue/queue-list.component';
import { QueueDetailComponent } from './queue/queue-detail.component';
import { QueueEditResolver, QueueNewResolver, QueuePaginationResolver } from './queue/queue.resolvers';

export const queueManagerRoutes: Route[] = [
    {
        path     : '',
        component: QueueManagerComponent,
        children : [
            { path: 'queue', component: QueueListComponent, resolve: { data: QueuePaginationResolver }, data: { permission: 'queueManager.queue.get' }},
            { path: 'queue/new', component: QueueDetailComponent, resolve: { data: QueueNewResolver }, data: { permission: 'queueManager.queue.create' }},
            { path: 'queue/edit/:id', component: QueueDetailComponent, resolve: { data: QueueEditResolver }, data: { permission: 'queueManager.queue.get' }},
        ],
    },
];
