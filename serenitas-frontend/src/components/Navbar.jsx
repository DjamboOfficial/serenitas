import { useState } from "react";
import "../styles/navbar.css";
import { useAuth } from "../contexts/authContext";
import { AuthenticatedMenu } from "./AuthenticatedMenu";

const Navbar = () => {
  const { isLoggedIn } = useAuth(); // Using useAuth hook correctly
  return (
    <>
      <div className="navbar-container">
        <img
          className="edo-logo"
          src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1708695526/portfolio/edo-logo_jdaxxe.png"
          alt="edo-logo"
        />

        <button className="navbar-button">
          {" "}
          <a href="/login">Log In</a>
        </button>
        <div className="serenitas-header">
          <img
            className="serenitas-header-logo"
            src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1708599342/portfolio/2-removebg-preview_swhv6r.png"
            alt=""
          />
          <h3>serenitas</h3>
        </div>
        <button className="navbar-button">
          <a href="/signup">Sign Up</a>
        </button>

        {isLoggedIn && <p>i</p>}
      </div>
    </>
  );
};

export default Navbar;
