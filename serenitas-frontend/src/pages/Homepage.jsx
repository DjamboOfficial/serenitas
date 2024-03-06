import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import "../homepage.css";
import "../buttons.css";
import "../styles/navbar.css";
import "../todolist.css";
import "../marcus-aurelius.css";
import { ApiCalls } from "../components/ApiCalls";

import { Timer } from "../components/Timer";
import Navbar from "../components/Navbar";
import UnathenticatedToDoList from "../components/UnauthenticatedToDoList";
import AuthenticatedToDoList from "../components/AuthenticatedToDoList";

function Homepage() {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, username, userId, projectName } = useAuth();

  return (
    <>
      <Navbar />
      {loading && (
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      )}
      <div className={`homepage ${loading ? "loading" : ""}`}>
        {isLoggedIn && (
          <div className="homepage-salute-container">
            <h1 className="homepage-salute">Ave, {username}</h1>
          </div>
        )}
        <Timer />
        {isLoggedIn ? (
          <AuthenticatedToDoList />
        ) : (
          <UnathenticatedToDoList />
        )}{" "}
        <ApiCalls />
      </div>
    </>
  );
}

export default Homepage;
