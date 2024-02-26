import React from "react";
import { useState, useEffect } from "react";
import "../homepage.css";
import "../buttons.css";
import "../navbar.css";
import "../todolist.css";
import "../marcus-aurelius.css";
import { ApiCalls } from "../components/ApiCalls";

import { Timer } from "../components/Timer";
import { Navbar } from "../components/Navbar";
import { ToDoList } from "../components/ToDoList";

function Homepage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <Navbar />
      {loading && (
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      )}
      <div className={`homepage ${loading ? "loading" : ""}`}>
        <Timer />
        <ToDoList />
        <ApiCalls />
      </div>
    </>
  );
}

export default Homepage;
