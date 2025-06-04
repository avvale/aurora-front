import { EnvironmentProviders, Provider } from '@angular/core';
import { AzureStorageAccountDownloadService, DownloadService } from '@aurora';

export const provideAzureStorageAccount = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        {
            provide : DownloadService,
            useClass: AzureStorageAccountDownloadService,
        },
    ];
};
