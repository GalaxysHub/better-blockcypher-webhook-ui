import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";

import Paper from "@material-ui/core/Paper";

import { getWebhooksByCoin } from "APIs/blockcypherWebhooks";
import { convertWebhookArrToObj } from "utils";

import { setWebhookData } from "redux/actions/webhookActions";
import { CircularProgress } from "@material-ui/core";

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
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const { fetched, data } = useSelector((state) => state.webhookReducer[coin]);

  useEffect(() => {
    async function fetchCoinData() {
      try {
        let fetchedData = await getWebhooksByCoin(coin);
        let dataObj = convertWebhookArrToObj(fetchedData);
        dispatch(setWebhookData({ coin, data: dataObj }));
      } catch (err) {
        console.log(`Error fetching coin webhook data:`, err);
      }
    }

    if (!fetched) fetchCoinData();
  }, [coin]);

  const renderTable = (data) => {
    if (!fetched) {
      return <CircularProgress />;
    } else {
      return (
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <WebhookTableHeaders />
            <WebhookTableBody />
          </Table>
        </TableContainer>
      );
    }
  };
  return <>{renderTable(data)}</>;
};

export default connect()(WebhookDataTable);
