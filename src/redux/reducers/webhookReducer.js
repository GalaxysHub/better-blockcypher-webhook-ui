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
      const { coin, data } = action.payload;
      return { ...state, [coin]: { fetched: true, data: data } };
    }
    case "DELETE_DATAPOINT": {
      let payload = { ...action.payload };
      const { coin, id } = payload;
      let newData = state[coin].data;
      delete newData[id];
      return { ...state, [coin]: { ...state[coin], data: newData } };
    }
    case "ADD_WEBHOOK_DATA": {
      let payload = { ...action.payload };
      const { coin, data } = payload;
      let newData = state[coin].data;
      newData[data.id] = data;
      return { ...state, [coin]: { ...state[coin], data: newData } };
    }
    default:
      return state;
  }
};

export default webhookReducer;
