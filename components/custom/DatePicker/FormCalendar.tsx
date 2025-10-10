"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { getDisabledDateFn } from "./dateHelpers";
import { useState } from "react";
import { FormFieldProps } from "../Form";
import { FieldValues } from "react-hook-form";

export function FormCalendar<T extends FieldValues>({
  value,
  onChange,
  field,
  disabled,
  hasError,
  className,
}: {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  field: FormFieldProps<T>;
  disabled: boolean;
  hasError: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const {
    datePreset,
    disabledDates,
    minDate,
    maxDate,
    dateFormat = "PPP",
    allowClear = true,
    closeOnSelect = true,
  } = field.calendar || {};

  const isDateDisabled = getDisabledDateFn({
    minDate,
    maxDate,
    disabledDates,
    datePreset,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "w-full flex items-center justify-start rounded-md border px-3 py-2 text-left font-normal bg-white hover:bg-gray-50",
            !value && "text-muted-foreground",
            hasError &&
              "border-red-500 focus:border-red-500 focus:ring-red-500",
            field.readonly && "bg-gray-50 cursor-default",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, dateFormat)
          ) : (
            <span>{field.placeholder || "Pick a date"}</span>
          )}
          {allowClear && value && !disabled && !field.readonly && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange(undefined);
              }}
              className="ml-auto cursor-pointer text-gray-500 hover:text-gray-700"
            >
              ×
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            if (closeOnSelect) setOpen(false);
          }}
          disabled={isDateDisabled}
          autoFocus
          captionLayout={"dropdown"}
          startMonth={new Date(1950, 0)}
          endMonth={new Date(2100, 11)}
        />
      </PopoverContent>
    </Popover>
  );
}
