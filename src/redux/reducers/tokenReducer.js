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
