import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auFormElementDetailDialogTemplate]',
})
export class FormElementDetailDialogTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}