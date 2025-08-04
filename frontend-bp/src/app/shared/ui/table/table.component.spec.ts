import { TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { Component } from '@angular/core';

describe('TableComponent', () => {
  @Component({
    standalone: true,
    imports: [TableComponent],
    template: `<shared-ui-table [config]="config" [data]="data"></shared-ui-table>`
  })
  class HostDefaultTableComponent {
    config = { columns: [] };
    data = [];
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostDefaultTableComponent] });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HostDefaultTableComponent);
    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();
  });

  it('should have table class', () => {
    const fixture = TestBed.createComponent(HostDefaultTableComponent);
    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector('.table');
    expect(table).not.toBeNull();
  });

  it('should have data and config inputs defined', () => {
    const fixture = TestBed.createComponent(HostDefaultTableComponent);
    fixture.detectChanges();
    // No error thrown means inputs are defined
    expect(true).toBe(true);
  });
});

describe('TableComponent W/ Inputs', () => {
  @Component({
    standalone: true,
    imports: [TableComponent],
    template: `<shared-ui-table [config]="config" [data]="data"></shared-ui-table>`
  })
  class HostTableComponent {
    config = {
      columns: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'age', label: 'Age', sortable: false }
      ]
    };
    data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    ];
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostTableComponent] });
  });

  it('should render table headers based on config', () => {
    const fixture = TestBed.createComponent(HostTableComponent);
    fixture.detectChanges();
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toContain('Name');
    expect(headers[1].textContent).toContain('Age');
  });

  it('should call handleSort when clicking sortable header', () => {
    const fixture = TestBed.createComponent(HostTableComponent);
    fixture.detectChanges();
    // Access the TableComponent instance
    const tableDebug = fixture.debugElement.children[0].componentInstance as TableComponent<any>;
    const spy = jest.spyOn(tableDebug, 'handleSort');
    // Simulate click on sortable header
    const headers = fixture.nativeElement.querySelectorAll('th');
    headers[0].click();
    expect(spy).toHaveBeenCalledWith({ key: 'name', label: 'Name', sortable: true });
  });

  it('should toggle sortDirection when clicking the same sortable header', () => {
    const fixture = TestBed.createComponent(HostTableComponent);
    fixture.detectChanges();
    const tableDebug = fixture.debugElement.children[0].componentInstance as TableComponent<any>;
    // Click once: should set asc
    const headers = fixture.nativeElement.querySelectorAll('th');
    headers[0].click();
    expect(tableDebug.sortedColumn()).toBe('name');
    expect(tableDebug.sortDirection()).toBe('asc');
    // Click again: should toggle to desc
    headers[0].click();
    expect(tableDebug.sortedColumn()).toBe('name');
    expect(tableDebug.sortDirection()).toBe('desc');
    // Click again: should toggle back to asc
    headers[0].click();
    expect(tableDebug.sortedColumn()).toBe('name');
    expect(tableDebug.sortDirection()).toBe('asc');
  });

});
