import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import { convertDuration } from "../utils/convertDate";

const tableHead = {
  background: "red",
  border: "1px solid black",
  width: "1195px",
  height: "44px",
  borderColor: "#cbd6e2",
  borderWidth: "1px",
  borderStyle: "solid",
  borderLeftTopRadius: "4px",
  borderRightTopRadius: "4px",
  borderRightBottomRadius: "0px",
  borderLeftBottomRadius: "0px",
  background: "#f4f4f9",
};
const duration = {
  display: "flex",
  flexDirection: "column",
};
const direction = {
  width: "58px",
  height: "17px",
  fontFamily: "Avenir",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "24px",
  fontStyle: "normal",
  textAlign: "left",
  color: "#325ae7",
};
const archived = {
  width: "66px",
  height: "24px",
  borderRadius: "2px",
  background: "rgba(29,201,183,0.08 ",
  fontFamily: '"Avenir"',
  fontSize: "12px",
  fontWeight: "500",
  fontStyle: "normal",
  color: "#1dc9b7",
  padding: "1rem 3rem",
};
const unarchived = {
  width: "72px",
  height: "24px",
  borderRadius: "2px",
  background: "rgba(114,114,114,0.12 ",
  fontFamily: '"Avenir"',
  fontSize: "12px",
  fontWeight: "500",
  fontStyle: "normal",
  color: "#727272",
  padding: "1rem 3rem",
};
const btn = {
  margin: "auto 0",
  width: "100px",
  height: "30px",
  background: "#4f46f8",
  fontSize: " .8rem",
  fontStyle: " normal",
  textAlign: " center",
  color: " #ffffff",
};

export default ({ data, setOpen, setSelectedRow }) => {
  const handleAddNotes = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };
  const handleArchive = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(
        `${process.env.REACT_APP_ALL_CALLS_API}/${id}/archive`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow style={tableHead}>
            <TableCell>Call type</TableCell>
            <TableCell align="center">Direction</TableCell>
            <TableCell align="center">Duration</TableCell>
            <TableCell align="center">FROM</TableCell>
            <TableCell align="center">TO</TableCell>
            <TableCell align="center">VIA</TableCell>
            <TableCell align="center">CREATED AT</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.call_type}</TableCell>
              <TableCell align="center" style={direction}>
                {row.direction}
              </TableCell>
              <TableCell align="center">
                <div style={duration}>
                  {convertDuration(row.duration)}
                  <span style={{ color: "#325ae7" }}>({row.duration})</span>
                </div>
              </TableCell>
              <TableCell align="center">{row.from}</TableCell>
              <TableCell align="center">{row.to}</TableCell>
              <TableCell align="center">{row.via}</TableCell>
              <TableCell align="center">{row.created_at}</TableCell>
              <TableCell align="center">
                {row.is_archived ? (
                  <Button
                    style={archived}
                    onClick={() => handleArchive(row.id)}
                  >
                    Archived
                  </Button>
                ) : (
                  <Button
                    style={unarchived}
                    onClick={() => handleArchive(row.id)}
                  >
                    Unarchived
                  </Button>
                )}
              </TableCell>
              <TableCell align="center">
                <Button style={btn} onClick={() => handleAddNotes(row)}>
                  Add Note
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
