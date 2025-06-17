import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetched: false,
  limits: {
    "api/day": 2000,
    "api/hour": 200,
    "api/second": 3,
    "confidence/hour": 15,
    "hooks": 200,
    "hooks/hour": 200
  },
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setTokenDets: (state, action) => {
      state.fetched = true;
      Object.assign(state, action.payload);
    },
  },
});

export const { setTokenDets } = tokenSlice.actions;

export default tokenSlice.reducer;