import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { InputComponent } from "./input.component";

describe('InputComponent', () => {
  it('should create the component', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    expect(component.type()).toBe('text');
    expect(component.placeholder()).toBe('');
    expect(component.disabled()).toBe(false);
    expect(component.readonly()).toBe(false);
    expect(component.value()).toBe('');
  });

  it('should call onTouched when handleBlur is called and not disabled', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    const spy = jest.fn();
    component.onTouched = spy;
    component.handleBlur();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call onTouched when handleBlur is called and disabled', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    const spy = jest.fn();
    component.onTouched = spy;
    // Simulate disabled
    Object.defineProperty(component, 'isDisabled', { get: () => true });
    component.handleBlur();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update value, call onChange and onTouched when handleInput is called and not disabled', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    const onChangeSpy = jest.fn();
    const onTouchedSpy = jest.fn();
    component.onChange = onChangeSpy;
    component.onTouched = onTouchedSpy;
    // Create a fake input event
    const event = { target: { value: 'new value' } } as any;
    component.handleInput(event);
    // Check value is updated
    expect(component.value()).toBe('new value');
    // Check onChange and onTouched are called
    expect(onChangeSpy).toHaveBeenCalledWith('new value');
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should not update value or call onChange/onTouched when handleInput is called and disabled', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    const onChangeSpy = jest.fn();
    const onTouchedSpy = jest.fn();
    component.onChange = onChangeSpy;
    component.onTouched = onTouchedSpy;
    // Simulate disabled
    Object.defineProperty(component, 'isDisabled', { get: () => true });
    // Create a fake input event
    const event = { target: { value: 'should not set' } } as any;
    component.handleInput(event);
    // Value should not change from default
    expect(component.value()).toBe('');
    // onChange and onTouched should not be called
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(onTouchedSpy).not.toHaveBeenCalled();
  });

  it('should set _isDisabledByForm to true when setDisabledState(true) is called', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    // Spy on markForCheck to ensure change detection is triggered
    const cdSpy = jest.spyOn((component as any)._cdRef, 'markForCheck');
    component.setDisabledState(true);
    // The internal signal should be true
    expect((component as any)._isDisabledByForm()).toBe(true);
    // markForCheck should be called
    expect(cdSpy).toHaveBeenCalled();
  });

  it('should set _isDisabledByForm to false when setDisabledState(false) is called', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    // Spy on markForCheck to ensure change detection is triggered
    const cdSpy = jest.spyOn((component as any)._cdRef, 'markForCheck');
    component.setDisabledState(false);
    // The internal signal should be false
    expect((component as any)._isDisabledByForm()).toBe(false);
    // markForCheck should be called
    expect(cdSpy).toHaveBeenCalled();
  });

  it('should return { required: true } when required is true and value is empty', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    // Set required to true
    (component as any).required = () => true;
    // Simulate empty value
    const control = { value: '' } as any;
    const result = component.validate(control);
    expect(result).toEqual({ required: true });
  });

  it('should return null when required is false and value is empty', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    // Set required to false
    (component as any).required = () => false;
    // Simulate empty value
    const control = { value: '' } as any;
    const result = component.validate(control);
    expect(result).toBeNull();
  });

  it('should return null when required is true and value is not empty', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    // Set required to true
    (component as any).required = () => true;
    // Simulate non-empty value
    const control = { value: 'something' } as any;
    const result = component.validate(control);
    expect(result).toBeNull();
  });

});

describe('InputComponent Host', () => {
  @Component({
    standalone: true,
    imports: [InputComponent],
    template: `<shared-component-input [type]="'textarea'"></shared-component-input>`
  })
  class HostInputTextareaComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostInputTextareaComponent] });
  });

  it('should render textarea when type is textarea', () => {
    const fixture = TestBed.createComponent(HostInputTextareaComponent);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea).toBeTruthy();
  });
});
