export const setWebhookData = ({ coin, webhookData }) => ({
  type: "SET_FETCHED_WEBHOOK_DATA",
  payload: { coin, webhookData },
});

export const deleteWebhookDatapoint = ({ coin, id }) => ({
  type: "DELETE_DATAPOINT",
  payload: { coin, id },
});
