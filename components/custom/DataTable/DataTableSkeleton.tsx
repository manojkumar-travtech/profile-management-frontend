"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface DataTableSkeletonProps {
  columnCount?: number;
  rowCount?: number;
  withExtraPadding?: boolean;
  withBorder?: boolean;
  showHeader?: boolean;
}

/**
 * DataTableSkeleton
 * Full-width table skeleton matching DataTable structure
 */
const DataTableSkeleton: React.FC<DataTableSkeletonProps> = ({
  columnCount = 4,
  rowCount = 5,
  withExtraPadding = false,
  withBorder = true,
  showHeader = true,
}) => {
  return (
    <div className={`w-full ${withBorder ? "rounded-sm border" : ""}`}>
      <Table className="w-full table-fixed">
        {showHeader && (
          <TableHeader className="bg-primary-50">
            <TableRow>
              {[...Array(columnCount)].map((_, i) => (
                <TableHead
                  key={`head-${i}`}
                  className={`${withExtraPadding ? "px-6 py-4" : "px-3 py-2"}`}
                >
                  <Skeleton className="h-4 w-3/5 rounded" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}

        <TableBody>
          {[...Array(rowCount)].map((_, rowIndex) => (
            <TableRow key={`skeleton-row-${rowIndex}`}>
              {[...Array(columnCount)].map((_, colIndex) => (
                <TableCell
                  key={`skeleton-cell-${rowIndex}-${colIndex}`}
                  className={`${withExtraPadding ? "px-6 py-4" : "px-3 py-2"}`}
                >
                  <Skeleton
                    className={`h-4 w-full ${
                      withExtraPadding ? "my-2" : "my-1"
                    } rounded`}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTableSkeleton;
