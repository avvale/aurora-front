/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { GraphQLService } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { CoreLang } from './lang.types';
import gql from 'graphql-tag';

@Injectable({
    providedIn: 'root',
})
export class CoreGetLangsService
{
    private langsSubject$: BehaviorSubject<CoreLang[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
    ) {}

    /**
    * Getter for langs
    */
    get langs$(): Observable<CoreLang[]>
    {
        return this.langsSubject$.asObservable();
    }

    get(): Observable<CoreLang[]>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: CoreLang[];
            }>({
                query: gql`
                    query CoreGetLangs{
                        objects: coreGetLangs
                    }
                `,
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.objects),
                tap(data =>
                {
                    this.langsSubject$.next(data);
                }),
            );
    }
}