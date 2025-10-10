// Time-specific configuration interface
export interface TimeFieldConfig {
  format?: "12" | "24"; // Time format preference
  minuteStep?: number; // Step for minutes (5, 10, 15, 30)
  disabledHours?: number[]; // Array of hours to disable (0-23)
  disabledTimes?: string[]; // Array of specific times to disable ["09:30", "14:15"]
  minTime?: string; // Minimum selectable time "09:00"
  maxTime?: string; // Maximum selectable time "17:00"
  allowClear?: boolean; // Show clear button
}

// Time value interface
export interface TimeValue {
  hour: string;
  minute: string;
  period?: string;
  formatted: string;
  time24?: string;
}

// TimeSelect props interface
export interface TimeSelectProps {
  value?: TimeValue | null;
  onChange?: (value: TimeValue | null) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  timeConfig?: TimeFieldConfig;
  hasError?: boolean;
  errorMessage?:string
}