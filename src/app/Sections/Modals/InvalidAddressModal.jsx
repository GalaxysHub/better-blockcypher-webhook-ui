import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";

import ConfirmIconBtn from "app/Components/Buttons/IconBtns/ConfirmIconBtn";
import CancelIconBtn from "app/Components/Buttons/IconBtns/CancelIconBtn";

import { CoinData } from "_config/coinData";

const Title = styled('h2')(({ theme }) => ({
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

const ButtonContainer = styled('div')({
  margin: "0 20px",
});

const InvalidAddressModal = ({ open, setOpen, address, cb }) => {
  const coin = useSelector((state) => state.pageReducer.activeCoin);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <>
      <Title>{"Invalid Address Detected"}</Title>

      <div>{"Address: "}</div>
      <div style={{ fontWeight: "bold", margin: "20px" }}>{address}</div>
      <div>
        {`Does Not Appear to be a Valid ${CoinData[coin].name} Address. Do You Wish To Continue?`}
      </div>
      <br />
      <ButtonContainer>
        <ConfirmIconBtn action={cb} />
        <CancelIconBtn action={handleClose} />
      </ButtonContainer>
    </>
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledPaper>{body}</StyledPaper>
    </Modal>
  );
};

export default InvalidAddressModal;
