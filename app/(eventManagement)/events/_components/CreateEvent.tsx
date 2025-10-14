"use client";
import React, { useRef, useState } from "react";
import { DynamicFormRef } from "@/components/custom/Form";
import CreateEventPanel from "./CreateEventPanel";
import {
  Stepper,
  Step,
  StepperHeader,
  StepperNavigation,
  StepContent,
} from "@/components/custom/Stepper";
import {
  User,
  CreditCard,
  CheckCircle,
  Settings,
  Eye,
  Plus,
} from "lucide-react";
import { FieldValues } from "react-hook-form";

import {
  EventDetailsFormFields,
  EventHandlersFormFields,
  TravelRestrictionsFormFields,
  PersonalizingFormFields,
  CombinedEventFormData,
} from "../_components/CreateEventSteps/StepsJson";

import {
  EventDetails,
  EventHandlers,
  EventPreviewCard,
  Personalizing,
} from "./CreateEventSteps/StepsComponents";
import TravelAndRestrictions from "./CreateEventSteps/StepsComponents/TravelRestrictions";
import { createEventApi } from "@/app/api/Events/eventApi";

const STEPS = [
  { label: "Event Details", icon: <User /> },
  { label: "Event Handlers", icon: <CreditCard /> },
  { label: "Travel & Restrictions", icon: <CheckCircle /> },
  { label: "Personalizing", icon: <Settings /> },
  { label: "Preview", icon: <Eye /> },
] as const;

const CreateEvent = () => {
  const eventDetailsRef = useRef<DynamicFormRef<EventDetailsFormFields>>(null);
  const eventHandlersRef =
    useRef<DynamicFormRef<EventHandlersFormFields>>(null);
  const travelRef = useRef<DynamicFormRef<TravelRestrictionsFormFields>>(null);
  const personalizingRef =
    useRef<DynamicFormRef<PersonalizingFormFields>>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0]);
  const [formData, setFormData] = useState<Partial<CombinedEventFormData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const validateForm = async <T extends FieldValues>(
    ref: DynamicFormRef<T> | null
  ): Promise<boolean> => {
    if (!ref) return true;
    const data = await ref.submit();
    if (data) {
      setFormData((prev) => ({ ...prev, ...data }));
      return true;
    }
    return false;
  };

  const handleNext = async (): Promise<boolean> => {
    let isValid = false;
    switch (currentStep) {
      case 0:
        isValid = await validateForm(eventDetailsRef.current);
        break;
      case 1:
        isValid = await validateForm(eventHandlersRef.current);
        break;
      case 2:
        isValid = await validateForm(travelRef.current);
        break;
      case 3:
        isValid = await validateForm(personalizingRef.current);
        break;
      default:
        isValid = true;
    }
    if (isValid && currentStep !== 4) {
      const nextStep = currentStep + 1;
      setVisitedSteps((prev) => Array.from(new Set([...prev, nextStep])));
      setCurrentStep(nextStep);
    }
    return isValid;
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const combinedData: Partial<CombinedEventFormData> = {
        ...((await eventDetailsRef.current?.submit()) || {}),
        ...((await eventHandlersRef.current?.submit()) || {}),
        ...((await travelRef.current?.submit()) || {}),
        ...((await personalizingRef.current?.submit()) || {}),
      };
      setFormData(combinedData);
      await createEventApi({ formData: combinedData });
      console.log("Event created:", combinedData);
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepComponent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <EventDetails ref={eventDetailsRef} />;
      case 1:
        return <EventHandlers ref={eventHandlersRef} />;
      case 2:
        return <TravelAndRestrictions ref={travelRef} />;
      case 3:
        return <Personalizing ref={personalizingRef} />;
      case 4:
        return <EventPreviewCard formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <Stepper
      currentStep={currentStep}
      onCurrentStepChange={setCurrentStep}
      orientation="vertical"
      variant="compact"
      initialStep={0}
      className="space-y-6"
    >
      <CreateEventPanel
        isOpen={isPanelOpen}
        onOpenChange={setIsPanelOpen}
        triggerButtonProps={{
          children: "Create Event",
          variant: "primary",
          size: "lg",
          icon: <Plus />,
          isLoading,
        }}
        title="Create New Event"
        footer={
          <StepperNavigation
            onNext={handleNext}
            onPrev={() => true}
            onComplete={handleComplete}
            nextLabel="Save & Continue"
            prevLabel="Back"
            completeLabel="Create Event"
          />
        }
      >
        <div className="bg-gray-50 w-full mx-auto">
          <StepperHeader stepIcons={STEPS.map((s) => s.icon)}>
            <StepContent>
              {STEPS.map(({ label }, i) => (
                <Step key={i} label={label}>
                  {visitedSteps.includes(i) && renderStepComponent(i)}
                </Step>
              ))}
            </StepContent>
          </StepperHeader>
        </div>
      </CreateEventPanel>
    </Stepper>
  );
};

export default CreateEvent;
