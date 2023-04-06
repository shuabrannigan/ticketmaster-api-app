import { Component } from '@angular/core';
import { ISearchComponent } from './search.types';
import { FormControl, FormGroup } from '@angular/forms';
import { TicketMasterQueryService } from 'src/app/shared/services/other/ticketmaster-query.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements ISearchComponent {

  constructor(private ticketMasterQueryService: TicketMasterQueryService) {}

  searchForm: FormGroup<any> = new FormGroup({
    city: new FormControl(''),
    startDateTime: new FormControl(''),
    endDateTime: new FormControl('')
  })
  search(): void {
    this.ticketMasterQueryService.getEvents(this.searchForm.value)
  }

  clear(): void {
    this.searchForm.reset({city: '', startDateTime: '', endDateTime: ''})
  }

}
