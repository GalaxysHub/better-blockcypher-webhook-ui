import React from "react";
import { useSelector } from "react-redux";

const ProgressBar = ({ completed }) => {
  const theme = useSelector((state) => state.themeReducer);

  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: "auto",
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
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
