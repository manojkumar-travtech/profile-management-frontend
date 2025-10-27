import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";

import { Calendar, Check, Plane, User } from "lucide-react";
import InfoItem from "./InfoItem";
import { SectionCardProps } from "@/app/(travelerProfile)/_types/profile.types";

const ConfirmationHeader: React.FC<SectionCardProps> = ({ title }) => (
  <SectionCard
    leftIcon={
      <div className="bg-green-500 rounded-full p-1.5 flex-shrink-0">
        <Check className="w-5 h-5 text-white" />
      </div>
    }
    title={title}
    description="Your tickets and Passes have been sent to nanda1@gmail.com. You can also download them here. Wishing you a safe and pleasant flight!"
  >
    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
      <InfoItem icon={Plane} value="Flight" />
      <InfoItem icon={Calendar} value="Sep. 24-28, 2025" />
      <InfoItem icon={User} value="1 Guest" />
    </div>
  </SectionCard>
);

export default ConfirmationHeader;
