import React, { useState, useEffect } from 'react';
import './Timer.css'
const Timer = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  // Function to start the timer
  const startTimer = () => {
    setIsRunning(true);
  };

  // Function to stop the timer
  const stopTimer = () => {
    setIsRunning(false);
  };

  // Function to reset the timer
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  // useEffect to handle the timer logic
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format the time to display as MM:SS
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;