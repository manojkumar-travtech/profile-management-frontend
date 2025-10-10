"use client";
import React, { useRef, useState } from "react";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import EventPreviewCard from "./EventPreviewCard";
import { additionalFormConfig, createEventConfig } from "./eventFormConfig";
import CreateEventPanel from "./CreateEventPanel";
import {
  Step,
  StepContent,
  Stepper,
  StepperHeader,
  StepperNavigation,
} from "@/components/custom/Stepper";
import { User, CreditCard, CheckCircle } from "lucide-react";
import EventDetails from "./CreateEventSteps/StepsComponents/EventDetails";
import EventHandlers from "./CreateEventSteps/StepsComponents/EventHandlers";
const icons = [
  <User key="user" />,
  <CreditCard key="credit" />,
  <CheckCircle key="check" />,
];
const CreateEvent = () => {
  const formRef = useRef<DynamicFormRef<any>>(null);
  const additionalFormRef = useRef<DynamicFormRef<any>>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const validateMainForm = async () => {
    const data = await formRef.current?.submit();
    if (data) {
      setFormData((prev: any) => ({ ...prev, ...data }));
      return true;
    }
    return false;
  };

  const validateAdditionalForm = async () => {
    const data = await additionalFormRef.current?.submit();
    if (data) {
      setFormData((prev: any) => ({ ...prev, ...data }));
      return true;
    }
    return false;
  };

  const handleNext = async (): Promise<boolean> => {
    if (currentStep === 0) {
      const isValid = await validateMainForm();
      if (!isValid) {
        return false;
      }
    } else if (currentStep === 1) {
      const isValid = await validateAdditionalForm();
      if (!isValid) {
        return false;
      }
    }

    return true;
  };

  const handlePrev = (): boolean => {
    return true;
  };

  const handleComplete = async () => {
    try {
      const isValid = await handleNext();
      if (!isValid) {
        return;
      }
      const mainData = await formRef.current?.submit();
      const additionalData = await additionalFormRef.current?.submit();

      const combinedData = {
        ...(mainData ?? {}),
        ...(additionalData ?? {}),
      };

      setFormData(combinedData);
    } catch {}
  };

  return (
    <Stepper
      currentStep={currentStep}
      onCurrentStepChange={setCurrentStep}
      orientation="vertical"
      variant="compact"
      initialStep={0}
      className="space-y-6"
      onStepChange={handleNext}
    >
      <CreateEventPanel
        triggerText="+ Create Event"
        title="Create New Event"
        footer={
          <StepperNavigation
            onNext={handleNext}
            onPrev={handlePrev}
            onComplete={handleComplete}
            nextLabel="Save & Continue"
            prevLabel="Back"
            completeLabel="Create Event"
          />
        }
      >
        <div className="bg-gray-50">
          <div className="w-full mx-auto space-y-8">
            <StepperHeader stepIcons={icons}>
              <StepContent>
                <Step label="Basic Information">
                  <EventDetails ref={formRef} />
                </Step>
                <Step label="Additional Information">
                  <EventHandlers ref={additionalFormRef}/>
                </Step>
                <Step label="Preview & Confirm">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                      Review Your Event
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                      Please review all details before publishing your event
                    </p>

                    {/* Preview Card - ONLY ON LAST STEP */}
                    <EventPreviewCard formData={formData} />

                    {/* Summary Section */}
                    <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-4">
                        📋 Event Summary
                      </h3>
                      <div className="space-y-2 text-sm text-blue-800">
                        <p>✓ Basic details completed</p>
                        <p>✓ Additional settings configured</p>
                        <p>✓ Ready to publish</p>
                      </div>
                    </div>
                  </div>
                </Step>
              </StepContent>
            </StepperHeader>
          </div>
        </div>
      </CreateEventPanel>
    </Stepper>
  );
};

export default CreateEvent;
