import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as dayjs from 'dayjs';

@Directive({
    selector: '[auDatepickerSqlFormat]',
})
export class DatepickerSqlFormatDirective
{
    abstractControl: NgControl;

    constructor(
        private control: NgControl,
    ) {}

    @HostListener('dateChange', ['$event'])
    onDateChange($event: MatDatepickerInputEvent<Date>): void
    {
        this.control
            .control
            .setValue(
                dayjs($event.value)
                    .format('YYYY-MM-DD'),
            );
    }
}