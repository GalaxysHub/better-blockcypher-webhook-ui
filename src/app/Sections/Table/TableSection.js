import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import FieldSelector from "../Selectors/FieldSelector";
import WebhookDataTable from "./WebhooksTable";
import PageSelector from "../Selectors/PageSelector";

import { getWebhooksByCoin } from "APIs/blockcypherWebhooks";
import { convertWebhookArrToObj } from "utils";

import { setWebhookData } from "redux/actions/webhookActions";

import DeleteAllBtn from "app/Components/Buttons/DeleteAllBtn";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: "12px",
    backgroundColor: theme.palette.grey.light[theme.mode],
  },
}));

const TableSection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const fetched = useSelector((state) => state.webhookReducer[coin].fetched);
  const webhooks = useSelector((state) => state.webhookReducer[coin].data);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCoinData() {
      try {
        let fetchedData = await getWebhooksByCoin(coin);
        let dataObj = convertWebhookArrToObj(fetchedData);
        dispatch(setWebhookData({ coin, data: dataObj }));
      } catch (err) {
        setError(`Error Fetching Webhooks: ${err.message}`);
        console.warn(`Error Fetching Webhooks:`, err);
      }
    }

    if (!fetched) fetchCoinData();
  }, [coin, fetched, dispatch]);

  const renderSection = () => {
    if (error) {
      return <h3 style={{ color: "red" }}>{error}</h3>;
    } else if (!fetched) {
      return <CircularProgress />;
    } else if (Object.keys(webhooks).length === 0) {
      return <></>;
    } else {
      return (
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <FieldSelector />
          <DeleteAllBtn />
          <WebhookDataTable />
          <br />
          <Paper elevation={11} className={classes.paper}>
            <PageSelector />
          </Paper>
        </Grid>
      );
    }
  };

  return <>{renderSection()}</>;
};

export default connect()(TableSection);
