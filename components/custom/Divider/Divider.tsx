import {
  DividerProps,
  DividerSpacing,
  DividerThickness,
  DividerVariant,
} from "./Divider.types";
import { cn } from "@/lib/utils";

// === Style Maps ===
const spacingMap: Record<DividerSpacing, string> = {
  none: "",
  xs: "my-1",
  sm: "my-2",
  md: "my-4",
  lg: "my-6",
  xl: "my-8",
  "2xl": "my-12",
};

const verticalSpacingMap: Record<DividerSpacing, string> = {
  none: "",
  xs: "mx-1",
  sm: "mx-2",
  md: "mx-4",
  lg: "mx-6",
  xl: "mx-8",
  "2xl": "mx-12",
};

const variantMap: Record<DividerVariant, string> = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
};

const thicknessMap: Record<DividerThickness, string> = {
  thin: "border-t",
  normal: "border-t-2",
  thick: "border-t-4",
};

const verticalThicknessMap: Record<DividerThickness, string> = {
  thin: "border-l",
  normal: "border-l-2",
  thick: "border-l-4",
};

const labelPositionMap = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  variant = "solid",
  spacing = "md",
  thickness = "normal",
  color = "gray-200",
  label,
  labelPosition = "center",
  className,
  decorative = true,
  ariaLabel,
}) => {
  const isVertical = orientation === "vertical";

  // Build base classes
  const baseClasses = cn(
    variantMap[variant],
    isVertical
      ? cn(
          verticalThicknessMap[thickness],
          verticalSpacingMap[spacing],
          "h-full",
          "inline-block",
          "align-middle"
        )
      : cn(thicknessMap[thickness], spacingMap[spacing], "w-full"),
    `border-${color}`,
    className
  );

  // If no label, return simple divider
  if (!label) {
    return (
      <hr
        className={baseClasses}
        aria-hidden={decorative}
        aria-label={!decorative ? ariaLabel : undefined}
        role={!decorative ? "separator" : undefined}
        aria-orientation={!decorative ? orientation : undefined}
      />
    );
  }

  // With label (only supported for horizontal)
  if (isVertical) {
    console.warn("Divider: Labels are not supported for vertical orientation");
    return (
      <hr
        className={baseClasses}
        aria-hidden={decorative}
        aria-label={!decorative ? ariaLabel : undefined}
        role={!decorative ? "separator" : undefined}
        aria-orientation={!decorative ? orientation : undefined}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center",
        spacingMap[spacing],
        labelPositionMap[labelPosition]
      )}
      role={!decorative ? "separator" : undefined}
      aria-label={!decorative ? ariaLabel : undefined}
      aria-hidden={decorative}
    >
      {labelPosition !== "left" && (
        <hr
          className={cn(
            "flex-1",
            variantMap[variant],
            thicknessMap[thickness],
            `border-${color}`
          )}
          aria-hidden="true"
        />
      )}

      <span
        className={cn(
          "px-3 text-sm text-gray-500 whitespace-nowrap",
          className
        )}
      >
        {label}
      </span>

      {labelPosition !== "right" && (
        <hr
          className={cn(
            "flex-1",
            variantMap[variant],
            thicknessMap[thickness],
            `border-${color}`
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
export default Divider;
