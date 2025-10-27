export type SortDirection = "asc" | "desc" | null;

export interface DataTableColumn<T> {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
  searchable?: boolean;
  cell?: (params: {
    value: T[keyof T];
    row: T;
    index?: number;
  }) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  globalSearchable?: boolean;
  globalSearchPlaceholder?: string;
  columnFilters?: boolean;
  groupBy?: (keyof T)[];
  emptyMessage?: string;
  withBorder?: boolean;
  withExtraPadding?: boolean;
  isLoading?: boolean;
}

export const createDataTableColumns = <T>(
  column: Partial<DataTableColumn<T>> &
    Pick<DataTableColumn<T>, "header" | "accessorKey">
): DataTableColumn<T> => ({
  sortable: false,
  searchable: false,
  ...column,
});

export function normalizeColumns<T>(columns: DataTableColumn<T>[]) {
  return columns.map((col) => ({
    sortable: false,
    searchable: false,
    ...col,
  }));
}
