const initialState = {
  itemsPerPage: 10,
  pageNum: 1,
  activeCoin: "BCY",
};

const pageReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case "SET_ITEMS_PER_PAGE": {
      return {
        ...state,
        itemsPerPage: payload,
      };
    }
    case "SET_PAGE_NUMBER": {
      return {
        ...state,
        pageNum: payload,
      };
    }
    case "SET_ACTIVE_COIN": {
      return {
        ...state,
        activeCoin: payload,
      };
    }
    default:
      return state;
  }
};

export default pageReducer;
