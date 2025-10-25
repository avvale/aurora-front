// screen-capture.service.ts
import { Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { log } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class ScreenCaptureService
{
    recordingState = signal<'idle' | 'recording' | 'paused' | 'recorded'>('idle');

    private mediaStream?: MediaStream; // final stream
    private displayStream?: MediaStream; // getDisplayMedia stream
    private micStream?: MediaStream; // microphone stream (optional)
    private audioContext?: AudioContext; // for mixing audio (optional)
    private recorder?: MediaRecorder;
    private chunks: Blob[] = [];
    private stopPromise?: Promise<Blob>;
    private chosenMimeType = 'video/webm';

    constructor(
        private readonly snackBar: MatSnackBar,
        private readonly translocoService: TranslocoService,
    ) {}

    isCompatibilityScreenRecord(): boolean
    {
        // prevent starting a new recording if one already exists
        if (this.recordingState() === 'recorded')
        {
            this.snackBar.open(
                this.translocoService.translate('support.ScreenRecordingExists'),
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );
            return false;
        }

        // check for screen recording support
        if (!navigator?.mediaDevices?.getDisplayMedia)
        {
            this.snackBar.open(
                this.translocoService.translate('support.ScreenRecordingNotSupported'),
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );
            return false;
        }

        return true;
    }

    async startScreenRecording(): Promise<boolean>
    {
        try
        {
            await this.start(
                undefined,
                {
                    includeSystemAudio: true,
                    includeMicAudio: true,
                    surface: 'window',
                }
            );

            this.recordingState.set('recording');
            //this.isPlaybackVisible.set(false);
            //this.recordedVideoUrl.set(null);
            //this.fg.get('video')?.setValue(null);

            return true;
        }
        catch (error)
        {
            log('[DEBUG] Error starting screen recording: ', error);

            this.snackBar.open(
                this.translocoService.translate('support.StartScreenRecordingError'),
                undefined,
                {
                    duration: 4000,
                    verticalPosition: 'top',
                },
            );

            return false;
        }
    }

    async start(
        appElement?: HTMLElement,
        audio: boolean | {
            includeSystemAudio?: boolean;
            includeMicAudio?: boolean;
            micDeviceId?: string;
            micConstraints?: MediaTrackConstraints;
            surface?: 'tab' | 'window' | 'screen' | 'any';
            allowSurfaceSwitching?: boolean;
            allowSelfCapture?: boolean;
            showMonitors?: boolean;
        } = false
    ): Promise<void>
    {
        console.log('Starting screen capture with audio options:', audio);

        const opts = typeof audio === 'boolean'
            ? { includeSystemAudio: audio, includeMicAudio: audio }
            : { includeMicAudio: true, ...(audio ?? {}) };

        // 1) Request capture permission (user chooses source)
        // Suggestions for the selector (Chromium). Other browsers will ignore them.
        const isTabPreferred = (opts as any).surface === 'tab';
        const includeMonitors = (opts as any).showMonitors ?? ((opts as any).surface === 'screen' ? true : !isTabPreferred);
        const allowSwitching = (opts as any).allowSurfaceSwitching !== false;
        const allowSelf = (opts as any).allowSelfCapture === true;

        const displayAudioConstraints: boolean | MediaTrackConstraints = !!opts.includeSystemAudio
            ? ({
                // Estas banderas solo existen en Chromium; se fuerzan al tipo estándar.
                // @ts-ignore
                systemAudio: 'include',
                // @ts-ignore
                suppressLocalAudioPlayback: false,
            } as MediaTrackConstraints)
            : false;

        this.displayStream = await navigator
            .mediaDevices
            .getDisplayMedia({
                video: {
                    // sets the default selection for the type of element to be recorded
                    displaySurface: 'tab',
                    // preferCurrentTab: isTabPreferred || undefined,
                    frameRate: 30,
                    //backgroundBlur: true, // only in some browsers (Chrome 109+)
                    // Chromium hints (ignored if they don't exist):
                    // @ts-ignore
                    surfaceSwitching: allowSwitching ? 'include' : 'exclude',
                    // @ts-ignore
                    selfBrowserSurface: allowSelf ? 'include' : 'exclude',
                    // @ts-ignore
                    monitorTypeSurfaces: includeMonitors ? 'include' : 'exclude',
                },
                audio: displayAudioConstraints, // system/tab audio (depends on browser)
                preferCurrentTab: isTabPreferred || undefined,
        });

        // 2) (Optional) Crop to your app's area (Region Capture – Chromium)
        if (appElement)
        {
            const [track] = this.displayStream.getVideoTracks();
            const hasCropTarget = typeof (window as any).CropTarget !== 'undefined';
            const canCrop = track && typeof (track as any).cropTo === 'function';

            if (hasCropTarget && canCrop)
            {
                try
                {
                    const target = await (window as any).CropTarget.fromElement(appElement);
                    await (track as any).cropTo(target);
                }
                catch (err)
                {
                    console.warn('Region Capture cropTo failed; continuing without crop.', err);
                }
            }
            else
            {
                // Not supported in this browser/runtime; continue without cropping
                if (!hasCropTarget || !canCrop)
                {
                    console.warn('Region Capture not supported (no CropTarget or track.cropTo).');
                }
            }
        }

        // 2.5) (Optional) Capture specific microphone
        const wantsMic = !!(opts as any).includeMicAudio || (opts as any).micDeviceId || (opts as any).micConstraints;
        if (wantsMic)
        {
            try
            {
                const audioConstraints: MediaTrackConstraints = {
                    ...((opts as any).micConstraints || {}),
                    ...((opts as any).micDeviceId ? { deviceId: { exact: (opts as any).micDeviceId } as any } : {}),
                };
                const hasExplicitConstraint = Object.keys(audioConstraints).length > 0;
                this.micStream = await navigator.mediaDevices.getUserMedia({
                    audio: hasExplicitConstraint ? audioConstraints : true,
                    video: false,
                });
            }
            catch (e)
            {
                console.warn('No se pudo obtener el micrófono solicitado:', e);
            }
        }

        // 2.6) Build the final stream (video + audio)
        const finalStream = new MediaStream();
        const videoTrack = this.displayStream.getVideoTracks()[0];
        if (videoTrack) finalStream.addTrack(videoTrack);

        const audioTracks: MediaStreamTrack[] = [];
        if ((opts as any).includeSystemAudio)
        {
            const sys = this.displayStream.getAudioTracks()[0];
            if (sys) audioTracks.push(sys);
        }
        if (this.micStream)
        {
            const mic = this.micStream.getAudioTracks()[0];
            if (mic) audioTracks.push(mic);
        }

        if (audioTracks.length === 1)
        {
            finalStream.addTrack(audioTracks[0]);
        }
        else if (audioTracks.length > 1)
        {
            // Mezclar sistema + mic en una sola pista usando WebAudio
            try
            {
                this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const destination = this.audioContext.createMediaStreamDestination();
                for (const t of audioTracks)
                {
                    const srcStream = new MediaStream([t]);
                    const source = this.audioContext.createMediaStreamSource(srcStream);
                    source.connect(destination);
                }
                const mixedTrack = destination.stream.getAudioTracks()[0];
                if (mixedTrack) finalStream.addTrack(mixedTrack);
            }
            catch (e)
            {
                console.warn('Fallo al mezclar audio. Se usará solo el primero.', e);
                finalStream.addTrack(audioTracks[0]);
            }
        }

        this.mediaStream = finalStream;

        // 3) Preparar el recorder
        this.chunks = [];
        // Elegir un mimeType soportado para evitar resultados vacíos
        const candidates = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
        const supported = candidates.find(t => (window as any).MediaRecorder?.isTypeSupported?.(t));
        this.chosenMimeType = supported ?? 'video/webm';

        this.recorder = new MediaRecorder(this.mediaStream, supported ? { mimeType: supported } : undefined);

        // Resolver el blob solo cuando el recorder se detiene y emitió el último chunk
        this.stopPromise = new Promise<Blob>(resolve =>
        {
                this.recorder!.ondataavailable = e => {
                    if (e.data.size > 0) this.chunks.push(e.data);
                };

                this.recorder!.onstop = () => {
                    const blob = new Blob(this.chunks, { type: this.chosenMimeType });
                    this.chunks = [];
                    this.stopTracks();
                    resolve(blob);
                };
        });

        this.recorder.start(); // empieza a grabar (un solo blob se emite al parar)
    }

    pause(): void
    {
        if (!this.recorder) return;

        const { state } = this.recorder;
        if (state === 'recording')
        {
            try
            {
                this.recorder.pause();
            }
            catch (error)
            {
                console.warn('No se pudo pausar la grabación.', error);
            }
        }
    }

    resume(): void
    {
        if (!this.recorder) return;

        const { state } = this.recorder;
        if (state === 'paused')
        {
            try
            {
                this.recorder.resume();
            }
            catch (error)
            {
                console.warn('No se pudo reanudar la grabación.', error);
            }
        }
    }

    async stop(): Promise<Blob | undefined>
    {
        if (!this.recorder) return;

        const waitForStop = this.stopPromise;
        this.recorder.stop();

        return await waitForStop;
    }

    getRecorderState(): RecordingState
    {
        return this.recorder?.state ?? 'inactive';
    }

    /** Lista micrófonos disponibles. Requiere permiso para ver `label`. */
    async listAudioInputDevices(): Promise<MediaDeviceInfo[]>
    {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(d => d.kind === 'audioinput');
    }

    private stopTracks()
    {
        this.mediaStream?.getTracks().forEach(t => t.stop());
        this.displayStream?.getTracks().forEach(t => t.stop());
        this.micStream?.getTracks().forEach(t => t.stop());
        this.mediaStream = undefined;
        this.displayStream = undefined;
        this.micStream = undefined;

        if (this.audioContext)
        {
            try
            {
                this.audioContext.close();
            }
            catch { }
            this.audioContext = undefined;
        }
    }
}
