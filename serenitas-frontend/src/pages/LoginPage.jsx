import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Redirect, redirect } from "react-router-dom";
import "../styles/loginPage.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import API_URL from "../config";

function LoginPage() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setUsername(username);
      console.log(username);
      navigate("/dashboard");
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
