"use client";
import { SectionCard } from "@/app/(profileManagement)/_components/SectionCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface RightSectionProps {
  status?: "active" | "inactive";
}

export const RightSection: React.FC<RightSectionProps> = ({
  status = "inactive",
}) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const isActive = status === "active";

  const badgeClasses = isActive
    ? "bg-green-100 text-green-700"
    : "bg-gray-100 text-gray-600";

  return (
    <div className="flex items-center space-x-4">
      {/* Status Badge */}
      <span
        className={`text-sm font-medium px-3 py-1 rounded-full transition-colors duration-200 ${badgeClasses}`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-200" />

      <TooltipProvider delayDuration={200}>
        {/* Travel History Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Clock
              className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
              onClick={() =>
                handleNavigate("/profile-managemnt/travel-history")
              }
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Travel History</p>
          </TooltipContent>
        </Tooltip>

        {/* Settings Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Settings
              className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
              onClick={() => handleNavigate("/profile-managemnt/settings")}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
const BusinessTravelProfile = () => {
  return (
    <div>
      <SectionCard
        leftIcon={<User className="w-4 h-4" />}
        title="Business Travel Profile"
        description="This is where you can manage your travel profiles and preferences."
        rightSection={<RightSection status="active" />}
      />
    </div>
  );
};

export default BusinessTravelProfile;
