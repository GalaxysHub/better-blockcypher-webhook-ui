import { memo } from "react";
import TableCell from "@mui/material/TableCell";

import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    fontSize: 16,
    background: theme.palette.primary[theme.mode] || theme.palette.primary.main,
    color: theme.palette.text[theme.mode] || theme.palette.text.primary,
  },
  "&.MuiTableCell-body": {
    fontSize: 10,
    padding: "0px 8px",
  },
}));

export default memo(StyledTableCell);
