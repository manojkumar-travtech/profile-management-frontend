import { AccordionItem } from "@radix-ui/react-accordion";
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import StatusBadge from "./StatusBadge";
import { Typography } from "@/components/custom/Typography";
import { PastTripItemProps } from "@/app/(travelerProfile)/_types/past-trips.types";

const PastTripItem: React.FC<PastTripItemProps> = ({
  icon: Icon,
  label,
  completed,
  details = "Additional trip details here.",
  value,
}) => {
  return (
    <AccordionItem value={value} className="border-b border-gray-100">
      <AccordionTrigger className="hover:bg-gray-50 hover:no-underline px-4 py-4">
        <div className="flex items-center w-full relative">
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-gray-600" />
            <Typography weight="medium">{label}</Typography>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-sm">
            <StatusBadge completed={completed} />
            <Typography
              className={completed ? "text-blue-600" : "text-gray-500"}
              weight="medium"
            >
              {completed ? "Completed" : "Pending"}
            </Typography>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-6 pb-4 text-sm text-gray-600 bg-gray-50 border-t border-gray-100">
        {details}
      </AccordionContent>
    </AccordionItem>
  );
};

export default PastTripItem;
