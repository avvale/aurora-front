// angular
import { ChangeDetectionStrategy, Component, Host, Input, Optional } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { GridTranslationsService } from './grid-translations.service';
import { GridActionsMenuMessages, GridOperatorsMessages, GridPaginatorMessages } from '../grid.types';

@Component({
    selector       : 'au-grid-translations',
    template       : '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridTranslationsComponent
{
    // operators
    @Input() set operators(operatorsMessages: GridOperatorsMessages)
    {
        this.gridTranslationsService.setOperatorsMessages(operatorsMessages);
    }

    // paginator
    @Input() set paginator(paginatorMessages: GridPaginatorMessages)
    {
        this.gridTranslationsService.setPaginatorMessages(paginatorMessages);
    }

    // actions menu
    @Input() set actionsMenu(actionsMenuMessages: GridActionsMenuMessages)
    {
        this.gridTranslationsService.setActionsMenuMessages(actionsMenuMessages);
    }

    // messages translations
    @Input() set actions(message: string)
    {
        this.gridTranslationsService.setMessage('actions', message);
    }
    @Input() set AND(message: string)
    {
        this.gridTranslationsService.setMessage('AND', message);
    }
    @Input() set clearFilters(message: string)
    {
        this.gridTranslationsService.setMessage('clearFilters', message);
    }
    @Input() set clickAndDragInfo(message: string)
    {
        this.gridTranslationsService.setMessage('clickAndDragInfo', message);
    }
    @Input() set columns(message: string)
    {
        this.gridTranslationsService.setMessage('columns', message);
    }
    @Input() set field(message: string)
    {
        this.gridTranslationsService.setMessage('field', message);
    }
    @Input() set filter(message: string)
    {
        this.gridTranslationsService.setMessage('filter', message);
    }
    @Input() set operator(message: string)
    {
        this.gridTranslationsService.setMessage('operator', message);
    }
    @Input() set OR(message: string)
    {
        this.gridTranslationsService.setMessage('OR', message);
    }
    @Input() set pleaseSelectField(message: string)
    {
        this.gridTranslationsService.setMessage('pleaseSelectField', message);
    }
    @Input() set translations(message: string)
    {
        this.gridTranslationsService.setMessage('translations', message);
    }
    @Input() set value(message: string)
    {
        this.gridTranslationsService.setMessage('value', message);
    }

    constructor(
        @Optional() @Host() private parent: GridComponent,
        private gridTranslationsService: GridTranslationsService,
    ) { }
}
