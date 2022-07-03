import { NgModule } from '@angular/core';
import { SelectElementGridDialogComponent } from './select-element-grid-dialog.component';
import { SelectElementGridComponent } from './select-element-grid.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GridModule } from '../grid';

@NgModule({
    entryComponents: [
        SelectElementGridDialogComponent,
    ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,

        // @aurora
        GridModule,
    ],
    declarations: [
        SelectElementGridDialogComponent,
        SelectElementGridComponent,
    ],
    exports: [
        SelectElementGridComponent,
    ],
})

export class SelectElementGridModule
{ }
