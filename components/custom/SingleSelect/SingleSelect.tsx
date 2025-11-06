"use client";

import * as React from "react";
import { Path, PathValue } from "react-hook-form";
import { FormFieldOption } from "../Form/Formtypes.types";
import { BaseDropdown } from "../MultiSelect/BaseDropdown";

interface SingleSelectDropdownProps<T> {
  value: PathValue<T, Path<T>> | null | undefined | string;
  onChange: (val: PathValue<T, Path<T>>) => void;
  options: FormFieldOption[];
  placeholder?: string;
  isDisabled?: boolean;
  hasError?: boolean;
  className?: string;
}

const SingleSelectDropdown = <T,>({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  isDisabled,
  hasError,
  className,
}: SingleSelectDropdownProps<T>) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options]);

  const selectedOption = options.find(
    (opt) => String(opt.value) === String(value)
  );

  const handleSelect = (val: string) => {
    const opt = options.find((o) => String(o.value) === val);
    if (opt) {
      onChange(opt.value as PathValue<T, Path<T>>);
      setOpen(false);
    }
  };

  const isSelected = (val: string) => String(value) === val;

  return (
    <BaseDropdown
      open={open}
      onOpenChange={setOpen}
      selectedLabels={selectedOption?.label || ""}
      placeholder={placeholder}
      options={filteredOptions}
      onSelect={handleSelect}
      isSelected={isSelected}
      hasError={hasError}
      isDisabled={isDisabled}
      className={className}
      searchValue={search}
      onSearchChange={setSearch}
    />
  );
};

export default SingleSelectDropdown as <T>(
  props: SingleSelectDropdownProps<T>
) => ReturnType<React.FC<SingleSelectDropdownProps<T>>>;