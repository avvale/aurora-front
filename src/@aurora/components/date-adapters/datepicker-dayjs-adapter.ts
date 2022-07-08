import { Platform } from '@angular/cdk/platform';
import { MatDateFormats, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';
import { Inject, Optional } from '@angular/core';

export class DatePickerDayjsAdapter extends NativeDateAdapter
{
    constructor(
        matDateLocale: string,
        platform: Platform,
        @Optional() @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    )
    {
        super(matDateLocale, platform);

        dayjs.locale('es');
        dayjs.extend(customParseFormat);
        dayjs.extend(localizedFormat);
    }

    parse(value: any): Date | null
    {
        return dayjs(value, this.dateFormats.parse.dateInput).toDate();
    }

    // change format value on display, display format come from MAT_DATE_FORMATS
    format(date: Date, displayFormat: string): string
    {
        return dayjs(date).format(displayFormat);
    }

    getFirstDayOfWeek(): number
    {
        return 1;
    }
}
