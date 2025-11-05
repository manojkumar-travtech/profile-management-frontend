"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Typography } from "@/components/custom/Typography";
import { LinkButton } from "@/components/custom/CustomButtons";

export interface DocumentItemProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  meta?: string;
  onEdit?: () => void;
}

export const DocumentItem: React.FC<DocumentItemProps> = ({
  icon: Icon,
  title,
  subtitle,
  meta,
  onEdit,
}) => {
  return (
    <div className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>

        <div className="flex-1">
          <Typography weight="medium" size="md" className="text-gray-500">
            {title}
          </Typography>
        </div>

        {subtitle && (
          <div className="flex-1">
            <Typography weight="medium" size="md">
              {subtitle}
            </Typography>
          </div>
        )}

        {meta && (
          <div className="flex-1">
            <Typography weight="medium" size="md" className="text-gray-500">
              {meta}
            </Typography>
          </div>
        )}
      </div>

      {onEdit && <LinkButton onClick={onEdit}>Edit</LinkButton>}
    </div>
  );
};
