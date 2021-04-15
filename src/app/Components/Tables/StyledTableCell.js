import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
    padding: "0px 8px",
  },
}))(TableCell);

export default StyledTableCell;
