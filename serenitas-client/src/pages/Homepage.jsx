import React, { useState, useEffect } from "react";
import Timer from "../components/Timer";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/colosseum.png";
import "../App.css";

const Homepage = () => {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    // Set background properties when the component mounts
    document.body.style.backgroundSize = "100% 100%";
    document.body.style.backgroundRepeat = "no-repeat";

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.backgroundSize = null;
      document.body.style.backgroundRepeat = null;
    };
  }, []); // Empty dependency array ensures the effect runs only once

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
          justifyContent: "flex-start",
          padding: "15vh 0",
        }}
      >
        <div className={`backdrop ${theme}`} style={{ textAlign: "center" }}>
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
