import { NgModule } from '@angular/core';
import { SelectElementGridComponent } from './select-element-grid.component';
import { GridDialogModule } from '../grid-dialog';

@NgModule({
    imports: [
        // @aurora
        GridDialogModule,
    ],
    declarations: [
        SelectElementGridComponent,
    ],
    exports: [
        SelectElementGridComponent,
    ],
})

export class SelectElementGridModule
{ }
