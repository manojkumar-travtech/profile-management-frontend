"use client";
import { useEffect, useState } from "react";
import {
  Department,
  Holiday,
  Status,
  TimeZoneItem,
} from "./hoursAndContact.types";

export function useLiveTime(interval = 1000): Date {
  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), interval);
    return () => clearInterval(timer);
  }, [interval]);
  return time;
}
export const formatTime = (date: Date, timeZone: string): string =>
  date.toLocaleTimeString("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

export const formatDate = (date: Date, timeZone: string): string =>
  date.toLocaleDateString("en-US", {
    timeZone,
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const isWithinHours = (
  currentTime: Date,
  startHour?: number,
  endHour?: number,
  days: number[] = [1, 2, 3, 4, 5]
) => {
  if (startHour === undefined || endHour === undefined) return false;
  // Convert current time to PST (department timezone) for comparison
  const pstTime = new Date(
    currentTime.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const currentDay = pstTime.getDay();
  const currentHour = pstTime.getHours();

  return (
    days.includes(currentDay) &&
    currentHour >= startHour &&
    currentHour < endHour
  );
};
export const getDepartmentStatus = (
  currentTime: Date,
  dept: Department
): Status => {
  if (dept.is24x7) return { status: "24/7", isOpen: true };
  const isOpen = isWithinHours(
    currentTime,
    dept.startHour,
    dept.endHour,
    dept.days
  );
  return { status: isOpen ? "Open" : "Closed", isOpen };
};

export const departments: Department[] = [
  {
    name: "Main Support",
    desc: "General inquiries, refunds, and travel assistance.",
    startHour: 8,
    endHour: 18,
    days: [1, 2, 3, 4, 5],
    time: "Mon–Fri: 8 AM – 6 PM PST",
    phone: "1-800-555-0133",
    email: "support@travelco.com",
  },
  {
    name: "Emergency Support",
    desc: "Travel emergencies, flight disruptions, urgent assistance.",
    is24x7: true,
    time: "Always Available",
    phone: "1-800-555-0191",
    email: "emergency@travelco.com",
  },
  {
    name: "Corporate Travel",
    desc: "Business travel management and account services.",
    startHour: 9,
    endHour: 17,
    days: [1, 2, 3, 4, 5],
    time: "Mon–Fri: 9 AM – 5 PM PST",
    phone: "1-800-555-0175",
    email: "corporate@travelco.com",
  },
  {
    name: "Leisure Travel",
    desc: "Vacation packages, individual and leisure travel.",
    startHour: 10,
    endHour: 18,
    days: [1, 2, 3, 4, 5],
    time: "Mon–Fri: 10 AM – 6 PM PST",
    phone: "1-800-555-0176",
    email: "leisure@travelco.com",
  },
  {
    name: "Group Travel",
    desc: "Group reservations, event coordination, and special requests.",
    startHour: 8,
    endHour: 17,
    days: [1, 2, 3, 4, 5],
    time: "Mon–Fri: 8 AM – 5 PM PST",
    phone: "1-800-555-0177",
    email: "groups@travelco.com",
  },
  {
    name: "Billing & Accounts",
    desc: "Payment inquiries, invoices, and account management.",
    startHour: 9,
    endHour: 17,
    days: [1, 2, 3, 4, 5],
    time: "Mon–Fri: 9 AM – 5 PM PST",
    phone: "1-800-555-0178",
    email: "billing@travelco.com",
  },
];

export const holidays: Holiday[] = [
  { holiday: "Thanksgiving", date: "November 27, 2025" },
  { holiday: "Christmas Day", date: "December 25, 2025" },
  { holiday: "New Year's Day", date: "January 1, 2026" },
  { holiday: "Independence Day", date: "July 4, 2026" },
];

export const timeZones: TimeZoneItem[] = [
  { zone: "Eastern (EST/EDT)", tz: "America/New_York" },
  { zone: "Central (CST/CDT)", tz: "America/Chicago" },
  { zone: "Pacific (PST/PDT)", tz: "America/Los_Angeles" },
];
