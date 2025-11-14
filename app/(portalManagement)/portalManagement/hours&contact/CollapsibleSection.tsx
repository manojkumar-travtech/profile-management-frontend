import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { CollapsibleSectionProps } from "./constants";

const CollapsibleSection = ({
  title,
  children,
  isOpen,
  onToggle,
  hasError = false,
}: CollapsibleSectionProps) => {
  return (
    <div
      className={`border rounded-lg ${
        hasError ? "border-red-300 bg-red-50" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{title}</span>
          {hasError && (
            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Error
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isOpen && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
