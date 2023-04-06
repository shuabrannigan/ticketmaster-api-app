import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToolbarComponent} from './components/toolbar/toolbar.component'
import { SharedModule } from './shared/shared.module';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let appComponent: AppComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, SharedModule
      ],
      declarations: [
        AppComponent, ToolbarComponent, SearchComponent, ListComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
  })

  it('should create the app', () => {

    expect(appComponent).toBeTruthy();
  });

  
  it('should render app-toolbar', () => {
    const toolbar = fixture.nativeElement.querySelector('app-toolbar')
    expect(toolbar).toBeTruthy()
  })

  it('should click Filter Options button and render app-search', () => {

    /**
     * click button to make element visible
     */
    let button = fixture.nativeElement.querySelector('[data-test="filter"]')
    button.click()
    fixture.detectChanges()

    let search = fixture.nativeElement.querySelector('[data-test="search-component"]')
    expect(search).toBeTruthy()
  })

  it('should render app-list', () => {
    const list = fixture.nativeElement.querySelector('app-list')
    expect(list).toBeTruthy()

  })


});
