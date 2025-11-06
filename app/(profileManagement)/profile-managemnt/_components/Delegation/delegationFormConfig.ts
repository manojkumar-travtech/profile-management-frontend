import { FormConfig } from "@/components/custom/Form";
import { countries } from "../../_constants/constants";

export interface DelegationFormValues {
  fullname: string;
  email: string;
  issuingCountry: string;
  viewTrips: boolean;
  bookTrips: boolean;
  modifyTrips: boolean;
  cancelTrips: boolean;
  viewProfile: boolean;
  editProfile: boolean;
}

const switchFields: (keyof Pick<
  DelegationFormValues,
  | "viewTrips"
  | "bookTrips"
  | "modifyTrips"
  | "cancelTrips"
  | "viewProfile"
  | "editProfile"
>)[] = [
  "viewTrips",
  "bookTrips",
  "modifyTrips",
  "cancelTrips",
  "viewProfile",
  "editProfile",
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
        ...switchFields.map((name) => ({
          name,
          label:
            name
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase()), 
          type: "switch" as const,
          colSpan: 1,
        })),
      ],
    },
  ],
};
