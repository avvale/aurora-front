import { Pipe, PipeTransform } from '@angular/core';
import get from 'lodash-es/get';

@Pipe({
    name      : 'getCellValue',
    pure      : true,
    standalone: true,
})
export class GetCellValuePipe implements PipeTransform
{
    transform(object: any, path: string, defaultValue?: any): any
    {
        return get(
            object,
            path.indexOf('::') > -1 ? path.split('::').shift() : path,
            defaultValue,
        );
    }
}
