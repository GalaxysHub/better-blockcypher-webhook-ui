import React, { useEffect } from "react";
import { connect, useSeletor, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import StyledTableCell from "app/Components/Tables/StyledTableCell";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { getWebhooksByCoin } from "APIs/blockcypherWebhooks";

const WebhookTableHeaders = () => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">ID</StyledTableCell>
        <StyledTableCell align="center">Event</StyledTableCell>
        <StyledTableCell align="center">URL</StyledTableCell>
        <StyledTableCell align="center">CallbackErrors</StyledTableCell>
        <StyledTableCell align="center">Options</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

const WebhookDataTableBody = () => {
  return <TableBody></TableBody>;
};

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
}));

const WebhookDataTable = ({ coin }) => {
  const classes = useStyles();

  useEffect(() => {
    console.log(`coin`, coin);
  }, [coin]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <WebhookTableHeaders />
        <WebhookDataTableBody />
      </Table>
    </TableContainer>
  );
};

export default connect()(WebhookDataTable);
