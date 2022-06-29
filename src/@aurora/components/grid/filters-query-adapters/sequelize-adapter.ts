import { ColumnDataType, GridColumnFilter, GridState } from '../grid.types';
import { Operator, QueryStatement } from '@aurora';
import * as _ from 'lodash';

export const setQueryFilters = (gridState: GridState): QueryStatement =>
{
    const groupedFilters = _.groupBy(gridState.filters, 'field');
    const pagination = {
        query : { where: {}},
        limit : gridState.limit,
        offset: gridState.offset,
        sort  : gridState.sort,
        order : gridState.order,
    };

    for (const key of Object.keys(groupedFilters))
    {
        // if group only has one item, don't concat query with operator and/or
        if (groupedFilters[key].length === 1)
        {
            const filter: GridColumnFilter = groupedFilters[key][0];
            pagination.query.where[key] = {
                [filter.operator]: filter.value,
            };
        }
        else if (groupedFilters[key].length > 1)
        {
            // TODO, permitir que el usuario pueda seleccionar el operador
            pagination.query.where[key] = {
                [groupedFilters[key][0].type === ColumnDataType.STRING ? Operator.and : Operator.or]: groupedFilters[key].map(filter => ({ [filter.operator]: filter.value })),
            };
        }
    }

    return pagination;
};