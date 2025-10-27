import { CabBookingProps } from "@/app/(travelerProfile)/_types/upcomingTrips.types";
import { Calendar, Car, MapPin } from "lucide-react";
import InfoItem from "./InfoItem";
import { BookingLayout } from "./BookingLayout";
import { Typography } from "@/components/custom/Typography";

const CabBooking: React.FC<CabBookingProps> = ({ booking }) => (
  <BookingLayout
    id={booking.id}
    title={booking.service}
    icon={<Car className="w-14 h-14 text-gray-300" />}
    infoItems={<InfoItem value={booking.vehicle} />}
  >
    <div className="space-y-2 mb-3">
      {/* Pickup & Drop Dates */}
      <div className="flex items-center gap-2">
        <Calendar className="w-3.5 h-3.5 text-gray-500" />
        <Typography as="span" size="xs" color="#4B5563">
          Pick Up:
        </Typography>
        <Typography as="span" size="xs" weight="medium" color="#111827">
          {booking.pickupDate}
        </Typography>
        <Typography as="span" size="xs" color="#4B5563" className="ml-2">
          Drop:
        </Typography>
        <Typography as="span" size="xs" weight="medium" color="#111827">
          {booking.dropDate}
        </Typography>
      </div>

      {/* Pickup & Drop Locations with Aligned Dotted Line */}
      <div className="relative">
        {/* Dotted vertical line — perfectly centered with icons */}
        <div className="absolute left-[7px] top-4 bottom-4 border-l border-dotted border-gray-400"></div>

        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5 z-10 bg-white" />
          <Typography
            as="p"
            size="xs"
            color="#4B5563"
            className="leading-relaxed"
          >
            {booking.pickupLocation}
          </Typography>
        </div>

        <div className="flex items-start gap-2 mt-4">
          <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5 z-10 bg-white" />
          <Typography
            as="p"
            size="xs"
            color="#4B5563"
            className="leading-relaxed"
          >
            {booking.dropLocation}
          </Typography>
        </div>
      </div>
    </div>
  </BookingLayout>
);

export default CabBooking;
