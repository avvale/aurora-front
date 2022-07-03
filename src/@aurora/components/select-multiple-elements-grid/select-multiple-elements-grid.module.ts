import { NgModule } from '@angular/core';
import { GridDialogModule } from '../grid-dialog';
import { SelectMultipleElementsGridComponent } from './select-multiple-elements-grid.component';

@NgModule({
    imports: [
        // @aurora
        GridDialogModule,
    ],
    declarations: [
        SelectMultipleElementsGridComponent,
    ],
    exports: [
        SelectMultipleElementsGridComponent,
    ],
})

export class SelectMultipleElementsGridModule
{ }
