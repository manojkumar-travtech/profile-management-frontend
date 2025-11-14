import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import { Button } from "@/components/ui/button";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { JSX } from "react";
import CollapsibleSection from "../hours&contact/CollapsibleSection";

interface Update {
  text: string;
  type: "info" | "warning" | "urgent";
}

interface UpdatesSectionProps {
  updates: Update[];
  categoryIndex: number;
  openUpdates: number[];
  onToggleUpdate: (updateIndex: number) => void;
  onAddUpdate: () => void;
  onDeleteUpdate: (updateIndex: number) => void;
  onUpdateUpdate: (updateIndex: number, updatedUpdate: Update) => void;
  updateRefs: React.MutableRefObject<(DynamicFormRef<any> | null)[]>;
}

function UpdatesSection({
  updates,
  categoryIndex,
  openUpdates,
  onToggleUpdate,
  onAddUpdate,
  onDeleteUpdate,
  onUpdateUpdate,
  updateRefs
}: UpdatesSectionProps): JSX.Element {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Updates ({updates.length})
        </h4>
        <Button 
          onClick={onAddUpdate} 
          size="sm" 
          variant="tertiary"
          className="gap-2"
        >
          <Plus className="h-3 w-3" /> Add Update
        </Button>
      </div>
      
      <div className="space-y-2">
        {updates.map((update, updateIdx) => (
          <CollapsibleSection
            key={updateIdx}
            title={`${update.type.toUpperCase()}: ${update.text.substring(0, 40)}...` || `Update ${updateIdx + 1}`}
            isOpen={openUpdates.includes(updateIdx)}
            onToggle={() => onToggleUpdate(updateIdx)}
          >
            <DynamicForm
              ref={(el) => {
                updateRefs.current[updateIdx] = el;
              }}
              formConfig={{
                fields: [
                  { name: "text", label: "Update Text", type: "textarea" },
                  { name: "type", label: "Type", type: "select", options: [] },
                ],
                gridCols: 1,
              }}
              defaultValues={update}
              externalSubmit
              onChange={(vals) => onUpdateUpdate(updateIdx, vals as Update)}
            />
            <div className="flex justify-end mt-2">
              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                onClick={() => onDeleteUpdate(updateIdx)}
              >
                <Trash2 className="h-3 w-3" /> Delete
              </Button>
            </div>
          </CollapsibleSection>
        ))}
      </div>
    </div>
  );
}