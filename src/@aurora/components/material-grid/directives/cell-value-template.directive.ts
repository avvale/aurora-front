import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auCellValueTemplate]',
})
export class CellValueTemplateDirective
{
    @Input() target: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}