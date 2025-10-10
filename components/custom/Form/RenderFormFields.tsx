import { useState } from "react";
import { FieldErrors, FieldValues, Path, PathValue } from "react-hook-form";
import { castValueByType, getFieldError } from "./FormHelper";
import { FormFieldProps, FormSize, FormVariant } from "./Formtypes.types";
import { ChevronDownIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { MultiSelectDropdown } from "../MultiSelect";
import SingleSelect from "../SingleSelect/SingleSelect";
import FormRadioGroup from "../FormRadioGroup/FormRadioGroup";
import { FormCalendar } from "../DatePicker/FormCalendar";
import { FormDateRangeCalendar } from "../DatePicker/FormDateRangeCalendar";
import { TimePicker } from "../TimePicker";
import { DragAndDropUploader } from "../DragAndDropUploader";

export function RenderFormFields<T extends FieldValues>(
  field: FormFieldProps<T>,
  value: PathValue<T, Path<T>>,
  onChange: (value: PathValue<T, Path<T>>) => void,
  disabled: boolean,
  size: FormSize,
  variant: FormVariant,
  errors: FieldErrors<T>
) {
  const [showPassword, setShowPassword] = useState(false);

  const fieldError = getFieldError(errors, field.name as Path<T>);
  const isDisabled = field.disabled || disabled;
  const hasError = !!fieldError;
  // Common props for form controls
  const commonProps = {
    disabled: isDisabled,
    readOnly: field.readonly,
    className: cn(
      hasError && "border-red-500 focus:border-red-500 focus:ring-red-500",
      field.readonly && "bg-gray-50 cursor-default"
    ),
  };

  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "datetime-local":
    case "tel":
    case "url":
    case "search":
      return (
        <div className="relative">
          {field.prefix && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none z-10">
              {field.prefix}
            </span>
          )}
          {field.icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
              {field.icon}
            </div>
          )}
          <Input
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
            value={value ?? ""}
            className={cn(
              commonProps.className,
              field.icon && "pl-10",
              field.prefix && "pl-8",
              field.suffix && "pr-8"
            )}
            onChange={(e) =>
              onChange(castValueByType<T>(field.type, e.target.value))
            }
          />
          {field.suffix && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              {field.suffix}
            </span>
          )}
        </div>
      );

    case "password":
      return (
        <div className="relative">
          {field.prefix && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none z-10">
              {field.prefix}
            </span>
          )}
          {field.icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
              {field.icon}
            </div>
          )}
          <Input
            {...commonProps}
            type={showPassword ? "text" : "password"}
            placeholder={field.placeholder}
            value={value ?? ""}
            className={cn(
              commonProps.className,
              field.icon && "pl-10",
              field.prefix && "pl-8",
              "pr-10"
            )}
            onChange={(e) =>
              onChange(castValueByType<T>(field.type, e.target.value))
            }
          />
          <Button
            type="button"
            variant="ghost"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </Button>
          {field.suffix && (
            <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              {field.suffix}
            </span>
          )}
        </div>
      );

    case "textarea":
      return (
        <Textarea
          {...commonProps}
          placeholder={field.placeholder}
          rows={field.rows || 4}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value as PathValue<T, Path<T>>)}
        />
      );

    case "select":
      return (
        <SingleSelect
          isDisabled={isDisabled}
          value={value ?? ""}
          onChange={(val) => onChange(val as PathValue<T, Path<T>>)}
          placeholder={field.placeholder || "Select an option"}
          options={field.options}
        />
      );
    case "multiselect":
      return (
        <MultiSelectDropdown
          options={field.options || []}
          value={Array.isArray(value) ? value : []}
          onChange={(selectedValues) =>
            onChange(selectedValues as PathValue<T, Path<T>>)
          }
          placeholder="Select options..."
          className="w-full"
        />
      );

    case "checkbox":
      return (
        <div className="flex items-start space-x-3">
          <Checkbox
            label={field?.label}
            description={field?.description}
            id={`checkbox-${field.name}`}
            disabled={isDisabled}
            checked={Boolean(value)}
            onCheckedChange={(checked) =>
              onChange(castValueByType<T>("checkbox", checked))
            }
            className={cn("mt-1", hasError && "border-error-500")}
          />
          <div className="flex-1">
            {field.helpText && (
              <p className="mt-1 text-sm text-muted-foreground">
                {field.helpText}
              </p>
            )}
          </div>
        </div>
      );

    case "radio":
      return (
        <FormRadioGroup
          options={field.options}
          onChange={(val) => onChange(val as PathValue<T, Path<T>>)}
          value={value ? String(value) : ""}
          label={field.label}
          isDisabled={isDisabled}
          hasError={!!hasError}
          direction="horizontal"
        />
      );

    case "file":
      return (
        <div className="space-y-2">
          <DragAndDropUploader
            label={field.label || "Upload file(s)"}
            multiple={field.multiple}
            accept={
              field.accept
                ? { [field.accept]: [] } // convert accept string to record
                : undefined
            }
            value={
              Array.isArray(value)
                ? (value as File[])
                : value
                ? [value as File]
                : []
            }
            onFilesChange={(files) => {
              onChange(
                field.multiple
                  ? (files as PathValue<T, Path<T>>)
                  : ((files?.[0] || null) as PathValue<T, Path<T>>)
              );
            }}
            readFile={false} // or true if you want to read the content
          />

          {field.helpText && (
            <p className="text-xs text-gray-500">{field.helpText}</p>
          )}
        </div>
      );

    case "range":
      return (
        <div className="space-y-3">
          <Slider
            disabled={isDisabled}
            value={[Number(value ?? 0)]}
            onValueChange={(vals) =>
              onChange(castValueByType<T>("range", vals[0]))
            }
            min={(field.validation?.min as number) || (0 as number)}
            max={(field.validation?.max as number) || (100 as number)}
            step={field.step || 1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{field.validation?.min || 0}</span>
            <span className="font-medium">{value ?? 0}</span>
            <span>{field.validation?.max || 100}</span>
          </div>
        </div>
      );

    case "color":
      return (
        <Input
          type="color"
          disabled={isDisabled}
          value={(value as string) ?? "#000000"}
          className={cn(commonProps.className, "h-10 w-20 p-1 cursor-pointer")}
          onChange={(e) => onChange(e.target.value as PathValue<T, Path<T>>)}
        />
      );
    case "date":
      return (
        <FormCalendar
          value={value ? new Date(value as string) : undefined}
          onChange={(date) => {
            // Convert date to string format for form handling
            onChange(
              date
                ? (date.toISOString().split("T")[0] as PathValue<T, Path<T>>)
                : ("" as PathValue<T, Path<T>>)
            );
          }}
          field={field}
          disabled={isDisabled}
          hasError={hasError}
        />
      );
    case "daterange":
      return (
        <FormDateRangeCalendar
          value={
            value as
              | { from: Date | undefined; to: Date | undefined }
              | undefined
          }
          onChange={(range) => onChange(range as PathValue<T, Path<T>>)}
          field={field}
          disabled={isDisabled}
          hasError={hasError}
        />
      );
    case "datetime":
      return (
        <div className="space-y-2">
          <FormCalendar
            value={value ? new Date(value as string) : undefined}
            onChange={(date) => {
              if (date) {
                // Preserve existing time if available
                const existingDate = value
                  ? new Date(value as string)
                  : new Date();
                date.setHours(
                  existingDate.getHours(),
                  existingDate.getMinutes()
                );
                onChange(date.toISOString() as PathValue<T, Path<T>>);
              } else {
                onChange("" as PathValue<T, Path<T>>);
              }
            }}
            field={field}
            disabled={isDisabled}
            hasError={hasError}
          />
          {value && (
            <Input
              type="time"
              value={
                value
                  ? new Date(value as string).toTimeString().slice(0, 5)
                  : ""
              }
              onChange={(e) => {
                if (value) {
                  const date = new Date(value as string);
                  const [hours, minutes] = e.target.value.split(":");
                  date.setHours(parseInt(hours), parseInt(minutes));
                  onChange(date.toISOString() as PathValue<T, Path<T>>);
                }
              }}
              disabled={isDisabled}
              className={commonProps.className}
            />
          )}
        </div>
      );
    case "time":
      return (
        <TimePicker
          value={value}
          onChange={(val) => onChange(val as PathValue<T, Path<T>>)}
          placeholder={field.placeholder || "Select time"}
          disabled={isDisabled}
          readOnly={field.readonly}
          hasError={hasError}
          timeConfig={field.timeConfig}
          className={commonProps.className}
          errorMessage={fieldError?.message as string}
        />
      );
    case "custom":
    default:
      return null;
  }
}

export default RenderFormFields;
