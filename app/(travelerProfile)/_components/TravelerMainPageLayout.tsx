import { Typography } from "@/components/custom/Typography";
import React from "react";

interface TravelerMainPageLayoutrProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

const TravelerMainPageLayout: React.FC<TravelerMainPageLayoutrProps> = ({
  title,
  subtitle,
  className = "",
  children,
}) => {
  return (
    <div className={`max-w-6xl mx-auto pb-4 ${className}`}>
      <div
        className={`flex flex-col items-center justify-center text-center`}
      >
        <Typography
          variant="display"
          size="md"
          weight="bold"
          className="break-words w-full"
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="text"
            size="md"
            weight="medium"
            className="break-words w-full mt-2"
          >
            {subtitle}
          </Typography>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default TravelerMainPageLayout;
