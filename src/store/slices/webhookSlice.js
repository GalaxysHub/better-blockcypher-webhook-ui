import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  BTC: {
    fetched: false,
    data: {},
  },
  BTCt: {
    fetched: false,
    data: {},
  },
  BCY: {
    fetched: false,
    data: {},
  },
  LTC: {
    fetched: false,
    data: {},
  },
  DOGE: {
    fetched: false,
    data: {},
  },
  DASH: {
    fetched: false,
    data: {},
  },
  ETH: {
    fetched: false,
    data: {},
  },
  bETH: {
    fetched: false,
    data: {},
  },
  selected: {},
};

const webhookSlice = createSlice({
  name: "webhook",
  initialState,
  reducers: {
    setWebhookData: (state, action) => {
      const { coin, data } = action.payload;
      state[coin] = { ...state[coin], fetched: true, data: data };
    },
    setSelectedWebhook: (state, action) => {
      const { coin, id } = action.payload;
      // Implementation can be added if needed
    },
    removeWebhookById: (state, action) => {
      const { coin, id } = action.payload;
      delete state[coin].data[id];
      // Also remove from selected if it was selected
      delete state.selected[id];
    },
    addWebhookData: (state, action) => {
      const { coin, data: newWebhook } = action.payload;
      state[coin].data[newWebhook.id] = newWebhook;
    },
    markWebhooks: (state, action) => {
      const payload = action.payload;
      const ids = Object.keys(payload);
      
      ids.forEach((id) => {
        if (payload[id] === false) {
          delete state.selected[id];
        } else {
          state.selected[id] = payload[id];
        }
      });
    },
    resetAllWebhookData: (state) => {
      // Reset all webhook data when token changes
      Object.keys(initialState).forEach((key) => {
        if (key !== 'selected') {
          state[key] = { ...initialState[key] };
        }
      });
      state.selected = {};
    },
  },
});

export const {
  setWebhookData,
  setSelectedWebhook,
  removeWebhookById,
  addWebhookData,
  markWebhooks,
  resetAllWebhookData,
} = webhookSlice.actions;

export default webhookSlice.reducer;