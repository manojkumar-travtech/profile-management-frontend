import { FormConfig } from "@/components/custom/Form";

export interface EventHandlersFormFields {
  company1: string;
  clientCompany1: string;
  invitesToCoordinators1: boolean;
}

export const eventHandlersConfig: FormConfig<EventHandlersFormFields> = {
  title: "",
  description: "",
  gridCols: 4,
  sections: [
    {
      title: "",
      collapsible: false,
      fields: [
        {
          name: "company1",
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
          name: "clientCompany1",
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
          name: "invitesToCoordinators1",
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
    },
  ],
};
