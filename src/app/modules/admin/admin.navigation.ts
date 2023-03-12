import { FuseNavigationItem } from '@fuse/components/navigation';
import { oAuthNavigation } from './apps/o-auth/o-auth.navigation';
import { iamNavigation } from './apps/iam/iam.navigation';
import { auditingNavigation } from './apps/auditing/auditing.navigation';
import { queueManagerNavigation } from './apps/queue-manager/queue-manager.navigation';

export const adminNavigation: FuseNavigationItem[] = [
    oAuthNavigation,
    iamNavigation,
    auditingNavigation,
    queueManagerNavigation
];