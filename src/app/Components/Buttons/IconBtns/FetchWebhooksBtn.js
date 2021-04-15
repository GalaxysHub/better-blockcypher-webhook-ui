import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";

import RefreshIcon from "@material-ui/icons/Refresh";
import IconBtnTemplate from "./IconBtnTemplate";

import CircularProgress from "@material-ui/core/CircularProgress";

import { getWebhooksByCoin } from "APIs/blockcypherWebhooks";

import { setWebhookData } from "redux/actions/webhookActions";
import { convertWebhookArrToObj } from "utils";

import PropTypes from "prop-types";

const FetchWebhooksBtn = ({
  type = "info",
  size = "medium",
  tip = "Refetch Webhooks",
  coin,
}) => {
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  async function fetchCoinData() {
    try {
      setFetching(true);
      let fetchedData = await getWebhooksByCoin(coin);
      let dataObj = convertWebhookArrToObj(fetchedData);
      dispatch(setWebhookData({ coin, data: dataObj }));
    } catch (err) {
      console.log(`Error fetching coin webhook data:`, err);
    } finally {
      setFetching(false);
    }
  }

  return (
    <>
      {fetching ? (
        <CircularProgress />
      ) : (
        <IconBtnTemplate type={type} action={fetchCoinData} tip={tip}>
          <RefreshIcon size={size} />
        </IconBtnTemplate>
      )}
    </>
  );
};

FetchWebhooksBtn.propTypes = {
  coin: PropTypes.string.isRequired,
};

export default connect()(FetchWebhooksBtn);
