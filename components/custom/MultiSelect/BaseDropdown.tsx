"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormFieldOption } from "../Form/Formtypes.types";

interface BaseDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLabels: string;
  placeholder: string;
  options: FormFieldOption[];
  onSelect: (value: string) => void;
  isSelected: (value: string) => boolean;
  hasError?: boolean;
  isDisabled?: boolean;
  className?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const BaseDropdown: React.FC<BaseDropdownProps> = ({
  open,
  onOpenChange,
  selectedLabels,
  placeholder,
  options,
  onSelect,
  isSelected,
  hasError,
  isDisabled,
  className,
  searchValue,
  onSearchChange,
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-10 flex w-full min-w-0 items-center justify-between bg-white border border-[#D0D5DD] rounded px-4 py-2 text-[16px] font-normal text-[#344054] shadow-xs outline-none font-['Lato'] cursor-pointer transition-[color,box-shadow]",
            "focus-visible:border-primary-50 focus-visible:ring-primary-50 focus-visible:ring-[3px]",
            "aria-invalid:border-error-500 dark:aria-invalid:border-error-200 disabled:pointer-events-none disabled:opacity-50",
            hasError && "border-error-500",
            isDisabled && "pointer-events-none opacity-50",
            className
          )}
        >
          <span
            className={cn(
              "truncate flex-1 text-left",
              selectedLabels ? "text-[#344054]" : "text-muted-foreground"
            )}
          >
            {selectedLabels || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-[#667085]" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-0 rounded border border-[#D0D5DD] bg-white shadow-xs"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandInput
            placeholder="Search..."
            value={searchValue}
            onValueChange={onSearchChange}
            className="h-10 px-4 py-2 text-[16px] font-['Lato'] border-b border-[#D0D5DD]"
          />
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {options.map((option) => {
              const selected = isSelected(String(option.value));
              return (
                <CommandItem
                  key={String(option.value)}
                  value={String(option.value)}
                  onSelect={onSelect}
                  disabled={option.disabled}
                  className={cn(
                    "flex items-center justify-between cursor-pointer px-4 py-2 text-[16px] font-['Lato'] text-[#344054] rounded-md",
                    "hover:bg-gray-50 focus:bg-primary-50 focus:text-primary-700",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex flex-col gap-0.5 truncate">
                    <span className="truncate">{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-muted-foreground truncate">
                        {option.description}
                      </span>
                    )}
                  </div>
                  {selected && (
                    <Check className="ml-2 h-4 w-4 shrink-0 text-[#344054]" />
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};