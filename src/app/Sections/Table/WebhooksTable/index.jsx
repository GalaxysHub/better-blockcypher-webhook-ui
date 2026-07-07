import React from "react";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import WebhookTableHeaders from "./WebhookTableHeaders";
import WebhookTableBody from "./WebhookTableBody";

const StyledTable = styled(Table)({
  width: "100%",
  minWidth: 760,
  position: "relative",
});

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  overflowX: "auto",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
}));

const WebhookDataTable = () => {
  return (
    <StyledTableContainer component={Paper} elevation={0} data-testid="webhook-table-container">
      <StyledTable data-testid="webhook-table">
        <WebhookTableHeaders />
        <WebhookTableBody />
      </StyledTable>
    </StyledTableContainer>
  );
};

export default WebhookDataTable;
