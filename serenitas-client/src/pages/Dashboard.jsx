import React, { useState } from "react";
import Timer from "../components/Timer";
import Navbar2 from "../components/Navbar2";
import backgroundImage from "../assets/parchment.png";
import "../App.css"; // Adjust the file path based on your project structure

const Dashboard = () => {
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
          justifyContent: "flex-start", // Align content closer to the top
          padding: "15vh 0", // Adjusted padding
        }}
      >
        <div style={{ textAlign: "center" }}></div>
      </div>
    </div>
  );
};

export default Dashboard;
