"use client";
import React, { useState, forwardRef } from "react";
import { Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { TimeSelectProps, TimeValue } from "../TimePicker";
import { Button } from "@/components/ui/button";

const TimePicker = forwardRef<HTMLButtonElement, TimeSelectProps>(
  (
    {
      value = null,
      onChange,
      placeholder = "Select time",
      disabled = false,
      readOnly = false,
      className = "",
      timeConfig = {},
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [validationError, setValidationError] = useState("");
    const [tempTime, setTempTime] = useState({
      hour: value?.hour || "",
      minute: value?.minute || "",
      period: value?.period || "AM",
    });

    const {
      format = "12",
      minuteStep = 1,
      disabledHours = [],
      disabledTimes = [],
      minTime,
      maxTime,
      allowClear = true,
    } = timeConfig;

    // Generate hours based on format
    const hours =
      format === "24"
        ? Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
        : Array.from({ length: 12 }, (_, i) =>
            (i + 1).toString().padStart(2, "0")
          );

    // Generate minutes based on step
    const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => {
      const minute = i * minuteStep;
      return minute.toString().padStart(2, "0");
    });

    const isHourDisabled = (hour: string, period: string): boolean => {
      if (format === "24") return disabledHours.includes(parseInt(hour));
      const hourIn24 =
        period === "AM"
          ? hour === "12"
            ? 0
            : parseInt(hour)
          : hour === "12"
          ? 12
          : parseInt(hour) + 12;
      return disabledHours.includes(hourIn24);
    };

    const isTimeDisabled = (
      hour: string,
      minute: string,
      period: string
    ): boolean => {
      const timeString =
        format === "24" ? `${hour}:${minute}` : `${hour}:${minute} ${period}`;

      if (disabledTimes.includes(timeString)) return true;

      if (minTime || maxTime) {
        const currentTime =
          format === "24"
            ? `${hour}:${minute}`
            : convertTo24Hour(hour, minute, period);

        if (minTime && currentTime < minTime) return true;
        if (maxTime && currentTime > maxTime) return true;
      }

      return false;
    };

    const convertTo24Hour = (
      hour: string,
      minute: string,
      period: string
    ): string => {
      let hour24 = parseInt(hour);
      if (period === "AM" && hour24 === 12) hour24 = 0;
      if (period === "PM" && hour24 !== 12) hour24 += 12;
      return `${hour24.toString().padStart(2, "0")}:${minute}`;
    };

    const handleTimeChange = (type: string, value: string) => {
      setTempTime((prev) => {
        const updated = { ...prev, [type]: value };
        // Auto-select first minute if hour selected and minute is empty
        if (type === "hour" && !updated.minute && minutes.length > 0) {
          updated.minute = minutes[0];
        }
        return updated;
      });
      setValidationError("");
    };

    const formatDisplayTime = (timeObj: TimeValue | null = value): string => {
      if (!timeObj || !timeObj.hour || !timeObj.minute) return placeholder;
      return format === "24"
        ? `${timeObj.hour}:${timeObj.minute}`
        : `${timeObj.hour}:${timeObj.minute} ${timeObj.period}`;
    };

    const handleConfirm = (): void => {
      if (tempTime.hour && tempTime.minute) {
        if (isHourDisabled(tempTime.hour, tempTime.period)) {
          setValidationError("Selected time is not available");
          return;
        }
        if (isTimeDisabled(tempTime.hour, tempTime.minute, tempTime.period)) {
          setValidationError("Selected time is not available");
          return;
        }
      }

      let formattedValue: TimeValue | null = null;
      if (tempTime.hour && tempTime.minute) {
        formattedValue =
          format === "24"
            ? {
                hour: tempTime.hour,
                minute: tempTime.minute,
                formatted: `${tempTime.hour}:${tempTime.minute}`,
              }
            : {
                hour: tempTime.hour,
                minute: tempTime.minute,
                period: tempTime.period,
                formatted: `${tempTime.hour}:${tempTime.minute} ${tempTime.period}`,
                time24: convertTo24Hour(
                  tempTime.hour,
                  tempTime.minute,
                  tempTime.period
                ),
              };
      }

      onChange?.(formattedValue);
      setValidationError("");
      setIsOpen(false);
    };

    const handleClear = (): void => {
      setTempTime({ hour: "", minute: "", period: "AM" });
      onChange?.(null);
      setValidationError("");
      setIsOpen(false);
    };

    const handleOpenChange = (open: boolean): void => {
      if (readOnly) return;
      if (open) {
        setTempTime({
          hour: value?.hour || "",
          minute: value?.minute || "",
          period: value?.period || "AM",
        });
        setValidationError("");
      }
      setIsOpen(open);
    };

    return (
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal border rounded-md px-3 py-2 flex items-center text-muted-foreground",
              readOnly && "bg-gray-50 cursor-default",
              className
            )}
            {...props}
          >
            <Clock className="mr-2 h-4 w-4 " />
            {formatDisplayTime()}
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="w-full min-w-[320px] p-4"
          align="start"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <div className="space-y-4">
            <div
              className={`grid gap-3 ${
                format === "24" ? "grid-cols-2" : "grid-cols-3"
              }`}
            >
              {/* Hour */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Hour</label>
                <Select
                  value={tempTime.hour}
                  onValueChange={(val) => handleTimeChange("hour", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="--" />
                  </SelectTrigger>
                  <SelectContent className="max-h-48 overflow-y-auto">
                    {hours.map((hour) => {
                      const disabled = isHourDisabled(hour, tempTime.period);
                      return (
                        <SelectItem
                          key={hour}
                          value={hour}
                          disabled={disabled}
                          className={
                            disabled ? "text-gray-400 line-through" : ""
                          }
                        >
                          {hour}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Minute */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Minute</label>
                <Select
                  value={tempTime.minute}
                  onValueChange={(val) => handleTimeChange("minute", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="--" />
                  </SelectTrigger>
                  <SelectContent className="max-h-48 overflow-y-auto">
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Period (12-hour only) */}
              {format === "12" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Period</label>
                  <Select
                    value={tempTime.period}
                    onValueChange={(val) => handleTimeChange("period", val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-32 overflow-y-auto">
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-3">
              {allowClear && (
                <Button
                  type="button"
                  onClick={handleClear}
                  variant={"secondary"}
                  size="sm"
                >
                  Clear
                </Button>
              )}
              <Button type="button" onClick={handleConfirm} size="sm">
                Confirm
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

TimePicker.displayName = "TimePicker";
export default TimePicker;
