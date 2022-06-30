import { MatDateFormats } from '@angular/material/core';

export const DatePickerDayjsFormats: MatDateFormats =
{
    parse: {
        dateInput: 'DD-MM-YYYY',
    },
    display: {
        dateInput         : 'DD-MM-YYYY',
        monthYearLabel    : 'MMM YYYY',
        dateA11yLabel     : 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
