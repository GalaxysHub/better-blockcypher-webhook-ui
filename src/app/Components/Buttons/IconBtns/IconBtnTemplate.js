import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { green, red, lightBlue, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  generic: {
    "&:focus": {
      outline: "0",
    },
  },
  success: {
    color: green[700],
    "&:hover": {
      color: green[500],
    },
  },
  danger: {
    color: red[700],
    "&:hover": {
      color: red[500],
    },
  },
  warning: {
    color: yellow[700],
    "&:hover": {
      color: yellow[500],
    },
  },
  info: {
    color: lightBlue[700],
    "&:hover": {
      color: lightBlue[500],
    },
  },
}));

export default function IconBtnTemplate(props) {
  const classes = useStyles();
  let { action, type, size, icon, tip, children, className } = props;
  const Icon = icon;

  return (
    <Tooltip title={tip} placement="top">
      <IconButton
        className={[classes["generic"], classes[type], className].join(" ")}
        onClick={(event) => {
          action(event);
        }}
      >
        {React.cloneElement(Icon, {
          fontSize: size,
        })}
        {children}
      </IconButton>
    </Tooltip>
  );
}
