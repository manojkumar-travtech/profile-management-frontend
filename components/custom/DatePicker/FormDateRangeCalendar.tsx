"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FieldValues } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { FormFieldProps } from "../Form";
import { getDisabledDateFn } from "./dateHelpers";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function FormDateRangeCalendar<T extends FieldValues>({
  value,
  onChange,
  field,
  disabled,
  hasError,
  className,
}: {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  field: FormFieldProps<T>;
  disabled: boolean;
  hasError: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  // calendar config
  const {
    disabledDates,
    minDate,
    maxDate,
    dateFormat = "LLL dd, y",
    numberOfMonths = 2,
    closeOnSelect = false,
    allowClear = true,
  } = field.calendar || {};

  const isDateDisabled = getDisabledDateFn({
    minDate,
    maxDate,
    disabledDates,
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
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, dateFormat)} -{" "}
                {format(value.to, dateFormat)}
              </>
            ) : (
              format(value.from, dateFormat)
            )
          ) : (
            <span>{field.placeholder || "Pick a date range"}</span>
          )}
          {allowClear && value?.from && !disabled && !field.readonly && (
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
          initialFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={(range) => {
            onChange(range);
            if (closeOnSelect && range?.from && range?.to) setOpen(false);
          }}
          numberOfMonths={numberOfMonths}
          disabled={isDateDisabled}
          captionLayout={"dropdown"}
          startMonth={new Date(1950, 0)}
          endMonth={new Date(2100, 11)}
        />
      </PopoverContent>
    </Popover>
  );
}
