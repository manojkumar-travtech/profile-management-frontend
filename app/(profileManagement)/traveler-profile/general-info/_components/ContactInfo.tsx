import { InfoGrid } from "@/app/(travelerProfile)/_components/InfoGrid";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";
import { Mail, Phone } from "lucide-react";
import React, { useState } from "react";

interface Props {
  profile: {
    email: string;
    phone: string;
    emergency: string | null;
  };
}

const ContactInfo: React.FC<Props> = ({ profile }) => {
  const [open, setOpen] = useState(false);

  const contactFields = [
    { label: "Email", value: profile.email, icon: Mail },
    { label: "Phone", value: profile.phone, icon: Phone },
    { label: "Emergency contact", value: profile.emergency },
  ];
  return (
    <>
      <SectionCard title="Contact Info" onEdit={() => setOpen(true)}>
        <InfoGrid fields={contactFields} columns={3} />
      </SectionCard>
    </>
  );
};

export default ContactInfo;
