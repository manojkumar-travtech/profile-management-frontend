import { Accordion } from "@/components/ui/accordion";
import StatusBadge from "./StatusBadge";
import PastTripItem from "./PastTripItem";
import { Typography } from "@/components/custom/Typography";
import { PastTripCardProps } from "@/app/(travelerProfile)/_types/past-trips.types";

const PastTripCard: React.FC<PastTripCardProps> = ({
  date,
  guests,
  items,
  showPreferences = true,
  allowMultipleOpen = true,
  initialOpenIndices = [],
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
      {/* Header - Center aligned */}
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center justify-start gap-2">
          <StatusBadge completed={true} className="h-5 w-5" />
          <Typography weight="semibold" size="xl">
            Trip Completed
          </Typography>
        </div>
      </div>

      {/* Trip Items with Accordion */}
      {allowMultipleOpen ? (
        <Accordion
          type="multiple"
          defaultValue={initialOpenIndices.map((i) => `item-${i}`)}
          className="divide-y divide-gray-200"
        >
          {items.map((item, index) => (
            <PastTripItem key={index} {...item} value={`item-${index}`} />
          ))}
        </Accordion>
      ) : (
        <Accordion
          type="single"
          collapsible
          defaultValue={
            initialOpenIndices.length > 0
              ? `item-${initialOpenIndices[0]}`
              : undefined
          }
          className="divide-y divide-gray-200"
        >
          {items.map((item, index) => (
            <PastTripItem key={index} {...item} value={`item-${index}`} />
          ))}
        </Accordion>
      )}

      {showPreferences && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            See last travel preferences
          </p>
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <div className="w-4 h-4 border-2 border-blue-600 rounded"></div>
            <span className="text-sm font-medium">Last Travel Preferences</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PastTripCard;
