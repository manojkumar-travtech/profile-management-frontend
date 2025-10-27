"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, FileText, Car, Lock } from "lucide-react";
import { SectionCard } from "../../_components/SectionCard";
import { AlertBanner } from "../../_components/AlertBanner";
import { ProfileHeader } from "../../_components/ProfileHeader";
import { InfoGrid } from "../../_components/InfoGrid";
import { AddressBlock } from "../../_components/AddressBlock";
import { DocumentList } from "../../_components/DocumentList";
import { DocumentItem } from "../../_components/DocumentItem";
import TravelerMainPageLayout from "../../_components/TravelerMainPageLayout";
import { ProfileData } from "../../_types/profile.types";

const GeneralInfoPage: React.FC = () => {
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

  const basicInfoFields = [
    { label: "Name", value: profile.name },
    { label: "Gender", value: profile.gender },
    { label: "Nationality", value: profile.nationality },
    { label: "Date of Birth", value: profile.dob },
  ];

  const contactFields = [
    { label: "Email", value: profile.email, icon: Mail },
    { label: "Phone", value: profile.phone, icon: Phone },
    { label: "Emergency contact", value: profile.emergency },
  ];

  const profileFields = [
    { label: "Verified ID", value: profile.verified },
    { label: "Profile Created", value: profile.profileCreated },
    { label: "Last Update on", value: profile.lastUpdate },
  ];

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
    <TravelerMainPageLayout title=" General Info" subtitle="Traveler details recorded for personalized experiences.">
        <div className="space-y-4">
          <AlertBanner
            progress={25}
            variant="info"
            title="Complete your trip adding your Room Type Preference"
            description="Based on your latest flight, hotel room, and rail/intercity bus trips up-to-date trip"
            actionText="Add Now"
            onAction={() => console.log("Add room preference")}
          />

          <SectionCard
            title="Basic Info"
            description="Update your photo and personal details here."
            onEdit={() => console.log("Edit basic info")}
          >
            <ProfileHeader
              avatar="/placeholder.svg"
              name={profile.name}
              fields={basicInfoFields}
            />
          </SectionCard>

          <SectionCard
            title="Contact Info"
            onEdit={() => console.log("Edit contact info")}
          >
            <InfoGrid fields={contactFields} columns={3} />
          </SectionCard>

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

          <SectionCard title="Your Profile">
            <InfoGrid fields={profileFields} columns={3} />
          </SectionCard>

          <SectionCard
            title="Documents"
            description="Documents for security, KYC, travel requirements, and trip/state roadwear travel services."
          >
            <DocumentList
              documents={documents}
              onAddMore={() => console.log("Add more documents")}
            />
          </SectionCard>

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
    </TravelerMainPageLayout>
  );
};

export default GeneralInfoPage;
