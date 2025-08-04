import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ModalComponent } from "./modal.component";

describe('ModalComponent', () => {
  it('should create the component', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call close when handleEscapeKey is called and isOpen is true', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;
    // Set isOpen to true
    (component as any).isOpen = () => true;
    const closeSpy = jest.spyOn(component, 'close');
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.handleEscapeKey(event);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not call close when handleEscapeKey is called and isOpen is false', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;
    // Set isOpen to false
    (component as any).isOpen = () => false;
    const closeSpy = jest.spyOn(component, 'close');
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.handleEscapeKey(event);
    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('should emit closed when close is called', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;
    const closedSpy = jest.spyOn(component.closed, 'emit');
    component.close();
    expect(closedSpy).toHaveBeenCalled();
  });
});

describe('ModalComponent Host', () => {
  @Component({
    standalone: true,
    imports: [ModalComponent],
    template: `<shared-component-modal [isOpen]="true" [title]="'My Modal Title'"></shared-component-modal>`
  })
  class HostModalComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostModalComponent] });
  });

  it('should render the title when title input is provided', () => {
    const fixture = TestBed.createComponent(HostModalComponent);
    fixture.detectChanges();
    // Query for the title using the data-testid attribute for reliability
    const title = fixture.nativeElement.querySelector('[data-testid="modal-title"]');
    expect(title).not.toBeNull(); // Ensure the element exists
    expect(title?.textContent).toContain('My Modal Title');
  });
});
