"use client";

import React, { useEffect, useImperativeHandle, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { renderFields } from "./RenderFields";
import { DynamicFormProps, DynamicFormRef } from "./Formtypes.types";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Typography } from "../Typography";

export function DynamicForm<T extends FieldValues>({
  formConfig,
  onSubmit,
  onError,
  submitButtonText = "Submit",
  defaultValues,
  layout = "vertical",
  size = "md",
  variant = "default",
  className = "",
  showErrors = true,
  loading = false,
  disabled = false,
  requiredFormLayout = false,
  externalSubmit = false,
  ref,
  onChange,
}: DynamicFormProps<T>) {
  const [collapsedSections, setCollapsedSections] = useState<Set<number>>(
    new Set()
  );

  // ✅ Use your existing hook twice for breakpoints
  const isMobile480 = useIsMobile(480);
  const isMobile780 = useIsMobile(780);

  // Derived screen modes
  const isMobile = isMobile480; // <480px
  const isTablet = !isMobile480 && isMobile780; // 480–780px

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onChange",
  });

  useEffect(() => {
    if (!defaultValues) return;

    const currentValues = getValues();
    const isDifferent =
      JSON.stringify(currentValues) !== JSON.stringify(defaultValues);

    if (isDifferent) {
      reset(defaultValues as DefaultValues<T>);
    }
  }, [defaultValues, reset, getValues]);

  const toggleSection = (index: number) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(index)) newCollapsed.delete(index);
    else newCollapsed.add(index);
    setCollapsedSections(newCollapsed);
  };

  const handleFormSubmit: SubmitHandler<T> = (data) => {
    onSubmit?.(data);
  };

  const handleFormError: SubmitErrorHandler<T> = (formErrors) => {
    onError?.(formErrors);
  };

  useEffect(() => {
    const subscription = watch((values) => {
      onChange?.(values as T);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  useImperativeHandle(
    ref,
    (): DynamicFormRef<T> => ({
      submit: () =>
        new Promise<T | false>((resolve) => {
          handleSubmit(
            (data) => {
              handleFormSubmit(data);
              resolve(data);
            },
            (errors) => {
              handleFormError?.(errors);
              resolve(false);
            }
          )();
        }),
      reset: () => reset(),
      getValues: () => getValues(),
      isValid,
      setValues: (values: Partial<T>) => {
        Object.entries(values).forEach(([key, value]) => {
          setValue(key as Path<T>, value as T[Path<T>], {
            shouldValidate: true,
            shouldDirty: true,
          });
        });
      },
    })
  );

  // ✅ Responsive grid logic
  const responsiveGridCols = isMobile
    ? 1
    : isTablet
    ? formConfig.gridCols && formConfig.gridCols > 2
      ? 2
      : formConfig.gridCols || 1
    : formConfig.gridCols || 1;

  // ✅ Adjust fields’ colSpan (only if >2 and in tablet range)
  const adjustedSections = formConfig.sections?.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      colSpan:
        isTablet && field.colSpan && field.colSpan > 2 ? 2 : field.colSpan,
    })),
  }));

  const adjustedFields =
    !formConfig.sections && formConfig.fields
      ? formConfig.fields.map((field) => ({
          ...field,
          colSpan:
            isTablet && field.colSpan && field.colSpan > 2 ? 2 : field.colSpan,
        }))
      : [];

  const buttonContainerClass = formConfig.fullWidthButtons
    ? "space-y-4"
    : "flex flex-wrap gap-4";

  const layoutClass = requiredFormLayout ? "border rounded-lg" : "";

  return (
    <div className={`${className} flex flex-col space-y-6 h-auto`}>
      <form
        onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
        className="space-y-6"
      >
        {formConfig.title ||
          (formConfig.description && (
            <div className="space-y-2">
              {formConfig.title && (
                <h2 className="text-2xl font-bold">{formConfig.title}</h2>
              )}
              {formConfig.description && (
                <p className="text-sm text-gray-600">
                  {formConfig.description}
                </p>
              )}
            </div>
          ))}

        {adjustedSections ? (
          <div className="space-y-1">
            {adjustedSections.map((section, index) => (
              <div key={index} className={`bg-white p-1 ${layoutClass}`}>
                {section.title && (
                  <div className="flex justify-between items-center mb-4">
                    <Typography
                      variant={"text"}
                      size="md"
                      as="h6"
                      weight={"bold"}
                    >
                      {section.title}
                    </Typography>
                    {section.collapsible && (
                      <button
                        type="button"
                        onClick={() => toggleSection(index)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        <svg
                          className={`w-5 h-5 transform transition-transform ${
                            collapsedSections.has(index) ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
                {section.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {section.description}
                  </p>
                )}
                {!section.collapsible || !collapsedSections.has(index)
                  ? renderFields<T>({
                      fields: section.fields,
                      control,
                      errors,
                      showErrors,
                      gridCols: responsiveGridCols,
                      size,
                      layout,
                      variant,
                      isMobile,
                      watch,
                    })
                  : null}
              </div>
            ))}
          </div>
        ) : (
          renderFields<T>({
            fields: adjustedFields,
            control,
            errors,
            showErrors,
            gridCols: responsiveGridCols,
            size,
            layout,
            variant,
            isMobile,
            watch,
          })
        )}

        {!externalSubmit && (
          <div className={`${buttonContainerClass}`}>
            <Button
              type="submit"
              disabled={isSubmitting || loading || disabled}
              variant="primary"
              size="md"
              className={formConfig.fullWidthButtons ? "w-full" : ""}
            >
              {isSubmitting || loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {loading ? "Processing..." : "Submitting..."}
                </span>
              ) : (
                submitButtonText
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default DynamicForm;
