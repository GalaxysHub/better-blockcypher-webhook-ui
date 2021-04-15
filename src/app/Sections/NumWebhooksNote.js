import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";

import Paper from "@material-ui/core/Paper";

import FetchWebhooksBtn from "app/Components/Buttons/IconBtns/FetchWebhooksBtn";

const NumWebhooksNote = ({ coin }) => {
  const webhooks = useSelector((state) => state.webhookReducer[coin].data);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let numWebhooks = Object.keys(webhooks).length;
    if (numWebhooks) {
      setMsg(`Found ${numWebhooks} Webhooks`);
    } else {
      setMsg("No Webhooks Found");
    }
  }, [webhooks]);

  return (
    <Paper style={{ width: "300px", margin: "auto" }} elevation={12}>
      <div
        style={{
          color: "red",
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
