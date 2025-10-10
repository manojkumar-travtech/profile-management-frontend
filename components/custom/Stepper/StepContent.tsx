import React, { ReactNode } from "react";
import { useStepper } from "./StepperContext";

const StepContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentStep } = useStepper();
  const steps = React.Children.toArray(children);

  return (
    <div>
      {steps.map((step, index) => (
        <div
          key={index}
          style={{
            display: index === currentStep ? "block" : "none",
          }}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default StepContent;
