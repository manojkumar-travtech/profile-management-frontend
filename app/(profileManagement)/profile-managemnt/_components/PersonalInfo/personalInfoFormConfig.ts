import { CalendarFieldConfig } from "@/components/custom/Form";

const calendarConfig: CalendarFieldConfig = {
  datePreset: "pastOnly",
  minDate: new Date(),
  closeOnSelect: true,
};
export const personalInfoFormConfig = {
  fullWidthButtons: true,
  gridCols: 2,
  sections: [
    {
      title: "Basic Information",
      collapsible: false,
      fields: [
        {
          name: "suffix",
          label: "Suffix",
          type: "text",
          placeholder: "Jr., Sr., etc.",
        },
        {
          name: "first_name",
          label: "First Name",
          type: "text",
          placeholder: "John",
          validation: { required: "First name is required" },
        },
        {
          name: "middle_name",
          label: "Middle Name",
          type: "text",
          placeholder: "Michael",
        },
        {
          name: "last_name",
          label: "Last Name *",
          type: "text",
          placeholder: "Doe",
          validation: { required: "Last name is required" },
        },
        {
          name: "preferred_name",
          label: "Preferred Name",
          type: "text",
          placeholder: "Johnny",
        },
        {
          name: "date_of_birth",
          label: "Date of Birth",
          type: "date",
        },
        {
          name: "gender",
          label: "Gender",
          type: "select",
          options: [
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Other", value: "Other" },
            { label: "Prefer not to say", value: "Prefer not to say" },
          ],
          placeholder: "Male",
          calendar: calendarConfig,
        },
        {
          name: "nationality",
          label: "Nationality",
          type: "text",
          placeholder: "US",
        },
      ],
    },
    {
      title: "Contact Information",
      collapsible: false,
      fields: [
        {
          name: "contact_info.email",
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        {
          name: "contact_info.phone",
          label: "Phone Number",
          type: "text",
          placeholder: "+1-555-0123",
        },
        {
          name: "contact_info.mobile_phone",
          label: "Mobile Phone",
          type: "text",
          placeholder: "+1-555-0123",
        },
        {
          name: "contact_info.home_phone",
          label: "Home Phone",
          type: "text",
          placeholder: "+1-555-0124",
        },
      ],
    },
  ],
};
