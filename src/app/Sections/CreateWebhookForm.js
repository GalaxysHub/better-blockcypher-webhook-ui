import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import SelectEvent from "app/Components/Fields/SelectEvent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

import { createWebhook } from "APIs/blockcypherWebhooks";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  fields: {
    margin: "5px 0px",
  },
}));

const CreateWebhookForm = ({ coin }) => {
  console.log(`coin`, coin);
  const classes = useStyles();
  const [values, setValues] = useState({
    eventType: "",
    address: "",
    URL: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setLoading(true);
    setMsg("");
    try {
      let res = await createWebhook({
        addr: values.address,
        targetURL: values.URL,
        coin: coin,
        event: values.eventType,
      });
      console.log(`res`, res);
      setMsg("Webhook created successfully");
    } catch (err) {
      setMsg(err.message);
      console.log(`Error creating new webhook`, err);
    } finally {
      setLoading(false);
    }
  };

  const changeEventType = (event) => {
    setValues({
      ...values,
      eventType: event.target.value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Container className={classes.root}>
      <SelectEvent
        value={values.eventType}
        handleChange={changeEventType}
        error={errors.eventType}
        className={classes.fields}
      />
      <TextField
        fullWidth
        variant="outlined"
        name={"address"}
        label={"Withdrawl Address"}
        value={values.address}
        onChange={handleChange}
        error={errors.address}
        helperText={errors.address}
        className={classes.fields}
      />
      <TextField
        fullWidth
        variant="outlined"
        name={"URL"}
        label={"Webhook URL"}
        value={values.URL}
        onChange={handleChange}
        error={errors.URL}
        helperText={errors.URL}
        className={classes.fields}
      />
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

export default CreateWebhookForm;
