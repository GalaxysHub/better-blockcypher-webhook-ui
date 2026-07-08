import { memo } from "react";
import TableCell from "@mui/material/TableCell";

import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    fontSize: 13,
    fontWeight: 800,
    lineHeight: 1.2,
    background: "transparent",
    color: theme.palette.table?.headText?.[theme.mode] || theme.palette.primary.contrastText,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: "14px",
  },
  "&.MuiTableCell-body": {
    fontSize: 13,
    padding: "11px 14px",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default memo(StyledTableCell);
