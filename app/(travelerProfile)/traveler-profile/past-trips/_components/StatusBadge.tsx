import { StatusBadgeProps } from "@/app/(travelerProfile)/_types/past-trips.types";
import { Check } from "lucide-react";

const StatusBadge: React.FC<StatusBadgeProps> = ({ completed , className }) => (
  <div
    className={`w-4 h-4 rounded-full flex items-center justify-center ${
      completed ? "bg-blue-500" : "bg-gray-300"
    }`}
  >
    {completed && <Check className={`w-3 h-3 text-white , ${className}`} />}
  </div>
);
export default StatusBadge;
