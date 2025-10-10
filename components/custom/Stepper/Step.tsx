import { StepProps } from "./Stepper.types";

const Step: React.FC<StepProps> = ({ children, label, className }) => {
  return (
    <div data-step data-step-label={label} className={className}>
      {children}
    </div>
  );
};

export default Step;
