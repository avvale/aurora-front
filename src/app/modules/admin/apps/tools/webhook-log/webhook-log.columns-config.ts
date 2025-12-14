import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const webhookLogColumnsConfig: (properties?: {
    translator?: TranslocoService;
}) => ColumnConfig[] = ({
    translator = null,
}: {
    translator?: TranslocoService;
} = {}): ColumnConfig[] => [
    {
        type: ColumnDataType.NUMBER,
        field: 'rowId',
        sort: 'rowId',
        translation: 'tools.RowId',
    },
    {
        type: ColumnDataType.STRING,
        field: 'url',
        sort: 'url',
        translation: 'tools.Url',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.JSONB,
        field: 'headerRequest',
        sort: 'headerRequest',
        translation: 'tools.HeaderRequest',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.JSONB,
        field: 'bodyRequest',
        sort: 'bodyRequest',
        translation: 'tools.BodyRequest',
        isUnaccent: true,
    },
];
