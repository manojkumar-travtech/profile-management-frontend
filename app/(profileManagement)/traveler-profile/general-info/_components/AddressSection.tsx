import { AddressBlock } from "@/app/(travelerProfile)/_components/AddressBlock";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";
import { MapPin } from "lucide-react";
import React from "react";

interface Props {
  profile: {
    address: string;
    work: string | null;
  };
}
const AddressSection: React.FC<Props> = ({ profile }) => {
  return (
    <div>
      <SectionCard
        title="Address Info"
        onEdit={() => console.log("Edit address")}
      >
        <div className="space-y-4">
          <AddressBlock
            type="Home"
            address={profile.address}
            badge="Billing Address"
            icon={MapPin}
          />
          <AddressBlock type="Work" address={profile.work} />
        </div>
      </SectionCard>
    </div>
  );
};

export default AddressSection;
