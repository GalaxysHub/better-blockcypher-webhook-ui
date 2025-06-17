import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { setItemsPerPage, setPageNum } from "store/slices";

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
        onChange={(event) => {
          dispatch(setPageNum(1)); //page number must be reset in case currentPage>lastPage
          dispatch(setItemsPerPage(event.target.value));
        }}
      >
        {RenderDropDownList()}
      </Select>
    </FormControl>
  );
};

export default SelectWebhooksPerPage;
