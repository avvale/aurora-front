import { auditingNavigation } from '@apps/auditing/auditing.navigation';
import { commonNavigation } from '@apps/common/common.navigation';
import { iamNavigation } from '@apps/iam/iam.navigation';
import { messageNavigation } from '@apps/message/message.navigation';
import { oAuthNavigation } from '@apps/o-auth/o-auth.navigation';
import { queueManagerNavigation } from '@apps/queue-manager/queue-manager.navigation';
import { searchEngineNavigation } from '@apps/search-engine/search-engine.navigation';
import { toolsNavigation } from '@apps/tools/tools.navigation';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { kitchenSinkNavigation } from './kitchen-sink/kitchen-sink.navigation';

export const adminNavigation: FuseNavigationItem[] = [
    auditingNavigation,
    commonNavigation,
    iamNavigation,
    kitchenSinkNavigation,
    messageNavigation,
    oAuthNavigation,
    queueManagerNavigation,
    searchEngineNavigation,
    toolsNavigation,
];