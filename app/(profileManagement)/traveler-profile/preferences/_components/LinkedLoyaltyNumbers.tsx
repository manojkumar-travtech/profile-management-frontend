import { Typography } from "@/components/custom/Typography";
import { LinkedLoyaltyNumbersProps } from "./PreferencesCard";

const LinkedLoyaltyNumbers: React.FC<LinkedLoyaltyNumbersProps> = ({
  loyaltyHeading,
  loyaltyNumbers = [],
}) => {
  if (!loyaltyNumbers.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      <Typography variant="display" size="xs" as="h6">
        {loyaltyHeading}
      </Typography>
      <div className="flex flex-wrap gap-3">
        {loyaltyNumbers.map((item, index) => (
          <div
            key={`${item.company}-${item.number}-${index}`}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md"
          >
            <span className="flex items-center text-gray-800 text-sm">
              <Typography variant="text" size="xs" as="p" weight="bold">
                {item.company ?? ""}
              </Typography>
              <Typography variant="text" size="xs" as="p" className="mx-1">
                :
              </Typography>
              <Typography variant="text" size="xs" as="p" weight="medium">
                {item.number ?? ""}
              </Typography>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkedLoyaltyNumbers