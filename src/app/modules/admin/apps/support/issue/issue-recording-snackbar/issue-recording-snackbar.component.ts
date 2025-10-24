import { Component, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from "@angular/material/snack-bar";
import { ScreenCaptureService } from "@apps/support/screen-capture.service";
import { Counter, log } from "@aurora";
import { TranslocoService } from "@jsverse/transloco";

@Component({
    selector: 'support-issue-recording-snackbar',
    templateUrl: './issue-recording-snackbar.component.html',
    styles: `
        ::ng-deep .support-issue-recording-snackbar-wrapper > * {
            min-width: 0px !important;
        }
        :host {
            display: flex;
            min-width: none;
        }
    `,
    imports: [
        MatButtonModule, MatIcon, MatSnackBarAction,
        MatSnackBarActions, MatSnackBarLabel,
    ],
})
export class IssueRecordingSnackbarComponent
{
    recordingState = signal<'idle' | 'recording' | 'paused' | 'recorded'>('idle');
    isPlaybackVisible = signal<boolean>(false);
    recordedVideoUrl = signal<string | null>(null);
    counterValue = Counter.getCounterValue();

    // injections
    snackBarRef = inject(MatSnackBarRef);
    snackBar = inject(MatSnackBar);
    translocoService = inject(TranslocoService);
    screenCaptureService = inject(ScreenCaptureService);
    data = inject(MAT_SNACK_BAR_DATA);

    private revokeObjectUrl(url: string | null): void
    {
        if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
    }

    restartRecording(): void
    {
        Counter.resetCounter();
    }

    finishRecording(): void
    {
        Counter.stopCounter();
        this.snackBarRef.dismiss();
        this.screenCaptureService.stop();
    }

    async startRecording(): Promise<void>
    {
        await this.startScreenRecording();
        Counter.startCounter();
    }

    pauseRecording(): void
    {
        if (this.recordingState() !== 'recording') return;

        this.screenCaptureService.pause();
        Counter.stopCounter();
        this.recordingState.set('paused');
    }

    resumeRecording(): void
    {
        if (this.recordingState() !== 'paused') return;

        this.screenCaptureService.resume();
        this.recordingState.set('recording');
        Counter.startCounter();
    }

    discardRecording(): void
    {
        this.snackBarRef.dismiss();
    }

    async startScreenRecording(): Promise<void>
    {
        // prevent starting a new recording if one already exists
        if (this.recordingState() === 'recorded')
        {
            const message = this.translocoService.translate('support.ScreenRecordingExists');

            this.snackBar.open(
                message,
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );
            return;
        }

        // check for screen recording support
        if (!navigator?.mediaDevices?.getDisplayMedia)
        {
            const message = this.translocoService.translate('support.ScreenRecordingNotSupported');

            this.snackBar.open(
                message,
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );
            return;
        }

        try
        {
            //this.closePreviewDialog();
            await this.screenCaptureService.start(
                undefined,
                {
                    includeSystemAudio: true,
                }
            );
            this.recordingState.set('recording');
            this.isPlaybackVisible.set(false);
            this.recordedVideoUrl.set(null);
            //this.fg.get('video')?.setValue(null);
        }
        catch (error)
        {
            log('[DEBUG] Error starting screen recording', error);
            const message = this.translocoService.translate('support.ScreenRecordingStartError');

            this.snackBar.open(
                message,
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );
        }
    }

    async stopScreenRecording(): Promise<void>
    {
        if (!['recording', 'paused'].includes(this.recordingState())) return;

        Counter.stopCounter();

        try
        {
            const blob = await this.screenCaptureService.stop();

            if (!blob)
            {
                this.recordingState.set('idle');
                return;
            }

            this.revokeObjectUrl(this.recordedVideoUrl());
            const url = URL.createObjectURL(blob);

            this.recordedVideoUrl.set(url);
            this.recordingState.set('recorded');

            console.log('Recorded blob', Date.now());
            const fileName = `issue-screen-recording-${Date.now()}.webm`;
            const file = new File([blob], fileName, { type: blob.type || 'video/webm' });
            // this.fg.get('video')?.setValue(file);
        }
        catch (error)
        {
            log('[DEBUG] Error stopping screen recording', error);
            const message = this.translocoService.translate('support.ScreenRecordingStopError');

            this.snackBar.open(
                message,
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );
            this.recordingState.set('idle');
        }
    }
}
