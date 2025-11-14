import {
  Calendar,
  Car,
  ChevronRight,
  CreditCard,
  Hotel,
  Luggage,
  Plane,
  Users,
} from "lucide-react";
import {
  Activity,
  CarRental,
  Flight,
  Hotel as HotelType,
  TripTraveler,
  Trip,
} from "./types";
import { formatDateTime, getStatusColor } from "./helpers";

export const FlightSection: React.FC<{ flights: Flight[] }> = ({ flights }) => (
  <div>
    <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <Plane className="w-4 h-4" />
      Flights ({flights.length})
    </h3>
    {flights.map((flight, idx) => (
      <div
        key={idx}
        className="bg-white border border-gray-200 rounded p-4 mb-3"
      >
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
          <div>
            <p className="font-semibold text-gray-900">
              {flight.airline} {flight.flight_number}
            </p>
            <p className="text-gray-600 text-xs">{flight.airline}</p>
          </div>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
              flight.status || ''
            )}`}
          >
            {flight.status || ''}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <p className="text-xl font-semibold text-gray-900">
              {flight.departure_airport}
            </p>
            <p className="text-gray-600 text-xs mt-1">
              {flight.arrival_airport}
            </p>
            <p className="text-gray-900 text-sm font-medium mt-2">
              {formatDateTime(flight.departure_time)}
            </p>
            {/* {flight.departure.terminal && (
              <p className="text-gray-600 text-xs mt-1">
                Terminal {flight.departure.terminal} • Gate{" "}
                {flight.departure.gate}
              </p>
            )} */}
          </div>

          {/* <div className="flex flex-col items-center justify-center">
            <ChevronRight className="w-5 h-5 text-gray-400 mb-1" />
            <p className="text-gray-600 text-xs">{flight.duration}</p>
          </div> */}

          {/* <div className="text-right">
            <p className="text-xl font-semibold text-gray-900">
              {flight.arrival_airport}
            </p>
            <p className="text-gray-600 text-xs mt-1">{flight.arrival.city}</p>
            <p className="text-gray-900 text-sm font-medium mt-2">
              {formatDateTime(flight.arrival.dateTime)}
            </p>
            {flight.arrival.terminal && (
              <p className="text-gray-600 text-xs mt-1">
                Terminal {flight.arrival.terminal} • Gate {flight.arrival.gate}
              </p>
            )}
          </div> */}
        </div>

        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
          <div>
            <p className="text-gray-600 text-xs">Cabin</p>
            <p className="font-medium text-gray-900 text-sm capitalize">
              {flight?.cabin_class ? flight?.cabin_class.replace("-", " ") : ''}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Seat</p>
            <p className="font-medium text-gray-900 text-sm">
              {flight.seat_number || "Not assigned"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Confirmation</p>
            <p className="font-medium text-gray-900 text-sm">
              {flight.confirmation_number}
            </p>
          </div>
        </div>

        {/* {flight.baggage && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="font-medium text-gray-900 text-xs mb-1 flex items-center gap-1">
              <Luggage className="w-3 h-3" />
              Baggage Allowance
            </p>
            <p className="text-gray-700 text-xs">
              {flight.baggage.checked} checked • {flight.baggage.carry} carry-on
              • {flight.baggage.weight}
            </p>
          </div>
        )} */}
      </div>
    ))}
  </div>
);

export const HotelSection: React.FC<{ hotels: HotelType[] }> = ({ hotels }) => (
  <div>
    <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <Hotel className="w-4 h-4" />
      Accommodation ({hotels.length})
    </h3>
    {hotels.map((hotel, idx) => (
      <div
        key={idx}
        className="bg-white border border-gray-200 rounded p-4 mb-3"
      >
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
          <div>
            <p className="font-semibold text-gray-900">{hotel.hotel_name}</p>
            {hotel.hotel_chain && (
              <p className="text-gray-600 text-xs">{hotel.hotel_chain}</p>
            )}
          </div>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
              hotel.status || ''
            )}`}
          >
            {hotel.status}
          </span>
        </div>

        <div className="mb-3">
          <p className="text-gray-900 text-sm">{hotel.address}</p>
          <p className="text-gray-600 text-xs">
            {hotel.city}
            {hotel.country}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-gray-600 text-xs">Check-in</p>
            <p className="font-medium text-gray-900 text-sm">
              {formatDateTime(hotel.check_in_date)}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Check-out</p>
            <p className="font-medium text-gray-900 text-sm">
              {formatDateTime(hotel.check_out_date)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
          <div>
            <p className="text-gray-600 text-xs">Room Type</p>
            <p className="font-medium text-gray-900 text-sm">
              {hotel.room_type}
            </p>
          </div>
          {/* <div>
            <p className="text-gray-600 text-xs">Bed Type</p>
            <p className="font-medium text-gray-900 text-sm">
              {hotel.bedType || "N/A"}
            </p>
          </div> */}
          <div>
            <p className="text-gray-600 text-xs">Nights</p>
            <p className="font-medium text-gray-900 text-sm">{3}</p>
          </div>
        </div>

        {hotel.cost && (
          <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-gray-100">
            {/* <div>
              <p className="text-gray-600 text-xs">Rate per Night</p>
              <p className="font-medium text-gray-900 text-sm">
                {hotel.currency} {hotel.ratePerNight}
              </p>
            </div> */}
            <div>
              <p className="text-gray-600 text-xs">Total Cost</p>
              <p className="font-semibold text-gray-900 text-sm">
                {hotel.currency} {hotel.cost}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-xs">Confirmation</p>
              <p className="font-medium text-gray-900 text-sm">
                {hotel.confirmation_number}
              </p>
            </div>
          </div>
        )}

        {/* {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="font-medium text-gray-900 text-xs mb-2">Amenities</p>
            <div className="flex flex-wrap gap-1">
              {hotel.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )} */}

        {/* {hotel.loyaltyNumber && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-gray-600 text-xs">Loyalty Number</p>
            <p className="font-medium text-gray-900 text-sm">
              {hotel.loyaltyNumber}
            </p>
          </div>
        )} */}
      </div>
    ))}
  </div>
);

