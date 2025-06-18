import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import FetchWebhooksBtn from "app/Components/Buttons/IconBtns/FetchWebhooksBtn";

import { CoinData } from "_config/coinData.json";

const StyledPaper = styled(Paper)(({ theme }) => ({
  color: theme.palette.page?.text?.[theme.mode] || theme.palette.text.primary,
  backgroundColor: theme.palette.card?.background?.[theme.mode] || theme.palette.background.paper,
  borderRadius: "20px",
  width: "320px",
  margin: "20px auto",
}));

const ContentContainer = styled("div")({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  height: "80px",
});

const NumWebhooksNote = () => {
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const webhooks = useSelector((state) => state.webhookReducer[coin].data);
  let numWebhooks = Object.keys(webhooks).length;

  return (
    <StyledPaper elevation={12} data-testid="num-webhooks-paper">
      <ContentContainer data-testid="num-webhooks-content">
        {numWebhooks ? (
          <div data-testid="webhooks-count-display">{`${numWebhooks} ${CoinData[coin].name} Webhooks`}</div>
        ) : (
          <div data-testid="no-webhooks-message">{"No Webhooks Found"}</div>
        )}
        <FetchWebhooksBtn data-testid="fetch-webhooks-btn" />
      </ContentContainer>
    </StyledPaper>
  );
};

export default NumWebhooksNote;
