import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { mockEventList } from './list.types';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ ListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('using mockEventResponse it should render a table with 5 elements', () => {
    component.loading$ = of(false)
    component.list$ = of(mockEventList)
    fixture.detectChanges()
    const rows = fixture.nativeElement.querySelectorAll('[data-test="event-row"]')
    expect(rows.length).toBe(5)
  })
});
