import { DocumentList } from "@/app/(travelerProfile)/_components/DocumentList";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";
import { Car, FileText } from "lucide-react";
import React from "react";

const DocumentsSection = () => {
  const documents = [
    {
      icon: FileText,
      title: "Passport",
      subtitle: "P65123X904",
      meta: "Exp. On Jul 29, 2026",
      onEdit: () => console.log("Edit passport"),
    },
    {
      icon: Car,
      title: "Driving License",
      subtitle: "DRV1234X57",
      meta: "Exp. On May 22, 2024",
      onEdit: () => console.log("Edit license"),
    },
  ];
  return (
    <>
      <SectionCard
        title="Documents"
        description="Documents for security, KYC, travel requirements, and trip/state roadwear travel services."
      >
        <DocumentList
          documents={documents}
          onAddMore={() => console.log("Add more documents")}
        />
      </SectionCard>
    </>
  );
};

export default DocumentsSection;
