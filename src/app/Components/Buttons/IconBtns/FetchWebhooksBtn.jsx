import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RefreshIcon from "@mui/icons-material/Refresh";
import IconBtnTemplate from "./IconBtnTemplate";

import CircularProgress from "@mui/material/CircularProgress";

import { getWebhooksByCoin } from "APIs/blockcypherWebhooks";

import { setWebhookData } from "store/slices";
import { convertWebhookArrToObj } from "utils";

const FetchWebhooksBtn = ({
  type = "info",
  size = "medium",
  tip = "Refetch Webhooks",
}) => {
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const token = useSelector((state) => state.tokenReducer.token);
  const [fetching, setFetching] = useState(false);

  async function fetchCoinData() {
    try {
      setFetching(true);
      let fetchedData = await getWebhooksByCoin(coin, token);
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
        <CircularProgress data-testid="fetch-webhooks-loading" />
      ) : (
        <IconBtnTemplate type={type} action={fetchCoinData} tip={tip} testId="fetch-webhooks-btn">
          <RefreshIcon size={size} />
        </IconBtnTemplate>
      )}
    </>
  );
};

export default FetchWebhooksBtn;
