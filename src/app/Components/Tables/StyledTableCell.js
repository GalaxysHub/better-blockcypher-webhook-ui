import TableCell from "@material-ui/core/TableCell";

import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary[theme.mode],
    color: theme.palette.text[theme.mode],
  },
  body: {
    fontSize: 12,
    padding: "0px 8px",
  },
}))(TableCell);

export default StyledTableCell;
