import { HotelBookingProps } from "@/app/(travelerProfile)/_types/upcomingTrips.types";
import { Calendar, MapPin } from "lucide-react";
import { BookingLayout } from "./BookingLayout";
import InfoItem from "@/app/(travelerProfile)/_components/InfoItem";

const HotelBooking: React.FC<HotelBookingProps> = ({ booking }) => (
  <BookingLayout
    id={booking.id}
    title={booking.name}
    image={booking.image}
    infoItems={
      <>
        <InfoItem value={booking.roomType} />
        <InfoItem value={booking.bedType} />
      </>
    }
  >
    {/* children section */}
    <div className="space-y-2 mb-3">
      <div className="flex items-start gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
        <span className="text-xs text-gray-600 leading-relaxed">
          {booking.address}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <Calendar className="w-3.5 h-3.5 text-gray-500" />
        <span className="text-gray-600">Check In:</span>
        <span className="text-gray-900">{booking.checkIn}</span>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="w-3.5" />
        <span className="text-gray-600">Check Out:</span>
        <span className="text-gray-900">{booking.checkOut}</span>
      </div>
    </div>
  </BookingLayout>
);

export default HotelBooking;
