"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import {
  travelRestrictionsConfig as baseConfig,
  TravelRestrictionsFormFields,
} from "../StepsJson/travelRestrictions";
import { getTravelOptions } from "@/app/api/Events/getTravelOptions";

const TravelAndRestrictions = forwardRef<
  DynamicFormRef<TravelRestrictionsFormFields>
>((_, ref) => {
  const [formConfig, setFormConfig] = useState(baseConfig);

  useEffect(() => {
    (async () => {
      // ✅ call the server function
      const options = await getTravelOptions();

      const updatedConfig = {
        ...baseConfig,
        sections: (baseConfig?.sections ?? []).map((section) => ({
          ...section,
          fields: section.fields.map((field) => {
            if (field.name === "prefferedCar")
              return { ...field, options: options.carOptions };
            if (field.name === "prefferedHotel")
              return { ...field, options: options.hotelOptions };
            if (field.name === "prefferedAir")
              return { ...field, options: options.airOptions };
            return field;
          }),
        })),
      };

      setFormConfig(updatedConfig);
    })();
  }, []);

  return (
    <DynamicForm<TravelRestrictionsFormFields>
      ref={ref}
      formConfig={formConfig}
      defaultValues={{}}
      externalSubmit={true}
    />
  );
});

TravelAndRestrictions.displayName = "TravelAndRestrictions";
export default TravelAndRestrictions;
