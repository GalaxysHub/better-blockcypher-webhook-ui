import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import FieldSelector from "../Selectors/FieldSelector";
import WebhookDataTable from "./WebhookDataTable";
import PageSelector from "../Selectors/PageSelector";

import { getWebhooksByCoin } from "APIs/blockcypherWebhooks";
import { convertWebhookArrToObj } from "utils";

import { setWebhookData } from "redux/actions/webhookActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: "8px",
  },
}));

const TableSection = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const { fetched } = useSelector((state) => state.webhookReducer[coin]);

  async function fetchCoinData() {
    try {
      let fetchedData = await getWebhooksByCoin(coin);
      let dataObj = convertWebhookArrToObj(fetchedData);
      dispatch(setWebhookData({ coin, data: dataObj }));
    } catch (err) {
      console.log(`Error fetching coin webhook data:`, err);
    }
  }
  useEffect(() => {
    if (!fetched) fetchCoinData();
  }, [coin]);

  const renderSection = () => {
    if (fetched) {
      return (
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <FieldSelector />
          <br />
          <WebhookDataTable />
          <br />
          <Paper elevation={11} className={classes.paper}>
            <PageSelector />
          </Paper>
        </Grid>
      );
    } else {
      return <CircularProgress />;
    }
  };

  return <>{renderSection()}</>;
};

WebhookDataTable.propTypes = {
  coin: PropTypes.string.isRequired,
};

export default connect()(TableSection);
