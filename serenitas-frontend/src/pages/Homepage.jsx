import React from "react";
import { useAuth } from "../contexts/authContext";
import "../homepage.css";
import "../buttons.css";
import "../styles/navbar.css";
import "../styles/unauthenticatedToDoList.css";
import "../marcus-aurelius.css";
import "../styles/authenticatedToDoList.css";
import { ApiCalls } from "../components/ApiCalls";
import { Timer } from "../components/Timer";
import Navbar from "../components/Navbar";
import UnauthenticatedToDoList from "../components/UnauthenticatedToDoList";
import AuthenticatedToDoList from "../components/AuthenticatedToDoList";
import { ContactForm } from "../components/ContactForm";

function Homepage() {
  const { isLoggedIn, username } = useAuth();

  return (
    <>
      <Navbar />
      <div className="homepage">
        {isLoggedIn && (
          <div className="homepage-salute-container">
            <h1 className="homepage-salute">Ave, {username}</h1>
          </div>
        )}
        <Timer />
        {isLoggedIn ? <AuthenticatedToDoList /> : <UnauthenticatedToDoList />}
        <ApiCalls />
        <ContactForm />
      </div>
    </>
  );
}

export default Homepage;
