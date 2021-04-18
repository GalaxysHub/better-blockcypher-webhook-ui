import React from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";

import ConfirmIconBtn from "app/Components/Buttons/IconBtns/ConfirmIconBtn";
import CancelIconBtn from "app/Components/Buttons/IconBtns/CancelIconBtn";

import { CoinData } from "config/coinData";

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

const InvalidAddressModal = ({ open, setOpen, address, cb }) => {
  const classes = useStyles();
  const coin = useSelector((state) => state.pageReducer.activeCoin);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <>
      <h2>{"Invalid Address Detected"}</h2>

      <div>{"Address: "}</div>
      <div style={{ fontWeight: "bold", margin: "20px" }}>{address}</div>
      <div>
        {`Does Not Appear to be a Valid ${CoinData[coin].name} Address. Do You Wish To Continue?`}
      </div>
      <br />
      <ConfirmIconBtn action={cb} />
      <CancelIconBtn action={handleClose} />
    </>
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper className={classes.paper}>{body}</Paper>
    </Modal>
  );
};

export default connect()(InvalidAddressModal);
