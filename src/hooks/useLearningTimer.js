import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";

export default function useLearningTimer() {
  const [timeOn, setTimeOn] = useState(true);
  const [timer, setTimer] = useState(0);
  const seconds = useRef(60);
  const { url, token } = useContext(StoreContext);

  useEffect(() => {
    if (!timeOn) return;

    const interval = setInterval(async () => {
      try {
        await axios.post(
          `${url}/api/user/update-learning-time`,
          { seconds: seconds.current },
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        setTimer((prev) => prev + seconds.current);
      } catch (error) {
        console.log("Error updating study time: ", error);
      }
    }, seconds.current * 1000);

    return () => clearInterval(interval);
  }, [timeOn, url, token]);

  return { timeOn, setTimeOn, timer };
}
