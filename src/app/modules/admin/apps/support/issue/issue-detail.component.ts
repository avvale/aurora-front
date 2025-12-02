import { DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecordingPreviewDialogComponent } from '@apps/screen-recording';
import { SupportIssue } from '@apps/support';
import { IssueService } from '@apps/support/issue';
import {
    Action,
    Crumb,
    defaultDetailImports,
    log,
    mapActions,
    SnackBarInvalidFormComponent,
    uuid,
    ViewDetailComponent,
} from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector: 'support-issue-detail',
    templateUrl: './issue-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [...defaultDetailImports, DatePipe],
})
export class IssueDetailComponent extends ViewDetailComponent {
    // ---- customizations ----
    commentFg: FormGroup;
    comments: WritableSignal<any[]> = signal([
        {
            id: '1',
            author: 'John Doe',
            date: new Date(),
            content: 'This is a sample comment.',
            edit: false,
        },
        {
            id: '2',
            author: 'John Doe3',
            date: new Date(),
            content: 'This is a sample comment3.',
            edit: false,
        },
    ]);

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

    constructor(
        private readonly issueService: IssueService,
        private readonly dialog: MatDialog,
    ) {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void {
        /**/
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
                'support::issue.detail.new': 'support::issue.detail.create',
                'support::issue.detail.edit': 'support::issue.detail.update',
            }),
            isViewAction: false,
        });
    }

    onSubmitComment($event): void {
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
        if (this.commentFg.invalid) {
            log('[DEBUG] Error to validate form: ', this.commentFg);
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
            id: 'support::issue.detail.updateComment',
            isViewAction: false,
            meta: { comment: this.commentFg.value },
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
        });

        this.commentFg = this.fb.group({
            id: null,
            content: ['', [Validators.required]],
        });
        /* eslint-enable key-spacing */
    }

    async handleAction(action: Action): Promise<void> {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id) {
            /* #region common actions */
            case 'support::issue.detail.new':
                this.fg.get('id').setValue(uuid());
                break;

            case 'support::issue.detail.edit':
                this.issueService.issue$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe((item) => {
                        this.managedObject.set(item);
                        this.fg.patchValue(item);
                    });
                break;

            case 'support::issue.detail.create':
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

            case 'support::issue.detail.update':
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

            /* #region custom actions */
            case 'support::issue.detail.openPreviewVideoDialog':
                this.dialog.open(RecordingPreviewDialogComponent, {
                    data: {
                        videoUrl: this.managedObject().screenRecording.url,
                    },
                    width: '720px',
                    maxWidth: '90vw',
                });
                break;
            case 'support::issue.detail.newComment':
                console.log('New comment action');
                break;
            case 'support::issue.detail.openRecordingScreen':
                console.log('Open recording screen action');
                break;
            case 'support::issue.detail.editComment':
                console.log('Edit comment action', action.meta.comment);
                for (const comment of this.comments()) {
                    if (comment.id === action.meta.comment.id) {
                        comment.edit = true;
                        this.commentFg.patchValue(comment);
                        continue;
                    }
                    comment.edit = false;
                }
                break;
            case 'support::issue.detail.updateComment':
                console.log('Update comment action', action.meta.comment);
                break;
            /* #endregion custom actions */
        }
    }
}
