import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";

import SelectEvent from "app/Components/Fields/SelectEvent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { toast } from "react-toastify";

import { createWebhook } from "APIs/blockcypherWebhooks";
import { addWebhookData } from "store/slices";

import { isValidAddr } from "utils/isValidAddr";
import InvalidAddressModal from "./Modals/InvalidAddressModal";

const StyledContainer = styled(Container)(() => ({
  padding: "0 !important",
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "grid",
  gap: "14px",
  maxWidth: 760,
  margin: "0 auto",
  padding: "4px 0",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  justifySelf: "start",
  minWidth: 178,
  color: theme.palette.green.contrastText,
  backgroundColor: theme.palette.green.main,
  "&:hover": {
    color: theme.palette.green.contrastText,
    backgroundColor: theme.palette.green.dark,
    boxShadow: "none",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const StyledSelectEvent = styled(SelectEvent)(() => ({
  width: "100%",
}));

const ErrorText = styled("div")(({ theme }) => ({
  minHeight: 20,
  color: "red",
  fontSize: 13,
  fontWeight: 700,
}));

const CreateWebhookForm = () => {
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.pageReducer.activeCoin);
  const token = useSelector((state) => state.tokenReducer.token);

  const [values, setValues] = useState({
    eventType: "",
    address: "",
    URL: "",
  });
  const [open, setOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const addrReqEvents = [
    "unconfirmed-tx",
    "confirmed-tx",
    "tx-confirmation",
    "tx-confidence",
  ];

  const valid = () => {
    const { eventType, address, URL } = values;
    const errs = {};
    if (eventType === "") errs["eventType"] = "Event Type Required";
    if (URL === "") errs["URL"] = "Webhook URL Required";
    setErrors(errs);

    if (addrReqEvents.includes(values.eventType)) {
      if (address === "") errs["address"] = "Address Required";
    }

    return Object.keys(errs).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    setMsg("");
    if (!valid()) return setMsg("Form Field Errors");

    try {
      if (
        addrReqEvents.includes(values.eventType) ||
        !["ETH", "bETH"].includes[coin] //omits frontend validation for ethereum because checksum is different
      ) {
        if (isValidAddr(values.address, coin) !== true && !acknowledged) {
          return setOpen(true);
        }
      }
      setLoading(true);
      let res = await createWebhook({
        addr: values.address.trim(),
        targetURL: values.URL.trim(),
        coin: coin,
        event: values.eventType,
        token: token,
      });
      console.log(`res`, res);
      dispatch(addWebhookData({ coin, data: res.data }));
      toast(`${values.eventType} webhook created successfully`, {
        type: "success",
        position: "bottom-center",
      });
      setValues({ eventType: "", address: "", URL: "" });
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const changeEventType = (event) => {
    setMsg("");
    setErrors("");
    setValues({
      ...values,
      eventType: event.target.value,
    });
  };

  const handleChange = (e) => {
    setMsg("");
    setErrors("");
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const renderURLField = () => {
    if (values.eventType !== "") {
      return (
        <StyledTextField
          fullWidth
          name={"URL"}
          label={"Webhook URL"}
          value={values.URL}
          onChange={handleChange}
          error={errors.URL}
          helperText={errors.URL}
          data-testid="webhook-url-input"
        />
      );
    }
  };

  const renderAddrField = () => {
    if (
      [
        "unconfirmed-tx",
        "confirmed-tx",
        "tx-confirmation",
        "tx-confidence",
      ].includes(values.eventType)
    ) {
      return (
        <StyledTextField
          fullWidth
          name={"address"}
          label={"Address"}
          value={values.address}
          onChange={(event) => {
            handleChange(event);
            //validates address and prompts user for reponse with each addr change
            setAcknowledged(false);
          }}
          error={errors.address}
          helperText={errors.address}
          data-testid="webhook-address-input"
        />
      );
    }
  };

  return (
    <StyledContainer>
      <InvalidAddressModal
        open={open}
        setOpen={setOpen}
        address={values.address}
        cb={(event) => {
          setOpen(false);
          setAcknowledged(true);
          submit(event);
        }}
      />
      <StyledForm data-testid="create-webhook-form">
        <StyledSelectEvent
          value={values.eventType}
          handleChange={changeEventType}
          error={errors.eventType}
        />
        {renderURLField()}
        {renderAddrField()}
        {loading ? (
          <CircularProgress />
        ) : (
          <StyledButton
            type="submit"
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={submit}
            data-testid="create-webhook-btn"
          >
            Create Webhook
          </StyledButton>
        )}
        <ErrorText>{msg}</ErrorText>
      </StyledForm>
    </StyledContainer>
  );
};

export default CreateWebhookForm;
