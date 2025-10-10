import { FormConfig } from "@/components/custom/Form";

export const createEventConfig: FormConfig<any> = {
  title: "",
  description: "",
  fullWidthButtons: true,
  gridCols: 4,
  sections: [
    {
      title: "",
      collapsible: false,
      fields: [
        {
          name: "company",
          label: "Company",
          type: "select",
          placeholder: "Choose company",
          options: [
            { label: "ABC Corp", value: "abc_corp" },
            { label: "XYZ Ltd", value: "xyz_ltd" },
            { label: "MegaTech", value: "megatech" },
          ],
          validation: { required: "Company is required" },
        },
        {
          name: "clientCompany",
          label: "Client Company",
          type: "select",
          placeholder: "Choose company",
          options: [
            { label: "Client A Client A", value: "client_a" },
            { label: "Client B Client A", value: "client_b" },
            { label: "Client C Client A", value: "client_c" },
          ],
        },
      ],
    },
    {
      title: "(Choose one event admin)",
      collapsible: false,
      fields: [
        {
          name: "eventAdmin",
          label: "Event Admin",
          type: "select",
          placeholder: "Choose event admin",
          options: [
            { label: "Alice Johnson", value: "alice_johnson" },
            { label: "Bob Smith", value: "bob_smith" },
            { label: "Carol White", value: "carol_white" },
          ],
          validation: { required: "Event Admin is required" },
        },
        {
          name: "eventCoordinator",
          label: "Event Coordinator",
          type: "select",
          placeholder: "Choose event coordinator",
          options: [
            { label: "David Lee", value: "david_lee" },
            { label: "Eva Green", value: "eva_green" },
            { label: "Frank Moore", value: "frank_moore" },
          ],
        },
      ],
    },
    {
      title: "Event Details",
      collapsible: false,
      fields: [
        {
          name: "eventName",
          label: "Event Name",
          type: "text",
          placeholder: "Event Name",
          colSpan: 1,
          validation: { required: "Event Name is required" },
        },
        {
          name: "eventStartDate",
          label: "Event Start Date",
          type: "date",
          validation: { required: "Start Date is required" },
          calendar: {
            datePreset: "futureOnly",
            minDate: new Date(),
            maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            closeOnSelect: true,
          },
        },
        {
          name: "eventEndDate",
          label: "Event End Date",
          type: "date",
          validation: { required: "End Date is required" },
        },
        {
          name: "startTime",
          label: "Start Time",
          type: "time",
          validation: { required: "Start Time is required" },
        },
        {
          name: "endTime",
          label: "End Time",
          type: "time",
        },
        {
          name: "airportCode",
          label: "Airport Code",
          type: "select",
          placeholder: "Choose the airport code",
          colSpan: 2,
          options: [
            { label: "JFK", value: "JFK" },
            { label: "LAX", value: "LAX" },
            { label: "ORD", value: "ORD" },
          ],
        },
        {
          name: "address",
          label: "Address/Venue",
          type: "text",
          placeholder: "Location",
          colSpan: 2,
        },
      ],
    },
    {
      title: "Restrictions",
      collapsible: false,
      fields: [
        {
          name: "earliestDepartureDate",
          label: "Earliest Departure Date",
          type: "date",
          calendar: {
            datePreset: "futureOnly",
            minDate: new Date(),
            maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            closeOnSelect: true,
          },
        },
        {
          name: "latestReturnDate",
          label: "Latest Return Date",
          type: "date",
          calendar: {
            datePreset: "futureOnly",
            minDate: new Date(),
            maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            closeOnSelect: true,
          },
        },
        {
          name: "airlinesToAvoid",
          label: "Airlines To Avoid",
          type: "select",
          placeholder: "Select...",
          options: [
            { label: "Delta", value: "delta" },
            { label: "American Airlines", value: "aa" },
            { label: "United", value: "united" },
          ],
        },
      ],
    },
  ],
};

export const additionalFormConfig: FormConfig<any> = {
  fullWidthButtons: true,
  gridCols: 2,
  sections: [
    {
      title: "Media Upload",
      collapsible: false,
      fields: [
        {
          name: "eventBanner",
          label: "Event Banner",
          type: "file",
          validation: { required: "Event Banner is required" },
        },
        {
          name: "customerLogo",
          label: "Customer Logo",
          type: "textarea",
        },
        {
          name: "reminderDays",
          label: "Reminder Days Before Event",
          type: "select",
          placeholder: "Select days",
          options: [
            { label: "1 Day", value: "1" },
            { label: "3 Days", value: "3" },
            { label: "7 Days", value: "7" },
            { label: "14 Days", value: "14" },
          ],
          validation: { required: "End Date is required" },
        },
        {
          name: "reminderTime",
          label: "Reminder Time",
          type: "select",
          placeholder: "Select time",
          options: [
            { label: "Morning", value: "morning" },
            { label: "Afternoon", value: "afternoon" },
            { label: "Evening", value: "evening" },
          ],
          conditional: {
            field: "reminderDays",
            value: ["1", "3", "7"],
          },
          validation: { required: "reminderTime is required" },
        },
        {
          name: "maxAttendees",
          label: "Maximum Attendees",
          type: "number",
          placeholder: "Enter number",
        },
      ],
    },
  ],
};
