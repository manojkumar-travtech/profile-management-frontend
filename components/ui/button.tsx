import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-md text-sm font-medium font-['Lato'] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-disabled:pointer-events-none aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary-700 focus:bg-primary-600",
        secondary:
          "bg-primary-50 text-secondary-foreground shadow-xs hover:bg-primary-100 focus:bg-primary-50 border border-primary-100",
        "secondary-gray":
          "bg-white text-gray-700 border border-gray-300 shadow-xs hover:bg-gray-50 focus:bg-white hover:text-gray-900",
        tertiary:
          "bg-gray-100 text-gray-700 hover:bg-primary-50 focus:bg-white border border-transparent",
        "tertiary-gray":
          "bg-white text-gray-700 hover:bg-gray-50 focus:bg-white border border-transparent",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 border border-transparent",
        link: "text-primary underline-offset-4 hover:underline bg-transparent border-transparent p-0 h-auto",
        "link-gray":
          "text-gray-600 underline-offset-4 hover:underline hover:text-gray-900 bg-transparent border-transparent p-0 h-auto",
        destructive:
          "bg-error-600 text-white shadow-md hover:bg-error-700 focus-visible:ring-error-100 border border-error-700",
      },
      size: {
        sm: "h-9 px-3 rounded-md gap-2 text-sm",
        md: "h-10 px-4 rounded-md gap-2 text-sm",
        lg: "h-11 px-5 rounded-md gap-2 text-base",
        xl: "h-12 px-6 rounded-md gap-2 text-base",
        "2xl": "h-14 px-7 rounded-md gap-3 text-lg",
      },
      state: {
        default: "",
        loading: "pointer-events-none relative text-transparent",
        disabled: "",
      },
      isDestructive: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        isDestructive: true,
        className:
          "bg-error-600 text-white hover:bg-error-700 focus:bg-error-600 border-error-700",
      },
      {
        variant: "secondary",
        isDestructive: true,
        className:
          "bg-error-50 text-error-700 hover:bg-error-100 focus:bg-error-50 border-error-300",
      },
      {
        variant: "secondary-gray",
        isDestructive: true,
        className:
          "bg-error-50 text-error-700 hover:bg-error-100 focus:bg-error-50 border-error-300",
      },
      {
        variant: "tertiary",
        isDestructive: true,
        className:
          "bg-error-50 text-error-700 hover:bg-error-100 focus:bg-error-50",
      },
      {
        variant: "tertiary-gray",
        isDestructive: true,
        className:
          "bg-error-50 text-error-700 hover:bg-error-100 focus:bg-error-50",
      },
      {
        variant: "ghost",
        isDestructive: true,
        className: "text-error-700 hover:bg-error-50 hover:text-error-800",
      },
      {
        variant: "link",
        isDestructive: true,
        className: "text-error-700 hover:text-error-800",
      },
      {
        variant: "link-gray",
        isDestructive: true,
        className: "text-error-700 hover:text-error-800",
      },
      // Link size variants
      {
        variant: "link",
        size: "sm",
        className: "text-sm",
      },
      {
        variant: "link",
        size: "md",
        className: "text-sm",
      },
      {
        variant: "link",
        size: "lg",
        className: "text-base",
      },
      {
        variant: "link-gray",
        size: "sm",
        className: "text-sm",
      },
      {
        variant: "link-gray",
        size: "md",
        className: "text-sm",
      },
      {
        variant: "link-gray",
        size: "lg",
        className: "text-base",
      },
      {
        state: "loading",
        className: "transition-none",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      state: "default",
      isDestructive: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isDestructive?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      icon,
      iconPosition = "left",
      children,
      disabled,
      type = "button",
      isDestructive = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const buttonState = isLoading
      ? "loading"
      : disabled
      ? "disabled"
      : "default";

    return (
      <Comp
        type={type}
        data-slot="button"
        data-loading={isLoading ? "true" : undefined}
        data-destructive={isDestructive ? "true" : undefined}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        className={cn(
          buttonVariants({
            variant,
            size,
            state: buttonState,
            isDestructive,
            className,
          })
        )}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === "left" && !isLoading && (
          <span className="flex items-center">{icon}</span>
        )}
        <div className="flex items-center gap-2">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {children}
        </div>

        {icon && iconPosition === "right" && !isLoading && (
          <span className="flex items-center">{icon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
