import { Component } from '@angular/core';
import { IListComponent } from './list.types';
import { Observable, of } from 'rxjs';
import { TicketMasterEventList } from 'src/app/misc/event.types';
import { TicketMasterQueryService } from 'src/app/shared/services/other/ticketmaster-query.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements IListComponent {
  constructor(private ticketMasterQuery: TicketMasterQueryService) {}

  list$: Observable<TicketMasterEventList> = this.ticketMasterQuery.responseEvents$
  loading$: Observable<boolean> = of(false)

  displayedColumns = ['name', 'venueName', 'startDate', 'endDate', 'eventUrl']

  onPageChange($event: any): void {
    const {pageIndex} = $event
    this.ticketMasterQuery.getEvents(null, pageIndex).subscribe()
  }

  toEvent($url: string): void {
    window.open($url, '_blank')
  }
}
