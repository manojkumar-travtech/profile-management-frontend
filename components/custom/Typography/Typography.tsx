import React from "react";

type TypographyElement =
  | "span"
  | "div"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "strong"
  | "em"
  | "small"
  | "mark"
  | "del"
  | "ins"
  | "sub"
  | "sup";

type TypographyProps = {
  children: React.ReactNode;
  variant?: "display" | "text";
  size?: "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
  weight?: "regular" | "medium" | "semibold" | "bold";
  color?: string;
  className?: string;
  as?: TypographyElement;
  responsive?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "text",
  size = "md",
  weight = "regular",
  color,
  className = "",
  as = "span",
  responsive = true,
  ...rest
}) => {
  const Component: React.ElementType = as;

  const fontSizeVar =
    variant === "display" ? `--text-display-${size}` : `--text-${size}`;
  const letterSpacingVar =
    variant === "display"
      ? `--text-display-${size}--letter-spacing`
      : undefined;

  const weightVar = `--font-weight-${weight}`;

  const getResponsiveClasses = () => {
    if (!responsive) return "";
    
    const sizeMap = {
      "2xl": "text-2xl sm:text-xl md:text-2xl",
      "xl": "text-xl sm:text-lg md:text-xl", 
      "lg": "text-lg sm:text-base md:text-lg",
      "md": "text-base sm:text-sm md:text-base",
      "sm": "text-sm sm:text-xs md:text-sm",
      "xs": "text-xs"
    };

    const displaySizeMap = {
      "2xl": "text-6xl sm:text-4xl md:text-5xl lg:text-6xl",
      "xl": "text-5xl sm:text-3xl md:text-4xl lg:text-5xl",
      "lg": "text-4xl sm:text-2xl md:text-3xl lg:text-4xl", 
      "md": "text-3xl sm:text-xl md:text-2xl lg:text-3xl",
      "sm": "text-2xl sm:text-lg md:text-xl lg:text-2xl",
      "xs": "text-xl sm:text-base md:text-lg lg:text-xl"
    };

    return variant === "display" ? displaySizeMap[size] : sizeMap[size];
  };

  return (
    <Component
      className={`font-['lato'] ${getResponsiveClasses()} ${className}`}
      style={{
        fontSize: responsive ? undefined : `var(${fontSizeVar}, inherit)`,
        letterSpacing: letterSpacingVar
          ? `var(${letterSpacingVar}, normal)`
          : undefined,
        fontWeight: `var(${weightVar}, 400)`,
        color,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Typography