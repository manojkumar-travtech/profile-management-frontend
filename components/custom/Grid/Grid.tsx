import React from "react";
import { GridItemProps, GridProps } from "./grid.types";
import {
  getAutoFlowClass,
  getAutoRowsClass,
  getColsClasses,
  getColSpanClasses,
  getGapClasses,
  getRowSpanClasses,
} from "./gridHelpers";

export const Grid: React.FC<GridProps> = ({
  children,
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4, "2xl": 4 },
  gap,
  rowGap,
  colGap,
  className = "",
  as: Component = "div",
  autoRows,
  autoFlow,
}) => {
  const gridClasses = [
    "grid",
    getColsClasses(cols),
    getGapClasses(gap, colGap, rowGap),
    getAutoRowsClass(autoRows),
    getAutoFlowClass(autoFlow),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={gridClasses}>{children}</Component>;
};

export const GridItem: React.FC<GridItemProps> = ({
  children,
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  className = "",
  as: Component = "div",
}) => {
  const itemClasses = [
    getColSpanClasses(colSpan),
    getRowSpanClasses(rowSpan),
    colStart && `col-start-${colStart}`,
    colEnd && `col-end-${colEnd}`,
    rowStart && `row-start-${rowStart}`,
    rowEnd && `row-end-${rowEnd}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={itemClasses}>{children}</Component>;
};
