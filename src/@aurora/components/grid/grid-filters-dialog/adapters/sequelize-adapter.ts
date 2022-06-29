import { ColumnDataType, GridColumnFilter, GridState } from '../../grid.types';
import { ContactOperator, Operator, QueryStatement } from '@aurora';
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
            pagination.query.where[key] = {
                [getContactOperator(groupedFilters[key][0].type)]: groupedFilters[key].map(filter => ({ [filter.operator]: filter.value })),
            };
        }
    }

    return pagination;
};

const getContactOperator = (columnDataType:ColumnDataType): ContactOperator =>
{
    switch (columnDataType)
    {
        case ColumnDataType.STRING:
            return Operator.or;
        case ColumnDataType.NUMBER:
            return Operator.and;
        case ColumnDataType.DATE:
            return Operator.and;
        default:
            return Operator.or;
    }
};
