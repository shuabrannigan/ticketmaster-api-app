import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketMasterApiService } from 'src/app/shared/services/api/ticketmaster-api.service';
import { TicketMasterQueryService } from 'src/app/shared/services/other/ticketmaster-query.service';
import { MockTicketQueryService } from '../search/search.component.spec';
import { of } from 'rxjs';
import { mockEventList } from '../list/list.types';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let queryService: TicketMasterQueryService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [SharedModule],
      providers: [{provide: TicketMasterQueryService, useClass: MockTicketQueryService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    queryService = TestBed.inject(TicketMasterQueryService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a input for title', () => {
    component.title = 'default'
    expect(component.title).toBeTruthy()
    expect(component.title).toEqual('default')
  })

  it('should render a span element with title value', () => {
    let expectedValue = 'testing'
    component.title = expectedValue
    fixture.detectChanges()
    const spanElement = fixture.nativeElement.querySelector('[data-test="title"]')
    expect(spanElement instanceof HTMLSpanElement).toBe(true)
    expect(spanElement.innerHTML).toEqual(expectedValue)
  })

  it('should render a button Filter Options', () => {
    const button = fixture.nativeElement.querySelector('[data-test="filter"]')
    expect(button instanceof HTMLButtonElement).toBe(true)
    expect(button.innerText).toEqual('Filter Options')
  })

  it('should search a button Filter Options', () => {
    const button = fixture.nativeElement.querySelector('[data-test="search"]')
    expect(button instanceof HTMLButtonElement).toBe(true)
    expect(button.innerText).toEqual('Search')
  })


  it('should toggle filterState when filter button clicked', () => {
    const filterSpy = spyOn(component, 'toggleFilterState')
    const button = fixture.nativeElement.querySelector('[data-test="filter"]')
    button.click()
    fixture.detectChanges()
    expect(filterSpy).toHaveBeenCalled()
  })

  it('when filter state toggles, toolbar-row should show/hide', () => {
    component.filterState = false
    const toolbarRow = fixture.nativeElement.querySelector('[data-test="filter-controlled"]')
    const button = fixture.nativeElement.querySelector('[data-test="filter"]')
    expect(toolbarRow).toBeFalsy()
    button.click()
    fixture.detectChanges()
    const toolbarRowCheck = fixture.nativeElement.querySelector('[data-test="filter-controlled"]')
    expect(toolbarRowCheck).toBeTruthy()
  })

  it('calling search(), makes a call to getEvents()', () => {
    const service = spyOn(queryService, 'getEvents').and.returnValue(of(mockEventList))
    component.search()
    expect(service).toHaveBeenCalled()
  })
});
