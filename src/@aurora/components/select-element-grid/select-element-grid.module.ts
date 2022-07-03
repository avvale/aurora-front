import { NgModule } from '@angular/core';
import { SelectElementGridComponent } from './select-element-grid.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GridDialogModule } from '../grid-dialog';

@NgModule({
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,

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
