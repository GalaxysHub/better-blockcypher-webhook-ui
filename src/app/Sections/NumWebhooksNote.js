import React, { useState, useEffect } from "react";
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
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let numWebhooks = Object.keys(webhooks).length;
    if (numWebhooks) {
      setMsg(`${numWebhooks} ${CoinData[coin].name} Webhooks`);
    } else {
      setMsg("No Webhooks Found");
    }
  }, [webhooks]);

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
        {msg}
        <FetchWebhooksBtn coin={coin} />
      </div>
    </Paper>
  );
};

export default connect()(NumWebhooksNote);
