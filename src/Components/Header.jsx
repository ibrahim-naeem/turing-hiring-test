import React, { useEffect, useState } from "react";
import TTLogo from "../assets/logo/TT Logo.svg";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Container = {
  display: "flex",
  justifyContent: "space-between",
  border: "1px solid #d3d5d8",
  padding: "0 4rem",
};
const logo = {
  padding: "1rem 0",
};
const btn = {
  margin: "auto 0",
  width: "115px",
  height: "40px",
  background: "#4f46f8",
  fontSize: " 16px",
  fontWeight: " 500",
  fontStyle: " normal",
  textAlign: " center",
  color: " #ffffff",
};

export default () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const handleClick = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <Box style={Container}>
        <Box style={logo}>
          <img src={TTLogo} />
        </Box>
        {accessToken && (
          <Button style={btn} onClick={handleClick}>
            Log out
          </Button>
        )}
      </Box>
    </>
  );
};
