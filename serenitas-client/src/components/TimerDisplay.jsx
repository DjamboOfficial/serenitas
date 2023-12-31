import React from "react";

const TimerDisplay = ({ timeRemaining }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div
      style={{
        fontSize: "8em",
        fontWeight: "bold",
        color: "#fff",
      }}
    >
      {formatTime(timeRemaining)}
    </div>
  );
};

export default TimerDisplay;
