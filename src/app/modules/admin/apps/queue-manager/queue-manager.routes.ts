/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { QueueManagerComponent } from './queue-manager.component';
import { QueueListComponent } from './queue/queue-list.component';
import { QueueDetailComponent } from './queue/queue-detail.component';
import { QueueEditResolver, QueueNewResolver, QueuePaginationResolver } from './queue/queue.resolvers';
import { JobRegistryListComponent } from './job-registry/job-registry-list.component';
import { JobRegistryDetailComponent } from './job-registry/job-registry-detail.component';
import { JobRegistryEditResolver, JobRegistryNewResolver, JobRegistryPaginationResolver } from './job-registry/job-registry.resolvers';

export default [
    {
        path     : '',
        component: QueueManagerComponent,
        children : [
            { path: 'queue', component: QueueListComponent, resolve: { data: QueuePaginationResolver }, data: { permission: 'queueManager.queue.get' }},
            { path: 'queue/new', component: QueueDetailComponent, resolve: { data: QueueNewResolver }, data: { permission: 'queueManager.queue.create' }},
            { path: 'queue/edit/:id', component: QueueDetailComponent, resolve: { data: QueueEditResolver }, data: { permission: 'queueManager.queue.get' }},
            { path: 'job-registry', component: JobRegistryListComponent, resolve: { data: JobRegistryPaginationResolver }, data: { permission: 'queueManager.jobRegistry.get' }},
            { path: 'job-registry/new', component: JobRegistryDetailComponent, resolve: { data: JobRegistryNewResolver }, data: { permission: 'queueManager.jobRegistry.create' }},
            { path: 'job-registry/edit/:id', component: JobRegistryDetailComponent, resolve: { data: JobRegistryEditResolver }, data: { permission: 'queueManager.jobRegistry.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'queue-manager',
                multi   : true,
            },
        ],
    },
];
