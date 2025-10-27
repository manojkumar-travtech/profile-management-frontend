import { InfoItemProps } from "@/app/(travelerProfile)/_types/upcomingTrips.types";
import { Typography } from "@/components/custom/Typography";
import { Badge } from "@/components/ui/badge";

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <Badge variant={"secondary"} className="p-2 rounded-sm">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-gray-600" />}
      {label && (
        <Typography className="text-gray-600" weight="medium" size="xs">
          {label}:
        </Typography>
      )}

      <Typography className="text-gray-600" weight="medium" size="xs">
        {value}
      </Typography>
    </div>
  </Badge>
);
export default InfoItem;
