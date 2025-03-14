/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { AttachmentsComponent } from './attachments/attachments.component';
import { attachmentsViewResolver } from './attachments/attachments.resolvers';
import { DecimalsComponent } from './decimals/decimals.component';
import { decimalsViewResolver } from './decimals/decimals.resolvers';
import { FilesUploadComponent } from './files-upload/files-upload.component';
import { filesUploadViewResolver } from './files-upload/files-upload.resolvers';
import { GridComponent } from './grid/grid.component';
import { gridViewResolver } from './grid/grid.resolvers';
import { IconsComponent } from './icons/icons.component';
import { iconsViewResolver } from './icons/icons.resolvers';
import { KitchenSinkComponent } from './kitchen-sink.component';

export default [
    {
        path     : '',
        component: KitchenSinkComponent,
        children : [
            { path: 'icons',        component: IconsComponent, resolve: { data: iconsViewResolver }},
            { path: 'decimals',     component: DecimalsComponent, resolve: { data: decimalsViewResolver }},
            { path: 'grid',         component: GridComponent, resolve: { data: gridViewResolver }},
            { path: 'files-upload', component: FilesUploadComponent, resolve: { data: filesUploadViewResolver }},
            { path: 'attachments',  component: AttachmentsComponent, resolve: { data: attachmentsViewResolver }},
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
