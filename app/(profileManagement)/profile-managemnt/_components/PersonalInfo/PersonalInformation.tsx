"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Calendar,
  Globe,
  Mail,
  Phone,
  Venus,
  UserCircle,
  Edit,
} from "lucide-react";
import { getProfileById } from "../../_actions/profileManagementApi";
import { personalInfoFormConfig } from "./personalInfoFormConfig";
import { DrawerFormDialog } from "@/app/(profileManagement)/_components/DrawerFormDialog";
import { PersonalInfoFieldGroup } from "./PersonalInfoFieldGroup";
import { Profile } from "../../_types/profileManagement";

const getDisplayValue = (value: string | null | undefined): string =>
  value || "Not specified";

export default function PersonalInformation() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const getProfileDetails = async () => {
    try {
      setLoading(true);
      const response = await getProfileById(
        "0eac8501-caa9-48a8-8bee-b512d88fbb00"
      );
      if (response.success) setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  const handleSave = async (values: any) => {
    console.log("Saving profile data:", values);
    setOpen(false);
    await getProfileDetails();
  };

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white shadow-sm p-6 flex items-center justify-center h-64">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border bg-white shadow-sm p-6 flex items-center justify-center h-64">
        <p className="text-gray-500">Profile not found</p>
      </div>
    );
  }

  const fullName = [profile.first_name, profile.middle_name, profile.last_name]
    .filter(Boolean)
    .join(" ");

  const fieldGroups = [
    {
      title: "Basic Information",
      fields: [
        {
          label: "Suffix",
          value: getDisplayValue(profile.suffix),
          icon: <User size={16} />,
        },
        { label: "Full Name", value: fullName, icon: <User size={16} /> },
        {
          label: "Preferred Name",
          value: getDisplayValue(profile.preferred_name),
          icon: <User size={16} />,
        },
        {
          label: "Date of Birth",
          value: getDisplayValue(profile.date_of_birth),
          icon: <Calendar size={16} />,
        },
        {
          label: "Gender",
          value: getDisplayValue(profile.gender),
          icon: <Venus size={16} />,
        },
        {
          label: "Nationality",
          value: getDisplayValue(profile.nationality),
          icon: <Globe size={16} />,
        },
      ],
    },
    {
      title: "Contact Information",
      fields: [
        {
          label: "Email",
          value: getDisplayValue(profile.contact_info?.email),
          icon: <Mail size={16} />,
        },
        {
          label: "Phone",
          value: getDisplayValue(profile.contact_info?.phone),
          icon: <Phone size={16} />,
        },
        {
          label: "Mobile",
          value: getDisplayValue(profile.contact_info?.mobile_phone),
          icon: <Phone size={16} />,
        },
        {
          label: "Home",
          value: getDisplayValue(profile.contact_info?.home_phone),
          icon: <Phone size={16} />,
        },
      ],
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <UserCircle className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Personal Information</h2>
        </div>
        <Button icon={<Edit/>} size="sm" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>

      {fieldGroups.map((group, index) => (
        <PersonalInfoFieldGroup key={index} {...group} />
      ))}

      <DrawerFormDialog
        open={open}
        onOpenChange={setOpen}
        title="Edit Personal Information"
        subtitle="Update your personal and contact details"
        formConfig={personalInfoFormConfig}
        defaultValues={profile}
        onSubmit={handleSave}
        width="700px"
        submitText="Save Changes"
      />
    </div>
  );
}
