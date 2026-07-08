import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

import FieldSelector from "app/Sections/Selectors/FieldSelector";
import WebhookDataTable from "./WebhooksTable";
import PageSelector from "app/Sections/Selectors/PageSelector";

import { getWebhooksByCoin } from "APIs/blockcypherWebhooks";
import { convertWebhookArrToObj } from "utils";

import { setWebhookData } from "store/slices";

import DeleteAllBtn from "app/Components/Buttons/DeleteAllBtn";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  minWidth: 0,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  overflow: "hidden",
}));

const SectionContent = styled("div")({
  display: "grid",
  gap: "16px",
  minWidth: 0,
});

const StateMessage = styled("div", {
  shouldForwardProp: (prop) => prop !== "tone",
})(({ theme, tone = "default" }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 160,
  border: `1px solid ${tone === "error" ? theme.palette.error.main : theme.palette.divider}`,
  borderRadius: 8,
  color: tone === "error" ? theme.palette.error.main : theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  fontWeight: 700,
  textAlign: "center",
  padding: 24,
}));

const LoadingState = styled(StateMessage)({
  gap: "12px",
});

const TableSection = () => {
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const token = useSelector((state) => state.tokenReducer.token);
  const fetched = useSelector((state) => state.webhookReducer[coin].fetched);
  const webhooks = useSelector((state) => state.webhookReducer[coin].data);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCoinData() {
      try {
        let fetchedData = await getWebhooksByCoin(coin, token);
        let dataObj = convertWebhookArrToObj(fetchedData);
        dispatch(setWebhookData({ coin, data: dataObj }));
      } catch (err) {
        setError(`Error Fetching Webhooks: ${err.message}`);
        console.warn(`Error Fetching Webhooks:`, err);
      }
    }

    if (!fetched) fetchCoinData();
  }, [coin, fetched, dispatch, token]);

  const renderSection = () => {
    if (error) {
      return <StateMessage tone="error" data-testid="table-section-error">{error}</StateMessage>;
    } else if (!fetched) {
      return (
        <LoadingState>
          <CircularProgress size={26} />
          Loading webhooks
        </LoadingState>
      );
    } else if (Object.keys(webhooks).length === 0) {
      return <StateMessage>No Webhooks Found</StateMessage>;
    } else {
      return (
        <SectionContent>
          <FieldSelector />
          <DeleteAllBtn />
          <WebhookDataTable />
          <StyledPaper elevation={0}>
            <PageSelector />
          </StyledPaper>
        </SectionContent>
      );
    }
  };

  return <>{renderSection()}</>;
};

export default TableSection;
