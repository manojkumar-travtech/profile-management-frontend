import { useState, useRef } from "react";
import { DynamicFormRef } from "@/components/custom/Form";
import { NewsFormValues, NewsViewType } from "./news.types";
import {
  createNews,
  deleteNews,
  getPublishedNews,
  updateNews,
} from "./api/newsApi";

export const useNewsManager = (initialData: NewsFormValues[] = []) => {
  const formRef = useRef<DynamicFormRef<NewsFormValues>>(null);

  const [view, setView] = useState<NewsViewType>("list");
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newsList, setNewsList] = useState<NewsFormValues[]>(initialData);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const res = await getPublishedNews();
      setNewsList(res?.data || []);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (data: NewsFormValues) => {
    setIsLoading(true);
    try {
      if (editingId) {
        await updateNews(editingId, data);
      } else {
        await createNews(data);
      }
      await fetchNews();
      setView("list");
    } catch {
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = (id: string) => {
    const existing = newsList.find((item) => item.id === id);
    if (!existing) return;
    setEditingId(existing.id || null);
    formRef.current?.setValues(existing);
    setView("form");
  };

  const handleDelete = async (id: string) => {
    const item = newsList.find((item) => item.id === id);
    if (!item) return;

    setIsLoading(true);
    try {
      await deleteNews(id);
      await fetchNews();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    formRef.current?.reset();
    setView("form");
  };

  const handleBack = () => {
    setView("list");
  };

  return {
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
    fetchNews,
  };
};
