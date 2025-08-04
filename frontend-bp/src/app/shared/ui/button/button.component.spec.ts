import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { Component } from '@angular/core';

function createHostComponent(template: string) {
  @Component({ standalone: true, imports: [ButtonComponent], template })
  class TestHostComponent {}
  return TestHostComponent;
}

describe('ButtonComponent', () => {
  let component: ButtonComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent]
    });
    const fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event when clicked', () => {
    const spy = jest.spyOn(component.click, 'emit');
    component.click.emit(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should render button with primary variant by default', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('button--primary')).toBe(true);
  });
});

describe('ButtonComponent Host', () => {
  it('should render text inside the button', () => {
    const Host = createHostComponent(`<shared-ui-button>Click Me</shared-ui-button>`);
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Click Me');
  });

  it('should render button with ghost variant', () => {
    const Host = createHostComponent(`<shared-ui-button [variant]="'ghost'">Ghost</shared-ui-button>`);
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('button--ghost')).toBe(true);
  });

  it('should render button as block', () => {
    const Host = createHostComponent(`<shared-ui-button [block]="true">Block</shared-ui-button>`);
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('button--block')).toBe(true);
  });

  it('should not emit click event when disabled', () => {
    @Component({
      standalone: true,
      imports: [ButtonComponent],
      template: `<shared-ui-button [disabled]="true" (click)="onClick($event)">Test</shared-ui-button>`
    })
    class HostWithOnClick {
      onClick = jest.fn();
    }
    TestBed.configureTestingModule({ imports: [HostWithOnClick] });
    const fixture = TestBed.createComponent(HostWithOnClick);
    const hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    // Simulate click on the button
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    // Verify that onClick was not called
    expect(hostComponent.onClick).not.toHaveBeenCalled();
  });

});

describe('ButtonComponent handleClick', () => {
  @Component({
    standalone: true,
    imports: [ButtonComponent],
    template: `<shared-ui-button [disabled]="disabled" [loading]="loading" (click)="onBtnClick($event)">Test</shared-ui-button>`
  })
  class HostHandleClickComponent {
    disabled = false;
    loading = false;
    onBtnClick = jest.fn();
  }

  function getButtonAndComponent(disabled: boolean, loading: boolean) {
    TestBed.configureTestingModule({ imports: [HostHandleClickComponent] });
    const fixture = TestBed.createComponent(HostHandleClickComponent);
    const host = fixture.componentInstance;
    host.disabled = disabled;
    host.loading = loading;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('shared-ui-button');
    const buttonComponent = fixture.debugElement.children[0].componentInstance as ButtonComponent;
    return { fixture, host, button, buttonComponent };
  }

  it('should not emit click event in handleClick when disabled', () => {
    const { buttonComponent, host } = getButtonAndComponent(true, false);
    const spy = jest.spyOn(buttonComponent.click, 'emit');
    buttonComponent.handleClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
    expect(host.onBtnClick).not.toHaveBeenCalled();
  });

  it('should not emit click event in handleClick when loading', () => {
    const { buttonComponent, host } = getButtonAndComponent(false, true);
    const spy = jest.spyOn(buttonComponent.click, 'emit');
    buttonComponent.handleClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
    expect(host.onBtnClick).not.toHaveBeenCalled();
  });

  it('should emit click event in handleClick when enabled and not loading', () => {
    const { buttonComponent, host } = getButtonAndComponent(false, false);
    const spy = jest.spyOn(buttonComponent.click, 'emit');
    buttonComponent.handleClick(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });
});
