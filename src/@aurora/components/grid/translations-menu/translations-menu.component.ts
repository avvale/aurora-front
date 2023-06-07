import { Component, Input } from '@angular/core';
import { CoreLang } from '@aurora/modules';

@Component({
    selector   : 'au-translations-menu',
    templateUrl: './translations-menu.component.html',
    styleUrls  : ['./translations-menu.component.scss'],
})

export class TranslationMenuComponent
{
    @Input() langs: CoreLang[] = []; // langs to check if there are translation
    @Input() row: any = {};
    @Input() moduleUri: string = '';
    @Input() moduleUriParams: string[] = [];
    @Input() editionIndex: string = 'id';
}
