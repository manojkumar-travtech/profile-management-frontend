import { CalendarFieldConfig, FormConfig } from "@/components/custom/Form";

const calenderConfig: CalendarFieldConfig = {
  datePreset: "futureOnly",
  minDate: new Date(),
  maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  closeOnSelect: true,
};
export interface EventDetailsFormFields {
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  startTime: string;
  endTime: string;
  venueName: string;
  airportCode: string;
  venueCompleteAddress: string;
  aboutEvent: string;
  eventName1:string
}
export const eventDetailsConfig: FormConfig<EventDetailsFormFields> = {
  title: "",
  description: "",
  gridCols: 4,
  sections: [
    {
      title: "",
      collapsible: false,
      fields: [
        {
          name: "eventName",
          label: "Event Name",
          type: "text",
          placeholder: "Enter Event Name",
          colSpan: 4,
        },
         {
          name: "eventName1",
          label: "Event Name1",
          type: "text",
          placeholder: "Enter Event Name",
          validation: { required: "Event Name is required", min: 3 },
          colSpan: 4,
        },
        {
          name: "eventStartDate",
          label: "Start Date",
          type: "date",
          placeholder: "Choose Date",
          validation: { required: "Start Date is required" },
          calendar: calenderConfig,
          colSpan: 1,
        },
        {
          name: "eventEndDate",
          label: "End Date",
          type: "date",
          placeholder: "Choose Date",
          validation: { required: "End Date is required" },
          calendar: calenderConfig,
          colSpan: 1,
        },
        {
          name: "startTime",
          label: "Start Time",
          placeholder: "Date",
          type: "time",
          validation: { required: "Start Time is required" },
        },
        {
          name: "endTime",
          label: "End Time",
          placeholder: "Date",
          type: "time",
          validation: { required: "End Time is required" },
        },
        {
          name: "venueName",
          label: "Venue Name",
          type: "text",
          placeholder: "Enter Venue Name",
          validation: { required: "Enter Venue Name is required", min: 3 },
          colSpan: 2,
        },
        {
          name: "airportCode",
          label: "Airport Code",
          type: "select",
          placeholder: "Select Airport Code",
          options: [
            { label: "Alice Johnson", value: "alice_johnson" },
            { label: "Bob Smith", value: "bob_smith" },
            { label: "Carol White", value: "carol_white" },
          ],
          validation: { required: "Select Airport Code is required" },
          colSpan: 2,
        },
        {
          name: "venueCompleteAddress",
          label: "Venue Complete Address",
          type: "text",
          placeholder: "Enter Venue Complete Address",
          validation: {
            required: "Venue Complete Address is required",
            min: 10,
          },
          colSpan: 4,
        },
        {
          name: "aboutEvent",
          label: "About Event",
          type: "textarea",
          placeholder: "Enter What is this event about...",
          validation: {
            required: "Venue Complete Address is required",
            min: 10,
          },
          colSpan: 4,
        },
      ],
    },
  ],
};
