'use client'
import React, { useState } from "react";
import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import AddressSection from "./AddressSection";
import DocumentsSection from "./DocumentsSection";
import PasswordSection from "./PasswordSection";
import { AlertBanner } from "@/app/(travelerProfile)/_components/AlertBanner";
import { ProfileData } from "@/app/(travelerProfile)/_types/profile.types";
import YourProfile from "./YourProfile";

const GeneralInfoMain = () => {
  const [profile] = useState<ProfileData>({
    name: "Nanda Vasu",
    gender: "Female",
    nationality: "Indian",
    dob: "Jan 22, 1990",
    email: "nanda15@sample.com",
    phone: "+91 83932-34223",
    emergency: null,
    address: "1133, Sugar Avenue, Springfield, IL, 62704, USA",
    work: null,
    verified: "1236334",
    profileCreated: "Jul 22, 2014",
    lastUpdate: "May 01, 2023",
  });
  return (
    <div className="space-y-4">
      <AlertBanner
        progress={25}
        variant="info"
        title="Complete your trip adding your Room Type Preference"
        description="Based on your latest flight, hotel room, and rail/intercity bus trips up-to-date trip"
        actionText="Add Now"
        onAction={() => console.log("Add room preference")}
      />
      <BasicInfo profile={profile} />
      <ContactInfo profile={profile} />
      <AddressSection profile={profile} />
      <YourProfile profile={profile} />
      <DocumentsSection />
      <PasswordSection />
    </div>
  );
};

export default GeneralInfoMain;
