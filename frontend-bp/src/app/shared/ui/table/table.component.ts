import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, input, output, signal } from '@angular/core';
import { TableConfig, TableColumn } from './table.interface';

@Component({
  selector: 'shared-ui-table',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent<T extends Record<string, any>> { // Component for displaying a table with configurable columns and data
  // Inputs
  public readonly data = input.required<T[]>();
  public readonly config = input.required<TableConfig>();

  // Outputs
  public rowClicked = output<T>();
  public sortChanged = output<{ key: string; direction: 'asc' | 'desc' }>();

  // Slot for actions
  @ContentChild('actions') actionsTemplate: any;

  // Sorting state
  public sortedColumn = signal<string | null>(null);
  public sortDirection = signal<'asc' | 'desc'>('asc');

  public handleSort(column: TableColumn): void {
    if (!column.sortable) return;

    if (this.sortedColumn() === column.key) {
      this.sortDirection.update(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortedColumn.set(column.key);
      this.sortDirection.set('asc');
    }

    this.sortChanged.emit({
      key: column.key,
      direction: this.sortDirection()
    });
  }

}
