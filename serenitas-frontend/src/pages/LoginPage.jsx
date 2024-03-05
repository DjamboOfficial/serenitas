import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Redirect, redirect } from "react-router-dom";
import "../styles/loginPage.css";
import axios from "axios";
import Navbar from "../components/Navbar";

function LoginPage() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      console.log(username);
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page-container">
        <div className="login-page-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
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

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
