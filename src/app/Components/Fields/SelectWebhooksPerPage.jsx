import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
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

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.grey.ghost[theme.mode],
  },
}));

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
    <StyledFormControl variant="outlined" size="small">
      <InputLabel id="Select-Event-label">Items Per Page</InputLabel>
      <Select
        id="Select-Webhooks-Per-Page"
        label="Items Per Page"
        value={itemsPerPage}
        onChange={(event) => {
          dispatch(setPageNum(1)); //page number must be reset in case currentPage>lastPage
          dispatch(setItemsPerPage(event.target.value));
        }}
        data-testid="items-per-page-select"
      >
        {RenderDropDownList()}
      </Select>
    </StyledFormControl>
  );
};

export default SelectWebhooksPerPage;
