import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
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
    expect(button.innerHTML).toEqual('Filter Options')
  })

  it('should toggle filterState when filter button clicked', () => {
    const filterSpy = spyOn(component, 'toggleFilterState')
    const button = fixture.nativeElement.querySelector('[data-test="filter"]')
    button.click()
    fixture.detectChanges()
    expect(filterSpy).toHaveBeenCalled()
  })
});
