"use client";

import React from "react";
import { Typography } from "@/components/custom/Typography";
import { LucideIcon } from "lucide-react";
import { Grid } from "@/components/custom/Grid";

export interface InfoGridProps {
  fields: InfoFieldProps[];
  columns?: 1 | 2 | 3 | 4;
}

export interface InfoFieldProps {
  label: string;
  value: string | null;
  icon?: LucideIcon;
  className?: string;
}
export const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  icon: Icon,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Typography className="text-gray-500">
        <span className="flex items-center gap-2">
          {Icon && <Icon className="w-3 h-3" />}
          {label}
        </span>
      </Typography>

      <Typography weight="bold" size="lg"  variant="text">
        {value || "Not Set"}
      </Typography>
    </div>
  );
};

export const InfoGrid: React.FC<InfoGridProps> = ({ fields, columns = 3 }) => {
  return (
    <Grid  cols={{
        xs: 1,      
        sm: 2,      
        md: columns, 
        lg: columns, 
        xl: columns, 
        "2xl": columns,
      }}
      gap={6}>
      {fields.map((field, index) => (
        <InfoField key={index} {...field} />
      ))}
    </Grid>
  );
};
