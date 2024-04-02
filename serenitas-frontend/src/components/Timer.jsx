import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/authContext";
import API_URL from "../config";

export const Timer = () => {
  const { username, isLoggedIn } = useAuth(); // Providing default value as empty object
  const [timeRemaining, setTimeRemaining] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const startAudioRef = useRef(
    new Audio(
      "https://res.cloudinary.com/dgwvbd9ki/video/upload/v1711530123/serenitas/baths_tofqc6.mp3"
    )
  ); // Create reference for start sound
  const alarmAudioRef = useRef(
    new Audio(
      "https://res.cloudinary.com/dgwvbd9ki/video/upload/v1711531628/serenitas/lituus_uvnm2s.mp3"
    )
  );
  useEffect(() => {
    let timer;

    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
        if (timeRemaining === 300) {
          // 300 seconds = 5 minutes
          alarmAudioRef.current.play();
        }
      }, 1000);
    }

    if (timeRemaining === 0) {
      // Play the alarm sound when time is up
      alarmAudioRef.current.play();
      startAudioRef.current.pause(); // Play alarm audio
      fetch(`${API_URL}/auth/minutes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: username,
          completedTimerMinutes: 1500,
        }),
        // Assuming 25 minutes for 1500 seconds
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, timeRemaining, username]);

  useEffect(() => {
    if (isRunning) {
      // Play the start sound when timer starts
      startAudioRef.current.play(); // Play start audio
      startAudioRef.current.volume = 0.3;
    } else {
      // Pause the start sound when timer is paused or reset
      startAudioRef.current.pause();
      startAudioRef.current.currentTime = 0;
    }
  }, [isRunning]);

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
