"use client";

import { JSX, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import {
  DataTableProps,
  normalizeColumns,
  SortDirection,
} from "./DataTable.types";
import { Typography } from "../Typography";
import DataTableSkeleton from "./DataTableSkeleton";

/**
 * DataTable with robust multi-level grouping (fixed).
 */
function DataTable<T>({
  columns,
  data,
  groupBy = [],
  globalSearchable = false,
  globalSearchPlaceholder = "Search all columns...",
  columnFilters = false,
  onRowClick,
  emptyMessage = "No results found.",
  withBorder = true,
  withExtraPadding = false,
  isLoading = false,
  renderAboveTable
}: DataTableProps<T> & { groupBy?: (keyof T)[] }) {
  const normalizedColumns = useMemo(() => normalizeColumns(columns), [columns]);

  const [globalSearch, setGlobalSearch] = useState("");
  const [columnSearches, setColumnSearches] = useState<Record<string, string>>(
    {}
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: SortDirection;
  }>({ key: null, direction: null });

  /** --------------------------
   * Derived data (search/filter/sort)
   ---------------------------*/
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Global search
    if (globalSearchable && globalSearch) {
      const lowerSearch = globalSearch.toLowerCase();
      filtered = filtered.filter((row) =>
        columns.some((col) =>
          String(row[col.accessorKey]).toLowerCase().includes(lowerSearch)
        )
      );
    }

    // Column filters
    if (columnFilters && Object.keys(columnSearches).length > 0) {
      filtered = filtered.filter((row) =>
        Object.entries(columnSearches).every(([k, v]) =>
          v
            ? String(row[k as keyof T])
                .toLowerCase()
                .includes(v.toLowerCase())
            : true
        )
      );
    }

    // Sorting
    if (sortConfig.key && sortConfig.direction) {
      const { key, direction } = sortConfig;
      filtered.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
        if (aValue === bValue) return 0;
        const comparison = aValue < bValue ? -1 : 1;
        return direction === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [
    data,
    columns,
    globalSearch,
    globalSearchable,
    columnFilters,
    columnSearches,
    sortConfig,
  ]);

  /** --------------------------
   * Build group tree
   ---------------------------*/
  type GroupNode = {
    groupField?: keyof T;
    groupKey?: string;
    children?: GroupNode[]; // child groups or leaf wrapper nodes
    items?: T[]; // for leaf wrapper nodes
    leafCount: number;
  };

  const buildGroupTree = (
    rows: T[],
    groupKeys: (keyof T)[],
    level = 0
  ): GroupNode[] => {
    if (level >= groupKeys.length) {
      // wrap each row as a leaf wrapper node
      return rows.map((r) => ({ items: [r], leafCount: 1 }));
    }

    const field = groupKeys[level];
    const groups = new Map<string, T[]>();

    rows.forEach((r) => {
      const key = String(r[field] ?? "—");
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(r);
    });

    const nodes: GroupNode[] = [];
    for (const [gKey, groupRows] of groups.entries()) {
      const children = buildGroupTree(groupRows, groupKeys, level + 1);
      const leafCount = children.reduce((s, c) => s + c.leafCount, 0);
      nodes.push({
        groupField: field,
        groupKey: gKey,
        children,
        leafCount,
      });
    }
    return nodes;
  };

  const groupedTree = useMemo(
    () =>
      groupBy && groupBy.length > 0
        ? buildGroupTree(filteredData, groupBy)
        : [],
    [filteredData, groupBy]
  );

  /** --------------------------
   * Render grouped rows via context-based traversal
   *
   * Approach:
   * - Maintain a stack of active group contexts (value, rowSpan, remaining, renderedFlag).
   * - When encountering a leaf wrapper node, render one table row:
   *   - For each context at which renderedFlag is false, render the group cell (rowSpan) and mark renderedFlag true.
   *   - After rendering the row, decrement remaining for every context; when remaining hits 0, remove context.
   * - This guarantees group cell is rendered exactly once (at the first leaf row) and removed after covering rowSpan rows.
   ---------------------------*/
  type GroupContext = {
    value: string;
    rowSpan: number;
    remaining: number;
    rendered: boolean;
  };

  const buildGroupedRowsJSX = (rootNodes: GroupNode[]) => {
    const rows: JSX.Element[] = [];
    const contexts: GroupContext[] = [];

    const traverse = (node: GroupNode) => {
      if (node.items) {
        // leaf wrapper: produce a row for this data item
        const dataRow = node.items[0];
        const cells: JSX.Element[] = [];

        // render group cells for contexts (only those not yet rendered)
        contexts.forEach((ctx, level) => {
          if (!ctx.rendered) {
            cells.push(
              <TableCell
                key={`group-${level}-${rows.length}`}
                rowSpan={ctx.rowSpan}
                className={`align-middle text-center ${
                  withExtraPadding ? "px-6 py-4" : "px-3 py-2"
                }`}
              >
                <Typography size="sm" weight="bold">
                  {ctx.value}
                </Typography>
              </TableCell>
            );
            ctx.rendered = true;
          }
        });

        // render non-group columns (preserve original column order minus grouped columns)
        const remainingColumns = columns.filter(
          (c) => !groupBy.includes(c.accessorKey)
        );
        remainingColumns.forEach((col, ci) => {
          const value = dataRow[col.accessorKey];
          const display = col.cell
            ? col.cell({ value, row: dataRow })
            : String(value ?? "");
          cells.push(
            <TableCell
              key={`data-${rows.length}-${ci}`}
              className={`align-middle ${
                withExtraPadding ? "px-6 py-4" : "px-3 py-2"
              }`}
            >
              <Typography size="sm" weight="regular">
                {display}
              </Typography>
            </TableCell>
          );
        });

        rows.push(
          <TableRow
            key={`row-${rows.length}-${JSON.stringify(dataRow).slice(0, 50)}`}
            onClick={() => onRowClick?.(dataRow)}
            className={onRowClick ? "cursor-pointer" : ""}
          >
            {cells}
          </TableRow>
        );

        // after rendering row, decrement remaining for each context and remove exhausted contexts
        for (let i = contexts.length - 1; i >= 0; i--) {
          contexts[i].remaining -= 1;
          if (contexts[i].remaining <= 0) {
            contexts.splice(i, 1);
          }
        }

        return;
      }

      // group node: push context, traverse children, then ensure context removed
      const ctx: GroupContext = {
        value: String(node.groupKey ?? ""),
        rowSpan: node.leafCount,
        remaining: node.leafCount,
        rendered: false,
      };
      contexts.push(ctx);

      if (node.children) {
        for (const child of node.children) {
          traverse(child);
        }
      }

      // in case something left the context (should be removed already), ensure contexts clean
      if (contexts.length && contexts[contexts.length - 1] === ctx) {
        // If node had 0 children, or something else, remove safely
        contexts.pop();
      }
    };

    for (const root of rootNodes) traverse(root);

    return rows;
  };

  /** --------------------------
   * Handlers & helpers
   ---------------------------*/
  const handleSort = (key: keyof T) => {
    setSortConfig((current) => {
      if (current.key !== key) return { key, direction: "asc" };
      if (current.direction === "asc") return { key, direction: "desc" };
      return { key: null, direction: null };
    });
  };

  const handleColumnSearch = (key: string, value: string) => {
    setColumnSearches((prev) => {
      const next = { ...prev };
      if (value) next[key] = value;
      else delete next[key];
      return next;
    });
  };

  const clearAllFilters = () => {
    setGlobalSearch("");
    setColumnSearches({});
  };

  const getSortIcon = (key: keyof T) => {
    if (sortConfig.key !== key)
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  /** --------------------------
   * Render component
   ---------------------------*/
  return (
    <div className="space-y-4">
      {/* Global Search */}
      {globalSearchable && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={globalSearchPlaceholder}
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      )}
      {renderAboveTable}
      <div className={withBorder ? "rounded-sm border" : ""}>
        <Table>
          <TableHeader className="bg-primary-50">
            <TableRow>
              {normalizedColumns.map((col) => (
                <TableHead
                  key={String(col.accessorKey)}
                  className={withExtraPadding ? "px-6 py-4" : "px-3 py-2"}
                >
                  {col.sortable !== false ? (
                    <button
                      onClick={() => handleSort(col.accessorKey)}
                      className="flex items-center space-x-2"
                    >
                      <Typography size="md" weight="bold">
                        {col.header}
                      </Typography>
                      {getSortIcon(col.accessorKey)}
                    </button>
                  ) : (
                    <Typography size="md" weight="bold">
                      {col.header}
                    </Typography>
                  )}
                </TableHead>
              ))}
            </TableRow>

            {columnFilters && (
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={`filter-${String(col.accessorKey)}`}>
                    {col.searchable === false ? null : (
                      <Input
                        placeholder={`Search ${col.header}`}
                        value={columnSearches[String(col.accessorKey)] || ""}
                        onChange={(e) =>
                          handleColumnSearch(
                            String(col.accessorKey),
                            e.target.value
                          )
                        }
                        className="h-8 text-xs"
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            )}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <DataTableSkeleton
                columnCount={columns?.length || 5}
                withExtraPadding={withExtraPadding}
                withBorder={false}
                showHeader={false}
              />
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Typography size="sm" weight="medium">
                      {emptyMessage}
                    </Typography>
                    {(globalSearch ||
                      Object.keys(columnSearches).length > 0) && (
                      <Button
                        variant="link"
                        onClick={clearAllFilters}
                        className="mt-2"
                      >
                        <Typography size="sm" className="text-blue-600">
                          Clear search
                        </Typography>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : groupBy && groupBy.length > 0 ? (
              buildGroupedRowsJSX(groupedTree)
            ) : (
              filteredData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? "cursor-pointer" : ""}
                >
                  {columns.map((col, colIndex) => {
                    const value = row[col.accessorKey];
                    const displayValue = col.cell
                      ? col.cell({ value, row, index: rowIndex })
                      : String(value ?? "");
                    return (
                      <TableCell
                        key={colIndex}
                        className={`align-middle ${
                          withExtraPadding ? "px-6 py-4" : "px-3 py-2"
                        }`}
                      >
                        <Typography size="sm" weight="regular">
                          {displayValue}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* {filteredData.length > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <Typography size="sm" weight="regular">
            Showing {filteredData.length} of {data.length} entries
          </Typography>
        </div>
      )} */}
    </div>
  );
}

export default DataTable;
