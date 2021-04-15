export const setWebhookData = ({ coin, webhookData }) => ({
  type: "SET_FETCHED_WEBHOOK_DATA",
  payload: { coin, webhookData },
});

export const removeWebhookById = ({ coin, id }) => ({
  type: "DELETE_DATAPOINT",
  payload: { coin, id },
});

export const addWebhookData = ({ coin, data }) => ({
  type: "ADD_WEBHOOK_DATA",
  payload: { coin, data },
});
