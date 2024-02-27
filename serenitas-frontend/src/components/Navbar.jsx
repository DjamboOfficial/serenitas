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
          src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1708695526/portfolio/edo-logo_jdaxxe.png"
          alt="edo-logo"
        />
        <button id="serenitas-header-button">
          <a href="/">
            {" "}
            <h1>serenitas</h1>
          </a>
        </button>

        <nav className="navbar">
          <button>
            {" "}
            <a href="/login">Log In</a>
          </button>
          <button>
            <a href="/signup">Sign Up</a>
          </button>
        </nav>
        {isLoggedIn && <p>i</p>}
      </div>
    </>
  );
};

export default Navbar;
