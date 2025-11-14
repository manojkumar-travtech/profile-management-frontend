export type Department = {
  name: string;
  desc: string;
  startHour?: number;
  endHour?: number;
  days?: number[];
  is24x7?: boolean;
  time: string;
  phone: string;
  email: string;
};

export type Holiday = { holiday: string; date: string };

export type TimeZoneItem = { zone: string; tz: string };

export type Status = { status: string; isOpen: boolean };
