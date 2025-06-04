import { EnvironmentProviders, Provider } from '@angular/core';
import { LocalStorageDownloadService, DownloadService } from '@aurora';

export const provideLocalStorage = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        {
            provide : DownloadService,
            useClass: LocalStorageDownloadService,
        },
    ];
};
