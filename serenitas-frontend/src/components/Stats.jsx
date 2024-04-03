import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/stats.css"; // Import CSS file for styling

const Stats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activityData, setActivityData] = useState([]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/stats")
      .then((response) => {
        setActivityData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div
      className={`stats-container ${isOpen ? "open" : ""}`}
      onClick={handleClick}
    >
      <div className={`stats-box ${isOpen ? "open" : ""}`}>
        <h2>serenitas most active users</h2>
        {activityData.length > 0 ? (
          <ul>
            {activityData.map((data) => (
              <li className="list-item" key={data.userId}>
                User {data.userId}: {data.activityMinutes} minutes
              </li>
            ))}
          </ul>
        ) : (
          <p>No activity data available</p>
        )}
      </div>
    </div>
  );
};

export default Stats;
