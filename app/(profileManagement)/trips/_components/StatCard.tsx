import { Typography } from "@/components/custom/Typography";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
}) => (
  <div className="bg-white rounded border border-gray-200 p-5">
    <div className="flex items-center justify-between">
      <div>
        <Typography
          as="p"
          size="xs"
          weight="medium"
          className="uppercase tracking-wide mb-1"
        >
          {title}
        </Typography>
        <Typography as="p" size="2xl" weight="bold">
          {value}
        </Typography>
      </div>
      <div
        className={`w-10 h-10 ${iconBgColor} rounded flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
