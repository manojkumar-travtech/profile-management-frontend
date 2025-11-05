export interface InfoItemProps {
  icon?: React.ElementType;
  label?: string;
  value: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface FlightLegData {
  id: string;
  type: string;
  airline: string;
  flightNumber: string;
  route: string;
  duration: string;
  from: string;
  to: string;
  date: string;
  time: string;
  class: string;
}

export interface FlightLegProps {
  leg: FlightLegData;
}

export interface HotelBookingData {
  id: string;
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  bedType: string;
  image: string;
}

export interface HotelBookingProps {
  booking: HotelBookingData;
}

export interface CabBookingData {
  id: string;
  service: string;
  pickupDate: string;
  dropDate: string;
  pickupLocation: string;
  dropLocation: string;
  vehicle: string;
}

export interface CabBookingProps {
  booking: CabBookingData;
}

export interface SectionHeaderProps {
  title: string;
}

export interface BookingData {
  email: string;
  dateRange: string;
  guests: string;
  flights: FlightLegData[];
  hotel: HotelBookingData;
  cab: CabBookingData;
}
