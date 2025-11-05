import { Accordion } from "@/components/ui/accordion";
import StatusBadge from "./StatusBadge";
import PastTripItem from "./PastTripItem";
import { Typography } from "@/components/custom/Typography";
import { PastTripCardProps } from "@/app/(travelerProfile)/_types/past-trips.types";
import { Calendar, Car, Clock, GitCommitHorizontal, Hotel, MapPin, Plane, User, Users } from "lucide-react";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";
import InfoItem from "@/app/(travelerProfile)/_components/InfoItem";

const TripInfo = () => {
  const tripInfo = [
    { icon: Plane, value: "Flight" },
    { icon: Hotel, value: "Hotel" },
    { icon: Calendar, value: "Jan. 24, 2025" },
    { icon: User, value: "1 Guest" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tripInfo.map((item, index) => (
        <InfoItem
          key={index}
          icon={item.icon}
          value={item.value}
        />
      ))}
    </div>
  );
};

const PastTripCard: React.FC<PastTripCardProps> = ({
  date,
  guests,
  items,
  showPreferences = true,
  allowMultipleOpen = true,
  initialOpenIndices = [],
}) => {
  return (
    <SectionCard
      leftIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.4703 0.429256C23.4098 -0.143085 24.5902 -0.143085 25.5297 0.429256L28.9077 2.48711C29.3886 2.78002 29.9439 2.92875 30.5068 2.91549L34.4608 2.82211C35.5606 2.79626 36.583 3.38641 37.1105 4.35178L39.0067 7.82258C39.2767 8.3168 39.6832 8.7233 40.1774 8.99333L43.6482 10.8895C44.6136 11.417 45.2037 12.4394 45.1779 13.5392L45.0845 17.4938C45.0713 18.0566 45.22 18.6115 45.5129 19.0923L47.5707 22.4703C48.1431 23.4098 48.1431 24.5902 47.5707 25.5297L45.5129 28.9077C45.22 29.3886 45.0713 29.9439 45.0845 30.5068L45.1779 34.4608C45.2037 35.5606 44.6136 36.583 43.6482 37.1105L40.1774 39.0067C39.6832 39.2767 39.2767 39.6832 39.0067 40.1774L37.1105 43.6482C36.583 44.6136 35.5606 45.2037 34.4608 45.1779L30.5068 45.0845C29.9439 45.0713 29.3886 45.22 28.9077 45.5129L25.5297 47.5707C24.5902 48.1431 23.4098 48.1431 22.4703 47.5707L19.0923 45.5129C18.6115 45.22 18.0566 45.0713 17.4938 45.0845L13.5392 45.1779C12.4394 45.2037 11.417 44.6136 10.8895 43.6482L8.99333 40.1774C8.7233 39.6832 8.3168 39.2767 7.82258 39.0067L4.35178 37.1105C3.38641 36.583 2.79626 35.5606 2.82211 34.4608L2.91549 30.5068C2.92875 29.9439 2.78002 29.3886 2.48711 28.9077L0.429256 25.5297C-0.143085 24.5902 -0.143085 23.4098 0.429256 22.4703L2.48711 19.0923C2.77997 18.6115 2.92869 18.0566 2.91549 17.4938L2.82211 13.5392C2.79627 12.4394 3.38642 11.417 4.35178 10.8895L7.82258 8.99333C8.3168 8.7233 8.7233 8.3168 8.99333 7.82258L10.8895 4.35178C11.417 3.38642 12.4394 2.79627 13.5392 2.82211L17.4938 2.91549C18.0566 2.92869 18.6115 2.77997 19.0923 2.48711L22.4703 0.429256ZM32.8425 16.6183C32.077 15.8528 30.8358 15.8529 30.0703 16.6183L20.8864 25.8022L17.4681 22.3839C16.7026 21.6184 15.4614 21.6184 14.6959 22.3839C13.9307 23.1495 13.9305 24.3908 14.6959 25.1562L19.5003 29.9605C20.2657 30.7259 21.507 30.7257 22.2725 29.9605L32.8425 19.3906C33.6079 18.6251 33.6079 17.3839 32.8425 16.6183Z"
            fill="#98A2B3"
          />
        </svg>
      }
      title="Trip Completed" 
      description={<TripInfo/>}
    >
      {/* Trip Items with Accordion */}
      {allowMultipleOpen ? (
        <Accordion
          type="multiple"
          defaultValue={initialOpenIndices.map((i) => `item-${i}`)}
          className="divide-y divide-gray-200"
        >
          {items.map((item, index) => (
            <PastTripItem key={index} {...item} value={`item-${index}`} />
          ))}
        </Accordion>
      ) : (
        <Accordion
          type="single"
          collapsible
          defaultValue={
            initialOpenIndices.length > 0
              ? `item-${initialOpenIndices[0]}`
              : undefined
          }
          className="divide-y divide-gray-200"
        >
          {items.map((item, index) => (
            <PastTripItem key={index} {...item} value={`item-${index}`} />
          ))}
        </Accordion>
      )}

      {showPreferences && (
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <Typography weight="medium">
              See last travel preferences
            </Typography>
            <div className="flex items-center gap-4 justify-start w-full">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.6668 5.8335H9.16683M11.6668 14.1668H4.16683M11.6668 14.1668C11.6668 15.5475 12.7861 16.6668 14.1668 16.6668C15.5475 16.6668 16.6668 15.5475 16.6668 14.1668C16.6668 12.7861 15.5475 11.6668 14.1668 11.6668C12.7861 11.6668 11.6668 12.7861 11.6668 14.1668ZM8.3335 5.8335C8.3335 7.21421 7.21421 8.3335 5.8335 8.3335C4.45278 8.3335 3.3335 7.21421 3.3335 5.8335C3.3335 4.45278 4.45278 3.3335 5.8335 3.3335C7.21421 3.3335 8.3335 4.45278 8.3335 5.8335Z"
                    stroke="#0055A4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>
                <Typography weight="medium" className="text-primary-600">
                  Last Travel Preferences
                </Typography>
              </span>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
};

export default PastTripCard;
