"use server";

import APIKit, { safeAPICaller } from "@/app/api/axios/apikit";

const profileId = "0eac8501-caa9-48a8-8bee-b512d88fbb00";

//
export async function getCompleteProfileStats() {
  try {
    const response: any = await safeAPICaller(
      APIKit.get(`/profile/${profileId}/stats`)
    );
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}
// profile info
export async function getProfileById(profileId: string): Promise<any> {
  try {
    const response: any = await safeAPICaller(
      APIKit.get(`/profile/${profileId}`)
    );
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}
export async function updateProfile(data: any): Promise<any> {
  try {
    const response: any = await safeAPICaller(
      APIKit.put(`/profile/${profileId}`, data)
    );
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}
// layalty programs

export async function addLoyaltyProgram(loyaltyData: any): Promise<any> {
  try {
    const response: any = await safeAPICaller(
      APIKit.post(`/profile/${profileId}/loyalty`, loyaltyData)
    );
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}

export async function updateLoyaltyProgram(
  loyaltyId: string | number,
  data: any
): Promise<any> {
  try {
    const response: any = await safeAPICaller(
      APIKit.put(`/loyalty/${loyaltyId}`, data)
    );
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}

export async function getlayaltyPrograms(): Promise<any> {
  try {
    const response: any = await safeAPICaller(
      APIKit.get(`/profile/${profileId}/loyalty`)
    );
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}

// travel documents

export async function getTravelDocuments(): Promise<any> {
  try {
    const response: any = await safeAPICaller(
      APIKit.get(`/profile/${profileId}/documents`)
    );
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}

export async function addDocument(documentData: any): Promise<any> {
  try {
    const response: any = await safeAPICaller(
      APIKit.post(`/profile/${profileId}/documents`, documentData)
    );
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}

export async function updateDocument(
  documentId: string,
  data: any
): Promise<any> {
  try {
    const response: any = await safeAPICaller(
      APIKit.put(`/profile/documents/${documentId}`, data)
    );
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}

export async function deleteDocument(documentId: string): Promise<any> {
  try {
    const response: any = await safeAPICaller(
      APIKit.delete(`/profile/documents/${documentId}`)
    );
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}
// delegate profiles
export async function getDelegateProfiles(): Promise<any> {
  try {
    const response: any = await safeAPICaller(
      APIKit.get(`/profile/${profileId}/delegates`)
    );
    console.log("Delegate Profiles data:", response.data);
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}

// preferences

export async function getPreferences(): Promise<any> {
  try {
    const response: any = await safeAPICaller(
      APIKit.get(`/profile/${profileId}/preferences`)
    );
    return response;
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}
