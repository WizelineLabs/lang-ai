import { DateTime, Duration, DurationObjectUnits, DurationUnits } from "luxon";

export function formatSecondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  let formattedTime = `${formattedMinutes}:${formattedSeconds}`;
  if (hours > 0) {
    const formattedHours = String(hours).padStart(2, "0");
    formattedTime = `${formattedHours}:${formattedTime}`;
  }

  return formattedTime;
}

export function formatDateDiff(
  one: Date,
  two: Date,
  usesShortLabels = true
): string {
  const date1 = DateTime.fromJSDate(one);
  const date2 = DateTime.fromJSDate(two);

  const diffDuration = date2
    .diff(date1, ["days", "hours", "minutes", "seconds"])
    .toObject();

  const timeKeys: (keyof DurationObjectUnits)[] = [
    "days",
    "hours",
    "minutes",
    "seconds",
  ];

  const timeLabels = usesShortLabels
    ? ["d", "h", "m", "s"]
    : ["day", "hour", "minute", "second"];

  let result = "";
  timeKeys.forEach((key, i) => {
    const value = diffDuration[key] ?? 0;
    if (value > 0) {
      const label = timeLabels[i] ?? key;
      if (usesShortLabels) {
        result += `${value.toFixed(0)}${label}, `;
      } else {
        result += `${value.toFixed(0)} ${label}${value === 1 ? "" : "s"}, `;
      }
    }
  });

  return result.slice(0, -2);
}
