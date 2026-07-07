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
  color: theme.palette.text.primary,
  fontSize: 22,
  lineHeight: 1.25,
  margin: "0 0 16px",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  width: "min(460px, calc(100vw - 32px))",
  color: theme.palette.card.text[theme.mode],
  backgroundColor: theme.palette.card.background[theme.mode],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  boxShadow: theme.palette.mode === "dark"
    ? "0 24px 60px rgba(0, 0, 0, 0.5)"
    : "0 24px 60px rgba(15, 23, 42, 0.2)",
  padding: theme.spacing(3),
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
}));

const ModalBody = styled("div")(({ theme }) => ({
  display: "grid",
  gap: "14px",
  color: theme.palette.text.secondary,
  textAlign: "left",
}));

const ButtonRow = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
});

const WebhookList = styled("div")(({ theme }) => ({
  maxHeight: 220,
  overflow: "auto",
  overflowWrap: "anywhere",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  backgroundColor: theme.palette.grey.ghost[theme.mode],
  padding: "12px",
  color: theme.palette.text.primary,
  fontSize: 13,
}));

const ShowMore = styled("div")({
  color: "teal",
  cursor: "pointer",
  fontWeight: 700,
  marginTop: "12px",
});

const ErrorMessage = styled("h3")({
  color: "red",
  fontSize: 15,
  margin: 0,
});

const displayMax = 25;

const DeleteWebhooksModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const selectedWebhooks = useSelector(
    (state) => state.webhookReducer.selected
  );
  const rate = useSelector((state) => state.tokenReducer.limits["api/second"]);
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const token = useSelector((state) => state.tokenReducer.token);
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
      deleteWebhookByID({ coin, id: removeId, token })
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
            <ShowMore
              data-testid="delete-modal-show-more-btn"
              onClick={() => setMaxDisplay(IdsArr.length)}
            >
              {`show ${IdsArr.length - maxDisplay} more`}
            </ShowMore>
          ) : (
            <></>
          )}
        </div>
      );
    }
  };

  const body = (
    <ModalBody data-testid="delete-modal-content">
      <ModalTitle data-testid="delete-modal-title">{`Are You Sure You Want To Delete The Following Webhooks?`}</ModalTitle>
      <WebhookList data-testid="delete-modal-webhooks-list">{showSelectedWebhooks()}</WebhookList>
      <ButtonRow data-testid="delete-modal-button-container">
        <ConfirmIconBtn data-testid="delete-modal-confirm-btn" action={deleteAllWebhooks} />
        <CancelIconBtn data-testid="delete-modal-cancel-btn" action={handleClose} />
      </ButtonRow>
    </ModalBody>
  );

  const bodyOnDelete = (
    <ModalBody data-testid="delete-modal-deleting-content">
      <ModalTitle data-testid="delete-modal-deleting-title">Deleting Webhooks</ModalTitle>
      <div data-testid="delete-modal-progress-text">{`Deleted ${
        totalSelected - IdsArr.length
      } of ${totalSelected}`}</div>
      <ProgressBar
        data-testid="delete-modal-progress-bar"
        completed={Math.floor(
          ((totalSelected - IdsArr.length) * 100) / totalSelected
        )}
      />
    </ModalBody>
  );

  const bodyOnComplete = (
    <ModalBody data-testid="delete-modal-complete-content">
      <ModalTitle data-testid="delete-modal-complete-title">Webhooks Deleted Successfully</ModalTitle>
      <ButtonRow data-testid="delete-modal-complete-button-container">
        <ConfirmIconBtn data-testid="delete-modal-complete-confirm-btn" action={handleClose} />
      </ButtonRow>
    </ModalBody>
  );

  const bodyOnError = (
    <ModalBody data-testid="delete-modal-error-content">
      <ModalTitle data-testid="delete-modal-error-title">Error Deleting All Webhooks</ModalTitle>
      <ErrorMessage data-testid="delete-modal-error-message">{msg}</ErrorMessage>
      <div data-testid="delete-modal-error-description">{`The following webhooks were not deleted:`}</div>
      <WebhookList data-testid="delete-modal-error-webhooks-list">{showSelectedWebhooks()}</WebhookList>
      <ButtonRow data-testid="delete-modal-error-button-container">
        <CancelIconBtn data-testid="delete-modal-error-close-btn" action={handleClose} tip={"Close"} />
      </ButtonRow>
    </ModalBody>
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
