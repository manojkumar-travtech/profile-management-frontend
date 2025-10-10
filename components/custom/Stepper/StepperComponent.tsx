import { cn } from "@/lib/utils";
import { StepperContext } from "./StepperContext";
import { StepperContextValue, StepperProps } from "./Stepper.types";
import { useCallback, useEffect, useState, useMemo } from "react";
import React from "react";

export const Stepper: React.FC<StepperProps> = ({
  children,
  initialStep = 0,
  onStepChange,
  className,
  currentStep: externalStep,
  onCurrentStepChange,
  orientation = "horizontal",
  variant = "default",
  showStepNumbers = true,
}) => {
  const [internalStep, setInternalStep] = useState<number>(initialStep);
  const isControlled = externalStep !== undefined;
  const currentStep = isControlled ? externalStep : internalStep;

  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [stepLabels, setStepLabels] = useState<string[]>([]);

  const setCurrentStep = useCallback(
    (step: number) => {
      if (isControlled) {
        onCurrentStepChange?.(step);
      } else {
        setInternalStep(step);
      }
      onStepChange?.(step);
    },
    [isControlled, onCurrentStepChange, onStepChange]
  );

  // 🧩 Recursively find all Step components (type-safe)
  const findAllSteps = useCallback(
    (nodes: React.ReactNode): React.ReactElement[] => {
      const array = React.Children.toArray(nodes);
      const steps: React.ReactElement[] = [];

      array.forEach((child) => {
        if (!React.isValidElement(child)) return;

        // 🧠 Narrow the type safely
        const childType = child.type as any;
        const typeName =
          typeof childType === "function"
            ? childType.displayName || childType.name
            : "";

        if (typeName === "Step") {
          steps.push(child);
        }

        // 🧩 If this element has children, search recursively
        const childProps = child.props as { children?: React.ReactNode };
        if (childProps.children) {
          steps.push(...findAllSteps(childProps.children));
        }
      });

      return steps;
    },
    []
  );

  const steps = useMemo(() => findAllSteps(children), [children, findAllSteps]);
  const totalSteps = steps.length;

  // Extract step labels
  useEffect(() => {
    const labels = steps.map(
      (step: any, index: number) => step?.props?.label || `Step ${index + 1}`
    );
    setStepLabels(labels);
  }, [steps]);

  const goToStep = useCallback(
    (stepIndex: number): boolean => {
      if (stepIndex < 0 || stepIndex >= totalSteps) return false;
      setCurrentStep(stepIndex);
      return true;
    },
    [totalSteps, setCurrentStep]
  );

  const isStepComplete = useCallback(
    (stepIndex: number): boolean => completedSteps.has(stepIndex),
    [completedSteps]
  );

  const markStepComplete = useCallback((stepIndex: number) => {
    setCompletedSteps((prev) => new Set([...prev, stepIndex]));
  }, []);

  const value: StepperContextValue = {
    currentStep,
    totalSteps,
    completedSteps,
    goToStep,
    isStepComplete,
    stepLabels,
    orientation,
    variant,
  };

  return (
    <StepperContext.Provider value={value}>
      <div className={cn("w-full", className)}>{children}</div>
    </StepperContext.Provider>
  );
};

Stepper.displayName = "Stepper";

export default Stepper;
