"use client";

import { Check } from "lucide-react";
import React, { ReactNode } from "react";
import { useStepper } from "./StepperContext";
import { StepperHeaderProps } from "./Stepper.types";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";

const StepperHeader: React.FC<StepperHeaderProps & { children: ReactNode }> = ({
  className,
  stepIcons,
  children,
}) => {
  const {
    currentStep,
    totalSteps,
    goToStep,
    isStepComplete,
    stepLabels,
    orientation,
    variant,
  } = useStepper();

  const isMobile = useIsMobile(); // your custom hook
  const steps = Array.from({ length: totalSteps }, (_, i) => i);
  const isCompact = variant === "compact";
  const isVertical = orientation === "vertical";
  const showVertical = isVertical && !isMobile; // vertical only on non-mobile

  const handleStepClick = async (step: number) => {
    await goToStep(step);
  };

  // -----------------------
  // Mobile Dropdown for many steps
  // -----------------------
  if (isMobile && totalSteps > 6) {
    return (
      <div className={cn("flex flex-col", className)}>
        <div className="p-4 bg-white sticky top-0 z-10 border-b">
          <select
            value={currentStep}
            onChange={(e) => handleStepClick(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            {steps.map((step, index) => (
              <option key={index} value={step}>
                {stepLabels[step]}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-auto p-4">{children}</div>
      </div>
    );
  }

  // -----------------------
  // Horizontal stepper for mobile/tablet
  // -----------------------
  if (!showVertical) {
    return (
      <div className={cn("flex flex-col", className)}>
        <div className="overflow-x-auto">
          <div className="flex items-center gap-4 min-w-max p-4 border-b bg-white sticky top-0 z-10">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <button
                  aria-current={step === currentStep ? "step" : undefined}
                  disabled={step > currentStep && !isStepComplete(step - 1)}
                  onClick={() => handleStepClick(step)}
                  className={cn(
                    "flex items-center justify-center font-semibold rounded-full transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2",
                    isCompact ? "w-7 h-7 text-xs" : "w-10 h-10 text-sm",
                    step < currentStep || isStepComplete(step)
                      ? "bg-primary-600 text-white"
                      : step === currentStep
                      ? "bg-primary-600 text-white ring-2 ring-primary-600 ring-offset-2"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
                  )}
                >
                  {stepIcons && stepIcons[index]
                    ? stepIcons[index]
                    : isStepComplete(step)
                    ? <Check className={isCompact ? "w-3 h-3" : "w-5 h-5"} />
                    : step + 1}
                </button>
                {index < totalSteps - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 transition-colors",
                      step < currentStep || isStepComplete(step)
                        ? "bg-primary-600"
                        : "bg-gray-200"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="overflow-auto p-4">{children}</div>
      </div>
    );
  }

  // -----------------------
  // Vertical stepper for desktop
  // -----------------------
  return (
    <div className={cn("flex gap-8", className)}>
      <div className="flex flex-col gap-6 sticky top-0 self-start bg-white z-10">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3 relative">
            <button
              aria-current={step === currentStep ? "step" : undefined}
              disabled={step > currentStep && !isStepComplete(step - 1)}
              onClick={() => handleStepClick(step)}
              className={cn(
                "flex items-center justify-center font-semibold rounded-full shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2",
                isCompact ? "w-7 h-7 text-xs" : "w-10 h-10 text-sm",
                step < currentStep || isStepComplete(step)
                  ? "bg-primary-600 text-white"
                  : step === currentStep
                  ? "bg-primary-600 text-white ring-2 ring-primary-600 ring-offset-2"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              )}
            >
              {stepIcons && stepIcons[index]
                ? stepIcons[index]
                : isStepComplete(step)
                ? <Check className={isCompact ? "w-3 h-3" : "w-5 h-5"} />
                : step + 1}
            </button>

            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "absolute w-0.5 transition-colors",
                  isCompact ? "left-[14px] top-7" : "left-[18px] top-10",
                  isStepComplete(step) ? "bg-primary-600" : "bg-gray-200"
                )}
                style={{ height: isCompact ? "70px" : "52px" }}
              />
            )}

            <div className="ml-2 mt-1 min-w-[250px]">
              <span
                className={cn(
                  "font-medium text-md",
                  step === currentStep ? "text-gray-900" : "text-gray-500"
                )}
              >
                {stepLabels[step]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default StepperHeader;
