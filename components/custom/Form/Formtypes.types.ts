import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

// Base types
export type DatePreset =
  | "futureOnly"
  | "pastOnly"
  | "noWeekends"
  | "businessDaysOnly"
  | "today"
  | "thisWeek"
  | "thisMonth"
  | "nextMonth";

export interface CalendarFieldConfig {
  datePreset?: DatePreset;
  disabledDates?: (date: Date) => boolean;
  minDate?: Date | string;
  maxDate?: Date | string;
  showTime?: boolean;
  timeFormat?: "12" | "24";
  numberOfMonths?: number;
  dateFormat?: string;
  allowClear?: boolean;
  closeOnSelect?: boolean;
}

export interface TimeFieldConfig {
  format?: "12" | "24";
  step?: number;
  minTime?: string;
  maxTime?: string;
}

export interface FileFieldConfig {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
}

export type FormLayout = "vertical" | "horizontal" | "inline" | "grid";
export type FormSize = "sm" | "md" | "lg";
export type FormVariant = "default" | "outlined" | "filled" | "minimal";

export interface FormFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface FormFieldValidation<T = FieldValues> {
  required?: boolean | string;
  pattern?: { value: RegExp; message: string };
  min?: number | string | undefined;
  max?: number | string | undefined;
  minLength?: number;
  maxLength?: number;
  validate?: (
    value: unknown,
    formValues: T
  ) => boolean | string | Promise<boolean | string>;
}

export interface ConditionalRule {
  field: string;
  value: any[];
}

// Base interface with common properties
interface BaseFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  validation?: FormFieldValidation;
  disabled?: boolean;
  readonly?: boolean;
  helpText?: string;
  className?: string;
  style?: React.CSSProperties;
  colSpan?: number;
  size?: FormSize;
  variant?: FormVariant;
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  conditional?: ConditionalRule;
  description? : string ;
}

// Specific field type interfaces
interface TextFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "text" | "email" | "password" | "tel" | "url" | "search" | 'switch'
}

interface NumberFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "number" | "range";
  step?: number;
  min?: number;
  max?: number;
}

interface TextareaFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "textarea";
  rows?: number;
}

interface SelectFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "select" | "multiselect" | "radio";
  options: FormFieldOption[]; // Required for these types
}

interface CheckboxFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "checkbox";
  description? : string ;
}

interface FileFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "file";
  accept?: string;
  multiple?: boolean;
}

interface ColorFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "color";
}

interface DateFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "date";
  calendar?: CalendarFieldConfig;
}

interface DateTimeFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "datetime" | "datetime-local";
  calendar?: CalendarFieldConfig;
  timeConfig?: TimeFieldConfig;
}

interface DateRangeFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "daterange";
  calendar?: CalendarFieldConfig;
}

interface TimeFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "time";
  timeConfig?: TimeFieldConfig;
}

interface CustomFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "custom";
  render: (props: {
    onChange: (value: unknown) => void;
    value: unknown;
    errors: FieldErrors<T>;
    control: Control<T>;
    fieldState: UseFormReturn<T>["formState"];
    field: Omit<FormFieldProps<T>, "render">;
  }) => React.ReactNode;
}

// Discriminated union of all field types
export type FormFieldProps<T extends FieldValues> =
  | TextFieldProps<T>
  | NumberFieldProps<T>
  | TextareaFieldProps<T>
  | SelectFieldProps<T>
  | CheckboxFieldProps<T>
  | FileFieldProps<T>
  | ColorFieldProps<T>
  | DateFieldProps<T>
  | DateTimeFieldProps<T>
  | DateRangeFieldProps<T>
  | TimeFieldProps<T>
  | CustomFieldProps<T>;

// Rest of the interfaces remain the same
export interface FormSection<T extends FieldValues> {
  title?: string;
  description?: string;
  fields: FormFieldProps<T>[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface FormConfig<T extends FieldValues> {
  title?: string;
  description?: string;
  sections?: FormSection<T>[];
  fields?: FormFieldProps<T>[];
  gridCols?: 1 | 2 | 3 | 4 | 6 | 12;
  fullWidthButtons?: boolean;
}

export interface DynamicFormProps<T extends FieldValues> {
  formConfig: FormConfig<T>;
  onSubmit?: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  submitButtonText?: string;
  defaultValues?: Partial<T>;
  layout?: FormLayout;
  size?: FormSize;
  variant?: FormVariant;
  className?: string;
  showErrors?: boolean;
  loading?: boolean;
  disabled?: boolean;
  requiredFormLayout?: boolean;
  externalSubmit?: boolean;
  ref?: React.Ref<DynamicFormRef<T>>;
  onChange?: (values: T) => void;
}

export interface RenderFieldsProps<T extends FieldValues> {
  fields: FormFieldProps<T>[];
  control: Control<T>;
  errors: FieldErrors<T>;
  showErrors?: boolean;
  gridCols?: number;
  size: FormSize;
  variant: FormVariant;
  layout: FormLayout;
  isMobile: boolean;
  watch?: (field?: string | string[], defaultValue?: any) => any;
}

export type DynamicFormRef<T extends FieldValues> = {
  submit: () => Promise<T | false>;
  validateSection?: (fields: string[]) => Promise<boolean>;
  getValues: () => T;
  reset: () => void;
  trigger?: (name?: string | string[]) => Promise<boolean>;
  isValid: boolean;
  setValues: (values: Partial<T>) => void; 

};