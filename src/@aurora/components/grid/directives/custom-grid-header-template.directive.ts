import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auCustomGridHeaderTemplate]',
})
export class CustomGridHeaderTemplateDirective
{
    @Input() position: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}