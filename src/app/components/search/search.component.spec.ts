import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { TicketMasterApiSearchTerm } from './search.types';
import { SharedModule } from 'src/app/shared/shared.module';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
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
      
    })
  })


});
