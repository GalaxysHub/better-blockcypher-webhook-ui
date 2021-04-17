import React from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import FetchWebhooksBtn from "app/Components/Buttons/IconBtns/FetchWebhooksBtn";

import { CoinData } from "config/coinData";

const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.page.text[theme.mode],
    backgroundColor: theme.palette.card.background[theme.mode],
    borderRadius: "20px",
  },
}));

const NumWebhooksNote = () => {
  const classes = useStyles();
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const webhooks = useSelector((state) => state.webhookReducer[coin].data);
  let numWebhooks = Object.keys(webhooks).length;

  return (
    <Paper
      style={{ width: "320px", margin: "20px auto" }}
      elevation={12}
      className={classes.paper}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: "80px",
        }}
      >
        {numWebhooks ? (
          <div>{`${numWebhooks} ${CoinData[coin].name} Webhooks`}</div>
        ) : (
          <div>{"No Webhooks Found"}</div>
        )}
        <FetchWebhooksBtn />
      </div>
    </Paper>
  );
};

export default connect()(NumWebhooksNote);
