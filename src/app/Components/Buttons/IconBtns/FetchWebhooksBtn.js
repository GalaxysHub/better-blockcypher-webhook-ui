import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import RefreshIcon from "@material-ui/icons/Refresh";
import IconBtnTemplate from "./IconBtnTemplate";

import CircularProgress from "@material-ui/core/CircularProgress";

import { getWebhooksByCoin } from "APIs/blockcypherWebhooks";

import { setWebhookData } from "redux/actions/webhookActions";
import { convertWebhookArrToObj } from "utils";

const FetchWebhooksBtn = ({
  type = "info",
  size = "medium",
  tip = "Refetch Webhooks",
}) => {
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const [fetching, setFetching] = useState(false);

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

export default connect()(FetchWebhooksBtn);
