
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, ViewDetailComponent, defaultDetailImports, log } from '@aurora';
import { AttachmentsComponent as Attachments } from '@aurora';

@Component({
    selector       : 'kitchen-sink-attachments',
    templateUrl    : './attachments.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        Attachments,
    ],
})
export class AttachmentsComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: any;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'kitchenSink.Attachments' },
    ];

    constructor(
        protected injector: Injector,
    )
    {
        super();
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        /**/
    }

    onSubmit(): void
    {
        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg.value);
            this.validationMessagesService.validate();
            return;
        }

        log('[DEBUG] Error to validate form: ', this.fg.value);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            attachments: [[], [Validators.required]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            default:
                log(`[DEBUG] Action not found: ${action?.id}`);
                break;
        }
    }
}
