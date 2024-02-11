import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector     : 'message-client-empty-details',
    templateUrl  : './message-client-empty-details.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatIconModule],
})
export class MessageClientEmptyDetailsComponent
{ }
