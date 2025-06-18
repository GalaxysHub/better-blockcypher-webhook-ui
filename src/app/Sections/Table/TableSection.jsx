import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import FieldSelector from "app/Sections/Selectors/FieldSelector";
import WebhookDataTable from "./WebhooksTable";
import PageSelector from "app/Sections/Selectors/PageSelector";

import { getWebhooksByCoin } from "APIs/blockcypherWebhooks";
import { convertWebhookArrToObj } from "utils";

import { setWebhookData } from "store/slices";

import DeleteAllBtn from "app/Components/Buttons/DeleteAllBtn";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  backgroundColor: theme.palette.grey.light[theme.mode],
}));

const TableSection = () => {
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
      return <h3 style={{ color: "red" }} data-testid="table-section-error">{error}</h3>;
    } else if (!fetched) {
      return <CircularProgress data-testid="table-section-loading" />;
    } else if (Object.keys(webhooks).length === 0) {
      return <></>;
    } else {
      return (
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          data-testid="table-section-container"
        >
          <FieldSelector />
          <DeleteAllBtn />
          <WebhookDataTable />
          <br />
          <StyledPaper elevation={11} data-testid="table-section-page-selector-wrapper">
            <PageSelector />
          </StyledPaper>
        </Grid>
      );
    }
  };

  return <>{renderSection()}</>;
};

export default TableSection;
