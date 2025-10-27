"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DocumentItem, DocumentItemProps } from "./DocumentItem";

export interface DocumentListProps {
  documents: DocumentItemProps[];
  onAddMore?: () => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onAddMore,
}) => {
  return (
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <DocumentItem key={index} {...doc} />
      ))}

      {onAddMore && (
        <div className="flex justify-start">
          <Button variant="link" onClick={onAddMore}>
            Add More
          </Button>
        </div>
      )}
    </div>
  );
};
