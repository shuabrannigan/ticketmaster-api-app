import { Component } from '@angular/core';
import { ISearchComponent } from './search.types';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements ISearchComponent {
  searchForm: FormGroup<any> = new FormGroup({
    city: new FormControl(''),
    startDateTime: new FormControl(''),
    endDateTime: new FormControl('')
  })
  search(): void {
    throw new Error('Method not implemented.');
  }

}
