import { FuseNavigationItem } from '@fuse/components/navigation';
import { oAuthNavigation } from './apps/o-auth/o-auth.navigation';
import { orionNavigation } from './apps/orion/orion.navigation';

export const adminNavigation: FuseNavigationItem[] = [
    orionNavigation,
    oAuthNavigation,
];