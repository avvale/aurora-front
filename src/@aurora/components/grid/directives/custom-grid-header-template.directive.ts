import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auCustomGridHeaderTemplate]',
})
export class CustomGridHeaderTemplateDirective
{
    @Input() position: 'left' | 'right' | 'beforeGriButtons';

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}