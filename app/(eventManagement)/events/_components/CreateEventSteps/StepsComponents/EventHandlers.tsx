"use client";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import React, { forwardRef } from "react";
import { FieldValues } from "react-hook-form";
import { eventHandlersConfig, EventHandlersFormFields } from "../StepsJson/eventHandlers";

const EventHandlers = forwardRef<DynamicFormRef<EventHandlersFormFields>>((_, ref) => {
  return (
    <DynamicForm<EventHandlersFormFields>
      ref={ref}
      formConfig={eventHandlersConfig}
      defaultValues={{}}
      externalSubmit={true}
    />
  );
});

export default EventHandlers;
