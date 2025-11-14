"use client";

import React from "react";
import { useNewsManager } from "./useNewsManager";
import { NewsListView } from "./NewsListView";
import { NewsFormView } from "./NewsFormView";
import { NEWS_DEFAULT_VALUES, NEWS_FORM_CONFIG } from "./news.constants";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NewsFormValues } from "./news.types";
import AlertsSection from "@/app/(profileManagement)/profile-managemnt/_components/AlertsSection";

interface NewsManagerProps {
  initialData?: NewsFormValues[];
}

export default function NewsManager({ initialData = [] }: NewsManagerProps) {
  const {
    formRef,
    view,
    isLoading,
    editingId,
    newsList,
    handleFormSubmit,
    handleEdit,
    handleDelete,
    handleAddNew,
    handleBack,
  } = useNewsManager(initialData);

  return (
    <PageLayout
      title="News & Announcements"
      subtitle="Manage news articles and announcements for your portal"
      rightSection={
        <>
          {view === "list" && (
            <Button onClick={handleAddNew} className="flex items-center gap-2">
              <Plus size={16} />
              Add Announcement
            </Button>
          )}
        </>
      }
    > 
     <AlertsSection/>
      {view === "list" ? (
        <>
          <NewsListView
            newsList={newsList}
            onAddNew={handleAddNew}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <>
          <NewsFormView
            ref={formRef}
            formConfig={NEWS_FORM_CONFIG as any}
            defaultValues={
              editingId
                ? (newsList.find(
                    (item) => item.id === editingId
                  ) as NewsFormValues)
                : NEWS_DEFAULT_VALUES
            }
            isLoading={isLoading}
            editingId={editingId}
            onBack={handleBack}
            onSubmit={handleFormSubmit}
          />
        </>
      )}
    </PageLayout>
  );
}
