export interface Profile {
  id: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  preferred_name: string | null;
  suffix: string | null;
  date_of_birth: string | null;
  gender: string | null;
  nationality: string | null;
  contact_info: {
    email: string | null;
    phone: string | null;
    mobile_phone?: string | null;
    home_phone?: string | null;
  } | null;
}

export interface LoyaltyProgram {
  id: string;
  profile_id: string;
  provider_type: "car_rental" | "hotel" | "airline" | string;
  provider_name: string;
  provider_code: string;
  program_name: string;
  member_number: string;
  member_name: string;
  tier_status: string | null;
  tier_level: string | null;
  points_balance: number | null;
  miles_balance: number | null;
  segment_count: number | null;
  member_since: string | null;
  tier_expiry_date: string | null;
  points_expiry_date: string | null;
  is_primary: boolean;
  auto_apply: boolean;
  login_username: string | null;
  login_password_encrypted: string | null;
  program_data: Record<string, any>;
  last_synced_at: string | null;
  sync_enabled: boolean | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TravelDocument {
  id: string;
  profile_id: string;
  type: "passport" | "tsa_precheck" | "drivers_license" | string;
  document_number: string;
  issuing_country: string;
  issuing_authority: string;
  issue_date: string;
  expiry_date: string;
  is_verified: boolean;
  verified_at: string | null;
  verified_by: string | null;
  document_data: DocumentData;
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

export interface DocumentData {
  passport_type?: string;
  place_of_birth?: string;
  place_of_issue?: string;
  known_traveler_number?: string;
  state?: string;
  license_class?: string;
  [key: string]: any;
}

export interface DelegateAccess {
  id: string;
  profile_id: string;
  delegate_user_id: string;
  can_view: boolean;
  can_edit: boolean;
  can_book: boolean;
  can_delete: boolean;
  granted_by: string;
  access_level: "viewer" | "editor" | "booker" | "admin" | string;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
  revoked_at: string | null;
}
