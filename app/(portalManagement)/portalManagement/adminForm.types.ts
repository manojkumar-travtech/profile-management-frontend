// adminForm.types.ts
export type TopCardValues = {
  title: string;
  status: string;
  isOpen: boolean;
};

export type DepartmentValues = {
  name: string;
  desc: string;
  startHour?: number;
  endHour?: number;
  days?: number[];
  time: string;
  phone: string;
  email: string;
};

export type HolidayValues = {
  holiday: string;
  date: string;
};

export type TimeZoneValues = {
  zone: string;
  tz: string;
};

export type LiveChatValues = {
  availability: string;
  waitTime: string;
  languages: string[];
};

export type NoticeValues = {
  text: string;
  phone: string;
};
