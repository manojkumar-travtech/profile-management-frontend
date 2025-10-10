import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  FocusEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react";

type AllowedCharacters = "numeric" | "alpha" | "alphanumeric";
type Size = "sm" | "md" | "lg";
type Variant = "default" | "filled" | "underlined" | "rounded";
type ColorScheme = "blue" | "purple" | "green" | "red" | "gray";

export interface OTPInputProps {
  length?: number;
  name?: string;
  value?: string;
  onComplete?: (value: string, name: string) => void;
  onChange?: (value: string, name: string) => void;
  onBlur?: (e: { target: { name: string; value: string } }) => void;
  onFocus?: (e: { target: { name: string; value: string } }) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  secure?: boolean;
  allowedCharacters?: AllowedCharacters;
  separator?: boolean;
  size?: Size;
  variant?: Variant;
  colorScheme?: ColorScheme;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  validate?: ((value: string) => string | void) | null;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface OTPInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

const OTPInput = forwardRef<OTPInputRef, OTPInputProps>((props, ref) => {
  const {
    length = 6,
    name = "otp",
    value = "",
    onComplete = () => {},
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
    placeholder = "",
    disabled = false,
    autoFocus = true,
    secure = false,
    allowedCharacters = "numeric",
    separator = false,
    size = "md",
    variant = "default",
    colorScheme = "blue",
    className = "",
    error = false,
    errorMessage = "",
    label = "",
    required = false,
    validate = null,
    validateOnChange = true,
    validateOnBlur = true,
  } = props;

  const [otp, setOtp] = useState<string[]>(() => {
    const initialValue = value || "";
    return Array.from({ length }, (_, i) => initialValue[i] || "");
  });
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState("");
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current[0]?.focus(),
    blur: () => inputRef.current[activeOTPIndex]?.blur(),
    clear: () => {
      const newOtp = new Array(length).fill("");
      setOtp(newOtp);
      onChange("", name);
      setValidationError("");
      inputRef.current[0]?.focus();
    },
    getValue: () => otp.join(""),
    setValue: (newValue: string) => {
      const valueArray = Array.from({ length }, (_, i) => newValue[i] || "");
      setOtp(valueArray);
    },
  }));

  useEffect(() => {
    const externalValue = value || "";
    const newOtp = Array.from({ length }, (_, i) => externalValue[i] || "");
    if (newOtp.join("") !== otp.join("")) {
      setOtp(newOtp);
    }
  }, [value, length]);

  const getCharacterRegex = (): RegExp => {
    switch (allowedCharacters) {
      case "numeric":
        return /^[0-9]$/;
      case "alpha":
        return /^[A-Za-z]$/;
      case "alphanumeric":
        return /^[A-Za-z0-9]$/;
      default:
        return /^[0-9]$/;
    }
  };

  const runValidation = (otpValue: string): string => {
    if (!validate) return "";
    try {
      const result = validate(otpValue);
      return result || "";
    } catch (err: any) {
      return err.message || "Validation error";
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case "sm":
        return "w-10 h-10 text-sm";
      case "lg":
        return "w-16 h-16 text-xl";
      default:
        return "w-12 h-12 text-base";
    }
  };

  const getVariantClasses = (isActive: boolean, hasValue: boolean): string => {
    const baseClasses =
      "border transition-all duration-200 font-medium text-center outline-none";
    const hasError = error || validationError;

    const colorClasses: Record<
      ColorScheme,
      { default: string; active: string; error: string }
    > = {
      blue: {
        default: `border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
          hasValue ? "border-blue-400 bg-blue-50" : ""
        }`,
        active: "border-blue-500 ring-2 ring-blue-200",
        error:
          "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50",
      },
      purple: {
        default: `border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 ${
          hasValue ? "border-purple-400 bg-purple-50" : ""
        }`,
        active: "border-purple-500 ring-2 ring-purple-200",
        error:
          "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50",
      },
      green: {
        default: `border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
          hasValue ? "border-green-400 bg-green-50" : ""
        }`,
        active: "border-green-500 ring-2 ring-green-200",
        error:
          "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50",
      },
      red: {
        default: `border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 ${
          hasValue ? "border-red-400 bg-red-50" : ""
        }`,
        active: "border-red-500 ring-2 ring-red-200",
        error:
          "border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-200 bg-red-50",
      },
      gray: {
        default: `border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 ${
          hasValue ? "border-gray-400 bg-gray-50" : ""
        }`,
        active: "border-gray-500 ring-2 ring-gray-200",
        error:
          "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50",
      },
    };

    const variantStyles: Record<Variant, string> = {
      default: "rounded-lg bg-white",
      filled: "rounded-lg bg-gray-100 border-transparent focus:bg-white",
      underlined: "rounded-none border-0 border-b-2 bg-transparent px-0",
      rounded: "rounded-full bg-white",
    };

    let styleClass;
    if (hasError) styleClass = colorClasses[colorScheme].error;
    else if (isActive) styleClass = colorClasses[colorScheme].active;
    else styleClass = colorClasses[colorScheme].default;

    const disabledClass = disabled
      ? "opacity-50 cursor-not-allowed bg-gray-100"
      : "";

    return `${baseClasses} ${variantStyles[variant]} ${styleClass} ${disabledClass}`;
  };

  const handleOnChange = (inputValue: string, index: number) => {
    const regex = getCharacterRegex();
    if (!regex.test(inputValue) && inputValue !== "") return;

    const newOtp = [...otp];
    newOtp[index] = inputValue.substring(inputValue.length - 1);
    setOtp(newOtp);

    const otpValue = newOtp.join("");
    onChange(otpValue, name);

    if (validateOnChange && validate) {
      const error = runValidation(otpValue);
      setValidationError(error);
    }

    if (inputValue && index < length - 1 && inputRef.current[index + 1]) {
      setActiveOTPIndex(index + 1);
      inputRef.current[index + 1]?.focus();
    }

    if (otpValue.length === length) {
      onComplete(otpValue, name);
    }
  };

  const handleOnKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0 && inputRef.current[index - 1]) {
        setActiveOTPIndex(index - 1);
        inputRef.current[index - 1]?.focus();
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        const otpValue = newOtp.join("");
        onChange(otpValue, name);
        if (validateOnChange && validate) {
          const error = runValidation(otpValue);
          setValidationError(error);
        }
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      setActiveOTPIndex(index - 1);
      inputRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      setActiveOTPIndex(index + 1);
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleOnFocus = (index: number) => {
    setActiveOTPIndex(index);
    if (index === 0) {
      onFocus({ target: { name, value: otp.join("") } });
    }
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    const otpValue = otp.join("");
    onBlur({ target: { name, value: otpValue } });
    if (validateOnBlur && validate) {
      const error = runValidation(otpValue);
      setValidationError(error);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, length);
    const regex = getCharacterRegex();
    if (pasteData && [...pasteData].every((char) => regex.test(char))) {
      const newOtp = [...otp];
      for (let i = 0; i < Math.min(pasteData.length, length); i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      const otpValue = newOtp.join("");
      onChange(otpValue, name);
      if (validateOnChange && validate) {
        const error = runValidation(otpValue);
        setValidationError(error);
      }
      const nextIndex = Math.min(pasteData.length, length - 1);
      setActiveOTPIndex(nextIndex);
      inputRef.current[nextIndex]?.focus();
      if (otpValue.length === length) onComplete(otpValue, name);
    }
  };

  useEffect(() => {
    if (autoFocus && inputRef.current[0] && !disabled) {
      inputRef.current[0]?.focus();
    }
  }, [autoFocus, disabled]);

  const displayError = error || validationError;
  const showError = touched && displayError;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex items-center justify-center gap-3">
        {otp.map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={(input) => {
                inputRef.current[index] = input;
              }}
              type={secure ? "password" : "text"}
              placeholder={placeholder}
              value={otp[index]}
              onChange={(e) => handleOnChange(e.target.value, index)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              onFocus={() => handleOnFocus(index)}
              onBlur={handleOnBlur}
              onPaste={handlePaste}
              disabled={disabled}
              className={`${getSizeClasses()} ${getVariantClasses(
                index === activeOTPIndex,
                !!otp[index]
              )}`}
              maxLength={1}
              aria-label={`${label || "OTP"} digit ${index + 1}`}
              aria-invalid={!!showError} // <-- fixed
              aria-describedby={showError ? `${name}-error` : undefined}
            />
            {separator && index < length - 1 && (
              <span className="text-gray-400 font-bold text-lg">-</span>
            )}
          </React.Fragment>
        ))}
      </div>
      {showError && (
        <p id={`${name}-error`} className="text-sm text-red-600 mt-1">
          {errorMessage || validationError}
        </p>
      )}
      <input type="hidden" name={name} value={otp.join("")} />
    </div>
  );
});

OTPInput.displayName = "OTPInput";

export default OTPInput;
