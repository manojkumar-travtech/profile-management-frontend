"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import CollapsibleSection from "./CollapsibleSection";
import { ActiveSectionsType, FieldConfig } from "./types";

interface SectionRendererProps {
  title: string;
  sectionKey: keyof ActiveSectionsType;
  isActive: boolean;
  onToggle: () => void;
  hasError?: boolean;
  isObject?: boolean;
  refObject?: React.RefObject<DynamicFormRef<any>>;
  refsArray?: React.MutableRefObject<(DynamicFormRef<any> | null)[]>;
  data: any;
  setData: (d: any) => void;
  fields: any[];
  openItems?: number[];
  onToggleAccordion?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  title,
  sectionKey,
  isActive,
  onToggle,
  hasError = false,
  isObject = false,
  refObject,
  refsArray,
  data,
  setData,
  fields,
  openItems = [],
  onToggleAccordion,
  onDelete,
}) => {
  // For object sections
  if (isObject) {
    console.log('isObject',data)
    return (
      <Card className={!isActive ? "opacity-50" : ""}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onToggle}>
              {isActive ? (
                <Eye className="h-4 w-4 text-blue-600" />
              ) : (
                <EyeOff className="h-4 w-4 text-gray-400" />
              )}
            </Button>
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        {isActive && (
          <CardContent>
            <DynamicForm
              key={`${sectionKey}-object-form`}
              ref={refObject}
              formConfig={{ fields, gridCols: 1 }}
              defaultValues={data}
              externalSubmit
              onChange={setData}
            />
          </CardContent>
        )}
      </Card>
    );
  }
  // For array sections
  const safeData = Array.isArray(data) ? data : [];

  const addItem = () => {
    const newItem = Object.fromEntries(fields.map((f) => [f.name, ""]));
    setData([...safeData, newItem]);
  };

  return (
    <Card className={!isActive ? "opacity-50" : ""}>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onToggle}>
            {isActive ? (
              <Eye className="h-4 w-4 text-blue-600" />
            ) : (
              <EyeOff className="h-4 w-4 text-gray-400" />
            )}
          </Button>
          <CardTitle className="flex items-center gap-2">
            {title}
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {safeData.length}
            </span>
          </CardTitle>
        </div>
        {isActive && (
          <Button onClick={addItem} size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add
          </Button>
        )}
      </CardHeader>

      {isActive && (
        <CardContent className="space-y-4">
          {safeData.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No items yet
              <div className="mt-2">
                <Button
                  onClick={addItem}
                  size="sm"
                  variant="tertiary"
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" /> Add First Item
                </Button>
              </div>
            </div>
          ) : (
            safeData.map((item, idx) => (
              <CollapsibleSection
                key={`${sectionKey}-item-${idx}`}
                title={item[fields[0].name] || `${title} ${idx + 1}`}
                isOpen={openItems.includes(idx)}
                onToggle={() => onToggleAccordion?.(idx)}
                hasError={hasError}
              >
                <DynamicForm
                  key={`${sectionKey}-form-${idx}`}
                  ref={(el) => {
                    if (refsArray?.current) refsArray.current[idx] = el;
                  }}
                  formConfig={{ fields, gridCols: 2 }}
                  defaultValues={item}
                  externalSubmit
                  onChange={(vals) => {
                    setData((prev: any[]) => {
                      const copy = [...prev];
                      copy[idx] = vals;
                      return copy;
                    });
                  }}
                />
                <div className="flex justify-end mt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete?.(idx)}
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </div>
              </CollapsibleSection>
            ))
          )}
        </CardContent>
      )}
    </Card>
  );
};
