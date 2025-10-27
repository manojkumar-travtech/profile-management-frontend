export type GridResponsiveValue = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  "2xl"?: number;
};
export type GridAutoFlow =
  | "row"
  | "column"
  | "dense"
  | "row dense"
  | "column dense";

interface GridCommonProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}
export interface GridProps extends GridCommonProps {
  cols?: number | GridResponsiveValue;
  gap?: number | GridResponsiveValue;
  rowGap?: number;
  colGap?: number;
  autoRows?: string;
  autoFlow?: GridAutoFlow;
}

export interface GridItemProps extends GridCommonProps {
  colSpan?: number | GridResponsiveValue;
  rowSpan?: number | GridResponsiveValue;
  colStart?: number;
  colEnd?: number;
  rowStart?: number;
  rowEnd?: number;
}
