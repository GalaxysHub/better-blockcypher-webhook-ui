import React from "react";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { green, red, lightBlue, yellow } from "@mui/material/colors";

const getTypeStyles = (type) => {
  const colorMap = {
    success: { main: green[700], hover: green[500] },
    danger: { main: red[700], hover: red[500] },
    warning: { main: yellow[700], hover: yellow[500] },
    info: { main: lightBlue[700], hover: lightBlue[500] },
  };
  
  return colorMap[type] || { main: 'inherit', hover: 'inherit' };
};

const StyledIconButton = styled(IconButton)(({ buttonType }) => {
  const typeStyles = getTypeStyles(buttonType);
  return {
    "&:focus": {
      outline: "0",
    },
    color: typeStyles.main,
    "&:hover": {
      color: typeStyles.hover,
    },
  };
});

export default function IconBtnTemplate(props) {
  let { action, type, tip, children, className, testId } = props;

  return (
    <Tooltip title={tip} placement="top" data-testid={`${testId}-tooltip`}>
      <StyledIconButton
        buttonType={type}
        className={className}
        data-testid={testId}
        onClick={(event) => {
          action(event);
        }}
      >
        {children}
      </StyledIconButton>
    </Tooltip>
  );
}
