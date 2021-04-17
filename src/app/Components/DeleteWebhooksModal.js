import React, { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";

import ConfirmIconBtn from "app/Components/Buttons/IconBtns/ConfirmIconBtn";
import CancelIconBtn from "app/Components/Buttons/IconBtns/CancelIconBtn";

import { deleteWebhookByID } from "APIs/blockcypherWebhooks";

import { removeWebhookById, markWebhooks } from "redux/actions/webhookActions";

import ProgressBar from "app/Components/ProgressBar";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.page.text[theme.mode],
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

const DeleteWebhooksModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedWebhooks = useSelector(
    (state) => state.webhookReducer.selected
  );
  const rate = useSelector((state) => state.tokenReducer.limits["api/second"]);
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const IdsArr = Object.keys(selectedWebhooks);
  const [totalSelected, setTotalSelected] = useState(0);
  const [maxDisplay, setMaxDisplay] = useState(25);
  const [status, setStatus] = useState("pending");
  const [canClose, setCanClose] = useState(true);
  const [msg, setMsg] = useState("");

  const handleClose = () => {
    setOpen(false);
    setMaxDisplay(10);
    setStatus("");
  };

  const batchDelete = async () => {
    if (!IdsArr.length) {
      setCanClose(true);
      setStatus("completed");
      return;
    }
    const batch = IdsArr.splice(0, rate);
    const promArr = batch.map((id) => deleteWebhookByID({ coin, id }));

    setTimeout(() => {
      Promise.all(promArr)
        .then((res) => {
          let unselected = {};
          batch.forEach((id) => {
            unselected[id] = false;
            dispatch(removeWebhookById({ coin, id })); // can be optimized by batching
          });
          dispatch(markWebhooks(unselected));
          batchDelete();
        })
        .catch((err) => {
          setMsg(err.message);
          setStatus("error");
          setCanClose(true);
          return;
        });
    }, 1200);
  };

  const deleteAllWebhooks = async (start) => {
    setStatus("deleting");
    setCanClose(false);
    setTotalSelected(IdsArr.length);
    batchDelete();
  };

  const showSelectedWebhooks = (
    <>
      {IdsArr.slice(0, maxDisplay)
        .map((id) => id.substring(0, 5) + "...")
        .join(", ")}
      {IdsArr.length > maxDisplay ? (
        <div
          style={{ color: "teal", cursor: "pointer", marginTop: "16px" }}
          onClick={() => setMaxDisplay(IdsArr.length)}
        >
          {`show ${IdsArr.length - maxDisplay} more`}
        </div>
      ) : (
        <></>
      )}
    </>
  );

  const body = (
    <div>
      <h2
        className={classes.title}
      >{`Are You Sure You Want To Delete The Following Webhooks?`}</h2>
      <div>{showSelectedWebhooks}</div>
      <br />
      <br />
      <ConfirmIconBtn action={deleteAllWebhooks} />
      <CancelIconBtn action={handleClose} />
    </div>
  );

  const bodyOnDelete = (
    <>
      <h2 className={classes.title}>{"Deleting Webhooks"}</h2>
      <div>{`Deleted ${
        totalSelected - IdsArr.length
      } of ${totalSelected}`}</div>
      <br />
      <br />
      <ProgressBar
        completed={Math.floor(
          ((totalSelected - IdsArr.length) * 100) / totalSelected
        )}
      />
    </>
  );

  const bodyOnComplete = (
    <div>
      <h2 className={classes.title}>{"Webhooks Deleted Successfully"}</h2>
      <br />
      <ConfirmIconBtn action={handleClose} />
    </div>
  );

  const bodyOnError = (
    <div>
      <h2 className={classes.title}>{"Error Deleting All Webhooks"}</h2>
      <h3 style={{ color: "red" }}>{msg}</h3>
      <div>{`The following webhooks were not deleted:`}</div>
      <br />
      <div>{showSelectedWebhooks}</div>
      <CancelIconBtn action={handleClose} tip={"Close"} />
    </div>
  );

  const renderBody = () => {
    switch (status) {
      case "deleting":
        return bodyOnDelete;
      case "completed":
        return bodyOnComplete;
      case "error":
        return bodyOnError;
      default:
        return body;
    }
  };

  return (
    <Modal disableBackdropClick={!canClose} open={open} onClose={handleClose}>
      <Paper className={classes.paper}>{renderBody()}</Paper>
    </Modal>
  );
};

export default connect()(DeleteWebhooksModal);
