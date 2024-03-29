import { FuseNavigationItem } from '@fuse/components/navigation';
import { oAuthNavigation } from './apps/o-auth/o-auth.navigation';
import { iamNavigation } from './apps/iam/iam.navigation';
import { auditingNavigation } from './apps/auditing/auditing.navigation';
import { queueManagerNavigation } from './apps/queue-manager/queue-manager.navigation';
import { commonNavigation } from './apps/common/common.navigation';
import { searchEngineNavigation } from './apps/search-engine/search-engine.navigation';

export const adminNavigation: FuseNavigationItem[] = [
    oAuthNavigation,
    iamNavigation,
    auditingNavigation,
    queueManagerNavigation,
    commonNavigation,
    searchEngineNavigation
];