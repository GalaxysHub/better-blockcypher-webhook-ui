import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";

import FormGroup from "@material-ui/core/FormGroup";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

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
