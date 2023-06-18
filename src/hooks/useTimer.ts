import { useEffect, useReducer } from "react";

export function useTimer(isRunning: boolean, interval = 1) {
  const [currentTime, dispatch] = useReducer(
    (current: number, action: "increment" | "reset") => {
      return action === "reset" ? 0 : current + interval;
    },
    0
  );

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        dispatch("increment");
      }, interval * 1000);
      return () => clearInterval(intervalId);
    } else {
      dispatch("reset");
    }
  }, [isRunning, interval]);

  return currentTime;
}
