import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext.js";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/signupPage.css";
import API_URL from "../config.js";

function SignupPage() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
  } = useAuth();

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    console.log("Context Value is:", { isLoggedIn, setIsLoggedIn });
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...");
    try {
      console.log("Sending request to:", `${API_URL}/auth/signup`);
      console.log("Request body:", { username, password, email });
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username,
        password,
        email,
      });
      console.log("Signup request successful:", response.data);
      const token = response.data.token;
      console.log("Received token:", token);
      localStorage.setItem("token", token);
      setIsLoggedIn(true); // Update authentication state
      setUsername(username);
      navigate("/");
    } catch (error) {
      console.error("Sign up failed: ", error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-page-container">
        <div className="signup-page-form-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
