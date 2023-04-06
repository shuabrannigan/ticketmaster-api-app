import { Component } from '@angular/core';
import { IListComponent, mockEventList } from './list.types';
import { Observable, of } from 'rxjs';
import { TicketMasterEventList } from 'src/app/misc/event.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements IListComponent {
  list$: Observable<TicketMasterEventList> = of(mockEventList)
  loading$: Observable<boolean> = of(false)

  displayedColumns = ['name', 'venueName', 'startDate', 'endDate']

  onPageChange($event: any): void {
    throw new Error('Method not implemented.');
  }
}
