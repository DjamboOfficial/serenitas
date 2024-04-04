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

  const getMaxActivityMinutes = () => {
    return Math.max(...activityData.map((data) => data.activityMinutes), 0);
  };

  const getColor = (minutes) => {
    if (minutes >= 60) {
      return "green"; // Green color for high activity (more than 60 minutes)
    } else if (minutes >= 30) {
      return "orange"; // Orange color for moderate activity (between 30 and 60 minutes)
    } else {
      return "red"; // Red color for low activity (less than 30 minutes)
    }
  };

  return (
    <div
      className={`stats-container ${isOpen ? "open" : ""}`}
      onClick={handleClick}
    >
      <div className={`stats-box ${isOpen ? "open" : ""}`}>
        <h2>serenitas most active users</h2>
        {activityData.length > 0 ? (
          <ul className="users-list">
            {activityData.map((data) => (
              <li className="list-item" key={data.userId}>
                User {data.userId}: {data.activityMinutes} minutes
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        (data.activityMinutes / getMaxActivityMinutes()) * 100
                      }%`,
                      backgroundColor: getColor(data.activityMinutes),
                    }}
                  ></div>
                </div>
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
