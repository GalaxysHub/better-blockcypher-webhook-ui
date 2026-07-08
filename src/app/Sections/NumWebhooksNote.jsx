import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import FetchWebhooksBtn from "app/Components/Buttons/IconBtns/FetchWebhooksBtn";

import { CoinData } from "_config/coinData.json";

const StyledPaper = styled(Paper)(({ theme }) => ({
  color: theme.palette.page?.text?.[theme.mode] || theme.palette.text.primary,
  backgroundColor: theme.palette.card?.background?.[theme.mode] || theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  width: "fit-content",
  maxWidth: "100%",
  minWidth: 280,
  margin: "0 auto",
  boxShadow: "none",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    minWidth: 0,
  },
}));

const ContentContainer = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  minWidth: 0,
  minHeight: "56px",
  padding: "10px 16px",
  color: theme.palette.text.primary,
  fontWeight: 700,
}));

const NumWebhooksNote = () => {
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const webhooks = useSelector((state) => state.webhookReducer[coin].data);
  let numWebhooks = Object.keys(webhooks).length;

  return (
    <StyledPaper elevation={0}>
      <ContentContainer>
        {numWebhooks ? (
          <div data-testid="webhooks-count">{`${numWebhooks} ${CoinData[coin].name} Webhooks`}</div>
        ) : (
          <div>{"No Webhooks Found"}</div>
        )}
        <FetchWebhooksBtn />
      </ContentContainer>
    </StyledPaper>
  );
};

export default NumWebhooksNote;
