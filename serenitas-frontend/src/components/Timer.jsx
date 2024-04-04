import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/authContext";
import API_URL from "../config";

export const Timer = () => {
  const { username, isLoggedIn } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const startAudioRef = useRef(
    new Audio(
      "https://res.cloudinary.com/dgwvbd9ki/video/upload/v1711530123/serenitas/baths_tofqc6.mp3"
    )
  );
  const alarmAudioRef = useRef(
    new Audio(
      "https://res.cloudinary.com/dgwvbd9ki/video/upload/v1711531628/serenitas/lituus_uvnm2s.mp3"
    )
  );
  const intervalRef = useRef();

  useEffect(() => {
    let timer;

    if (isRunning && timeRemaining > 0) {
      startAudioRef.current.play();
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime === 300) {
            alarmAudioRef.current.play();
          }
          if (newTime === 0) {
            alarmAudioRef.current.play();
            startAudioRef.current.pause();
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
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              })
              .catch((error) => console.error("Error:", error));
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      startAudioRef.current.pause();
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, timeRemaining, username]);

  useEffect(() => {
    if (isRunning) {
      startAudioRef.current.currentTime =
        startAudioRef.current.duration * (1 - timeRemaining / 1500);
      startAudioRef.current.play();
    } else {
      startAudioRef.current.pause();
    }
  }, [isRunning, timeRemaining]);

  const toggleTimer = () => {
    setIsRunning((prevState) => !prevState);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(1500);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = `${minutes}`.padStart(2, "0");
    const formattedSeconds = `${remainingSeconds}`.padStart(2, "0");
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
