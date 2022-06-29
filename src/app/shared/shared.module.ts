import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule, GridModule, TitleModule } from '@aurora';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        // @aurora
        BreadcrumbModule,
        GridModule,
        TitleModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        // @aurora
        BreadcrumbModule,
        GridModule,
        TitleModule,
    ],
})
export class SharedModule {}
