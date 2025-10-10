export function parseDate(input: Date | string): Date {
  return typeof input === "string" ? new Date(input) : input;
}

export function getDisabledDateFn(
  options: {
    minDate?: Date | string;
    maxDate?: Date | string;
    disabledDates?: (date: Date) => boolean;
    datePreset?: string;
  } = {}
) {
  const { minDate, maxDate, disabledDates, datePreset } = options;

  return (date: Date) => {
    if (minDate && date < parseDate(minDate)) return true;
    if (maxDate && date > parseDate(maxDate)) return true;

    if (typeof disabledDates === "function" && disabledDates(date)) return true;

    if (datePreset) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      switch (datePreset) {
        case "futureOnly":
          return date < today;
        case "pastOnly":
          return date > new Date(today.setHours(23, 59, 59, 999));
        case "noWeekends":
        case "businessDaysOnly":
          return date.getDay() === 0 || date.getDay() === 6;
        case "today":
          return date.toDateString() !== new Date().toDateString();
        case "thisWeek": {
          const now = new Date();
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return date < weekStart || date > weekEnd;
        }
        case "thisMonth": {
          const now = new Date();
          return (
            date.getMonth() !== now.getMonth() ||
            date.getFullYear() !== now.getFullYear()
          );
        }
        case "nextMonth": {
          const next = new Date();
          next.setMonth(next.getMonth() + 1);
          return (
            date.getMonth() !== next.getMonth() ||
            date.getFullYear() !== next.getFullYear()
          );
        }
        default:
          return false;
      }
    }

    return false;
  };
}
