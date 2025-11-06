// types.ts
export interface APIDocumentData {
  id: string;
  profile_id: string;
  type: string;
  document_number: string;
  issuing_country: string;
  issuing_authority: string;
  issue_date: string;
  expiry_date: string;
  is_verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  document_data: Record<string, any>;
  attachment_url: string | null;
  attachment_mime_type: string | null;
  attachment_size_bytes: number | null;
  expiry_alert_sent: boolean;
  expiry_alert_sent_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface APIResponse {
  success: boolean;
  data: APIDocumentData[];
  count: number;
}

export interface DocumentData {
  id: string;
  notes?: string;
  frontSide?: File;
  backSide?: File;
  status?: "active" | "expired" | "unknown";
  type?: string;
  document_number?: string;
  issuing_country?: string;
  issue_date?: string;
  expiry_date?: string;
}

export interface DynamicFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DocumentData) => void;
  editData?: DocumentData;
  isLoading?: boolean;
}

export interface DocumentCardProps {
  document: DocumentData;
  onView?: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}