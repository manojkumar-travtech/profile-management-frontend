import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Reusable Tailwind-based Card wrapper
 * (no shadcn, plain flexible container)
 */
const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-lg border bg-gray-50 p-4 hover:bg-gray-100 transition cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
