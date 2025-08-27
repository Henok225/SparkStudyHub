// useLearningTimer.js
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function useLearningTimer(userId,url) {
  const location = useLocation();
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const lastActiveRef = useRef(Date.now());
  
  // --- Start timer ---
  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // --- Stop timer ---
  const stopTimer = () => {
    // alert("Learning timer stopped. Your learning time has been saved.");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // --- Save learning time to backend ---
  const saveLearningTime = async () => {
    if (seconds > 0) {
      try {
        await axios.post(url+"/api/user/learning-time", {
          userId,
          seconds,
        });
      } catch (err) {
        console.error("Error saving learning time:", err);
      }
    }
    setSeconds(0);
  };

  // --- Detect inactivity ---
  const handleActivity = () => {
    lastActiveRef.current = Date.now();
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    const inactivityCheck = setInterval(() => {
      if (Date.now() - lastActiveRef.current > 5 * 60 * 1000) {
        // 5 minutes inactivity
        if (window.confirm("Are you still learning?")) {
          handleActivity(); // reset
        } else {
          stopTimer();
          saveLearningTime();
        }
      }
    }, 60 * 1000); // check every 1 min

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearInterval(inactivityCheck);
    };
  }, [seconds]);

  // --- Start/Stop timer based on route ---
  useEffect(() => {
    if (location.pathname.includes("explain") || location.pathname.includes("quizzes")) {
      //  if(location.pathname === "*"){
      //   alert("Please navigate to a valid lesson or quiz to start the learning timer.");
      //       return;
      //   }
      //   else{
          // alert("Learning timer started. Stay active to track your learning time!");
        startTimer();  
        // }
      
    } else {
      stopTimer();
      saveLearningTime();
    }

    return () => {
      stopTimer();
      saveLearningTime();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return { seconds, stopTimer, startTimer };
}
