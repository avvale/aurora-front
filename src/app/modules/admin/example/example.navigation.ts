import { FuseNavigationItem } from '@fuse/components/navigation';

export const exampleNavigation: FuseNavigationItem = {
    id   : 'example',
    title: 'Example',
    type : 'collapsable',
    icon : 'approval',
    meta : {
        permission: undefined,
    },
    children: [
        {
            id   : 'exampleSection',
            title: 'ExampleSection',
            type : 'basic',
            icon : 'app_registration',
            link : '/example/example-section',
            meta : {
                permission: undefined,
            },
        },
    ],
};