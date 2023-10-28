import { FuseNavigationItem } from '@fuse/components/navigation';

export const kitchenSinkNavigation: FuseNavigationItem = {
    id      : 'kitchenSink',
    title   : 'KitchenSink',
    type    : 'collapsable',
    icon    : 'mat_outline:kitchen',
    children: [
        {
            id   : 'icons',
            title: 'Icons',
            type : 'basic',
            icon : 'mat_outline:insert_emoticon',
            link : '/kitchen-sink/icons',
        },
        {
            id   : 'decimals',
            title: 'Decimals',
            type : 'basic',
            icon : 'mat_outline:calculate',
            link : '/kitchen-sink/decimals',
        },
        {
            id   : 'grid',
            title: 'Grid',
            type : 'basic',
            icon : 'mat_outline:grid_on',
            link : '/kitchen-sink/grid',
        },
        {
            id   : 'filesUpload',
            title: 'FilesUpload',
            type : 'basic',
            icon : 'mat_outline:cloud_upload',
            link : '/kitchen-sink/files-upload',
        },
        {
            id   : 'attachments',
            title: 'Attachments',
            type : 'basic',
            icon : 'mat_outline:attachment',
            link : '/kitchen-sink/attachments',
        },
    ],
};