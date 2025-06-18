import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

const EventTypeOptions = [
  {
    value: "unconfirmed-tx",
    name: "Unconfirmed Transaction",
  },
  {
    value: "new-block",
    name: "New Block",
  },
  {
    value: "confirmed-tx",
    name: "Confirmed Transaction",
  },
  {
    value: "tx-confirmation",
    name: "Transaction Confirmation",
  },
  {
    value: "double-spend-tx",
    name: "Double Spent Transaction",
  },
  {
    value: "tx-confidence",
    name: "Transaction Confidence",
  },
];

export default function SelectEventType({ value, handleChange, error }) {
  const RenderDropDownList = () => {
    return EventTypeOptions.map((event) => {
      return (
        <MenuItem key={event.value} value={event.value}>
          {event.name}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl variant="outlined" style={{ width: "100%" }} error={error}>
      <InputLabel id="Select-Event-label">Event Type</InputLabel>
      <Select
        id="Select-Event"
        label="Event Type"
        value={value}
        onChange={handleChange}
        data-testid="event-type-select"
      >
        <MenuItem value={""} disabled>
          Select Event Type
        </MenuItem>
        {RenderDropDownList()}
      </Select>
      {error ? <FormHelperText>Select a Event Type</FormHelperText> : <></>}
    </FormControl>
  );
}
