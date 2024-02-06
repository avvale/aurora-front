import { FuseNavigationItem } from '@fuse/components/navigation';

export const notificationNavigation: FuseNavigationItem = {
    id      : 'notification',
    title   : 'Notification',
    type    : 'collapsable',
    icon    : 'heroicons_outline:tag',
    children: [
        {
            id   : 'outBoxNotifications',
            title: 'OutBoxNotification',
            type : 'basic',
            icon : 'mat_outline:language',
            link : '/notification/out-box-notification',
        },
    ],
};