import { FuseNavigationItem } from '@fuse/components/navigation';
import { exampleNavigation } from './example/example.navigation';
import { oAuthNavigation } from './apps/o-auth/o-auth.navigation';
import { iamNavigation } from './apps/iam/iam.navigation';
import { auditingNavigation } from './apps/auditing/auditing.navigation';

export const adminNavigation: FuseNavigationItem[] = [
    exampleNavigation,
    oAuthNavigation,
    iamNavigation,
    auditingNavigation,
];