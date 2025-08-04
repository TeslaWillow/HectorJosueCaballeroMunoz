import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe('Test on AppComponent', () => {

   let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'frontend-bp'`, () => {
    expect(component.title).toEqual('frontend-bp');
  });

  it('should render a router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

});
