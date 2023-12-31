import React, { useState, useEffect } from "react";
import Timer from "../components/Timer";
import Navbar2 from "../components/Navbar2";
import backgroundImage from "../assets/colosseum.png";
import { fetchUserData } from "../../services/utils";
import "../App.css";

const HomepageLoggedIn = () => {
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(token);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTimerCompletion = () => {
    setIsTimerCompleted(true);
  };

  return (
    <div style={{ fontFamily: "Cinzel, sans-serif" }}>
      <Navbar2 />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          minHeight: "100vh",
          minWidth: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "15vh 0",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {userData && (
            <h2 style={{ color: "#fff" }}>Ave, {userData.username}!</h2>
          )}

          <h1
            style={{
              fontSize: "5em",
              lineHeight: "1.1",
              margin: "0",
              color: "#fff",
            }}
          >
            Serenitas
          </h1>
          <Timer
            style={{
              fontSize: "3em",
            }}
            onTimerCompletion={handleTimerCompletion}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button>View Projects</button>
          <button>Add Project</button>
          <button>Add Task</button>
          {isTimerCompleted && <button>Add completed timer</button>}
        </div>

        <div style={{ marginTop: "20px", color: "#fff" }}>
          {/* You can add content here */}
          Field Content
        </div>
      </div>
    </div>
  );
};

export default HomepageLoggedIn;
