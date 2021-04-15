const initialState = {
  id: { name: "ID", key: "id", sortable: true, checked: true },
  address: {
    name: "Address",
    key: "address",
    sortable: true,
    checked: true,
  },
  event: { name: "Event", key: "event", sortable: true, checked: false },
  url: { name: "URL", key: "url", sortable: true, checked: false },
  callback_errors: {
    name: "Callback Errors",
    key: "callback_errors",
    sortable: true,
    checked: false,
  },
};

const fieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_FIELD": {
      const field = action.payload;
      console.log(`state`, state[field]);
      return {
        ...state,
        [field]: { ...state[field], checked: !state[field].checked },
      };
    }
    default:
      return state;
  }
};

export default fieldReducer;
