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
      let payload = { ...action.payload };
      const { coin, data } = payload;
      return { ...state, [coin]: { fetched: true, data: data } };
    }
    case "SET_SELECTED_WEBHOOK_DATA": {
      let payload = { ...action.payload };
      const { coin, data } = payload;
      let newState = { ...state };
      newState[coin].selected = { ...data };
      return newState;
    }
    case "DELETE_WEBHOOK": {
      const { coin, id } = action.payload;
      let newData = { ...state[coin].data };
      delete newData[id];
      let newState = { ...state };
      newState[coin].data = newData;
      return newState;
    }
    case "ADD_WEBHOOK_DATA": {
      const { coin, data } = action.payload;
      let newData = state[coin].data;
      newData[data.id] = { ...data };
      let newState = { ...state };
      newState[coin].data = newData;
      return newState;
    }
    default:
      return state;
  }
};

export default webhookReducer;
