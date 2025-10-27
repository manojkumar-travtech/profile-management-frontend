import { HotelBookingProps } from "@/app/(travelerProfile)/_types/upcomingTrips.types";
import { Calendar, MapPin } from "lucide-react";
import InfoItem from "./InfoItem";
import { BookingLayout } from "./BookingLayout";
import { Typography } from "@/components/custom/Typography";

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
    {/* Details Section */}
    <div className="space-y-2 mb-3">
      {/* Address */}
      <div className="flex items-start gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
        <Typography
          as="p"
          size="xs"
          color="#4B5563"
          className="leading-relaxed"
        >
          {booking.address}
        </Typography>
      </div>

      {/* Check-In */}
      <div className="flex items-center gap-2">
        <Calendar className="w-3.5 h-3.5 text-gray-500" />
        <Typography as="span" size="xs" color="#4B5563">
          Check In:
        </Typography>
        <Typography as="span" size="xs" weight="medium" color="#111827">
          {booking.checkIn}
        </Typography>
      </div>

      {/* Check-Out */}
      <div className="flex items-center gap-2">
        {/* Empty space for alignment */}
        <span className="w-3.5" />
        <Typography as="span" size="xs" color="#4B5563">
          Check Out:
        </Typography>
        <Typography as="span" size="xs" weight="medium" color="#111827">
          {booking.checkOut}
        </Typography>
      </div>
    </div>
  </BookingLayout>
);

export default HotelBooking;
