import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "18px",
    color: theme.palette.text[theme.mode],
    backgroundColor: theme.palette.primary.main,
    padding: "30px 0px",
  },
  link: {
    color: "aqua",
    textDecoration: "none",
    padding: "10px",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      Developed By:
      <a
        className={classes.link}
        href="https://github.com/GalaxysHub/better-blockcypher-webhook-ui"
      >
        GalaxysHub
      </a>
    </footer>
  );
}
