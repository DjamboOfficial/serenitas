import { useState } from "react";
import "../styles/navbar.css";
import { useAuth } from "../contexts/authContext";
import { AuthenticatedMenu } from "./AuthenticatedMenu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(); // Aggiorna la pagina
  };

  return (
    <>
      <div className="navbar-container">
        <img
          className="edo-logo"
          src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1708695526/portfolio/edo-logo_jdaxxe.png"
          alt="edo-logo"
        />
        <div className="serenitas-header">
          <img
            className="serenitas-header-logo"
            src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1708599342/portfolio/2-removebg-preview_swhv6r.png"
            alt=""
          />
          <h3>serenitas</h3>
        </div>
        <button className="navbar-button">
          {" "}
          <a href="/login">Log In</a>
        </button>

        <button className="navbar-button">
          <a href="/signup">Sign Up</a>
        </button>
        <button className="navbar-button" onClick={handleLogOut}>
          Log Out
        </button>

        {isLoggedIn && <p>i</p>}
      </div>
    </>
  );
};

export default Navbar;
