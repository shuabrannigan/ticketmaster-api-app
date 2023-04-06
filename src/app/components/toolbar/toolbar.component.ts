import { Component, Input } from '@angular/core';
import { TicketMasterQueryService } from 'src/app/shared/services/other/ticketmaster-query.service';

interface IToolbar {
  title: string
  filterState: boolean
  toggleFilterState(): void
  search(): void
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements IToolbar {
  constructor(private ticketMasterQueryService: TicketMasterQueryService) {}
  @Input() title: string = ''
  filterState = false

  toggleFilterState(): void {
    this.filterState = !this.filterState
  }
  
  search(): void {
    this.ticketMasterQueryService.getEvents(null).subscribe()
  }
}
