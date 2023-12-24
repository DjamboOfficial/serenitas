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
        fontSize: "15em", // Adjusted font size to make it HUGE
        fontWeight: "bold", // Added bold font weight for emphasis
        color: "#fff", // Adjusted color (you can change it based on your theme)
      }}
    >
      {formatTime(timeRemaining)}
    </div>
  );
};

export default TimerDisplay;
