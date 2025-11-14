"use server";
import APIKit, { safeAPICaller } from "@/app/api/axios/apikit";
import { NewsFormValues } from "../news.types";

const API_BASE = "news";
const ORG_ID = "a0000000-0000-0000-0000-000000000001";

export async function getPublishedNews() {
  return await safeAPICaller(
    APIKit.get(`${API_BASE}?organization_id=${ORG_ID}&published=true`)
  );
}

export async function createNews(payload: NewsFormValues) {
  const req = {
    organization_id: ORG_ID,
    ...payload,
  };
  return await safeAPICaller(APIKit.post(`${API_BASE}/create`, req));
}

export async function updateNews(id: string, payload: Partial<NewsFormValues>) {
  return await safeAPICaller(APIKit.put(`${API_BASE}/update/${id}`, payload));
}

export async function deleteNews(id: string) {
  return await safeAPICaller(APIKit.delete(`${API_BASE}/delete/${id}`));
}
