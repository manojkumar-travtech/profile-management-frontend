"use client";

import React from "react";
import { Grid, GridItem } from "@/components/custom/Grid"; 

export interface PersonalInfoFieldProps {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
  className?: string;
}
export interface PersonalInfoFieldGroupProps {
  title: string;
  fields: PersonalInfoFieldProps[];
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  className?: string;
}
export const PersonalInfoField: React.FC<PersonalInfoFieldProps> = ({
  label,
  value,
  icon,
  className = "",
}) => {
  const displayValue = value && value !== "" ? value.toString() : "—";

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Label */}
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </p>

      {/* Value */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 mt-1">
        {icon && <span className="text-gray-500">{icon}</span>}
        <span className="text-sm text-gray-800 truncate">{displayValue}</span>
      </div>
    </div>
  );
};


export const PersonalInfoFieldGroup: React.FC<PersonalInfoFieldGroupProps> = ({
  title,
  fields,
  cols = { xs: 1, sm: 2, md: 2, lg: 2, xl: 2 },
  className = "",
}) => {
  return (
    <section className={`mb-6 ${className}`}>
      <h3 className="text-base font-semibold mb-3 text-gray-800">{title}</h3>
      <Grid cols={cols} gap={4}>
        {fields.map((field, index) => (
          <GridItem key={index}>
            <PersonalInfoField {...field} />
          </GridItem>
        ))}
      </Grid>
    </section>
  );
};
