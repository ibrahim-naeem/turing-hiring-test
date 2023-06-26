import React, { useState } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import { convertDuration } from "../utils/convertDate";
import axios from "axios";

const container = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  background: "#ffffff",
  borderLeftTopRadius: "4px",
  borderRightTopRadius: "4px",
  borderRightBottomRadius: "0px",
  borderLeftBottomRadius: "0px",
  p: 4,
};
const header = {
  borderBottom: "1px solid #F1F2F2",
  padding: "2rem ",
};
const title = {
  fontSize: "1.2rem",
  fontWeight: 500,
};
const infoContainer = {
  margin: "2rem ",
};
const form = {
  //   padding: "1.5rem",
};
const inputField = {
  width: "34rem",
  margin: "0 2rem 1rem",
};
const footer = {
  borderTop: "1px solid #F1F2F2",
};
const btn = {
  margin: "auto 0",
  width: "35rem",
  height: "40px",
  background: "#4f46f8",
  fontSize: " 16px",
  fontWeight: " 500",
  fontStyle: " normal",
  textAlign: " center",
  color: " #ffffff",
  margin: "1.2rem",
  border: "none",
};

export default ({ open, setOpen, selectedRow }) => {
  const [note, setNote] = useState("");
  const handleClose = () => setOpen(!open);
  const handleSubmit = async (e) => {
    console.log(
      `${process.env.REACT_APP_ALL_CALLS_API}/${selectedRow.id}/note`
    );
    const requestData = {
      content: JSON.stringify(note),
    };
    const token = localStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ALL_CALLS_API}/${selectedRow.id}/note`,
        requestData,
        {
          headers,
        }
      );
      // Handle the response
      console.log("------------", response.data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box style={container}>
        <Box style={header}>
          <Typography style={title}>Add Notes</Typography>
          <Typography style={{ color: "#4f46f8" }}>
            Call ID {selectedRow.id}
          </Typography>
        </Box>
        <Box style={infoContainer}>
          <Typography>
            <span style={{ marginRight: "1rem" }}>Call type</span>
            {selectedRow.call_type}
          </Typography>
          <Typography>
            <span style={{ marginRight: "1rem" }}>Duration</span>

            {convertDuration(selectedRow.duration)}
          </Typography>
          <Typography>
            <span style={{ marginRight: "1.9rem" }}>FROM</span>
            {selectedRow.from}
          </Typography>
          <Typography>
            <span style={{ marginRight: "3.4rem" }}>TO</span>
            {selectedRow.to}
          </Typography>
          <Typography>
            <span style={{ marginRight: "3.3rem" }}>VIA</span>
            {selectedRow.via}
          </Typography>
        </Box>
        <form style={form} onSubmit={handleSubmit}>
          <Typography style={{ marginLeft: "2rem" }}>Notes</Typography>
          <TextField
            type="text"
            style={inputField}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            multiline
          />
          <Box style={footer}>
            <Button style={btn} type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
