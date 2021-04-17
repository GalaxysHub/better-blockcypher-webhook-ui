import { memo } from "react";

import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

const StyledTableRow = withStyles((theme) => ({
  root: {
    color: theme.palette.text[theme.mode],
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[theme.mode].light,
    },
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.grey[theme.mode].dark,
    },
  },
}))(TableRow);

export default memo(StyledTableRow);
