import { FuseNavigationItem } from '@fuse/components/navigation';

export const searchEngineNavigation: FuseNavigationItem = {
    id      : 'searchEngine',
    title   : 'SearchEngine',
    type    : 'collapsable',
    icon    : 'manage_search',
    children: [
        {
            id   : 'collections',
            title: 'Collection',
            type : 'basic',
            icon : 'segment',
            link : '/search-engine/collection',
        },
        {
            id   : 'fields',
            title: 'Field',
            type : 'basic',
            icon : 'heroicons_outline:tag',
            link : '/search-engine/field',
        },
    ],
};