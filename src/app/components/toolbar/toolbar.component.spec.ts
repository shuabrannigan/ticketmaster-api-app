import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [SharedModule]
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
    expect(button.innerText).toEqual('Filter Options')
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
});
