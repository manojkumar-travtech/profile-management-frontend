import { calendarConfig, countries, documentTypes } from "../../_constants/constants";
import { DocumentData } from "./types";

export const formConfig = {
  fullWidthButtons: true,
  gridCols: 2,
  sections: [
    {
      collapsible: false,
      fields: [
        {
          name: "type",
          label: "Document Type",
          type: "select",
          options: documentTypes,
          validation: { required: "Document type is required" },
          colSpan: 2,
        },
        {
          name: "document_number",
          label: "Document Number",
          type: "text",
          validation: { required: "Document number is required" },
          colSpan: 2,
        },
        {
          name: "issuing_country",
          label: "Issuing Country",
          type: "select",
          options: countries,
          validation: { required: "Issuing country is required" },
          colSpan: 2,
        },
        {
          name: "issue_date",
          label: "Issue Date",
          type: "date",
          colSpan: 2,
        },
        {
          name: "expiry_date",
          label: "Expiry Date",
          type: "date",
          colSpan: 2,
          calendar: calendarConfig,
        },
        {
          name: "notes",
          label: "Notes (Optional)",
          type: "textarea",
          colSpan: 2,
        },
        {
          name: "frontSide",
          label: "Front Side",
          type: "file",
          colSpan: 1,
        },
        {
          name: "backSide",
          label: "Back Side (Optional)",
          type: "file",
          colSpan: 1,
        },
      ],
    },
  ],
};

export const defaultFormValues: DocumentData = {
  id: "",
  type: "",
  document_number: "",
  issuing_country: "",
  issue_date: undefined,
  expiry_date: undefined,
  notes: '',
  frontSide: undefined,
  backSide: undefined,
};