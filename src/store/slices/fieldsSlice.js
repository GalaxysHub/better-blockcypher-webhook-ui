import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: { name: "ID", key: "id", sortable: true, checked: true },
  address: {
    name: "Address",
    key: "address",
    sortable: true,
    checked: true,
  },
  event: { name: "Event Type", key: "event", sortable: true, checked: true },
  url: { name: "URL", key: "url", sortable: true, checked: false },
  callback_errors: {
    name: "Callback Errors",
    key: "callback_errors",
    sortable: true,
    checked: false,
  },
};

const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    selectField: (state, action) => {
      const field = action.payload;
      state[field].checked = !state[field].checked;
    },
  },
});

export const { selectField } = fieldsSlice.actions;

export default fieldsSlice.reducer;