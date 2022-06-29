import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Operator } from '@aurora/modules';
import { BehaviorSubject } from 'rxjs';

export interface ActionEvent
{
    action: ColumnConfigAction;
    row?: any;
    event?: PointerEvent;
}

export interface Action
{
    id: string;
    data?: {
        [key: string]: any;
    };
}

export interface ColumnConfig
{
    type: ColumnDataType;
    field?: string;
    translation?: string;
    hidden?: boolean;
    sort?: string | string[];
    filterable?: boolean;
    headerClass?: string | string[];
    bodyClass?: string | string[];
    sticky?: boolean;
    actions?: (item: any) => ColumnConfigAction[];
    transform?: (item: any) => any;
}

export interface ColumnConfigAction
{
    id: string;
    icon: string;
}

export interface ColumnsConfigChange
{
    columnsConfig: ColumnConfig[];
    event: MatCheckboxChange | CdkDragDrop<string[]>;
}

export enum ColumnDataType
{
    ACTIONS = 'ACTIONS',
    CHECKBOX = 'CHECKBOX',
    DATE = 'DATE',
    NUMBER = 'NUMBER',
    STRING = 'STRING',
    TRANSLATIONS_MENU = 'TRANSLATIONS_MENU',
}

export type FilterColumnDataType = ColumnDataType.STRING | ColumnDataType.NUMBER | ColumnDataType.DATE;

export interface FilterDialogResponse
{
   filters: GridColumnFilter[];
}

export type FilterOperator = Operator.eq | Operator.ne | Operator.startsWith | Operator.endsWith | Operator.substring | Operator.gt | Operator.gte | Operator.lt | Operator.lte;

export interface FilterCriteriaOperator
{
   operator   : FilterOperator;
   translation: string;
   types      : FilterColumnDataType[];
}

export interface GridActionsMenuMessages
{
    [key: string]: string;
}

export interface GridColumnFilter
{
    id: string;
    field: string;
    type: ColumnDataType;
    operator: FilterOperator;
    value: string | number;
}

export interface GridData<T = any>
{
    /**
     * The total number of records filtered.
     */
    count: number;

    /**
     * The total number of records that are available.
     */
    total: number;

    /**
     * The data that will be rendered by the Grid as an array.
     */
    rows: T[];
}

export interface GridMessages
{
    actions: BehaviorSubject<string>;
    AND: BehaviorSubject<string>;
    clearFilters: BehaviorSubject<string>;
    clickAndDragInfo: BehaviorSubject<string>;
    columns: BehaviorSubject<string>;
    field: BehaviorSubject<string>;
    filter: BehaviorSubject<string>;
    operator: BehaviorSubject<string>;
    OR: BehaviorSubject<string>;
    pleaseSelectField: BehaviorSubject<string>;
    translations: BehaviorSubject<string>;
    value: BehaviorSubject<string>;
}

export interface GridOperatorsMessages
{
    contains: string;
    endsWith: string;
    equals: string;
    greaterThan: string;
    greaterThanEqual: string;
    lessThan: string;
    lessThanEqual: string;
    notEquals: string;
    startsWith: string;
}

export interface GridPaginatorMessages
{
    firstPageLabel: string;
    itemsPerPageLabel: string;
    lastPageLabel: string;
    nextPageLabel: string;
    ofLabel: string;
    previousPageLabel: string;
}

export interface GridState
{
    filters?: GridColumnFilter[];
    count?: number;
    limit?: number;
    offset?: number;
    sort?: string | string[];
    order?: string;
}
