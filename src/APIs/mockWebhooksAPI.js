const mockWebhooks = require("__mock__/webhooks.json");
const mockTokenDets = require("__mock__/tokenDets.json");

const mockRequest = (cb = () => {}) => {
  let randWait = Math.random() * 100 + 200;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb());
    }, randWait);
  });
};

const getTokenDets = (TOKEN) => {
  if (!TOKEN) return mockRequest(() => mockTokenDets);
};

const createWebhook = ({ addr, targetURL, coin, event }) => {
  return mockRequest(function () {
    return {
      data: {
        id: "mock-response-" + Date.now(),
        address: addr,
        url: targetURL,
        event: event,
        callback_errors: 0,
      },
    };
  });
};

const getWebhooksByCoin = (coin) => {
  return mockRequest(() => mockWebhooks[coin]);
};

const deleteWebhookByID = ({ id, coin }) => {
  return mockRequest();
};

const mockAPIs = {
  getTokenDets,
  createWebhook,
  getWebhooksByCoin,
  deleteWebhookByID,
};

export default mockAPIs;
