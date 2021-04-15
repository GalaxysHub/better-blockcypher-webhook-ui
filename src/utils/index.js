function convertWebhookArrToObj(webhookArr) {
  const webhookObj = {};
  webhookArr.forEach((data) => {
    webhookObj[data.id] = data;
  });
  return webhookObj;
}

module.exports = {
  convertWebhookArrToObj,
};
