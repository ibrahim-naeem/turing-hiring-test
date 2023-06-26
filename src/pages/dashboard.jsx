import React, { useState, useEffect } from "react";
import { Box, Typography, Table } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";
import { AddNotes, Header, CallsTable } from "../Components";

const container = {
  width: "90vw",
  margin: "0 auto",
};
const title = {
  fontSize: " 2rem",
  fontWeight: " normal",
  lineHeight: " 2rem",
  fontStyle: " normal",
  color: " #121214",
  padding: "4rem 0",
};
const filterByContainer = {
  display: "flex",
  marginBottom: "3rem",
  alignItems: "start",
};
const filterBy = {
  fontFamily: '"Avenir"',
  fontSize: "1rem",
  fontWeight: "normal",
  fontStyle: "normal",
  color: "#232323",
  border: "none",
};
const filterByOptions = {
  width: "8rem",
  border: "none",
  height: ".3rem",
  fontFamily: "Avenir",
  fontsSize: "14px",
  fontWeight: "500",
  fontStyle: "normal",
  textAlign: "left",
  color: "#4f46f8",
  marginTop: "-1rem",
  marginLeft: "1rem",
};

export default () => {
  const [data, setData] = useState([]);
  const [callsData, setCallsData] = useState([]);
  const [status, setStatus] = React.useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  useEffect(() => {
    if (status === "Archived") {
      setCallsData(data?.nodes.filter((row) => row.is_archived === true));
    } else if (status === "Unarchived") {
      setCallsData(data?.nodes.filter((row) => row.is_archived === false));
    } else {
      setCallsData(data?.nodes);
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(process.env.REACT_APP_ALL_CALLS_API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [status]);

  return (
    <>
      <Header />
      <Box style={container}>
        <Typography style={title}>Turing Technologies Frontend Test</Typography>
        <Box style={filterByContainer}>
          <Typography style={filterBy}>Filter by : </Typography>
          <FormControl variant="standard" style={filterByOptions}>
            <InputLabel style={{ color: "#4f46f8" }}>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Archived">Archived</MenuItem>
              <MenuItem value="Unarchived">Unarchived</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <CallsTable
          data={callsData}
          setOpen={setOpen}
          setSelectedRow={setSelectedRow}
        />
        {/* {open &&  */}
        <AddNotes open={open} setOpen={setOpen} selectedRow={selectedRow} />
      </Box>
    </>
  );
};
