"use client";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import React, { forwardRef } from "react";
import { personalizingConfig, PersonalizingFormFields } from "../StepsJson/personalizing";

const Personalizing = forwardRef<DynamicFormRef<PersonalizingFormFields>>(
  (_, ref) => {
    return (
      <DynamicForm<PersonalizingFormFields>
        ref={ref}
        formConfig={personalizingConfig}
        defaultValues={{}}
        externalSubmit={true}
      />
    );
  }
);

export default Personalizing;
