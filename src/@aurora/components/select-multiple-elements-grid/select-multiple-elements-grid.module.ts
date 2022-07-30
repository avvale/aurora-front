import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { GridModule } from '../grid';
import { GridDialogModule } from '../grid-dialog';
import { GridCustomButtonsHeaderTemplateDirective } from './grid-custom-buttons-header-template.directive';
import { SelectMultipleElementsGridComponent } from './select-multiple-elements-grid.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,

        // @aurora
        GridModule,
        GridDialogModule,
    ],
    declarations: [
        GridCustomButtonsHeaderTemplateDirective,
        SelectMultipleElementsGridComponent,
    ],
    exports: [
        GridCustomButtonsHeaderTemplateDirective,
        SelectMultipleElementsGridComponent,
    ],
})

export class SelectMultipleElementsGridModule
{ }
