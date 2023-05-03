import { Injectable } from '@angular/core';
import { DocumentNode } from '@apollo/client/core';
import { GraphQLService, GridData, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { QueueManagerJob } from '../queue-manager.types';
import { paginationQuery } from './job.graphql';

@Injectable({
    providedIn: 'root',
})
export class JobService
{
    paginationSubject$: BehaviorSubject<GridData<QueueManagerJob> | null> = new BehaviorSubject(null);
    queueSubject$: BehaviorSubject<QueueManagerJob | null> = new BehaviorSubject(null);
    queuesSubject$: BehaviorSubject<QueueManagerJob[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<QueueManagerJob>>
    {
        return this.paginationSubject$.asObservable();
    }

    get queue$(): Observable<QueueManagerJob>
    {
        return this.queueSubject$.asObservable();
    }

    get queues$(): Observable<QueueManagerJob[]>
    {
        return this.queuesSubject$.asObservable();
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
        } = {},
    ): Observable<GridData<QueueManagerJob>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<QueueManagerJob>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => this.paginationSubject$.next(pagination)),
            );
    }
}