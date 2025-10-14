"use client";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import React, { forwardRef } from "react";
import { eventDetailsConfig, EventDetailsFormFields } from "../StepsJson/eventDetails";
import { FieldValues } from "react-hook-form";

const EventDetails = forwardRef<DynamicFormRef<EventDetailsFormFields>>((_, ref) => {
  return (
    <DynamicForm<EventDetailsFormFields>
      ref={ref}
      formConfig={eventDetailsConfig}
      defaultValues={{}}
      externalSubmit={true}
    />
  );
});

export default EventDetails;
