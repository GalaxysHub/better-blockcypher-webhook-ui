import React from "react";
import { useSelector } from "react-redux";

const ProgressBar = ({ completed }) => {
  const theme = useSelector((state) => state.themeReducer);

  const containerStyles = {
    height: 18,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 999,
    margin: "auto",
    overflow: "hidden",
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    border: theme.palette.secondary.main + " 1px solid",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 1s ease-in-out",
  };

  const labelStyles = {
    padding: "0 8px",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: "18px",
  };

  return (
    <div style={containerStyles} data-testid="progress-bar-container">
      <div style={fillerStyles} data-testid="progress-bar-filler">
        <span style={labelStyles} data-testid="progress-bar-label">{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
