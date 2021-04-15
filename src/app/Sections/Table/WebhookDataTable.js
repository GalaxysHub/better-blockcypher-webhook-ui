import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";

import Paper from "@material-ui/core/Paper";

import RefreshIconBtn from "app/Components/Buttons/IconBtns/RefreshIconBtn";

import { getWebhooksByCoin } from "APIs/blockcypherWebhooks";
import { convertWebhookArrToObj } from "utils";

import { setWebhookData } from "redux/actions/webhookActions";
import { CircularProgress } from "@material-ui/core";

import WebhookTableHeaders from "./WebhookTableHeaders";
import WebhookTableBody from "./WebhookTableBody";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    position: "relative",
  },
  tableCell: {
    fontSize: "16px",
  },
}));

const WebhookDataTable = ({ coin }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const webhookData = useSelector((state) => state.webhookReducer[coin]);
  const [data, setData] = useState({});
  const [fetching, setFetching] = useState(false);

  async function fetchCoinData() {
    try {
      let fetchedData = await getWebhooksByCoin(coin);
      let dataObj = convertWebhookArrToObj(fetchedData);
      setData(dataObj);
      dispatch(setWebhookData({ coin, data: dataObj }));
    } catch (err) {
      console.log(`Error fetching coin webhook data:`, err);
    }
  }

  useEffect(() => {
    if (!webhookData.fetched) fetchCoinData();
    else setData(webhookData.data);
  }, [coin, webhookData, dispatch]);

  const renderTable = (data) => {
    if (!webhookData.fetched) {
      return <CircularProgress />;
    } else if (Object.keys(data).length === 0) {
      return (
        <Paper style={{ width: "300px", margin: "auto" }} elevation={12}>
          <div
            style={{
              color: "red",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              height: "80px",
            }}
          >
            No Webhooks Found
          </div>
        </Paper>
      );
    } else {
      return (
        <div>
          {fetching ? (
            <CircularProgress />
          ) : (
            <RefreshIconBtn
              action={async () => {
                await setFetching(true);
                // await fetchCoinData();
                await setFetching(false);
              }}
            />
          )}
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <WebhookTableHeaders setData={setData} data={data} />
              <WebhookTableBody setData={setData} data={data} coin={coin} />
            </Table>
          </TableContainer>
        </div>
      );
    }
  };
  return <>{renderTable(data)}</>;
};

WebhookDataTable.propTypes = {
  coin: PropTypes.string.isRequired,
};

export default connect()(WebhookDataTable);
