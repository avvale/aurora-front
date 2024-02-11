import { Component, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
    selector     : 'inbox',
    templateUrl  : './inbox.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatSidenavModule, RouterOutlet],
})
export class InboxComponent
{ }
