import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, ColumnConfig, ColumnDataType, Crumb, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { jobColumnsConfig } from '../job/job.columns-config';
import { QueueManagerQueue } from '../queue-manager.types';
import { QueueService } from './queue.service';
import { JobService } from '../job/job.service';

@Component({
    selector       : 'queue-manager-queue-detail',
    templateUrl    : './queue-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueueDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: QueueManagerQueue;
    jobsGridId: string = 'queueManager::queue.detail.jobsGridList';
    jobsGridData$: Observable<GridData<any>>;
    jobsGridState: GridState = {};
    jobsColumnsConfig$: Observable<ColumnConfig[]>;
    jobsOriginColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                return [
                    {
                        id         : 'queueManager::queue.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'queueManager::queue.list.delete',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                ];
            },
        },
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        ...jobColumnsConfig,
    ];

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'queueManager.Queues', routerLink: ['/queue-manager/queue']},
        { translation: 'queueManager.Queue' },
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly queueService: QueueService,
        private readonly jobService: JobService,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        /**/
    }

    onSubmit($event): void
    {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if ($event.submitter.getAttribute('form') !== $event.submitter.form.getAttribute('id'))
        {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();
            return;
        }

        this.actionService.action({
            id: mapActions(
                this.currentViewAction.id,
                {
                    'queueManager::queue.detail.new' : 'queueManager::queue.detail.create',
                    'queueManager::queue.detail.edit': 'queueManager::queue.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            prefix: ['', [Validators.required, Validators.maxLength(50)]],
            name: ['', [Validators.required, Validators.maxLength(50)]],
            waitingJobs: [null, [Validators.required, Validators.maxLength(10)]],
            activeJobs: [null, [Validators.required, Validators.maxLength(10)]],
            completedJobs: [null, [Validators.required, Validators.maxLength(10)]],
            failedJobs: [null, [Validators.required, Validators.maxLength(10)]],
            delayedJobs: [null, [Validators.required, Validators.maxLength(10)]],
            pausedJobs: [null, [Validators.required, Validators.maxLength(10)]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'queueManager::queue.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'queueManager::queue.detail.edit':
                this.queueService
                    .queue$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });

                // jobs grid
                this.jobsColumnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.jobsGridId, this.jobsOriginColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.jobsGridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.jobsGridId),
                    page         : this.gridStateService.getPage(this.jobsGridId),
                    sort         : this.gridStateService.getSort(this.jobsGridId),
                    search       : this.gridStateService.getSearchState(this.jobsGridId),
                };

                this.jobsGridData$ = this.jobService.pagination$;

                break;

            case 'queueManager::queue.detail.create':
                try
                {
                    await lastValueFrom(
                        this.queueService
                            .create<QueueManagerQueue>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('queueManager.Queue')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['queue-manager/queue']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'queueManager::queue.detail.update':
                try
                {
                    await lastValueFrom(
                        this.queueService
                            .updateById<QueueManagerQueue>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('queueManager.Queue')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['queue-manager/queue']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion common actions */
        }
    }
}
