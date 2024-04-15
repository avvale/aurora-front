import { NgModule } from '@angular/core';
import { GridSelectMultipleCellValueDialogTemplateDirective } from './directives/grid-select-multiple-cell-value-dialog-template.directive';
import { GridSelectMultipleCustomHeaderDialogTemplateDirective } from './directives/grid-select-multiple-custom-header-dialog-template.directive';
import { GridSelectMultipleCustomHeaderTemplateDirective } from './directives/grid-select-multiple-custom-header-template.directive';
import { GridSelectMultipleElementsComponent } from './grid-select-multiple-elements.component';
import { GridCustomButtonsHeaderTemplateDirective } from './directives/grid-custom-buttons-header-template.directive';
import { GridSelectMultipleCellValueTemplateDirective } from './directives/grid-select-multiple-cell-value-template.directive';
import { GridTranslationsComponent } from '../grid/grid-translations/grid-translations.component';

@NgModule({
    imports: [
        GridCustomButtonsHeaderTemplateDirective,
        GridSelectMultipleCellValueDialogTemplateDirective,
        GridSelectMultipleCellValueTemplateDirective,
        GridSelectMultipleCustomHeaderDialogTemplateDirective,
        GridSelectMultipleCustomHeaderTemplateDirective,
        GridSelectMultipleElementsComponent,
        GridTranslationsComponent,
    ],
    exports: [
        GridCustomButtonsHeaderTemplateDirective,
        GridSelectMultipleCellValueDialogTemplateDirective,
        GridSelectMultipleCellValueTemplateDirective,
        GridSelectMultipleCustomHeaderDialogTemplateDirective,
        GridSelectMultipleCustomHeaderTemplateDirective,
        GridSelectMultipleElementsComponent,
        GridTranslationsComponent,
    ],
})
export class GridSelectMultipleElementsModule { }
