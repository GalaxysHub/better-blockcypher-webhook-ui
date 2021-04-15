import React, { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import SelectEvent from "app/Components/Fields/SelectEvent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

import { createWebhook } from "APIs/blockcypherWebhooks";

import { addWebhookData } from "redux/actions/webhookActions";

import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  fields: {
    margin: "16px 0px",
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const valid = () => {
    const { eventType, address, URL } = values;
    const errs = {};
    if (eventType === "") errs["eventType"] = "Event Type Required";
    if (
      [
        "unconfirmed-tx",
        "confirmed-tx",
        "tx-confirmation",
        "tx-confidence",
      ].includes(values.eventType)
    ) {
      if (address === "") errs["address"] = "Address Required";
    }
    if (URL === "") errs["URL"] = "Webhook URL Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    setMsg("");

    if (!valid()) return setMsg("Form Field Errors");

    try {
      setLoading(true);
      let res = await createWebhook({
        addr: values.address,
        targetURL: values.URL,
        coin: coin,
        event: values.eventType,
      });
      dispatch(addWebhookData({ coin, data: res.data }));
      toast("Webhook created successfully", {
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
          onChange={handleChange}
          error={errors.address}
          helperText={errors.address}
          className={classes.fields}
        />
      );
    }
  };

  return (
    <Container className={classes.root}>
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
        <Button variant="contained" onClick={submit} color="primary">
          Create Webhook
        </Button>
      )}
      <div style={{ color: "red" }}>{msg}</div>
    </Container>
  );
};

export default connect()(CreateWebhookForm);
