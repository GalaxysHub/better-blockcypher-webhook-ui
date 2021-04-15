export const setWebhookData = ({ coin, webhookData }) => ({
  type: "SET_FETCHED_WEBHOOK_DATA",
  payload: { coin, webhookData },
});

export const removeWebhookById = ({ coin, id }) => ({
  type: "DELETE_DATAPOINT",
  payload: { coin, id },
});
