import { createSlice } from "@reduxjs/toolkit";
import { TOKEN } from "_config/blockcypher.json";

const initialState = {
  token: TOKEN || "", // Store current token value
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
    setToken: (state, action) => {
      state.token = action.payload;
      state.fetched = false; // Reset fetched status when token changes
    },
    setTokenDets: (state, action) => {
      state.fetched = true;
      Object.assign(state, action.payload);
    },
  },
});

export const { setToken, setTokenDets } = tokenSlice.actions;

export default tokenSlice.reducer;