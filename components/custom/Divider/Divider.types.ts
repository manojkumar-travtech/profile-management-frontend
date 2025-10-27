
export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type DividerThickness = "thin" | "normal" | "thick";

export interface DividerProps {
  /**
   * The orientation of the divider
   * @default "horizontal"
   */
  orientation?: DividerOrientation;
  
  /**
   * The visual style of the divider line
   * @default "solid"
   */
  variant?: DividerVariant;
  
  /**
   * Spacing around the divider (margin)
   * @default "md"
   */
  spacing?: DividerSpacing;
  
  /**
   * Thickness of the divider line
   * @default "normal"
   */
  thickness?: DividerThickness;
  
  /**
   * Custom color for the divider
   * @default "gray-200"
   */
  color?: string;
  
  /**
   * Optional label to display in the divider
   */
  label?: React.ReactNode;
  
  /**
   * Position of the label
   * @default "center"
   */
  labelPosition?: "left" | "center" | "right";
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Whether the divider is decorative only (affects accessibility)
   * @default true
   */
  decorative?: boolean;
  
  /**
   * ARIA label for non-decorative dividers
   */
  ariaLabel?: string;
}

export const spacingMap: Record<DividerSpacing, string> = {
  none: "",
  xs: "my-1",
  sm: "my-2",
  md: "my-4",
  lg: "my-6",
  xl: "my-8",
  "2xl": "my-12",
};
