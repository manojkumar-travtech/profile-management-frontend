import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useStepper } from "./StepperContext";
import { StepperNavigationProps } from "./Stepper.types";
import { Button } from "@/components/ui/button";

const StepperNavigation: React.FC<StepperNavigationProps> = ({
  onNext,
  onPrev,
  onComplete,
  nextLabel = "Next",
  prevLabel = "Previous",
  completeLabel = "Complete",
  className,
  showPrevButton = true,
  hideNavigation = false,
}) => {
  const { currentStep, totalSteps, goToStep, completedSteps } = useStepper();
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    try {
      let canProceed = true;

      if (onNext) {
        canProceed = await Promise.resolve(onNext());
      }

      if (canProceed) {
        const isLastStep = currentStep === totalSteps - 1;

        if (isLastStep) {
          await onComplete?.();
        } else {
          // Mark current step as complete
          const newCompleted = new Set(completedSteps);
          newCompleted.add(currentStep);
          goToStep(currentStep + 1);
        }
      }
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = async () => {
    setIsLoading(true);
    try {
      let canProceed = true;

      if (onPrev) {
        canProceed = await Promise.resolve(onPrev());
      }

      if (canProceed && currentStep > 0) {
        goToStep(currentStep - 1);
      }
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (hideNavigation) return null;

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        {showPrevButton && currentStep > 0 && (
          <Button
            size={"lg"}
            variant={"secondary"}
            onClick={handlePrev}
            disabled={isLoading}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {prevLabel}
          </Button>
        )}
      </div>
      <Button onClick={handleNext} disabled={isLoading} size={"lg"}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : isLastStep ? (
          completeLabel
        ) : (
          <>
            {nextLabel}
            <ChevronRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};

export default StepperNavigation;
