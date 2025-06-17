import { memo } from "react";

import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  color: theme.palette.text[theme.mode] || theme.palette.text.primary,
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.grey?.[theme.mode]?.light || theme.palette.action.hover,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.grey?.[theme.mode]?.dark || theme.palette.background.default,
  },
}));

export default memo(StyledTableRow);
