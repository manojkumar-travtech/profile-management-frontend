import React, { useState } from "react";
import { ProfileHeader } from "@/app/(travelerProfile)/_components/ProfileHeader";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";
import EditModal from "@/components/custom/Modal/EditModel";
import { FormConfig } from "@/components/custom/Form";

interface ProfileData {
  name: string;
  gender: string;
  nationality: string;
  dob: string;
}

interface Props {
  profile: ProfileData;
}

const formConfig: FormConfig<ProfileData> = {
  gridCols: 2,
  sections: [
    {
      collapsible: false,
      fields: [
        {
          name: "name",
          label: "Full Name",
          type: "text",
          colSpan: 1,
        },
        {
          name: "gender",
          label: "Gender",
          type: "select",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ],
          colSpan: 2,
        },
        {
          name: "nationality",
          label: "Nationality",
          type: "select",
          options: [
            { label: "Indian", value: "Indian" },
            { label: "American", value: "American" },
            { label: "Canadian", value: "Canadian" },
            { label: "Other", value: "Other" },
          ],
          colSpan: 2,
        },
        {
          name: "dob",
          label: "Date of Birth",
          type: "date",
          colSpan: 2,
        },
      ],
    },
  ],
};

const BasicInfo: React.FC<Props> = ({ profile }) => {
  const [open, setOpen] = useState(false);

  const basicInfoFields = [
    { label: "Name", value: profile.name },
    { label: "Gender", value: profile.gender },
    { label: "Nationality", value: profile.nationality },
    { label: "Date of Birth", value: profile.dob },
  ];

  const handleSubmit = (data: ProfileData) => {
    console.log("data", data);
  };

  return (
    <>
      <SectionCard
        title="Basic Info"
        description="Update your photo and personal details here."
        onEdit={() => setOpen(true)}
      >
        <ProfileHeader
          avatar="/placeholder.svg"
          name={profile.name}
          fields={basicInfoFields}
        />
      </SectionCard>

      <EditModal<ProfileData>
        open={open}
        onClose={() => setOpen(false)}
        title="User Information"
        formConfig={formConfig}
        onSubmit={handleSubmit}
        loading={false}
        defaultValues={profile}
      />
    </>
  );
};

export default BasicInfo;
