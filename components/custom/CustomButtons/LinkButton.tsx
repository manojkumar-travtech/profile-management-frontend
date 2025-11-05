import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";
interface LinkButtonProps {
  children: ReactNode;
  onClick: () => void;
}
const LinkButton: React.FC<LinkButtonProps> = ({ children, onClick }) => {
  return (
    <div>
      <Button
        variant="link"
        className="text-primary-600 text-md p-0 h-auto"
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};

export default LinkButton;
