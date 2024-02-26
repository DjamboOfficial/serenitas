import React, { useState, useEffect } from "react";
import alarmSound from "../assets/timer-over.wav";
export const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // Play the alarm sound when time is up
      const audio = new Audio(alarmSound);
      audio.play();
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, timeRemaining]);

  const toggleTimer = () => {
    setIsRunning((prevState) => !prevState);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(1500);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = `${minutes}`.padStart(2, "0"); // Ensure two digits
    const formattedSeconds = `${remainingSeconds}`.padStart(2, "0"); // Ensure two digits
    return [formattedMinutes, formattedSeconds];
  };

  const [formattedMinutes, formattedSeconds] = formatTime(timeRemaining);

  return (
    <>
      <div className="timer-container">
        <div className="timer-numbers">
          <span>{formattedMinutes}</span>:<span>{formattedSeconds}</span>
        </div>
        <div>
          <button className="timer-button" onClick={toggleTimer}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="timer-button" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
