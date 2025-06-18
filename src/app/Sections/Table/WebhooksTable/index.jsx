import React from "react";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import WebhookTableHeaders from "./WebhookTableHeaders";
import WebhookTableBody from "./WebhookTableBody";

const StyledTable = styled(Table)({
  width: "100%",
  position: "relative",
});


const WebhookDataTable = () => {
  return (
    <TableContainer component={Paper} data-testid="webhook-table-container">
      <StyledTable data-testid="webhook-table">
        <WebhookTableHeaders />
        <WebhookTableBody />
      </StyledTable>
    </TableContainer>
  );
};

export default WebhookDataTable;
