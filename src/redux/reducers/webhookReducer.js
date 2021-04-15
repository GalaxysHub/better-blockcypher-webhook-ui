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
};

const webhookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FETCHED_WEBHOOK_DATA": {
      const { coin, webhookData } = action.payload;
      return { ...state, [coin]: { fetched: true, data: webhookData } };
    }
    case "DELETE_DATAPOINT": {
      let payload = { ...action.payload };
      const { coin, id } = payload;
      let newData = state[coin].data;
      delete newData[id];
      return { ...state, [coin]: { ...state[coin], data: newData } };
    }
    default:
      return state;
  }
};

export default webhookReducer;
