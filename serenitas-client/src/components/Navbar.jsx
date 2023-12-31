import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Serenitas
        </a>
        <a className="navbar-brand" href="/signup">
          Sign Up
        </a>
        <a className="navbar-brand" href="/login">
          Log In
        </a>
        <a className="navbar-brand" href="/logout">
          Logout
        </a>

        {/* Add your Navbar links or components here */}
      </div>
    </nav>
  );
};

export default Navbar;
