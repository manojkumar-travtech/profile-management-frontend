// Base interface for all items linked to a trip
export interface TripItem {
  id: string;
  trip_id: string;
  confirmation_number: string | null;
  cost?: number | null;
  currency?: string;
  status?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

// Trip core
export interface Trip {
  id: string;
  organization_id: string;
  created_by: string | null;
  trip_name: string;
  trip_number: string | null;
  origin_city: string | null;
  destination_city: string | null;
  departure_date: string | null;
  return_date: string | null;
  purpose: string | null;
  is_international: boolean;
  status:
    | "draft"
    | "pending_approval"
    | "approved"
    | "booked"
    | "cancelled"
    | "completed";
  estimated_cost: number | null;
  actual_cost: number | null;
  currency: string;
  requires_approval: boolean;
  approved_by: string | null;
  approved_at: string | null;
  notes: string | null;
  metadata: any;
  created_at: string;
  updated_at: string;
  flight_count?: number;
  hotel_count?: number;
  car_rental_count?: number;
  type?: string | null;
}

// Specific trip items
export interface Flight extends TripItem {
  airline: string | null;
  flight_number: string | null;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  cabin_class: string | null;
  seat_number: string | null;
  booking_reference: string | null;
  ticket_number: string | null;
  notes?: string | null;
}

export interface Hotel extends TripItem {
  hotel_name: string;
  hotel_chain: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  check_in_date: string;
  check_out_date: string;
  room_type: string | null;
  number_of_rooms: number;
  booking_reference: string | null;
  special_requests: string | null;
}

export interface CarRental extends TripItem {
  rental_company: string;
  vehicle_type: string | null;
  vehicle_class: string | null;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  dropoff_date: string;
  booking_reference: string | null;
  insurance_included: boolean;
}

export interface Activity extends TripItem {
  activity_name: string;
  provider: string | null;
  location: string | null;
  city: string | null;
  activity_date: string;
  start_time: string | null;
  duration_minutes: number | null;
  booking_reference: string | null;
  description: string | null;
}

// Trip traveler
export interface TripTraveler {
  id: string;
  trip_id: string;
  profile_id: string;
  is_primary: boolean;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}
export interface TripWithDetails extends Trip {
  travelers?: TripTraveler[];
  flights?: Flight[];
  hotels?: Hotel[];
  car_rentals?: CarRental[];
  activities?: Activity[];
}

export interface TripStas {
  total: number;
  booked: number;
  completed: number;
  pending_approval: number;
  total_spent: number;
  avg_cost: number;
}
