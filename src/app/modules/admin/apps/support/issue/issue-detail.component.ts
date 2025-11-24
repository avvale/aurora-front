import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
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
    imports: [...defaultDetailImports],
})
export class IssueDetailComponent extends ViewDetailComponent {
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
            /* #endregion custom actions */
        }
    }
}
