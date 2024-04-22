import { Routes } from '@angular/router';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { SettingsComponent } from 'app/modules/admin/apps/settings/settings.component';

export default [
    {
        path     : '',
        component: SettingsComponent,
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'settings',
                multi   : true,
            },
        ],
    },
] as Routes;
