import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { TicketMasterApiSearchTerm } from './search.types';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initalize the searchForm with empty values', () => {
    const expectedFormValues: TicketMasterApiSearchTerm = {
      city: '',
      startDateTime: '',
      endDateTime: ''
    }
    expect(component.searchForm.value).toEqual(expectedFormValues)
  })

});
