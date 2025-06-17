import React from "react";
import { styled } from "@mui/material/styles";

import Checkbox from "@mui/material/Checkbox";

const CustomCheckBox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary[theme.mode] || theme.palette.primary.main,
  "&.Mui-checked": {
    color: theme.palette.secondary[theme.mode] || theme.palette.secondary.main,
  },
}));

export default CustomCheckBox;
