import { DocumentItem } from "@/app/(travelerProfile)/_components/DocumentItem";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";
import { Lock } from "lucide-react";

const PasswordSection = () => {
  return (
    <div>
      <SectionCard
        title="Password"
        description="A secure password helps protect your Travel Account"
      >
        <DocumentItem
          icon={Lock}
          title="••••••••••"
          onEdit={() => console.log("Update password")}
        />
      </SectionCard>
    </div>
  );
};

export default PasswordSection;
