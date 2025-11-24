import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Inject,
    inject,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { SupportIssue } from '@apps/support';
import { IssueService } from '@apps/support/issue';
import {
    Action,
    Crumb,
    defaultDetailImports,
    log,
    mapActions,
    SnackBarInvalidFormComponent,
    StorageAccountFileManagerFileUploadedInput,
    uuid,
    ViewDetailComponent,
} from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';
import { IssueVideoPreviewDialogComponent } from './issue-video-preview-dialog.component';

@Component({
    selector: 'support-issue-detail-dialog',
    templateUrl: './issue-detail-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...defaultDetailImports],
})
export class IssueDetailDialogComponent extends ViewDetailComponent {
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: WritableSignal<SupportIssue> = signal(null);

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'support.Issues', routerLink: ['/support/issue'] },
        { translation: 'support.Issue' },
    ];

    recordingState = signal<'idle' | 'recording' | 'recorded'>('idle');
    recordedVideoUrl = signal<string | null>(null);
    isPlaybackVisible = signal<boolean>(false);
    private previewDialogRef: MatDialogRef<IssueVideoPreviewDialogComponent> | null =
        null;
    private readonly destroyRef = inject(DestroyRef);

    constructor(
        private readonly issueService: IssueService,
        private readonly dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            screenRecording: StorageAccountFileManagerFileUploadedInput;
        },
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
    }

    openPreviewDialog(): void {
        if (
            this.recordingState() !== 'recorded' ||
            !this.recordedVideoUrl() ||
            this.previewDialogRef
        ) {
            return;
        }

        this.previewDialogRef = this.dialog.open(
            IssueVideoPreviewDialogComponent,
            {
                data: { videoUrl: this.recordedVideoUrl() },
                width: '720px',
                maxWidth: '90vw',
            },
        );

        this.isPlaybackVisible.set(true);

        this.previewDialogRef.afterClosed().subscribe(() => {
            this.isPlaybackVisible.set(false);
            this.previewDialogRef = null;
        });
    }

    deleteRecording(): void {
        const url = this.recordedVideoUrl();
        this.revokeObjectUrl(url);

        this.recordedVideoUrl.set(null);
        this.isPlaybackVisible.set(false);
        this.recordingState.set('idle');
        this.closePreviewDialog();
        this.fg.get('video')?.reset();
    }

    private closePreviewDialog(): void {
        if (this.previewDialogRef) {
            this.previewDialogRef.close();
            this.previewDialogRef = null;
        }
        this.isPlaybackVisible.set(false);
    }

    private revokeObjectUrl(url: string | null): void {
        if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
    }

    private translateWithFallback(key: string, fallback: string): string {
        const translation = this.translocoService.translate(key);
        return translation !== key ? translation : fallback;
    }

    onSubmit($event): void {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if (
            $event.submitter.getAttribute('form') !==
            $event.submitter.form.getAttribute('id')
        ) {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

        // manage validations before execute actions
        if (this.fg.invalid) {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();

            this.snackBar.openFromComponent(SnackBarInvalidFormComponent, {
                data: {
                    message: `${this.translocoService.translate('InvalidForm')}`,
                    textButton: `${this.translocoService.translate('InvalidFormOk')}`,
                },
                panelClass: 'error-snackbar',
                verticalPosition: 'top',
                duration: 10000,
            });
            return;
        }

        this.actionService.action({
            id: mapActions(this.currentViewAction.id, {
                'support::issue.detailDialog.new':
                    'support::issue.detailDialog.create',
                'support::issue.detailDialog.edit':
                    'support::issue.detailDialog.update',
            }),
            isViewAction: false,
        });
    }

    createForm(): void {
        /* eslint-disable key-spacing */
        this.fg = this.fb.group({
            id: [
                '',
                [
                    Validators.required,
                    Validators.minLength(36),
                    Validators.maxLength(36),
                ],
            ],
            externalId: ['', [Validators.maxLength(64)]],
            externalStatus: ['', [Validators.maxLength(36)]],
            accountId: [
                null,
                [Validators.minLength(36), Validators.maxLength(36)],
            ],
            accountUsername: ['', [Validators.maxLength(128)]],
            frontVersion: ['', [Validators.maxLength(16)]],
            backVersion: ['', [Validators.maxLength(16)]],
            environment: ['', [Validators.maxLength(36)]],
            subject: ['', [Validators.required, Validators.maxLength(510)]],
            description: ['', [Validators.required]],
            attachments: null,
            video: null,
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'support::issue.detailDialog.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'support::issue.detailDialog.edit':
                this.issueService.issue$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);

                        if (item?.video) {
                            this.recordingState.set('recorded');
                            this.isPlaybackVisible.set(false);
                            this.closePreviewDialog();

                            if (typeof item.video === 'string') {
                                this.recordedVideoUrl.set(item.video);
                            }
                        } else {
                            this.recordingState.set('idle');
                            this.recordedVideoUrl.set(null);
                            this.isPlaybackVisible.set(false);
                            this.closePreviewDialog();
                        }
                    });
                break;

            case 'support::issue.detailDialogDialog.create':
                try {
                    await lastValueFrom(
                        this.issueService.create<SupportIssue>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('support.Issue')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['support/issue']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'support::issue.detailDialog.update':
                try {
                    await lastValueFrom(
                        this.issueService.updateById<SupportIssue>({
                            object: this.fg.value,
                        }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('support.Issue')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration: 3000,
                        },
                    );

                    this.router.navigate(['support/issue']);
                } catch (error) {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
            /* #endregion common actions */
        }
    }
}
