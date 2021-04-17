import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";

import Paper from "@material-ui/core/Paper";

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
