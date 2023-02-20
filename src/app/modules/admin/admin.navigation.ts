import { FuseNavigationItem } from '@fuse/components/navigation';
import { iamNavigation } from './apps/iam/iam.navigation';
import { oAuthNavigation } from './apps/o-auth/o-auth.navigation';
import { exampleNavigation } from './example/example.navigation';

export const adminNavigation: FuseNavigationItem[] = [
    exampleNavigation,
    oAuthNavigation,
    iamNavigation,
];