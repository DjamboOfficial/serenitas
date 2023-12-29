import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">Serenitas</a>
        <a className="navbar-brand" href="/dashboard">
          Dashboard
        </a>
        <a className="navbar-brand" href="/selectTheme">
          Select Theme
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
