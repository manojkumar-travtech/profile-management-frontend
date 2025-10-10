"use client";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import React, { forwardRef } from "react";
import { eventDetailsConfig } from "../StepsJson/eventDetails";
import { FieldValues } from "react-hook-form";

const EventDetails = forwardRef<DynamicFormRef<FieldValues>>((_, ref) => {
  return (
    <DynamicForm
      ref={ref}
      formConfig={eventDetailsConfig}
      defaultValues={{}}
      externalSubmit={true}
    />
  );
});

export default EventDetails;
