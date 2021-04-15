import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

import { setItemsPerPage } from "redux/actions/pageActions";

const ItemsPerPageOptions = [
  {
    value: 5,
    name: "5",
  },
  {
    value: 10,
    name: "10",
  },
  {
    value: 25,
    name: "25",
  },
  {
    value: 50,
    name: "50",
  },
  {
    value: 100,
    name: "100",
  },
  {
    value: 200,
    name: "200",
  },
  {
    value: 99999,
    name: "Show All",
  },
];

const SelectWebhooksPerPage = () => {
  const itemsPerPage = useSelector((state) => state.pageReducer.itemsPerPage);
  const dispatch = useDispatch();

  const RenderDropDownList = () => {
    return ItemsPerPageOptions.map((event) => {
      return (
        <MenuItem
          key={event.value}
          value={event.value}
          style={{ textAlign: "center" }}
        >
          {event.name}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl variant="outlined" style={{ width: "100%" }}>
      <InputLabel id="Select-Event-label">Items Per Page</InputLabel>
      <Select
        id="Select-Webhooks-Per-Page"
        label="Webhooks Per Page"
        value={itemsPerPage}
        onChange={(event) => dispatch(setItemsPerPage(event.target.value))}
      >
        {RenderDropDownList()}
      </Select>
    </FormControl>
  );
};
export default connect()(SelectWebhooksPerPage);
