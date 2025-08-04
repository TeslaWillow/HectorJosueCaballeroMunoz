import { TestBed } from "@angular/core/testing";
import { DropdownItemComponent } from "./dropdown-item.component";

describe('DropdownItemComponent', () => {

  it('should create the component', () => {
    const fixture = TestBed.createComponent(DropdownItemComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should emit itemClick when handleClick is called', () => {
    const fixture = TestBed.createComponent(DropdownItemComponent);
    const component = fixture.componentInstance;
    const spy = jest.spyOn(component.itemClick, 'emit');

    component.handleClick();

    expect(spy).toHaveBeenCalled();
  });

});
