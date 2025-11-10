"use client";

import React, { useEffect, useState } from "react";
import ProfileManagementMainPageLayout from "@/app/(profileManagement)/_components/ProfileManagementMainPageLayout";
import {
  addLoyaltyProgram,
  getlayaltyPrograms,
  updateLoyaltyProgram,
} from "../../_actions/profileManagementApi";
import AddProgramButton from "./AddLayaltyProgram";
import { LoyaltyProgram } from "../../_types/profileManagement";
import { Tabs } from "./_components/Tabs";
import { LoadingState } from "./_components/LoadingState";
import { EmptyState } from "./_components/EmptyState";
import ProgramCard from "./_components/ProgramCard";

export default function LoyaltyPrograms() {
  const [activeTab, setActiveTab] = useState("all");
  const [programs, setPrograms] = useState<LoyaltyProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProgram, setEditingProgram] = useState<LoyaltyProgram | null>(null);
  const [editingId, setEditingId] = useState<string | number | null>(null); // ✅ store ID here

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await getlayaltyPrograms();
      if (res?.success && Array.isArray(res.data)) {
        setPrograms(res.data);
      } else {
        setError("Failed to load loyalty programs.");
      }
    } catch {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const getFilteredPrograms = () =>
    activeTab === "all"
      ? programs
      : programs.filter((p) => p.provider_type === activeTab);

  const getProgramCount = (type: string) =>
    type === "all"
      ? programs.length
      : programs.filter((p) => p.provider_type === type).length;

  const filteredPrograms = getFilteredPrograms();

  const handleAdd = async (newProgram: LoyaltyProgram) => {
    await addLoyaltyProgram(newProgram);
    await fetchPrograms();
  };

  // ✅ Save both the program and the id
  const handleEdit = (program: LoyaltyProgram, id: number | string) => {
    setEditingProgram(program);
    setEditingId(id);
  };

  // ✅ Use the stored id here
  const handleUpdate = async (updated: LoyaltyProgram) => {
    if (!editingId) return;
    await updateLoyaltyProgram(editingId, updated);
    await fetchPrograms();
    setEditingProgram(null);
    setEditingId(null);
  };

  const handleDelete = (id: string) =>
    setPrograms((prev) => prev.filter((p) => p.id !== id));

  const handleCloseEdit = () => {
    setEditingProgram(null);
    setEditingId(null);
  };

  return (
    <ProfileManagementMainPageLayout
      title="Loyalty Programs"
      subtitle="Manage your airline, hotel, and car rental loyalty programs"
      rightSection={
        <AddProgramButton
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editingProgram={editingProgram}
          onCloseEdit={handleCloseEdit}
        />
      }
    >
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        getProgramCount={getProgramCount}
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      ) : filteredPrograms.length === 0 ? (
        <EmptyState
          message={`No ${
            activeTab === "all" ? "loyalty" : activeTab
          } programs found.`}
        />
      ) : (
        <div className="grid gap-5">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onEdit={(data) => handleEdit(data, program.id)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </ProfileManagementMainPageLayout>
  );
}
