import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GridTranslationsService } from './grid-translations.service';
import { GridMessages } from '../grid.types';

/**
 * Check which action to perform depending on whether or not the language exists.
 */
@Pipe({
    name: 'gridTranslate',
    pure: false,
})
export class GridTranslatePipe implements PipeTransform, OnDestroy
{
    value = '';
    private _unsubscribeAll: Subject<void> = new Subject<void>();
    updateValue = (res: string): void =>
    {
        this.value = res;
        this.ref.markForCheck();
    };

    constructor(
        private gridTranslationsService: GridTranslationsService,
        private ref: ChangeDetectorRef,
    )
    {}

    transform(key: string, type: 'column' | 'message' | 'action' = 'message'): string
    {
        if (type === 'message')
        {
            this.gridTranslationsService
                .getMessage(key as keyof GridMessages)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(res => this.updateValue(res));
        }
        else if (type === 'column')
        {
            this.gridTranslationsService
                .getColumnMessage(key)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(res => this.updateValue(res));
        }
        else
        {
            this.gridTranslationsService
                .getActionsMenuMessages()
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(res => this.updateValue(res[key]));
        }

        return this.value;
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
