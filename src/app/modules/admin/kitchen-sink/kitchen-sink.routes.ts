/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { KitchenSinkComponent } from './kitchen-sink.component';
import { DecimalsComponent } from './decimals/decimals.component';
import { GridComponent } from './grid/grid.component';
import { decimalsViewResolver } from './decimals/decimals.resolvers';
import { gridViewResolver } from './grid/grid.resolvers';
import { filesUploadViewResolver } from './files-upload/files-upload.resolvers';
import { FilesUploadComponent } from './files-upload/files-upload.component';

export default [
    {
        path     : '',
        component: KitchenSinkComponent,
        children : [
            { path: 'decimals',     component: DecimalsComponent, resolve: { data: decimalsViewResolver }},
            { path: 'grid',         component: GridComponent, resolve: { data: gridViewResolver }},
            { path: 'files-upload',  component: FilesUploadComponent, resolve: { data: filesUploadViewResolver }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'kitchen-sink',
                multi   : true,
            },
        ],
    },
];
