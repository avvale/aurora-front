import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { CellValueTemplateDirective } from '../directives/cell-value-template.directive';
import { ColumnConfig } from '../grid.types';

/**
 * Check if in current iteration has template directive for current row with target
 */
@Pipe({
    name: 'hasCellValueWithTargetTemplate',
})
export class HasCellValueWithTargetTemplatePipe implements PipeTransform
{
    transform(cellValuesTemplate: QueryList<CellValueTemplateDirective>, columnConfig: ColumnConfig): boolean
    {
        return !!cellValuesTemplate
            .find(
                cellValueTemplate => cellValueTemplate.target === columnConfig.field,
            );
    }
}
