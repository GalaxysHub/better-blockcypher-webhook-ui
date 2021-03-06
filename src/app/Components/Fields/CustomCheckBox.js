import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";

const CustomCheckBox = withStyles((theme) => ({
  root: {
    color: theme.palette.primary[theme.mode],
    "&$checked": {
      color: theme.palette.secondary[theme.mode],
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);

export default CustomCheckBox;