export const CarRentalSection: React.FC<{ carRentals: CarRental[] }> = ({
  carRentals,
}) => (
  <div>
    <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <Car className="w-4 h-4" />
      Car Rental ({carRentals.length})
    </h3>
    {carRentals.map((car, idx) => (
      <div
        key={idx}
        className="bg-white border border-gray-200 rounded p-4 mb-3"
      >
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
          <div>
            <p className="font-semibold text-gray-900">{car.rental_company}</p>
            <p className="text-gray-600 text-xs">
              {car.vehicle_type} • {car.vehicle_class?  car.vehicle_class.toUpperCase() : ''}
            </p>
          </div>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
              car.status || ''
            )}`}
          >
            {car.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-gray-600 text-xs mb-1">Pickup</p>
            <p className="font-medium text-gray-900 text-sm">
              {car.pickup_location}
            </p>
            {/* <p className="text-gray-600 text-xs">{car.pickupLocation.city}</p> */}
            <p className="text-gray-900 text-xs mt-1">
              {formatDateTime(car.dropoff_location)}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-xs mb-1">Drop-off</p>
            <p className="font-medium text-gray-900 text-sm">
              {car.pickup_date}
            </p>
            <p className="text-gray-600 text-xs">{car.dropoff_location}</p>
            <p className="text-gray-900 text-xs mt-1">
              {formatDateTime(car.dropoff_location)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
          <div>
            <p className="text-gray-600 text-xs">Confirmation</p>
            <p className="font-medium text-gray-900 text-sm">
              {car.confirmation_number}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Total Cost</p>
            <p className="font-semibold text-gray-900 text-sm">
              {car.currency} {car.cost}
            </p>
          </div>
          {/* <div>
            <p className="text-gray-600 text-xs">Insurance</p>
            <p className="font-medium text-gray-900 text-sm">
              {car.insurance.join(", ")}
            </p>
          </div> */}
        </div>
      </div>
    ))}
  </div>
);

// export const ActivitySection: React.FC<{ activities: Activity[] }> = ({
//   activities,
// }) => (
//   <div>
//     <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
//       <Calendar className="w-4 h-4" />
//       Activities ({activities.length})
//     </h3>
//     {activities.map((activity, idx) => (
//       <div
//         key={idx}
//         className="bg-white border border-gray-200 rounded p-4 mb-3"
//       >
//         <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
//           <div>
//             <p className="font-semibold text-gray-900">{activity.name}</p>
//             <p className="text-gray-600 text-xs capitalize">{activity.type}</p>
//           </div>
//           <span
//             className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
//               activity.status || ''
//             )}`}
//           >
//             {activity.status}
//           </span>
//         </div>

//         <div className="grid grid-cols-2 gap-3 mb-3">
//           <div>
//             <p className="text-gray-600 text-xs">Date & Time</p>
//             <p className="font-medium text-gray-900 text-sm">
//               {formatDateTime(activity.dateTime)}
//             </p>
//           </div>
//           {activity.duration && (
//             <div>
//               <p className="text-gray-600 text-xs">Duration</p>
//               <p className="font-medium text-gray-900 text-sm">
//                 {activity.duration}
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="mb-3">
//           <p className="text-gray-600 text-xs">Location</p>
//           <p className="font-medium text-gray-900 text-sm">
//             {activity.location.name}
//           </p>
//           <p className="text-gray-600 text-xs">
//             {activity.location.address}, {activity.location.city}
//           </p>
//         </div>

//         {(activity.confirmationNumber || activity.cost) && (
//           <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
//             {activity.confirmationNumber && (
//               <div>
//                 <p className="text-gray-600 text-xs">Confirmation</p>
//                 <p className="font-medium text-gray-900 text-sm">
//                   {activity.confirmationNumber}
//                 </p>
//               </div>
//             )}
//             {activity.cost && (
//               <div>
//                 <p className="text-gray-600 text-xs">Cost</p>
//                 <p className="font-semibold text-gray-900 text-sm">
//                   {activity.currency} {activity.cost}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {activity.notes && (
//           <div className="mt-3 pt-3 border-t border-gray-100">
//             <p className="text-gray-600 text-xs">Notes</p>
//             <p className="text-gray-900 text-sm">{activity.notes}</p>
//           </div>
//         )}
//       </div>
//     ))}
//   </div>
// );

export const TravelerSection: React.FC<{ travelers: TripTraveler[] }> = ({
  travelers,
}) => (
  <div>
    <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <Users className="w-4 h-4" />
      Travelers ({travelers.length})
    </h3>
    <div className="bg-white border border-gray-200 rounded p-4">
      {travelers.map((traveler, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between ${
            idx > 0 ? "pt-3 mt-3 border-t border-gray-100" : ""
          }`}
        >
          <div>
            <p className="font-medium text-gray-900 text-sm">
              {traveler.first_name}
              {traveler.is_primary && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  Primary
                </span>
              )}
            </p>
            <p className="text-gray-600 text-xs">{traveler.email}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// export const TripSummary: React.FC<{ trip: Trip }> = ({ trip }) => (
//   <div>
//     <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
//       <CreditCard className="w-4 h-4" />
//       Trip Summary
//     </h3>
//     <div className="bg-blue-50 border border-blue-200 rounded p-4">
//       <div className="grid grid-cols-2 gap-3 mb-3">
//         <div>
//           <p className="text-gray-600 text-xs">Total Cost</p>
//           <p className="text-2xl font-semibold text-gray-900">
//             {trip.currency} {trip.totalCost?.toLocaleString()}
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-600 text-xs">Payment Status</p>
//           <p className="font-medium text-gray-900 capitalize mt-2">
//             <span
//               className={`px-2 py-1 rounded text-xs ${
//                 trip.paymentStatus === "paid"
//                   ? "bg-green-100 text-green-700"
//                   : trip.paymentStatus === "pending"
//                   ? "bg-yellow-100 text-yellow-700"
//                   : "bg-gray-100 text-gray-700"
//               }`}
//             >
//               {trip.paymentStatus}
//             </span>
//           </p>
//         </div>
//       </div>

//       {trip.tags && trip.tags.length > 0 && (
//         <div className="pt-3 border-t border-blue-200">
//           <p className="text-gray-600 text-xs mb-2">Tags</p>
//           <div className="flex flex-wrap gap-1">
//             {trip.tags.map((tag, i) => (
//               <span
//                 key={i}
//                 className="px-2 py-1 bg-white text-gray-700 rounded text-xs font-medium"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );
