import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";

import ConfirmIconBtn from "app/Components/Buttons/IconBtns/ConfirmIconBtn";
import CancelIconBtn from "app/Components/Buttons/IconBtns/CancelIconBtn";

import { deleteWebhookByID } from "APIs/blockcypherWebhooks";

import { removeWebhookById, markWebhooks } from "store/slices";

import ProgressBar from "app/Components/ProgressBar";

const ModalTitle = styled('h2')(({ theme }) => ({
  color: theme.palette.page.text[theme.mode],
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  position: "absolute",
  width: 400,
  color: theme.palette.card.text[theme.mode],
  backgroundColor: theme.palette.card.background[theme.mode],
  padding: theme.spacing(0, 4, 3),
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
}));

const displayMax = 25;

const DeleteWebhooksModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const selectedWebhooks = useSelector(
    (state) => state.webhookReducer.selected
  );
  const rate = useSelector((state) => state.tokenReducer.limits["api/second"]);
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  let IdsArr = Object.keys(selectedWebhooks);
  const [totalSelected, setTotalSelected] = useState(0);
  const [maxDisplay, setMaxDisplay] = useState(displayMax);
  const [status, setStatus] = useState("pending");
  const [canClose, setCanClose] = useState(true);
  const [msg, setMsg] = useState("");

  const handleClose = () => {
    setOpen(false);
    setMaxDisplay(displayMax);
    setStatus("");
  };

  const asyncChainDelete = async () => {
    if (!IdsArr.length) {
      //timeout to let the user see the progress bar at 100%
      setTimeout(() => {
        setCanClose(true);
        setStatus("completed");
      }, 1000);
      return;
    }

    setTimeout(() => {
      let removeId = IdsArr.splice(0, 1)[0];
      deleteWebhookByID({ coin, id: removeId })
        .then(() => {
          dispatch(removeWebhookById({ coin, id: [removeId] }));
          dispatch(markWebhooks({ [removeId]: false }));
          asyncChainDelete();
        })
        .catch((err) => {
          setMsg(err.message);
          setStatus("error");
          setCanClose(true);
          return;
        });
    }, 1000 / rate);
  };
  /*
  const batchDelete = () => {
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
  */

  const deleteAllWebhooks = async (start) => {
    setStatus("deleting");
    setCanClose(false);
    setTotalSelected(IdsArr.length);
    asyncChainDelete();
    // batchDelete();
  };

  const showSelectedWebhooks = () => {
    if (IdsArr.length <= 5) {
      return IdsArr.map((id) => {
        return <div>{id}</div>;
      });
    } else {
      return (
        <div>
          {IdsArr.slice(0, maxDisplay)
            .map((id) => id.substring(0, 5) + "...")
            .join(", ")}
          {IdsArr.length > maxDisplay ? (
            <div
              data-testid="delete-modal-show-more-btn"
              style={{ color: "teal", cursor: "pointer", marginTop: "16px" }}
              onClick={() => setMaxDisplay(IdsArr.length)}
            >
              {`show ${IdsArr.length - maxDisplay} more`}
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    }
  };

  const body = (
    <div data-testid="delete-modal-content">
      <ModalTitle data-testid="delete-modal-title">{`Are You Sure You Want To Delete The Following Webhooks?`}</ModalTitle>
      <div data-testid="delete-modal-webhooks-list">{showSelectedWebhooks()}</div>
      <br />
      <div data-testid="delete-modal-button-container">
        <ConfirmIconBtn data-testid="delete-modal-confirm-btn" action={deleteAllWebhooks} />
        <CancelIconBtn data-testid="delete-modal-cancel-btn" action={handleClose} />
      </div>
    </div>
  );

  const bodyOnDelete = (
    <div data-testid="delete-modal-deleting-content">
      <ModalTitle data-testid="delete-modal-deleting-title">Deleting Webhooks</ModalTitle>
      <div data-testid="delete-modal-progress-text">{`Deleted ${
        totalSelected - IdsArr.length
      } of ${totalSelected}`}</div>
      <br />
      <ProgressBar
        data-testid="delete-modal-progress-bar"
        completed={Math.floor(
          ((totalSelected - IdsArr.length) * 100) / totalSelected
        )}
      />
    </div>
  );

  const bodyOnComplete = (
    <div data-testid="delete-modal-complete-content">
      <ModalTitle data-testid="delete-modal-complete-title">Webhooks Deleted Successfully</ModalTitle>
      <br />
      <div data-testid="delete-modal-complete-button-container">
        <ConfirmIconBtn data-testid="delete-modal-complete-confirm-btn" action={handleClose} />
      </div>
    </div>
  );

  const bodyOnError = (
    <div data-testid="delete-modal-error-content">
      <ModalTitle data-testid="delete-modal-error-title">Error Deleting All Webhooks</ModalTitle>
      <h3 data-testid="delete-modal-error-message" style={{ color: "red" }}>{msg}</h3>
      <div data-testid="delete-modal-error-description">{`The following webhooks were not deleted:`}</div>
      <br />
      <div data-testid="delete-modal-error-webhooks-list">{showSelectedWebhooks()}</div>
      <div data-testid="delete-modal-error-button-container">
        <CancelIconBtn data-testid="delete-modal-error-close-btn" action={handleClose} tip={"Close"} />
      </div>
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
    <Modal data-testid="delete-modal" disableBackdropClick={!canClose} open={open} onClose={handleClose}>
      <StyledPaper data-testid="delete-modal-paper">{renderBody()}</StyledPaper>
    </Modal>
  );
};

export default DeleteWebhooksModal;
