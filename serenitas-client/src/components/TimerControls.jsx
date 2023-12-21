// TimerControls.js
import React from "react";

const TimerControls = ({ isRunning, onToggleTimer, onResetTimer }) => {
  return (
    <div>
      <button onClick={onToggleTimer}>{isRunning ? "Pause" : "Start"}</button>
      <button onClick={onResetTimer}>Reset</button>
    </div>
  );
};

export default TimerControls;
