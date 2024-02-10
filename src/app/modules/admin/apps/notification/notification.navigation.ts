import { FuseNavigationItem } from '@fuse/components/navigation';

export const notificationNavigation: FuseNavigationItem = {
    id      : 'notification',
    title   : 'Notification',
    type    : 'collapsable',
    icon    : 'notifications',
    children: [
        {
            id         : 'notifications',
            title      : 'Notification',
            type       : 'basic',
            iconFontSet: 'material-symbols-outlined',
            icon       : 'notification_multiple',
            link       : '/notification/notification',
        },
        {
            id   : 'inboxes',
            title: 'Inbox',
            type : 'basic',
            icon : 'mat_outline:language',
            link : '/notification/inbox',
        },
    ],
};