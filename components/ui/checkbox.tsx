"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: string;
  description?: string;
}

function Checkbox({ className, label,description, ...props }: CheckboxProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <CheckboxPrimitive.Root
        className={cn(
          "peer relative flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-2 border-gray-400 transition-all",
          "focus:outline-none focus:ring-2 focus:ring-bg-info focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50 bg-frame",
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white",
          "dark:border-gray-600 dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <CheckIcon className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <div>
      {label && <Label className="leading-none mt-2">{label}</Label>}
      {description && (<p className="text-sm text-muted-foreground mt-1">{description}</p>)}
      </div>
    </label>
  );
}

export { Checkbox };
