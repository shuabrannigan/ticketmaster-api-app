import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToolbarComponent} from './components/toolbar/toolbar.component'
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let appComponent: AppComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, SharedModule
      ],
      declarations: [
        AppComponent, ToolbarComponent
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
});
