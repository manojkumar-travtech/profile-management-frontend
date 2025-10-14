import { FormConfig } from "@/components/custom/Form";

export interface PersonalizingFormFields {
  company2: string;
  clientCompany2: string;
  invitesToCoordinators2: boolean;
}

export const personalizingConfig: FormConfig<PersonalizingFormFields> = {
  title: "",
  description: "",
  gridCols: 4,
  fields: [
    {
      name: "company2",
      label: "Company",
      type: "select",
      placeholder: "Select Company",
      options: [
        { label: "Alice Johnson", value: "alice_johnson" },
        { label: "Bob Smith", value: "bob_smith" },
        { label: "Carol White", value: "carol_white" },
      ],
      validation: { required: "Company is required" },
      colSpan: 4,
    },
    {
      name: "clientCompany2",
      label: "Client Company",
      type: "select",
      options: [
        { label: "Alice Johnson", value: "alice_johnson" },
        { label: "Bob Smith", value: "bob_smith" },
        { label: "Carol White", value: "carol_white" },
      ],
      placeholder: "Select Client Company",
      validation: { required: "Client Companyis required" },
      colSpan: 4,
    },
    {
      name: "invitesToCoordinators2",
      label: "Assign to all of your Coordinators",
      description:
        "All of your coordinators will be able to invite guests for this event",
      type: "checkbox",
      colSpan: 4,
      style: {
        border: "0.5px solid gray",
        padding: "10px",
      },
    },
  ],
};
