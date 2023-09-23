import { inject } from '@angular/core';
import { DocumentNode } from '@apollo/client/core';
import { SlugService } from '@aurora';
import { lastValueFrom } from 'rxjs';

type GConstructor<T> = new (...args: any[]) => T;
type GConstructorBase = GConstructor<{ /**/ }>;

export const SlugMixin = <TBase extends GConstructorBase>(Base: TBase): any =>
{
    return class extends Base
    {
        slugService: SlugService = inject(SlugService);
        checkingSlug: boolean = false;

        async checkSlug({
            graphqlStatement = null,
            slug = '',
            id = undefined,
            contentLanguage = '*',
        }: {
            graphqlStatement?: DocumentNode;
            slug?: string;
            id?: string;
            contentLanguage?: string;
        }): Promise<string>
        {
            this.checkingSlug = true;
            const response = await lastValueFrom(
                this.slugService
                    .checkSlug({
                        graphqlStatement,
                        slug,
                        id,
                        headers: {
                            'Content-Language': contentLanguage,
                        },
                    }),
            );
            this.checkingSlug = false;
            return response.slug;
        }
    };
};