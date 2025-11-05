import { InfoGrid } from "@/app/(travelerProfile)/_components/InfoGrid";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";
import React from "react";

interface Props {
  profile: {
    verified: string | null;
    profileCreated: string | null;
    lastUpdate: string | null;
  };
}
const YourProfile: React.FC<Props> = ({ profile }) => {
  const profileFields = [
    { label: "Verified ID", value: profile.verified },
    { label: "Profile Created", value: profile.profileCreated },
    { label: "Last Update on", value: profile.lastUpdate },
  ];
  return (
    <>
      <SectionCard title="Your Profile">
        <InfoGrid fields={profileFields} columns={3} />
      </SectionCard>
    </>
  );
};

export default YourProfile;
