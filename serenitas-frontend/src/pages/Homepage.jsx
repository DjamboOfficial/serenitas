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
import { ToDoList } from "../components/ToDoList";

function Homepage() {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, username } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  console.log("Username: ", username);
  return (
    <>
      <Navbar />
      {loading && (
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      )}
      <div className={`homepage ${loading ? "loading" : ""}`}>
        {isLoggedIn && <h1 className="ax">Ciao, {username}</h1>}
        <Timer />
        <ToDoList />
        <ApiCalls />
      </div>
    </>
  );
}

export default Homepage;
