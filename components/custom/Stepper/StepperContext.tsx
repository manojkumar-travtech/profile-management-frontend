import { createContext, useContext } from "react";
import { StepperContextValue } from "./Stepper.types";

export const StepperContext = createContext<StepperContextValue | null>(null);

export const useStepper = (): StepperContextValue => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return context;
};
