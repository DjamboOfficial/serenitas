import React from "react";

const TimerDisplay = ({ timeRemaining }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = `${minutes}`.padStart(2, "0"); // Ensure two digits
    const formattedSeconds = `${remainingSeconds}`.padStart(2, "0"); // Ensure two digits
    return [formattedMinutes, formattedSeconds];
  };

  const [formattedMinutes, formattedSeconds] = formatTime(timeRemaining);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "10em", // Bigger font size
        color: "#e74c3c", // Different color (you can replace with your preferred color)
        fontFamily: "cursive",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Text shadow
      }}
    >
      <span style={{ marginRight: "10px" }}>{formattedMinutes}</span>
      <span>{formattedSeconds}</span>
    </div>
  );
};

export default TimerDisplay;
