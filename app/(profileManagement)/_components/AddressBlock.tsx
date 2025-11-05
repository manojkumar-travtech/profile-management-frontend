import React from "react";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { Typography } from "@/components/custom/Typography";

export interface AddressBlockProps {
  type: string;
  address: string | null;
  badge?: string;
  icon?: LucideIcon;
}

export const AddressBlock: React.FC<AddressBlockProps> = ({
  type,
  address,
  badge,
  icon: Icon,
}) => {
  return (
    <div>
      <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
        {Icon && <Icon className="w-3 h-3" />}
        <Typography size="sm"> {type}</Typography>
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <Typography
          size="md"
          weight="medium"
          className={`${address ? "" : "text-gray-400"}`}
        >
          {address || "Not Set"}
        </Typography>

        {badge && (
          <Badge
            variant="secondary"
            className="bg-amber-50 p-2 ml-2 rounded-md"
          >
            <Typography className="text-warning-600">{badge}</Typography>
          </Badge>
        )}
      </div>
    </div>
  );
};
