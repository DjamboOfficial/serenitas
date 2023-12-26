import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar";
import backgroundImage from "../assets/UserDatabaseBackdrop.png";
import "../App.css"; // Adjust the file path based on your project structure
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const API_URL = "http://localhost:3000";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const requestBody = { email, password };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Make an axios request to the login endpoint
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        const { token, user } = response.data;

        // Store the token in local storage
        localStorage.setItem("token", token);

        // Redirect or perform other actions as needed
        navigate("/Dashboard");
      })
      .catch((error) => {
        if (
          error.response.status === 400 &&
          error.response.data.error === "User does not exist"
        ) {
          // Handle the case where the user does not exist
          setErrorMessage("User does not exist. Please sign up.");
        } else {
          // Handle other error cases
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        }
      });
  };

  return (
    <div style={{ fontFamily: "Cinzel, sans-serif" }}>
      <NavBar />
      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          alignItems: "center",
          justifyContent: "flex-start", // Align content closer to the top
          padding: "15vh 0",
        }}
      >
        <MDBContainer className="LoginPage">
          <MDBRow className="justify-content-center mt-5">
            <MDBCol md="6">
              <MDBTypography tag="h1" className="text-center mb-4">
                Login
              </MDBTypography>

              <form onSubmit={handleLoginSubmit}>
                <MDBInput
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                />

                <MDBInput
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                />

                <MDBBtn
                  color="primary"
                  type="submit"
                  style={{ width: "100px", height: "40px" }}
                >
                  Log In
                </MDBBtn>
              </form>

              {errorMessage && (
                <MDBTypography
                  tag="p"
                  className="error-message text-center mt-3"
                >
                  {errorMessage}
                </MDBTypography>
              )}

              <MDBTypography tag="p" className="text-center mt-3">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </MDBTypography>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div
          style={{
            marginBottom: "1%",
          }}
        ></div>
      </div>
    </div>
  );
}

export default LoginPage;
