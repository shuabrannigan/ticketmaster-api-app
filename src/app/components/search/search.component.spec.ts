import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { TicketMasterApiSearchTerm } from './search.types';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketMasterQueryService } from 'src/app/shared/services/other/ticketmaster-query.service';
import { of } from 'rxjs';
import { mockEventList } from '../list/list.types';

class MockTicketQueryService {
  getEvents() {
    return of(mockEventList)
  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let queryService: TicketMasterQueryService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ SearchComponent ],
      providers: [{provide: TicketMasterQueryService, useClass: MockTicketQueryService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    queryService = TestBed.inject(TicketMasterQueryService)
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

  describe('Search Button', () => {
    it('should render button', () => {
      const button = fixture.nativeElement.querySelector('[data-test="searchButton"]')
      expect(button instanceof HTMLButtonElement).toBe(true)
      expect(button.innerText).toEqual('Search')
    })

    it('click event should call search() method', () => {
      const searchSpy = spyOn(component, 'search')
      const button = fixture.nativeElement.querySelector('[data-test="searchButton"]')
      button.click()
      expect(searchSpy).toHaveBeenCalled()
    })
  })

  describe('City Input', () => {
    it('should render input', () => {
      const input = fixture.nativeElement.querySelector('[data-test="cityInput"]')
      expect(input instanceof HTMLInputElement).toBe(true)
    })

    it('when formControl city updates, value of input should update', () => {
      const expectedValue = 'Adelaide'
      component.searchForm.patchValue({city: expectedValue})
      const input = fixture.nativeElement.querySelector('[data-test="cityInput"]')
      expect(input.value).toEqual(expectedValue)   
    })
  })

  describe('StartDateTime Input', () => {
    it('should render input', () => {
      const input = fixture.nativeElement.querySelector('[data-test="startDateInput"]')
      expect(input instanceof HTMLInputElement).toBe(true)
    })

    it('when formControl startDateTime updates, value of input should update', () => {
      const date = new Date('2023-04-04').toISOString()
      component.searchForm.patchValue({startDateTime: date})
      const input = fixture.nativeElement.querySelector('[data-test="startDateInput"]')
      const expectedValue = '4/4/2023'
      expect(input.value).toEqual(expectedValue)

      
    })
  })

  describe('endDateTime Input', () => {
    it('should render input', () => {
      const input = fixture.nativeElement.querySelector('[data-test="endDateInput"]')
      expect(input instanceof HTMLInputElement).toBe(true)
    })

    it('when formControl endDateTime updates, value of input should update', () => {
      const date = new Date('2023-04-04').toISOString()
      component.searchForm.patchValue({endDateTime: date})
      const input = fixture.nativeElement.querySelector('[data-test="endDateInput"]')
      const expectedValue = '4/4/2023'
      expect(input.value).toEqual(expectedValue)

      
    })
  })

  it('calling search(), calls getEvents method on TicketMasterQueryService', () => {
    const service = spyOn(queryService, 'getEvents')
    component.search()
    expect(service).toHaveBeenCalled()
  })

  it('calling clear(), resets the searchForm', () => {
    const defaultValue = {city: '', startDateTime: '', endDateTime: ''}
    const updatedValue = {...defaultValue, city: 'Adelaide'}
    component.searchForm.patchValue(updatedValue)
    expect(component.searchForm.value).toEqual(updatedValue)
    component.clear()
    expect(component.searchForm.value).toEqual(defaultValue)
  })
});
