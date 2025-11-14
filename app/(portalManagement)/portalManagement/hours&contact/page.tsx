"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { DynamicFormRef } from "@/components/custom/Form";
import { ConfirmationModal } from "@/components/custom/ConfirmationModal";

import {
  ActiveSectionsType,
  DeleteConfirmType,
  OpenAccordionsType,
  SavedDataType,
  defaultData,
} from "./types";
import { statusOptions, timeZoneOptions } from "./constants";
import { useSaveResetHandlers } from "./useSaveResetHandlers";
import { SectionRenderer } from "./SectionRenderer";
import { getPortalInfo } from "./api/hoursService";
import { PageLayout } from "@/components/layout/PageLayout";

export default function AdminPage() {
  // ---------- State ----------
  const [topCardsData, setTopCardsData] = useState(defaultData.topCards);
  const [departmentsData, setDepartmentsData] = useState(
    defaultData.departments
  );
  const [holidaysData, setHolidaysData] = useState(defaultData.holidays);
  const [timeZonesData, setTimeZonesData] = useState(defaultData.timeZones);
  const [liveChatData, setLiveChatData] = useState(defaultData.liveChat);
  const [noticeData, setNoticeData] = useState(defaultData.notice);

  const [savedData, setSavedData] = useState<SavedDataType>(defaultData);
  const [openAccordions, setOpenAccordions] = useState<OpenAccordionsType>({});
  const [activeSections, setActiveSections] = useState<ActiveSectionsType>({
    topCards: true,
    departments: true,
    holidays: true,
    timeZones: true,
    liveChat: true,
    notice: true,
  });

  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmType>({
    isOpen: false,
    sectionName: "",
    onConfirm: () => {},
  });
  const [resetConfirm, setResetConfirm] = useState(false);

  // ---------- Refs ----------
  const topCardsRefs = useRef<(DynamicFormRef<any> | null)[]>([]);
  const departmentsRefs = useRef<(DynamicFormRef<any> | null)[]>([]);
  const holidaysRefs = useRef<(DynamicFormRef<any> | null)[]>([]);
  const timeZonesRefs = useRef<(DynamicFormRef<any> | null)[]>([]);
  const liveChatRef = useRef<DynamicFormRef<any> | null>(null);
  const noticeRef = useRef<DynamicFormRef<any> | null>(null);

  // ---------- Current data snapshot ----------
  const currentData: SavedDataType = {
    topCards: topCardsData,
    departments: departmentsData,
    holidays: holidaysData,
    timeZones: timeZonesData,
    liveChat: liveChatData,
    notice: noticeData,
  };

  const setAllData = (data: SavedDataType) => {
    console.log("data", data);
    setTopCardsData(data.topCards);
    setDepartmentsData(data.departments);
    setHolidaysData(data.holidays);
    setTimeZonesData(data.timeZones);
    setLiveChatData(data.liveChat);
    setNoticeData(data.notice);
  };

  const { isSaving, saveStatus, errorSections, handleSaveAll, handleReset } =
    useSaveResetHandlers(
      currentData,
      "hours_contact",
      "Hours And Contact",
      "Admin",
      setSavedData,
      setAllData
    );

  useEffect(() => {
    const loadData = async () => {
      try {
        const data =
          (await getPortalInfo("hours_contact"))?.form_data ?? defaultData;

        setAllData(data);
        setSavedData(data);
      } catch (error) {
        console.error("Failed to load data:", error);
        // Fallback to default data on error
        setAllData(defaultData);
        setSavedData(defaultData);
      }
    };

    loadData();
  }, []);

  const toggleSection = (key: keyof ActiveSectionsType) => {
    setActiveSections((s) => ({ ...s, [key]: !s[key] }));
  };

  const toggleAccordion = (section: string, index: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [section]: prev[section]?.includes(index)
        ? prev[section].filter((i) => i !== index)
        : [...(prev[section] || []), index],
    }));
  };

  const handleDelete = (
    sectionName: string,
    data: any[],
    setData: (d: any[]) => void,
    index: number
  ) => {
    setDeleteConfirm({
      isOpen: true,
      sectionName,
      onConfirm: () => {
        setData(data.filter((_, i) => i !== index));
        setDeleteConfirm({
          isOpen: false,
          sectionName: "",
          onConfirm: () => {},
        });
      },
    });
  };

  const confirmResetHandler = () => {
    handleReset(savedData);
    setResetConfirm(false);
  };
  // ---------- UI ----------
  return (
    <PageLayout
      title="Admin Dashboard"
      subtitle=" Manage support configurations"
      rightSection={
        <Button onClick={handleSaveAll} className="gap-2" disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save All
        </Button>
      }
    >
      <div className="mx-auto space-y-6">
        <SectionRenderer
          title="Top Cards"
          sectionKey="topCards"
          isActive={activeSections.topCards}
          onToggle={() => toggleSection("topCards")}
          hasError={errorSections.includes("Top Cards")}
          refsArray={topCardsRefs}
          data={topCardsData}
          setData={setTopCardsData}
          fields={[
            { name: "title", label: "Title", type: "text", required: true },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: statusOptions,
              required: true,
            },
          ]}
          openItems={openAccordions.topCards || []}
          onToggleAccordion={(idx) => toggleAccordion("topCards", idx)}
          onDelete={(idx) =>
            handleDelete("Top Cards", topCardsData, setTopCardsData, idx)
          }
        />

        <SectionRenderer
          title="Departments"
          sectionKey="departments"
          isActive={activeSections.departments}
          onToggle={() => toggleSection("departments")}
          hasError={errorSections.includes("Departments")}
          refsArray={departmentsRefs}
          data={departmentsData}
          setData={setDepartmentsData}
          fields={[
            {
              name: "name",
              label: "Department Name",
              type: "text",
              required: true,
            },
            {
              name: "desc",
              label: "Description",
              type: "text",
              required: true,
            },
            {
              name: "time",
              label: "Operating Hours",
              type: "text",
              required: true,
            },
            { name: "phone", label: "Phone", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
          ]}
          openItems={openAccordions.departments || []}
          onToggleAccordion={(idx) => toggleAccordion("departments", idx)}
          onDelete={(idx) =>
            handleDelete(
              "Departments",
              departmentsData,
              setDepartmentsData,
              idx
            )
          }
        />

        <SectionRenderer
          title="Holidays"
          sectionKey="holidays"
          isActive={activeSections.holidays}
          onToggle={() => toggleSection("holidays")}
          hasError={errorSections.includes("Holidays")}
          refsArray={holidaysRefs}
          data={holidaysData}
          setData={setHolidaysData}
          fields={[
            {
              name: "holiday",
              label: "Holiday Name",
              type: "text",
              required: true,
            },
            { name: "date", label: "Date", type: "date", required: true },
          ]}
          openItems={openAccordions.holidays || []}
          onToggleAccordion={(idx) => toggleAccordion("holidays", idx)}
          onDelete={(idx) =>
            handleDelete("Holidays", holidaysData, setHolidaysData, idx)
          }
        />

        <SectionRenderer
          title="Time Zones"
          sectionKey="timeZones"
          isActive={activeSections.timeZones}
          onToggle={() => toggleSection("timeZones")}
          hasError={errorSections.includes("Time Zones")}
          refsArray={timeZonesRefs}
          data={timeZonesData}
          setData={setTimeZonesData}
          fields={[
            {
              name: "zone",
              label: "Zone Name",
              type: "text",
              required: true,
            },
            {
              name: "tz",
              label: "Time Zone",
              type: "select",
              options: timeZoneOptions,
              required: true,
            },
          ]}
          openItems={openAccordions.timeZones || []}
          onToggleAccordion={(idx) => toggleAccordion("timeZones", idx)}
          onDelete={(idx) =>
            handleDelete("Time Zones", timeZonesData, setTimeZonesData, idx)
          }
        />

        <SectionRenderer
          title="Live Chat Settings"
          sectionKey="liveChat"
          isActive={activeSections.liveChat}
          onToggle={() => toggleSection("liveChat")}
          hasError={errorSections.includes("Live Chat Settings")}
          isObject
          refObject={liveChatRef as any}
          data={liveChatData}
          setData={setLiveChatData}
          fields={[
            {
              name: "availability",
              label: "Availability",
              type: "text",
              required: true,
            },
            {
              name: "waitTime",
              label: "Wait Time",
              type: "text",
              required: true,
            },
            {
              name: "languages",
              label: "Languages",
              type: "text",
              required: true,
            },
          ]}
        />

        <SectionRenderer
          title="Emergency Notice"
          sectionKey="notice"
          isActive={activeSections.notice}
          onToggle={() => toggleSection("notice")}
          hasError={errorSections.includes("Emergency Notice")}
          isObject
          refObject={noticeRef as any}
          data={noticeData}
          setData={setNoticeData}
          fields={[
            {
              name: "text",
              label: "Notice Text",
              type: "textarea",
              required: true,
            },
            {
              name: "phone",
              label: "Emergency Phone",
              type: "text",
              required: true,
            },
          ]}
        />
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={deleteConfirm.isOpen}
        onClose={() =>
          setDeleteConfirm({
            isOpen: false,
            sectionName: "",
            onConfirm: () => {},
          })
        }
        onConfirm={deleteConfirm.onConfirm}
        title="Delete Item"
        description={`Are you sure you want to delete this item from ${deleteConfirm.sectionName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      <ConfirmationModal
        isOpen={resetConfirm}
        onClose={() => setResetConfirm(false)}
        onConfirm={confirmResetHandler}
        title="Reset All Changes"
        description="Are you sure you want to discard all unsaved changes?"
        confirmText="Reset"
        cancelText="Cancel"
        variant="destructive"
      />
    </PageLayout>
  );
}
