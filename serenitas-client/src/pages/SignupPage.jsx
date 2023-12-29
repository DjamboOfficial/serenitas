import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar";
import backgroundImage from "../assets/UserDatabaseBackdrop.png";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import "../App.css";

const API_URL = "http://localhost:3000";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setUserName(e.target.value);

  const requestBody = { email, password, username };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Request Body:", requestBody);

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        const { token, user } = response.data;
        console.log("2nd Signup Response:", response.data);
        console.log(token, user);
        navigate("/Homepage2");
      })
      .catch((error) => {
        console.error("Signup Error:", error.response.data);
        // Rest of the error handling code...
      });
    console.log(request.data);
  };

  return (
    <div style={{ fontFamily: "Cinzel, sans-serif" }}>
      <NavBar />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          minHeight: "100vh",
          minWidth: "110vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // Align content closer to the top
          padding: "15vh 0",
        }}
      >
        <MDBContainer className="SignupPage">
          <MDBRow className="justify-content-center mt-5">
            <MDBCol md="6">
              <MDBTypography tag="h1" className="text-center mb-4">
                Sign Up
              </MDBTypography>

              <form onSubmit={handleSignupSubmit}>
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

                <MDBInput
                  label="Name"
                  type="text"
                  name="name"
                  value={username}
                  onChange={handleName}
                />

                <MDBBtn
                  color="primary"
                  type="submit"
                  style={{ width: "100px", height: "40px" }}
                >
                  Sign Up
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
                Already have an account? <Link to="/login">Login</Link>
              </MDBTypography>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}

export default SignupPage;
