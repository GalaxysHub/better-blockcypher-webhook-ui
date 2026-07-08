import { memo } from "react";

import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  color: theme.palette.table?.text?.[theme.mode] || theme.palette.text.primary,
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.table?.even?.[theme.mode] || theme.palette.action.hover,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.table?.odd?.[theme.mode] || theme.palette.background.default,
  },
  "&:hover": {
    backgroundColor: theme.palette.table?.hover?.[theme.mode] || theme.palette.action.hover,
  },
}));

export default memo(StyledTableRow);
