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
