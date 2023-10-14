import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'au-image-input',
    template: `
        <img
            [src]="imgSrc"
            [class]="imgClass"
            [style]="imgStyle"
        >
    `,
    providers: [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageInputComponent),
            multi      : true,
        },
    ],
    standalone: true,
})
export class ImageInputComponent implements ControlValueAccessor
{
    imgSrc: string;
    @Input('imgClass') imgClass;
    @Input('imgStyle') imgStyle;
    private _src: string;

    get src(): string
    {
        return this._src;
    }

    private propagateChange: (value: any) => void;
    private onTouched: () => void;

    writeValue(value: string): void
    {
        if (value !== undefined)
        {
            this._src = value;
            this.refresh();
        }
    }

    // registers a callback function is called by the forms API on initialization
    registerOnChange(fn: (value: any) => void): void
    {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.onTouched = fn;
    }

    refresh(): void
    {
        this.imgSrc = this._src + '?' + Math.random();
    }
}
