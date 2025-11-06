"use client";

import * as React from "react";
import { MultiSelectDropdownProps } from "./multiSelectTypes.types";
import { BaseDropdown } from "./BaseDropdown";

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  value = [],
  onChange,
  placeholder = "Select...",
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (val: string) => {
    const option = options.find((o) => String(o.value) === val);
    if (!option) return;

    const actualValue = option.value;
    const newValue = value.includes(actualValue)
      ? value.filter((v) => v !== actualValue)
      : [...value, actualValue];
    onChange?.(newValue);
  };

  const selectedLabels = options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label)
    .join(", ");

  const isSelected = (val: string) => {
    const option = options.find((o) => String(o.value) === val);
    return option ? value.includes(option.value) : false;
  };

  return (
    <BaseDropdown
      open={open}
      onOpenChange={setOpen}
      selectedLabels={selectedLabels}
      placeholder={placeholder}
      options={options}
      onSelect={toggleOption}
      isSelected={isSelected}
      className={className}
    />
  );
};

export default MultiSelectDropdown;