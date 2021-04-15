import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";

import FieldSelector from "../Selectors/FieldSelector";
import WebhookDataTable from "./WebhookDataTable";
import PageSelector from "../Selectors/PageSelector";

import { getWebhooksByCoin } from "APIs/blockcypherWebhooks";
import { convertWebhookArrToObj } from "utils";

import { setWebhookData } from "redux/actions/webhookActions";

const TableSection = ({ coin }) => {
  const dispatch = useDispatch();
  const { fetched, data } = useSelector((state) => state.webhookReducer[coin]);

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
        <div>
          <FieldSelector />
          <PageSelector coin={coin} />
          <WebhookDataTable coin={coin} />
          <PageSelector coin={coin} />
        </div>
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
