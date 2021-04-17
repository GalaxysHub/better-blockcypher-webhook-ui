import { memo } from "react";
import TableCell from "@material-ui/core/TableCell";

import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontSize: 16,
    background: theme.palette.primary[theme.mode],
    color: theme.palette.text[theme.mode],
  },
  body: {
    fontSize: 10,
    padding: "0px 8px",
  },
}))(TableCell);

export default memo(StyledTableCell);
