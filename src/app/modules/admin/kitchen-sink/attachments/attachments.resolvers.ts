import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { AttachmentFamilyService } from '@apps/common/attachment-family';
import { CommonAttachmentFamily } from '@apps/common/common.types';
import { ActionService } from '@aurora';

export const attachmentsViewResolver: ResolveFn<{
    objects: CommonAttachmentFamily[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const attachmentFamilyService = inject(AttachmentFamilyService);

    actionService.action({
        id          : 'kitchenSinh::attachments.detail.view',
        isViewAction: true,
    });

    return attachmentFamilyService.get({
        query: {
            include: [
                { association: 'resource' },
            ],
            where: {
                '$resource.code$': 'kitchen-sink',
            },
        },
    });
};
