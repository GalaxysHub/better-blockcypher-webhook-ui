import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsPerPage: 10,
  pageNum: 1,
  activeCoin: "BCY",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    setActiveCoin: (state, action) => {
      state.activeCoin = action.payload;
    },
  },
});

export const { setItemsPerPage, setPageNum, setActiveCoin } = pageSlice.actions;

export default pageSlice.reducer;