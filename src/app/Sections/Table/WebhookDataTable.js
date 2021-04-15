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

const WebhookDataTable = ({ coin }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const webhookData = useSelector((state) => state.webhookReducer[coin]);

  const [data, setData] = useState({}); //keep a separate set of data from redux so it can be sorted

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
  }, [coin]);

  const renderTable = (data) => {
    if (!webhookData.fetched) {
      return <CircularProgress />;
    } else {
      return (
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <WebhookTableHeaders setData={setData} data={data} />
            <WebhookTableBody setData={setData} data={data} coin={coin} />
          </Table>
        </TableContainer>
      );
    }
  };
  return <>{renderTable(data)}</>;
};

WebhookDataTable.propTypes = {
  coin: PropTypes.string.isRequired,
};

export default connect()(WebhookDataTable);
