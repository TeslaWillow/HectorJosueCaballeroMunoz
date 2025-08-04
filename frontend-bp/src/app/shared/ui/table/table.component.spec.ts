import { TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent<{}>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableComponent]
    });
    const fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
