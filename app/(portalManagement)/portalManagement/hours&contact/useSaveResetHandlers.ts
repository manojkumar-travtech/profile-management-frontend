"use client";

import { useState } from "react";
import { SavePortalInfo } from "./api/hoursService";

export interface PortalSection {
  section_key: string;
  section_name: string;
  form_data: any;
  last_updated_by: string;
}

export function useSaveResetHandlers(
  currentData: any,
  sectionKey: string,
  sectionName: string,
  lastUpdatedBy: string,
  setSavedData: (data: any) => void,
  setAllData: (data: any) => void
) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | "">("");
  const [errorSections, setErrorSections] = useState<string[]>([]);

  const handleSaveAll = async () => {
    setIsSaving(true);
    setErrorSections([]);

    try {
      const structuredData: PortalSection = {
        section_key: sectionKey,
        section_name: sectionName,
        form_data: currentData,
        last_updated_by: lastUpdatedBy,
      };

      const response = await SavePortalInfo(structuredData);
      setSavedData(response);
      setSaveStatus("success");
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus("error");
      setErrorSections([sectionKey]);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = (savedData: any) => {
    setAllData(savedData);
    setSaveStatus("");
    setErrorSections([]);
  };

  return {
    isSaving,
    saveStatus,
    errorSections,
    handleSaveAll,
    handleReset,
  };
}
