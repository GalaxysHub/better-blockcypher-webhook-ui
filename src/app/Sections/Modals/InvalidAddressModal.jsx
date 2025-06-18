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
    <div data-testid="invalid-address-modal-content">
      <Title data-testid="invalid-address-modal-title">{"Invalid Address Detected"}</Title>

      <div data-testid="invalid-address-modal-address-label">{"Address: "}</div>
      <div data-testid="invalid-address-modal-address-value" style={{ fontWeight: "bold", margin: "20px" }}>{address}</div>
      <div data-testid="invalid-address-modal-description">
        {`Does Not Appear to be a Valid ${CoinData[coin].name} Address. Do You Wish To Continue?`}
      </div>
      <br />
      <ButtonContainer data-testid="invalid-address-modal-button-container">
        <ConfirmIconBtn data-testid="invalid-address-modal-confirm-btn" action={cb} />
        <CancelIconBtn data-testid="invalid-address-modal-cancel-btn" action={handleClose} />
      </ButtonContainer>
    </div>
  );

  return (
    <Modal data-testid="invalid-address-modal" open={open} onClose={handleClose}>
      <StyledPaper data-testid="invalid-address-modal-paper">{body}</StyledPaper>
    </Modal>
  );
};

export default InvalidAddressModal;
