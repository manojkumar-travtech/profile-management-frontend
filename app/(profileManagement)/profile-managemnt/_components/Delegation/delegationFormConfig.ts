import { FormConfig } from "@/components/custom/Form";
import { countries } from "../../_constants/constants";

export interface DelegationFormValues {
  fullname: string;
  email: string;
  issuingCountry: string;
  can_view: boolean;
  can_book: boolean;
  can_edit: boolean;
  can_delete: boolean;
  viewProfile: boolean;
  editProfile: boolean;
}

// Define switch fields with custom labels
const switchFields: { name: keyof DelegationFormValues; label: string }[] = [
  { name: "can_view", label: "Can View Trips" },
  { name: "can_book", label: "Can Book Trips" },
  { name: "can_edit", label: "Can Modify Trips" },
  { name: "can_delete", label: "Can Cancel Trips" },
  { name: "viewProfile", label: "Can View Profile" },
  { name: "editProfile", label: "Can Edit Profile" },
];

export const delegationConfig: FormConfig<DelegationFormValues> = {
  fullWidthButtons: true,
  gridCols: 2,
  sections: [
    {
      collapsible: false,
      
      fields: [
        {
          name: "fullname",
          label: "Full Name",
          type: "text",
          validation: { required: "Full name is required" },
          colSpan: 2,
        },
        {
          name: "email",
          label: "Email Address",
          type: "email",
          validation: { required: "Email address is required" },
          colSpan: 2,
        },
        {
          name: "issuingCountry",
          label: "Issuing Country *",
          type: "select",
          options: countries,
          validation: { required: "Issuing country is required" },
          colSpan: 2,
        },
        ...switchFields.map((field) => ({
          name: field.name,
          label: field.label,
          type: "switch" as const,
          colSpan: 1,
        })),
      ],
    },
  ],
};
