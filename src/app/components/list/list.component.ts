import { Component } from '@angular/core';
import { IListComponent } from './list.types';
import { Observable, of } from 'rxjs';
import { TicketMasterEventList } from 'src/app/misc/event.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements IListComponent {
  list$: Observable<TicketMasterEventList> = of({events: [],page: null})
  loading$: Observable<boolean> = of(false)
}
