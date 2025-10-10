import { ReactNode } from "react";

export interface StepperContextValue {
  currentStep: number;
  totalSteps: number;
  completedSteps: Set<number>;
  goToStep: (stepIndex: number) => boolean;
  isStepComplete: (stepIndex: number) => boolean;
  stepLabels: string[];
  orientation: "horizontal" | "vertical";
  variant: "default" | "compact";
  onValidateStep?: (step: number) => Promise<boolean>; // parent validation
}

export type ValidationFunction = () => boolean | Promise<boolean>;

export interface StepperProps {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  className?: string;
  currentStep?: number;
  onCurrentStepChange?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "compact";
  showStepNumbers?: boolean;
}

export interface StepProps {
  children: ReactNode;
  label?: string;
  className?: string;
}

export interface StepperNavigationProps {
  onNext?: () => boolean | Promise<boolean>;
  onPrev?: () => boolean | Promise<boolean>;
  onComplete?: () => void | Promise<void>;
  nextLabel?: string;
  prevLabel?: string;
  completeLabel?: string;
  className?: string;
  showPrevButton?: boolean;
  hideNavigation?: boolean;
}

export interface StepperHeaderProps {
  className?: string;
  stepIcons?: React.ReactNode[]; 
}