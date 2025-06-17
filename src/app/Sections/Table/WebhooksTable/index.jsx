import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@mui/styles";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import WebhookTableHeaders from "./WebhookTableHeaders";
import WebhookTableBody from "./WebhookTableBody";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    position: "relative",
  },
  tableCell: {
    fontSize: "16px",
  },
}));

const WebhookDataTable = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <WebhookTableHeaders />
        <WebhookTableBody />
      </Table>
    </TableContainer>
  );
};

export default connect()(WebhookDataTable);
