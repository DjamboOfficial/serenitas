import React, { useState } from "react";
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
import Stats from "../components/Stats";
import { connect } from "react-redux";
import { setMode } from "../redux/actions";
import ModesContainer from "../components/ModesContainer";
import "../styles/modes.css";

function Homepage({ mode, setMode }) {
  const { isLoggedIn, username } = useAuth();
  const [background, setBackground] = useState(
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1707131141/serenitas/senator_b07auj.png"
  );

  return (
    <>
      <Navbar />
      <div
        className="homepage"
        style={{ backgroundImage: `url(${background})` }}
      >
        {isLoggedIn && (
          <div className="homepage-salute-container">
            <h1 className="homepage-salute">Ave, {username}</h1>
          </div>
        )}
        <Timer />
        {isLoggedIn ? <AuthenticatedToDoList /> : <UnauthenticatedToDoList />}
        <div className="homepage-features">
          <Stats />
          <ApiCalls />
          <ContactForm />
        </div>
        <ModesContainer
          isLoggedIn={isLoggedIn}
          username={username}
          setBackground={setBackground}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    mode: state.mode, // Accessing mode state from Redux store
  };
};

const mapDispatchToProps = {
  setMode: setMode, // Mapping setMode action creator to props
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
