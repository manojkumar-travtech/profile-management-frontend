import { StepperContext } from "@/components/custom/Stepper/stepper";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

const SafeFooter: React.FC<{
  formRef: any;
  additionalFormRef: any;
  handleSubmitBoth: () => void;
}> = ({ formRef, additionalFormRef, handleSubmitBoth }) => {
  const stepperContext = useContext(StepperContext);

  // If context not ready, render nothing
  if (!stepperContext) return null;

  const { prevStep, nextStep, currentStep, totalSteps } = stepperContext;

  const handleNext = async () => {
    if (currentStep === 0) {
      const valid = await formRef.current?.submit();
      if (valid) nextStep();
    } else if (currentStep === 1) {
      const valid = await additionalFormRef.current?.submit();
      if (valid) handleSubmitBoth();
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      {currentStep > 0 && (
        <Button onClick={prevStep}>
          Previous
        </Button>
      )}
      <Button onClick={handleNext}>
        {currentStep === totalSteps - 1 ? "Create Event" : "Next"}
      </Button>
    </div>
  );
};
export default SafeFooter