import React, { useState } from "react";
import { Header } from "../Components";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const container = {
  background: "#F4EEEE",
  width: "100vw",
  height: "92vh",
};
const loginBox = {
  width: "40vw",
  height: "40vh",
  background: "#FFFFFF",
  position: "relative",
  top: "50%",
  left: "50%",
  translate: "-50% -50%",
};
const form = {
  padding: "1.5rem",
};
const inputContainer = {
  margin: "1.5rem auto",
};
const label = {
  margin: "1rem 0rem",
};
const inputField = {
  width: "40rem",
};
const loginBtn = {
  background: "#1A90FF",
  color: "#ffffff",
  padding: ".8rem 1.2rem",
};

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a login request object
      const loginRequest = {
        username,
        password,
      };
      // Make the login request using Axios with async/await
      const response = await axios.post(
        process.env.REACT_APP_LOGIN_API,
        loginRequest
      );

      // Handle the successful login response
      console.log("Login successful:", response.data);
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/");
    } catch (error) {
      // Handle the login error
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <Header />
      <Box style={container}>
        <Box style={loginBox}>
          <form style={form} onSubmit={handleSubmit}>
            <Box style={inputContainer}>
              <Typography style={label}>
                <span
                  style={{
                    fontSize: "1.2rem",
                    color: "red",
                    paddingRight: ".2rem",
                  }}
                >
                  *
                </span>
                User Name
              </Typography>
              <TextField
                style={inputField}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Box>

            <Box style={inputContainer}>
              <Typography style={label}>
                <span
                  style={{
                    fontSize: "1.2rem",
                    color: "red",
                    paddingRight: ".2rem",
                  }}
                >
                  *
                </span>
                Password
              </Typography>
              <TextField
                type="password"
                style={inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Button style={loginBtn} type="submit">
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};
