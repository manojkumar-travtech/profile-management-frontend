"use client";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import React, { forwardRef } from "react";
import { FieldValues } from "react-hook-form";
import { eventHandlersConfig } from "../StepsJson/eventHandlers";

const EventHandlers = forwardRef<DynamicFormRef<FieldValues>>((_, ref) => {
  return (
    <DynamicForm
      ref={ref}
      formConfig={eventHandlersConfig}
      defaultValues={{}}
      externalSubmit={true}
    />
  );
});

export default EventHandlers;
