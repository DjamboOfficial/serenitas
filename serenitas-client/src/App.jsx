// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import HomepageLoggedIn from "./pages/HomepageLoggedIn";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the Homepage */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/homepageLoggedIn" element={<HomepageLoggedIn />} />
      </Routes>
    </Router>
  );
};

export default App;
