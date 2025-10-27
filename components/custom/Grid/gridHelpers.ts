import { GridAutoFlow, GridResponsiveValue } from "./grid.types";
type gridResponsiveType = GridResponsiveValue | number | undefined;

export const getColsClasses = (cols: GridResponsiveValue | number) => {
  const classes: string[] = [];

  if (typeof cols === "number") {
    classes.push(`grid-cols-${cols}`);
  } else {
    if (cols.xs) classes.push(`grid-cols-${cols.xs}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols["2xl"]) classes.push(`2xl:grid-cols-${cols["2xl"]}`);
  }

  return classes.join(" ");
};

export const getGapClasses = (
  gap: gridResponsiveType,
  colGap: number | undefined,
  rowGap: number | undefined
) => {
  const classes: string[] = [];

  if (typeof gap === "number") {
    classes.push(`gap-${gap}`);
  } else if (gap) {
    if (gap.xs !== undefined) classes.push(`gap-${gap.xs}`);
    if (gap.sm !== undefined) classes.push(`sm:gap-${gap.sm}`);
    if (gap.md !== undefined) classes.push(`md:gap-${gap.md}`);
    if (gap.lg !== undefined) classes.push(`lg:gap-${gap.lg}`);
    if (gap.xl !== undefined) classes.push(`xl:gap-${gap.xl}`);
    if (gap["2xl"] !== undefined) classes.push(`2xl:gap-${gap["2xl"]}`);
  }

  if (rowGap !== undefined) classes.push(`gap-y-${rowGap}`);
  if (colGap !== undefined) classes.push(`gap-x-${colGap}`);

  return classes.join(" ");
};

export const getAutoRowsClass = (autoRows?: string) => {
  if (!autoRows) return "";
  return `auto-rows-${autoRows}`;
};

export const getAutoFlowClass = (autoFlow?: GridAutoFlow) => {
  if (!autoFlow) return "";
  return `grid-flow-${autoFlow.replace(" ", "-")}`;
};

export const getColSpanClasses = (colSpan: gridResponsiveType) => {
  const classes: string[] = [];

  if (typeof colSpan === "number") {
    classes.push(`col-span-${colSpan}`);
  } else if (colSpan) {
    if (colSpan.xs) classes.push(`col-span-${colSpan.xs}`);
    if (colSpan.sm) classes.push(`sm:col-span-${colSpan.sm}`);
    if (colSpan.md) classes.push(`md:col-span-${colSpan.md}`);
    if (colSpan.lg) classes.push(`lg:col-span-${colSpan.lg}`);
    if (colSpan.xl) classes.push(`xl:col-span-${colSpan.xl}`);
    if (colSpan["2xl"]) classes.push(`2xl:col-span-${colSpan["2xl"]}`);
  }

  return classes.join(" ");
};

export const getRowSpanClasses = (rowSpan: gridResponsiveType) => {
  const classes: string[] = [];

  if (typeof rowSpan === "number") {
    classes.push(`row-span-${rowSpan}`);
  } else if (rowSpan) {
    if (rowSpan.xs) classes.push(`row-span-${rowSpan.xs}`);
    if (rowSpan.sm) classes.push(`sm:row-span-${rowSpan.sm}`);
    if (rowSpan.md) classes.push(`md:row-span-${rowSpan.md}`);
    if (rowSpan.lg) classes.push(`lg:row-span-${rowSpan.lg}`);
    if (rowSpan.xl) classes.push(`xl:row-span-${rowSpan.xl}`);
    if (rowSpan["2xl"]) classes.push(`2xl:row-span-${rowSpan["2xl"]}`);
  }

  return classes.join(" ");
};
