import { ReactNode, useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";
import { Typography } from "@/components/custom/Typography";

interface BookingLayoutProps {
  id: string;
  title: string;
  image?: string;
  icon?: ReactNode;
  infoItems?: ReactNode;
  children?: ReactNode;
  onDownload?: (id: string) => void; // 👈 new prop
}

export const BookingLayout: React.FC<BookingLayoutProps> = ({
  id,
  title,
  image,
  icon,
  infoItems,
  children,
  onDownload,
}) => {
  return (
    <SectionCard withBorder={false}>
      <div className="flex gap-6">
        {image ? (
          <div className="w-55 h-auto flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
        ) : (
          <div className="w-55 h-28  rounded-lg flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}

        {/* Right Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0 pr-2 space-y-1">
              <Typography as="h2" size="lg" weight="regular">
                Booking ID: {id}
              </Typography>
              <Typography as="h4" size="xs" variant="display" weight="bold">
                {title}
              </Typography>
            </div>
          </div>

          {/* Dynamic Middle Section */}
          <div className="mb-3">{children}</div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-700">
            <div className="flex items-center gap-3">{infoItems}</div>
            <Button
              onClick={() => onDownload?.(id)}
              variant="ghost"
              className="text-blue-600 text-xs font-medium flex items-center gap-1.5 hover:text-blue-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Pass
            </Button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};
