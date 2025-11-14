import {
  Calendar,
  Car,
  ChevronRight,
  DollarSign,
  Hotel,
  MapPin,
  Plane,
} from "lucide-react";
import { Trip } from "./types";
import { formatDate, getStatusColor, getTypeColor } from "./helpers";
import { Typography } from "@/components/custom/Typography";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";
import TripModal from "./TripModal";

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  return (
    <>
      <div className="bg-white rounded border border-gray-200 overflow-hidden hover:border-blue-600 transition-colors cursor-pointer">
        {/* Card Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <Typography
                as="h3"
                size="lg"
                weight="semibold"
                className="mb-1 text-gray-900"
              >
                {trip.trip_name}
              </Typography>
              <Typography as="p" size="xs" color="#6B7280">
                #{trip.trip_number}
              </Typography>
            </div>
            <div className="flex gap-1">
              <Typography
                as="span"
                size="xs"
                weight="medium"
                className={`px-2 py-1 rounded ${getStatusColor(trip.status)}`}
              >
                {trip.status}
              </Typography>
              <Typography
                as="span"
                size="xs"
                weight="medium"
                className={`px-2 py-1 rounded ${getTypeColor(trip.type || "")}`}
              >
                {trip.type || ""}
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Calendar className="w-3 h-3" />
            <Typography as="span" size="xs" color="#6B7280">
              {formatDate(trip.departure_date)} - {formatDate(trip.return_date)}
            </Typography>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4">
          {/* Destination */}
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-gray-400" />
            <div>
              <Typography
                as="p"
                size="sm"
                weight="medium"
                className="text-gray-900"
              >
                {trip.origin_city}, {trip.destination_city}
              </Typography>
              {trip.origin_city && (
                <Typography as="p" size="xs" color="#6B7280">
                  From {trip.origin_city}
                </Typography>
              )}
            </div>
          </div>
          {/* Trip Components - Single Line */}
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            {[
              (trip.flight_count ?? 0) > 0 && {
                icon: <Plane className="w-4 h-4 text-gray-400" />,
                label: `${trip.flight_count} Flight${
                  trip.flight_count! > 1 ? "s" : ""
                }`,
              },
              (trip.hotel_count ?? 0) > 0 && {
                icon: <Hotel className="w-4 h-4 text-gray-400" />,
                label: `${trip.hotel_count} Night${
                  trip.hotel_count! > 1 ? "s" : ""
                }`,
              },
              (trip.car_rental_count ?? 0) > 0 && {
                icon: <Car className="w-4 h-4 text-gray-400" />,
                label: `${trip.car_rental_count} Car Rental${
                  trip.car_rental_count! > 1 ? "s" : ""
                }`,
              },
            ]
              .filter((item): item is { icon: JSX.Element; label: string } =>
                Boolean(item)
              )
              .map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 text-gray-700 text-xs"
                >
                  {item.icon}
                  <Typography as="span" size="xs" color="#374151">
                    {item.label}
                  </Typography>
                </div>
              ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <Typography
                as="span"
                size="sm"
                weight="semibold"
                className="text-gray-900"
              >
                {trip.currency} {trip.estimated_cost?.toLocaleString()}
              </Typography>
            </div>
            <Button
              onClick={() => setSelectedTrip(trip)}
              variant={"ghost"}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Typography
                as="span"
                size="sm"
                weight="medium"
                className="text-blue-600"
              >
                View Details
              </Typography>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      {selectedTrip && (
        <TripModal
          open={true}
          orgId={selectedTrip.organization_id}
          tripId={selectedTrip.id}
          onOpenChange={() => setSelectedTrip(null)}
        />
      )}
    </>
  );
};

export default TripCard;
