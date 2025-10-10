"use client";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import React, { useRef, useState } from "react";
import EventPreviewCard from "./EventPreviewCard";
import { additionalFormConfig, createEventConfig } from "./eventFormConfig";
import { Button } from "@/components/ui/button";
import CreateEventPanel from "./CreateEventPanel";

const CreateEvent = () => {
  const formRef = useRef<DynamicFormRef<any>>(null);
  const additionalFormRef = useRef<DynamicFormRef<any>>(null);
  const [formData, setFormData] = useState<any>({});

  // Main form submit handler
  const handleSubmit = (data: any) => {
    console.log("Main form submitted ✅", data);
    return data;
  };

  // Additional form submit handler
  const handleAdditionalSubmit = (data: any) => {
    console.log("Additional form submitted ✅", data);
    return data;
  };

  const handleSubmitBoth = async () => {
    try {
      const mainData = await formRef.current?.submit();
      const additionalData = await additionalFormRef.current?.submit();

      // Only combine if both are objects
      const combinedData = {
        ...(mainData ?? {}),
        ...(additionalData ?? {}),
      };

      console.log("Both forms submitted ✅", combinedData);
      setFormData(combinedData);
    } catch (err) {
      console.log("Error submitting forms:", err);
    }
  };
  const EventFooter = () => {
    return (
      <div className="flex items-center justify-end gap-3">
        <Button
          size={"lg"}
          onClick={() => formRef.current?.reset()}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button size={"lg"} onClick={handleSubmitBoth}>
          Create Event
        </Button>
      </div>
    );
  };
  return (
    <CreateEventPanel
      triggerText="+ Create Event"
      title="Create New Event"
      footer={<EventFooter />}
    >
      <div className="min-h-screen bg-gray-50">
        <div className="w-full mx-auto space-y-8">
          {/* Forms and Preview same as your layout */}
          <div className="lg:hidden space-y-8">
            <DynamicForm
              ref={formRef}
              formConfig={createEventConfig as any}
              onSubmit={handleSubmit}
              submitButtonText="Register"
              defaultValues={{}}
              externalSubmit={true}
            />
            <DynamicForm
              ref={additionalFormRef}
              formConfig={additionalFormConfig as any}
              onSubmit={handleAdditionalSubmit}
              submitButtonText="Save Settings"
              defaultValues={{}}
              externalSubmit={true}
            />
            <div className="flex justify-center">
              <EventPreviewCard formData={formData} />
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <DynamicForm
                ref={formRef}
                formConfig={createEventConfig as any}
                onSubmit={handleSubmit}
                submitButtonText="Register"
                defaultValues={{}}
                externalSubmit={true}
              />
            </div>
            <div className="space-y-6">
              <EventPreviewCard formData={formData} />
              <DynamicForm
                ref={additionalFormRef}
                formConfig={additionalFormConfig as any}
                onSubmit={handleAdditionalSubmit}
                submitButtonText="Save Settings"
                defaultValues={{}}
                externalSubmit={true}
              />
            </div>
          </div>
        </div>
      </div>
    </CreateEventPanel>
  );
};

export default CreateEvent;
