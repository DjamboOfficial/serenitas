// Timer.js
import React, { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";

const Timer = () => {
  // State to manage the remaining time and whether the timer is running
  const [timeRemaining, setTimeRemaining] = useState(1500); // Initial time: 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  // Effect to handle the countdown logic
  useEffect(() => {
    let timer;

    // Check if the timer is running and there is time remaining
    if (isRunning && timeRemaining > 0) {
      // Set up an interval to decrement the time remaining every second
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(timer);
    };
  }, [isRunning, timeRemaining]);

  // Function to start or pause the timer
  const toggleTimer = () => {
    setIsRunning((prevState) => !prevState);
  };

  // Function to reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(1500); // Reset time to 25 minutes in seconds
  };

  return (
    <div>
      {/* Display the remaining time */}
      <TimerDisplay timeRemaining={timeRemaining} />

      {/* Controls to start/pause and reset the timer */}
      <TimerControls
        isRunning={isRunning}
        onToggleTimer={toggleTimer}
        onResetTimer={resetTimer}
      />
    </div>
  );
};

export default Timer;

/*

More here: 

*State Management:

timeRemaining: Represents the remaining time in seconds.
isRunning: Indicates whether the timer is currently running or paused.

*useEffect Hook:

Handles the countdown logic using setInterval.
The effect runs when either isRunning or timeRemaining changes.
It checks if the timer is running and there is time remaining, then sets up an interval to decrement the time every second.
The interval is cleared when the component is unmounted to avoid memory leaks.

*toggleTimer Function:

Toggles the isRunning state between true and false.
If the timer is running, it pauses it; if it's paused, it starts it.

*resetTimer Function:

Resets the isRunning state to false and sets the timeRemaining back to the initial value (25 minutes in seconds).

*Return Statement:

Renders the TimerDisplay component to show the remaining time.
Renders the TimerControls component to provide buttons for starting/pausing and resetting the timer.
This structure allows for modular and reusable code. Each part of the timer logic is encapsulated into functions, making it easier to understand and maintain. The Timer component serves as the orchestrator for the display and controls, and the logic is divided into smaller functions and effects.



*/
