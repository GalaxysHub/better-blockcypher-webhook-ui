import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";

import ConfirmIconBtn from "app/Components/Buttons/IconBtns/ConfirmIconBtn";
import CancelIconBtn from "app/Components/Buttons/IconBtns/CancelIconBtn";

import { deleteWebhookByID } from "APIs/blockcypherWebhooks";

import { markWebhooks } from "redux/actions/webhookActions";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
  },
  paper: {
    textAlign: "center",
    position: "absolute",
    width: 400,
    color: theme.palette.card.text[theme.mode],
    backgroundColor: theme.palette.card.background[theme.mode],
    padding: theme.spacing(0, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
  button: {
    margin: "0 20px",
  },
}));

const sendRequest = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let date = new Date(Date.now());
      console.log(`request sent ${id}`, date.getSeconds());
      resolve();
    }, 1000);
  });
};

const DeleteWebhooksModal = ({ open, setOpen }) => {
  const classes = useStyles();
  const selectedWebhooks = useSelector(
    (state) => state.webhookReducer.selected
  );
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const IdsArr = Object.keys(selectedWebhooks);
  const [maxDisplay, setMaxDisplay] = useState(5);

  const handleClose = () => {
    setOpen(false);
    setMaxDisplay(10);
  };

  const deleteAllWebhooks = async (start) => {
    const promArr = arr.map((id) => deleteWebhookByID(id));
    const promArr = IdsArr.slice(start, start + 3).map((id) => sendRequest(id));
    setTimeout(() => {
      return Promise.all(promArr)
        .then((res) => {
          let date = new Date(Date.now());
          console.log(`request sent`, date);
          return deleteAllWebhooks(start + 3);
        })
        .catch((err) => {
          console.log(`err`, err);
          throw err;
        });
    }, 1000);
  };

  const body = (
    <Paper className={classes.paper}>
      <h2 className={classes.title}>{`Delete ${IdsArr.length} Webhooks?`}</h2>
      <div>
        {IdsArr.slice(0, maxDisplay)
          .map((id) => id.substring(0, 5) + "...")
          .join(", ")}
        {IdsArr.length > maxDisplay ? (
          <div
            style={{ color: "teal", cursor: "pointer", marginTop: "16px" }}
            onClick={() => setMaxDisplay(999999)}
          >
            {`show ${IdsArr.length - maxDisplay} more`}
          </div>
        ) : (
          <></>
        )}
      </div>
      <br />
      <br />
      <ConfirmIconBtn action={deleteAllWebhooks} />
      <CancelIconBtn action={handleClose} />
    </Paper>
  );

  return (
    <Modal open={open} onClose={handleClose}>
      {body}
    </Modal>
  );
};

export default connect()(DeleteWebhooksModal);
