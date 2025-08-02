export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface TableConfig {
  columns: TableColumn[];
  showHeader?: boolean;
  striped?: boolean;
  hoverable?: boolean;
}
