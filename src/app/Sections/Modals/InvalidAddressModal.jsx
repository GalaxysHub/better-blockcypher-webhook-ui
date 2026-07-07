import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";

import ConfirmIconBtn from "app/Components/Buttons/IconBtns/ConfirmIconBtn";
import CancelIconBtn from "app/Components/Buttons/IconBtns/CancelIconBtn";

import { CoinData } from "_config/coinData";

const Title = styled('h2')(({ theme }) => ({
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
  gap: "12px",
  color: theme.palette.text.secondary,
  textAlign: "left",
}));

const AddressValue = styled("div")(({ theme }) => ({
  overflowWrap: "anywhere",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  backgroundColor: theme.palette.grey.ghost[theme.mode],
  color: theme.palette.text.primary,
  fontWeight: 800,
  padding: "12px",
}));

const ButtonContainer = styled('div')({
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
});

const InvalidAddressModal = ({ open, setOpen, address, cb }) => {
  const coin = useSelector((state) => state.pageReducer.activeCoin);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <ModalBody data-testid="invalid-address-modal-content">
      <Title data-testid="invalid-address-modal-title">{"Invalid Address Detected"}</Title>

      <div data-testid="invalid-address-modal-address-label">{"Address: "}</div>
      <AddressValue data-testid="invalid-address-modal-address-value">{address}</AddressValue>
      <div data-testid="invalid-address-modal-description">
        {`Does Not Appear to be a Valid ${CoinData[coin].name} Address. Do You Wish To Continue?`}
      </div>
      <ButtonContainer data-testid="invalid-address-modal-button-container">
        <ConfirmIconBtn data-testid="invalid-address-modal-confirm-btn" action={cb} />
        <CancelIconBtn data-testid="invalid-address-modal-cancel-btn" action={handleClose} />
      </ButtonContainer>
    </ModalBody>
  );

  return (
    <Modal data-testid="invalid-address-modal" open={open} onClose={handleClose}>
      <StyledPaper data-testid="invalid-address-modal-paper">{body}</StyledPaper>
    </Modal>
  );
};

export default InvalidAddressModal;
