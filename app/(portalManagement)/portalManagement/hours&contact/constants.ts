export const statusOptions = [
  { label: "Open", value: "Open" },
  { label: "Closed", value: "Closed" },
  { label: "Offline", value: "Offline" },
  { label: "24/7", value: "24/7" },
];

export const timeZoneOptions = [
  { label: "Eastern (EST/EDT)", value: "America/New_York" },
  { label: "Central (CST/CDT)", value: "America/Chicago" },
  { label: "Mountain (MST/MDT)", value: "America/Denver" },
  { label: "Pacific (PST/PDT)", value: "America/Los_Angeles" },
];

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  hasError?: boolean;
}