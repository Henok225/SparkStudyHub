import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";

export default function useLearningTimer({ intervalSeconds = 60 } = {}) {
  const [timeOn, setTimeOn] = useState(true);      // allow pause/resume
  const timerRef = useRef(0);                       // store accumulated time
  const intervalRef = useRef(null);                 // store interval id
  const { url, token } = useContext(StoreContext);  

  useEffect(() => {
    // Stop if no token
    if (!token) {
      setTimeOn(false);
      return;
    }

    // Stop timer if paused
    if (!timeOn) return;

    // Clear any existing interval (safety)
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Start interval
    intervalRef.current = setInterval(async () => {
      try {
        await axios.post(
          `${url}/api/user/update-learning-time`,
          { seconds: intervalSeconds },
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );

        timerRef.current += intervalSeconds; // update ref, no re-render

      } catch (error) {
        console.error("Error updating study time: ", error);
      }
    }, intervalSeconds * 1000);

    // Cleanup on unmount or dependency change
    return () => clearInterval(intervalRef.current);

  }, [timeOn, url, token, intervalSeconds]);

  // Expose refs/state for optional UI display or control
  return {
    timerRef,      // accumulated time (seconds)
    timeOn,        // is timer running
    setTimeOn,     // toggle pause/resume
  };
}
