"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SwitchFieldProps {
  label?: string;
  labelPosition?: "left" | "right";
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  required?: boolean;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  labelPosition = "right",
  checked = false,
  disabled = false,
  onChange,
  required,
}) => {
  return (
    <div className="flex items-center gap-2">
      {label && labelPosition === "left" && (
        <Label
          className={cn("text-sm", disabled && "opacity-50")}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
      />

      {label && labelPosition === "right" && (
        <Label
          className={cn("text-sm", disabled && "opacity-50")}
        >
          {label}
        </Label>
      )}
    </div>
  );
};

export default SwitchField;