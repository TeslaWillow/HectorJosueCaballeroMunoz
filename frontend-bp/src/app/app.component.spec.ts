import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe('Test on AppComponent', () => {

  it('should create the app', () => {
    const app = new AppComponent();
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend-bp'`, () => {
    const app = new AppComponent();
    expect(app.title).toEqual('frontend-bp');
  });

  it('should render a router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

});
