"use server";
import APIKit, { safeAPICaller } from "@/app/api/axios/apikit";

const API_BASE = "portalManagement";

export async function getPortalInfo(sectionKey: string) {
  const response =  await safeAPICaller(APIKit.get(`${API_BASE}/${sectionKey}`));
  console.log('response' ,response)
  return response
}

export async function SavePortalInfo(payload: any) {
  return await safeAPICaller(APIKit.post(`${API_BASE}/save`, payload));
}
