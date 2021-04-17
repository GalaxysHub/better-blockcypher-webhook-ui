const initialState = {
  fetched: false,
};

const fieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN_DETS": {
      return { fetched: true, ...action.payload };
    }
    default:
      return state;
  }
};

export default fieldReducer;
