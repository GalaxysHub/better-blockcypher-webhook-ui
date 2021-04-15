export const setWebhookData = ({ coin, data }) => ({
  type: "SET_FETCHED_WEBHOOK_DATA",
  payload: { coin, data },
});

export const removeWebhookById = ({ coin, id }) => ({
  type: "DELETE_DATAPOINT",
  payload: { coin, id },
});

export const addWebhookData = ({ coin, data }) => ({
  type: "ADD_WEBHOOK_DATA",
  payload: { coin, data },
});
