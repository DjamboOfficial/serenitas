import React, { useState } from "react";
import Timer from "../components/Timer";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/colosseum.png";
import "../App.css"; // Adjust the file path based on your project structure

const Homepage = () => {
  const [theme, setTheme] = useState("default");

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <div style={{ fontFamily: "Cinzel, sans-serif" }}>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          minHeight: "100vh",
          minWidth: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // Align content closer to the top
          padding: "15vh 0", // Adjusted padding
        }}
      >
        <div className={`backdrop ${theme}`} style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "5em", // Increased font size
              lineHeight: "1.1",
              margin: "0", // Remove default margin
              color: "#fff",
            }}
          >
            Serenitas
          </h1>
          <Timer
            style={{
              fontSize: "3em",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
