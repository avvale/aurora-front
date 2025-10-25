import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScreenCaptureConfigService
{
    displaySurface: WritableSignal<string> = signal(null);
    audioDeviceId: WritableSignal<string> = signal(null);

    setConfig(
        config: {
            displaySurface: string;
            audioDeviceId: string;
        },
    ): void
    {
        this.displaySurface.set(config.displaySurface);
        this.audioDeviceId.set(config.audioDeviceId);
    }

    getConfig(): {
        displaySurface: string;
        audioDeviceId: string;
    }
    {
        return {
            displaySurface: this.displaySurface(),
            audioDeviceId: this.audioDeviceId(),
        };
    }
}
