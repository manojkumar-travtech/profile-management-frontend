import React, { forwardRef } from "react";
import { ArrowLeft } from "lucide-react";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import { NewsFormValues } from "./news.types";
import { Button } from "@/components/ui/button";

interface NewsFormViewProps {
  formConfig: any;
  defaultValues: NewsFormValues;
  isLoading: boolean;
  editingId: string | null;
  onBack: () => void;
  onSubmit: (data: NewsFormValues) => Promise<void>;
}

export const NewsFormView = forwardRef<
  DynamicFormRef<NewsFormValues>,
  NewsFormViewProps
>(
  (
    { formConfig, defaultValues, isLoading, editingId, onBack, onSubmit },
    ref
  ) => {
    const handleSubmitClick = () => {
      if (ref && typeof ref !== "function" && ref.current) {
        const res = ref.current.submit();
        console.log("res", res);
      }
    };


    return (
      <div className="border p-4 rounded-md bg-base-white">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Back to List
          </button>
        </div>

        <DynamicForm<NewsFormValues>
          ref={ref}
          formConfig={formConfig}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          externalSubmit
        />

        <div className="flex justify-end mt-6">
          <Button onClick={handleSubmitClick} disabled={isLoading}>
            {isLoading ? "Saving..." : editingId ? "Save Changes" : "Add News"}
          </Button>
        </div>
      </div>
    );
  }
);

NewsFormView.displayName = "NewsFormView";
