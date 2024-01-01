import React, { useState, useEffect } from "react";
import Timer from "../components/Timer";
import Navbar2 from "../components/Navbar2";
import backgroundImage from "../assets/colosseum.png";
import blacksmithImage from "../assets/blacksmith.png";
import emperorImage from "../assets/emperor.png";
import gladiatorImage from "../assets/gladiator.png";
import philosopherImage from "../assets/philosopher.png";
import senatorImage from "../assets/senator.png";
import { fetchUserData } from "../../services/utils";
import "../App.css";

const HomepageLoggedIn = () => {
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("");

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

  useEffect(() => {
    // Update background image based on selected theme
    switch (selectedTheme) {
      case "blacksmith":
        document.body.style.backgroundImage = `url(${blacksmithImage})`;
        document.body.style.backgroundSize = "100% 100%";
        document.body.style.backgroundRepeat = "no-repeat";
        break;
      case "emperor":
        document.body.style.backgroundImage = `url(${emperorImage})`;
        document.body.style.backgroundSize = "100% 100%";
        document.body.style.backgroundRepeat = "no-repeat";
        break;
      case "gladiator":
        document.body.style.backgroundImage = `url(${gladiatorImage})`;
        document.body.style.backgroundSize = "100% 100%";
        document.body.style.backgroundRepeat = "no-repeat";
        break;
      case "senator":
        document.body.style.backgroundImage = `url(${senatorImage})`;
        document.body.style.backgroundSize = "100% 100%";
        document.body.style.backgroundRepeat = "no-repeat";
        break;
      case "philosopher":
        document.body.style.backgroundImage = `url(${philosopherImage})`;
        document.body.style.backgroundSize = "100% 100%";
        document.body.style.backgroundRepeat = "no-repeat";
        break;
      default:
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundSize = "100% 100%";
        document.body.style.backgroundRepeat = "no-repeat";
        break;
    }
  }, [selectedTheme]);

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const handleTimerCompletion = () => {
    setIsTimerCompleted(true);
    const audio = new Audio("../assets/sounds/timer-completed.wav");

    // Handle errors
    audio.addEventListener("error", (error) => {
      console.error("Error loading audio:", error);
    });

    // Play the audio when it's ready
    audio.addEventListener("canplay", () => {
      audio.play();
    });
  };

  return (
    <div
      style={{
        fontFamily: "Cinzel, sans-serif",
      }}
    >
      <Navbar2 />
      <div
        style={{
          fontFamily: "Cinzel, sans-serif",
          margin: "0",
          padding: "0",
          minHeight: "130vh",
          minWidth: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {userData && (
            <h2 style={{ color: "#fff" }}>Ave, {userData.username}!</h2>
          )}

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
          <button>
            <select onChange={handleThemeChange}>
              <option value="">Select Theme</option>
              <option value="blacksmith">Blacksmith</option>
              <option value="emperor">Emperor</option>
              <option value="gladiator">Gladiator</option>
              <option value="senator">Senator</option>
              <option value="philosopher">Philosopher</option>
            </select>
          </button>
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
