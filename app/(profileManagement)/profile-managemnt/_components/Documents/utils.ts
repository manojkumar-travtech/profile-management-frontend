// utils.ts
import { APIDocumentData, DocumentData } from "./types";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getDocumentStatus = (expiryDate: string): "active" | "expired" => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  return expiry > today ? "active" : "expired";
};

export const transformAPIDataToFormData = (
  apiData: APIDocumentData
): DocumentData => {
  return {
    id: apiData.id,
    type: apiData.type,
    document_number: apiData.document_number,
    issuing_country: apiData.issuing_country,
    issue_date: apiData.issue_date ? formatDate(apiData.issue_date) : undefined,
    expiry_date: apiData.expiry_date
      ? formatDate(apiData.expiry_date)
      : undefined,
    notes: apiData.notes || undefined,
    status: apiData.expiry_date
      ? getDocumentStatus(apiData.expiry_date)
      : "unknown",
  };
};

export const transformFormDataToAPI = (formData: DocumentData) => {
  return {
    type: formData.type,
    document_number: formData.document_number,
    issuing_country: formData.issuing_country,
    issue_date: formData.issue_date,
    expiry_date: formData.expiry_date,
    notes: formData.notes,
  };
};
