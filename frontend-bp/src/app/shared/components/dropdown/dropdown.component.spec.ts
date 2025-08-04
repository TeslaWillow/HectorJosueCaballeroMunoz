import { TestBed } from "@angular/core/testing";
import { DropdownComponent } from "./dropdown.component";

describe('Test on DropdownComponent', () => {

  it('should create the component', () => {
    const fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should toggle isDropdownOpen when toggleDropdown is called', () => {
    const fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;
    expect(component.isDropdownOpen()).toBe(false);
    component.toggleDropdown();
    expect(component.isDropdownOpen()).toBe(true);
    component.toggleDropdown();
    expect(component.isDropdownOpen()).toBe(false);
  });

  it('should close dropdown when closeDropdown is called', () => {
    const fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;
    component.toggleDropdown(); // open first
    expect(component.isDropdownOpen()).toBe(true);
    component.closeDropdown();
    expect(component.isDropdownOpen()).toBe(false);
  });

  it('should emit onItemSelected and close dropdown on handleItemClick', () => {
    const fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;
    const spy = jest.spyOn(component.onItemSelected, 'emit');
    component.toggleDropdown(); // open first
    expect(component.isDropdownOpen()).toBe(true);
    component.handleItemClick('edit');
    expect(spy).toHaveBeenCalledWith('edit');
    expect(component.isDropdownOpen()).toBe(false);
  });

});
