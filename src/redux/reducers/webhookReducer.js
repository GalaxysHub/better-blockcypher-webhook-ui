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
  selected: {},
};

const webhookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FETCHED_WEBHOOK_DATA": {
      const { coin, data } = action.payload;
      return {
        ...state,
        [coin]: { ...state[coin], fetched: true, data: data },
      };
    }
    case "SET_SELECTED_WEBHOOKS": {
      let payload = action.payload;
      const ids = Object.keys(payload);
      ids.forEach((id) => {
        if (payload[id] === false) {
          delete state.selected[id];
          delete payload[id];
        }
      });
      let newSelected = { ...state.selected, ...payload };
      return { ...state, selected: newSelected };
    }
    case "DELETE_WEBHOOK": {
      const { coin, id } = action.payload;
      let newData = { ...state[coin].data };
      delete newData[id];
      let newState = { ...state };
      newState[coin].data = newData;
      return newState;
    }
    case "ADD_WEBHOOK": {
      const { coin, data: payloadData } = action.payload;
      let newData = state[coin].data;
      newData[payloadData.id] = { ...payloadData };
      let newState = { ...state };
      newState[coin].data = newData;
      return newState;
    }
    default:
      return state;
  }
};

export default webhookReducer;
