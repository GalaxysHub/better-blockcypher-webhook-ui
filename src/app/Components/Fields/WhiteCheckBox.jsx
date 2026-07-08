import React from "react";
import { styled } from "@mui/material/styles";

import Checkbox from "@mui/material/Checkbox";

const WhiteCheckBox = styled(Checkbox)({
  color: "white",
  padding: 6,
  "&.Mui-checked": {
    color: "white",
  },
});

export default WhiteCheckBox;
