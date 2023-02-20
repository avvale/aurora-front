import { FuseNavigationItem } from '@fuse/components/navigation';
import { oAuthNavigation } from './apps/o-auth/o-auth.navigation';
import { iamNavigation } from './apps/iam/iam.navigation';
import { auditingNavigation } from './apps/auditing/auditing.navigation';

export const adminNavigation: FuseNavigationItem[] = [
    oAuthNavigation,
    iamNavigation,
    auditingNavigation,
];