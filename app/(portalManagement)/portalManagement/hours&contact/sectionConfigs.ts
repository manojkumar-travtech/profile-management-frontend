import { statusOptions, timeZoneOptions } from "./constants";
import { FieldConfig, SavedDataType } from "./types";

export interface SectionConfig {
  key: keyof SavedDataType;
  title: string;
  fields: FieldConfig[];
  isObject?: boolean;
}

export const sectionConfigs: SectionConfig[] = [
  {
    key: "topCards",
    title: "Top Cards",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: statusOptions,
        required: true,
      },
    ],
  },
  {
    key: "departments",
    title: "Departments",
    fields: [
      { name: "name", label: "Department Name", type: "text", required: true },
      { name: "desc", label: "Description", type: "text", required: true },
      { name: "time", label: "Operating Hours", type: "text", required: true },
      { name: "phone", label: "Phone", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
    ],
  },
  {
    key: "holidays",
    title: "Holidays",
    fields: [
      { name: "holiday", label: "Holiday Name", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
    ],
  },
  {
    key: "timeZones",
    title: "Time Zones",
    fields: [
      { name: "zone", label: "Zone Name", type: "text", required: true },
      {
        name: "tz",
        label: "Time Zone",
        type: "select",
        options: timeZoneOptions,
        required: true,
      },
    ],
  },
  {
    key: "liveChat",
    title: "Live Chat Settings",
    isObject: true,
    fields: [
      {
        name: "availability",
        label: "Availability",
        type: "text",
        required: true,
      },
      { name: "waitTime", label: "Wait Time", type: "text", required: true },
      { name: "languages", label: "Languages", type: "text", required: true },
    ],
  },
  {
    key: "notice",
    title: "Emergency Notice",
    isObject: true,
    fields: [
      { name: "text", label: "Notice Text", type: "textarea", required: true },
      { name: "phone", label: "Emergency Phone", type: "text", required: true },
    ],
  },
];
