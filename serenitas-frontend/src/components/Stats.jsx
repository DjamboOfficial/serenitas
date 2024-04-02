import React, { useState } from "react";
import "../styles/stats.css"; // Import CSS file for styling

const Stats = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`stats-container ${isOpen ? "open" : ""}`}
      onClick={handleClick}
    >
      <div className="stats-box"></div>
    </div>
  );
};

export default Stats;
