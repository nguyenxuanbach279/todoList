import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import "./style.css"

export default function LoadingSpinner() {
  const classes = useStyles();

  return (
    <>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
      {/* <Box className={classes.spinnerContainer}>
        <Box className={classes.loadingSpinner}></Box>
      </Box> */}
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
  },
  "@keyframes spinner": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  loadingSpinner: {
    width: 50,
    height: 50,
    border: "10px solid #f3f3f3",
    borderTop: "10px solid #383636",
    borderRadius: "50%",
    animation: "spinner 1.5s linear infinite",
  },
}));
