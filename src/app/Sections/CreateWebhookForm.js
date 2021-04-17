import React, { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import SelectEvent from "app/Components/Fields/SelectEvent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

import { toast } from "react-toastify";

import { createWebhook } from "APIs/blockcypherWebhooks";
import { addWebhookData } from "redux/actions/webhookActions";

import { isValidAddr } from "utils/isValidAddr";
import InvalidAddressModal from "./Modals/InvalidAddressModal";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  fields: {
    margin: "16px 0px",
  },
  button: {
    color: theme.palette.text[theme.mode],
    backgroundColor: theme.palette.green["light"],
    "&:hover": {
      color: theme.palette.text[theme.mode],
      backgroundColor: theme.palette.green["main"],
      boxShadow: "1px 3px 3px 3px #888888",
    },
  },
}));

const CreateWebhookForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const coin = useSelector((state) => state.pageReducer.activeCoin);

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
      if (addrReqEvents.includes(values.eventType)) {
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
        <TextField
          fullWidth
          name={"URL"}
          label={"Webhook URL"}
          value={values.URL}
          onChange={handleChange}
          error={errors.URL}
          helperText={errors.URL}
          className={classes.fields}
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
        <TextField
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
          className={classes.fields}
        />
      );
    }
  };

  return (
    <Container className={classes.root}>
      <InvalidAddressModal
        open={open}
        setOpen={setOpen}
        cb={(event) => {
          setOpen(false);
          setAcknowledged(true);
          submit(event);
        }}
      />
      <form>
        <SelectEvent
          value={values.eventType}
          handleChange={changeEventType}
          error={errors.eventType}
          className={classes.fields}
        />
        {renderURLField()}
        {renderAddrField()}
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            type="submit"
            variant="contained"
            onClick={submit}
            className={classes.button}
          >
            Create Webhook
          </Button>
        )}
        <div style={{ color: "red" }}>{msg}</div>
      </form>
    </Container>
  );
};

export default connect()(CreateWebhookForm);
